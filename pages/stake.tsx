import Head from 'next/head'

import StakePage from '@/components/Dashboard/Stake'

import { Wallet } from '../contexts/SolanaWalletProvider'
import AssetsProvider from '../contexts/AssetsProvider'/*  */
import StakeContextProvider from '@/contexts/StakeContextProvider'

export default function Stake() {
  return (
    <>
      <Head>
        <title>Megahyped - Stake</title>
        <meta name="description" content="Megahyped NFT official website." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/vector.ico" />
      </Head>
      <Wallet>
        <AssetsProvider>
          <StakeContextProvider>
            <StakePage />
          </StakeContextProvider>
        </AssetsProvider>
      </Wallet>
    </>
  )
}
