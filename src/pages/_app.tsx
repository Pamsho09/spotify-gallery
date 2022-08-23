import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../layout/Layout'
import { persistor, store } from '../store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

// eslint-disable-next-line @typescript-eslint/naming-convention
const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {' '}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PersistGate>
  </Provider>
)

export default MyApp
