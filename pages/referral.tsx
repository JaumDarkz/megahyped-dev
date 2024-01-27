import Head from 'next/head'

import ReferralPage from '@/components/PostLaunch/Referral'

export default function Stake() {
  return (
    <>
      <Head>
        <title>Megahyped - Referral</title>
        <meta name="description" content="Megahyped NFT official website." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/vector.ico" />
      </Head>

      <ReferralPage />
    </>
  )
}
