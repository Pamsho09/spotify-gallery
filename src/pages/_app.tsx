import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

// eslint-disable-next-line @typescript-eslint/naming-convention
const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
)

export default MyApp
