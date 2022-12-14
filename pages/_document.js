import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
              <link href="https://fonts.googleapis.com/css2?family=Lobster&family=Montserrat:ital,wght@1,600&display=swap" rel="stylesheet" />
            </Head>
            <body>
                <Main />
                <NextScript />
                <div id="portal"></div>
            </body>
        </Html>
    )
}