import "../styles/globals.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import Events from "../components/events"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Events />
    </>
  )
}

export default MyApp
