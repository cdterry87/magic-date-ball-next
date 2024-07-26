import '@styles/globals.css'

function Application({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Magic Date Ball</title>
        <meta
          property='og:title'
          content='Ask the Magic Date Ball where to eat out tonight! By Chase Terry'
          key='title'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <link rel='manifest' href='/manifest.json' />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default Application
