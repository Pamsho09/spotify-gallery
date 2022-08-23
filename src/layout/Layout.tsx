import Link from 'next/link'
import React from 'react'
import Modal from '../components/modal/Modal'
import { useGetTokenQuery } from '../store/service/spotifyService'

const Layout = ({ children }: React.PropsWithChildren) => {
  useGetTokenQuery(null, {
    pollingInterval: 10000,
  })

  return (
    <div className="w-full flex flex-col h-screen">
      <header className="w-full h-20 items-center flex bg-blue-600 p-3">
        <Link href={'/'}>
          <h2 className="text-4xl text-white font-bold">Spotifu Gallery</h2>
        </Link>
      </header>
      {children}
      <Modal />
    </div>
  )
}

export default Layout
