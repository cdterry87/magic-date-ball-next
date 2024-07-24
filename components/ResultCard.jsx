import Image from 'next/image'

function ResultCard({
  result,
  tryAgain,
  startOver,
  isSearchComplete,
  isTryingAgain,
  isTriedAgain
}) {
  const {
    image_url,
    name,
    location,
    rating,
    review_count,
    price,
    categories,
    url
  } = result

  const { display_address = [] } = location || {}
  // Turn the display_address array into a string
  const address = display_address.join(', ')

  let cardAnimationClass
  if (isSearchComplete && !isTryingAgain) {
    cardAnimationClass = 'animate__zoomIn'
  }
  if (isTryingAgain) {
    cardAnimationClass = 'animate__flipOutY'
  }
  if (isTriedAgain) {
    cardAnimationClass = 'animate__flipInY'
  }

  const getRating = () => {
    if (rating == 5) return 5
    if (rating < 5 && rating > 4) return 4.5
    if (rating == 4) return 4
    if (rating < 4 && rating > 3) return 3.5
    if (rating == 3) return 3
    if (rating < 3 && rating > 2) return 2.5
    if (rating == 2) return 2
    if (rating < 2 && rating > 1) return 1.5
    if (rating == 1) return 1
    if (rating < 1 && rating > 0) return 0.5
    if (rating == 0) return 0
  }

  return (
    <>
      <div className='flex flex-col gap-4 mx-4'>
        <div
          className={`animate__animated card card-compact w-full sm:w-96 bg-white shadow-xl text-gray-800 ${cardAnimationClass}`}
        >
          <figure>
            <img
              alt='Yelp Business'
              className='h-56 w-full object-cover'
              src={image_url}
            />
          </figure>
          <div className='card-body'>
            <div className='flex flex-col gap-1'>
              <h2 className='text-3xl font-bold'>{name}</h2>
              <div className='text-xl'>{address}</div>
            </div>
            {rating && rating > 0 && rating <= 5 && (
              <div className='flex items-center gap-2 w-full'>
                <Image
                  src={'/assets/images/yelp/ratings/' + getRating() + '.png'} // Route of the image file
                  alt='Rating'
                  height={24}
                  width={132}
                />
                <span className='text-lg'>({review_count} Reviews)</span>
              </div>
            )}
            <div className='flex items-center flex-wrap gap-1'>
              {price && (
                <div className='badge badge-lg bg-red-600 border-none text-white'>
                  {price}
                </div>
              )}
              {categories &&
                categories.length > 0 &&
                categories.map((category, index) => (
                  <div
                    key={index}
                    className='badge badge-lg bg-fuchsia-700 border-none text-white'
                  >
                    {category.title}
                  </div>
                ))}
            </div>
            {url && (
              <div className='flex items-end justify-end w-full'>
                <a
                  href={url}
                  target='_blank'
                  rel='noreferrer'
                  title='View on Yelp!'
                  aria-label='View on Yelp!'
                >
                  <div className='flex items-end gap-2 text-lg'>
                    <span>View on</span>
                    <Image
                      src={'/assets/images/yelp/logo.png'}
                      alt='Yelp Logo'
                      title='Yelp Logo'
                      height={40}
                      width={80}
                    />
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>
        <div className='flex items-center justify-center w-full gap-4'>
          <button
            className='text-white text-2xl hover:text-gray-300 transition duration-300 ease-in-out px-4 py-2'
            onClick={tryAgain}
          >
            Try Again?
          </button>
          <button
            className='text-white text-2xl hover:text-gray-300 transition duration-300 ease-in-out px-4 py-2'
            onClick={startOver}
          >
            Start Over
          </button>
        </div>
      </div>
    </>
  )
}

export default ResultCard
