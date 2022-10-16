import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {LoginProvider} from '../store/LoginContext'
import userAuth from '../Helpers/userAuth'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <> 
      <LoginProvider>
        <Component {...pageProps} />
      </LoginProvider>
    </>

  )
}

export default MyApp
