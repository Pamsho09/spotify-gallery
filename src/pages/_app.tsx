import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../layout/Layout'
import { store } from '../store'
import { Provider } from 'react-redux'

// eslint-disable-next-line @typescript-eslint/naming-convention
const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider>
)

export default MyApp
