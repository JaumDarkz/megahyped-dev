import Head from 'next/head'

import LoginPage from '@/components/AuthPages/LoginPage'

export default function Login() {
  return (
    <>
      <Head>
        <title>Megahyped - Login</title>
        <meta name="description" content="Megahyped NFT official website." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/vector.ico" />
      </Head>

      <LoginPage />
    </>
  )
}
