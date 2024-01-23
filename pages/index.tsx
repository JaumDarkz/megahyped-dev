import Head from 'next/head'

import ComingSoonComponent from '@/components/PostLaunch/ComingSoon'

export default function Home() {
  return (
    <>
      <Head>
        <title>Megahyped - Home</title>
        <meta name="description" content="Megahyped NFT official website." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/vector.ico" />
      </Head>

      <ComingSoonComponent />
    </>
  )
}
