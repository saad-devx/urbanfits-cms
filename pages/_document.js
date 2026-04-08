import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="apple-touch-icon" href="/logos/logo_black.svg"></link>
        <link rel="shortcut icon" href="/logos/logo_black.svg" sizes="32x32" type="image/x-icon" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src="https://kit.fontawesome.com/4e881d944d.js" crossorigin="anonymous"></script>
      </body>
    </Html>
  )
}