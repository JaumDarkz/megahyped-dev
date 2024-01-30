import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'

import '@/styles/globals.scss'

import { isMobile } from 'react-device-detect'

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false)
  const [mobileState, setMobileState] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line semi
    setTimeout(() => {setLoading(true)}, 1700)
  }, [])

  useEffect(() => {
    setMobileState(isMobile)
  }, [])

  return (
    <>{/*!loading ? (
      <Preloader />
    ) : null*/}

      {
        isMobile && window.location.pathname !== '/' ? 

        <div style={{'position': 'fixed', 'zIndex': '100', 'overflowY': 'hidden', 'backgroundColor': '#FF2673', 'fontSize': '22px', 'fontWeight': '600', 'width': '100%', 'height': '100vh', 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center'}}>
          Access on computer please!
        </div>

        :

        null
      }
    
      <Component {...pageProps} />
    </>  
  )
}
