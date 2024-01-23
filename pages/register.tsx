import Head from 'next/head'

import RegisterPage from '@/components/AuthPages/RegisterPage'

export default function Register() {
  return (
    <>
      <Head>
        <title>Megahyped - Register</title>
        <meta name="description" content="Megahyped NFT official website." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/vector.ico" />
      </Head>

      <RegisterPage />
    </>
  )
}
