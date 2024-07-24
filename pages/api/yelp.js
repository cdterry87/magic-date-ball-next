import axios from 'axios';

export default async function handler(req, res) {
    let {
        isGeolocationEnabled,
        location,
        latitude,
        longitude,
        radius,
        price,
        rating,
        term
    } = req.query;

    // Make sure geolocation is parsed correctly
    isGeolocationEnabled = isGeolocationEnabled == 'true' ? true : false

    // Only send the specific location-based input fields based on whether geolocation is enabled
    if (isGeolocationEnabled) {
        location = undefined;
    } else {
        latitude = undefined;
        longitude = undefined;
        radius = undefined;
    }

    // If geolocation is disabled and location is not specified, throw an error
    if (!isGeolocationEnabled && !location) {
        return res.status(400).json({ error: 'Location is required!' });
    }

    try {
        const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
            headers: {
                Authorization: `Bearer ${process.env.YELP_API_KEY}`,
            },
            params: {
                location: location || undefined,
                latitude: latitude || undefined,
                longitude: longitude || undefined,
                radius: radius || undefined,
                price: price || undefined,
                rating: rating || undefined,
                term: term || undefined,
                categories: 'restaurants,bars,coffee,food',
                sort_by: 'rating',
                limit: 50,
                open_now: true,
            },
        });

        // Filter results by rating
        const businesses = response.data.businesses.filter(business => business.rating >= (rating || 0));

        res.status(200).json({ businesses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
