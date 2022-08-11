import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Klatch" />
        <meta name="keywords" content="klatch events rsvp" />
        <link rel="icon" href="/favicon.ico" />
        {/* <link rel="stylesheet" href="/utils/add2cal.css" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* <script src="/utils/add2cal.js" async defer /> */}
      </body>
    </Html>
  )
}
