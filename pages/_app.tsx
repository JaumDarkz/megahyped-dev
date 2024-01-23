import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'

import '@/styles/globals.scss'

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line semi
    setTimeout(() => {setLoading(true)}, 1700)
  }, [])

  return (
    <>{/*!loading ? (
      <Preloader />
    ) : null*/}
    
      <Component {...pageProps} />
    </>  
  )
}
