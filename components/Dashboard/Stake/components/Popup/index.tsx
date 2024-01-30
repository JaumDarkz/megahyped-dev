import Image from 'next/image'
import { useCallback, useContext, useEffect, useState } from 'react'

import styles from './styles.module.scss'

import closeicon from '@/public/assets/stake/closeicon.png'
import nft1 from '@/public/assets/stake/nfts/1.gif'
import nft2 from '@/public/assets/stake/nfts/2.gif'
import nft3 from '@/public/assets/stake/nfts/3.gif'
import nft4 from '@/public/assets/stake/nfts/4.gif'
import StakeCard from '../StakeCard'
import { AssetsContext } from '@/contexts/AssetsProvider'
import { StakeContext } from '@/contexts/StakeContextProvider'
import { WalletNotConnectedError } from '@solana/wallet-adapter-base'
import {
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  PublicKey,
  Keypair,
} from '@solana/web3.js'
import {
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
  createInitializeAccountInstruction,
} from '@solana/spl-token'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { getUserData, getFactionPopulation, stake, getGlobalHash } from '@/utils'

interface Props {
  close: (newValue: boolean) => void
}

const Popup = ({ close }: Props) => {



  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const [popupState, setPopupState] = useState(1)
  const { assets } = useContext(AssetsContext)
  const { nftMintAddress, nftName, nftFaction, setNftFaction } = useContext(StakeContext)
  const [userData, setUserData] = useState<any>(null)
  const [isStaking, setIsStaking] = useState(false)
  const [ globalHash, setGlobalHash ] = useState(0)

  const [factionPopulation, setFactionPopulation] = useState<any[]>([
    { faction: 'VLAD', population: 0 },
    { faction: 'VIPER', population: 0 },
    { faction: 'FAK', population: 0 },
    { faction: 'SHIN', population: 0 },
  ])

  const updatePopulation = (factionName, newPopulation) => {
    setFactionPopulation(prevFactionPopulation => {
      // Create a new array with updated population for the specified faction
      const updatedFactionPopulation = prevFactionPopulation.map(faction => {
        if (faction.faction === factionName) {
          return { ...faction, population: newPopulation }
        }
        return faction
      })

      return updatedFactionPopulation
    })
  }


  useEffect(() => {
    if (!process.env.API_URL) return
    getUserData(process.env.API_URL).then(
      (response) => {
        setUserData(response.data)
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )

    // For each item in factionPopulation, use getFactionPopulation to get the population of the faction and assign it to the population property of the faction
    factionPopulation.map((faction) => {
      if (!process.env.API_URL) return
      getFactionPopulation(process.env.API_URL, faction.faction).then(
        (response) => {
          // update factionPopulation where "faction" is equal to faction.faction with the property "population" = "response.data.population"
          updatePopulation(faction.faction, response.data.population)
        }
      ).catch(
        (error) => {
          console.log(error)
        }
      )
    })
    getGlobalHash(process.env.API_URL).then(
      (response) => {
        setGlobalHash(response.data)
      }).catch(
        (error) => {
          console.log(error)
        }
      )
  }, [])

  //setNftFaction(faction)
  //close(false)
  const HandleStake = useCallback(async (faction) => {

    setNftFaction(faction)

    if (!publicKey) throw new WalletNotConnectedError()
    if (!nftMintAddress) throw new Error('Mint address is undefined')

    const newKeypair = Keypair.generate()
    const newAssociatedAccount = newKeypair.publicKey
    const lamports = LAMPORTS_PER_SOL * 0.002
    const recentBlockhash = await connection.getRecentBlockhash()
    setIsStaking(true)

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(userData.ewallet),
        lamports: Math.floor(lamports),
      })
    )

    const giverTokenAccounts = await connection.getTokenAccountsByOwner(publicKey, {
      mint: new PublicKey(nftMintAddress),
    })

    const receiverTokenAccounts = await connection.getTokenAccountsByOwner(new PublicKey(userData.ewallet), {
      mint: new PublicKey(nftMintAddress),
    })

    if (!receiverTokenAccounts.value || receiverTokenAccounts.value.length === 0) {
      transaction.add(
        SystemProgram.createAccount({
          fromPubkey: publicKey,
          newAccountPubkey: newAssociatedAccount,
          lamports: await connection.getMinimumBalanceForRentExemption(165), // Adjust as needed
          space: 165,
          programId: TOKEN_PROGRAM_ID,
        }))

      transaction.add(
        createInitializeAccountInstruction(
          newAssociatedAccount,
          new PublicKey(nftMintAddress),
          new PublicKey(userData.ewallet),
          TOKEN_PROGRAM_ID,
        )
      )

      transaction.add(createTransferInstruction(
        new PublicKey(giverTokenAccounts.value[0].pubkey),
        newAssociatedAccount,
        publicKey,
        1,
        [],
      ))
    } else {
      // console.log(receiverTokenAccounts.value[0].pubkey)
      transaction.add(createTransferInstruction(
        new PublicKey(giverTokenAccounts.value[0].pubkey),
        new PublicKey(receiverTokenAccounts),
        publicKey,
        1,
        [],
      ))
    }

    transaction.recentBlockhash = recentBlockhash.blockhash

    try {
      console.log(nftName)
      const signature = await sendTransaction(transaction, connection, { signers: [newKeypair] })
      await connection.confirmTransaction(signature, 'processed').finally(() => {
        if (!process.env.API_URL) {
          alert('There was an error staking your NFT but the transaction might have succeeded. Please contact support to update your staking Status.')
          close(false)
          return
        }
        stake(process.env.API_URL, nftName, faction, publicKey.toBase58(), new PublicKey(nftMintAddress).toBase58(), userData.email)
          .catch((error) => {
            alert('There was an error staking your NFT but the transaction might have succeeded. Please contact support to update your staking Status.')
            close(false)
          })
          .finally(() => {
            setIsStaking(false)
            close(false)
          })
        setIsStaking(false)
        close(false)
      })
      console.log('Transaction confirmed:', signature)
    } catch (error) {
      console.log(nftMintAddress, nftName, faction)
      alert(`Error sending/confirming transaction, please try again. ${error}`)
      close(false)
    }

  }, [publicKey, sendTransaction, connection, userData?.ewallet, nftFaction, nftMintAddress, nftName])

  const calculateHash = (rarity) => {
    switch (rarity) {
      case 'Mythic':
        return 50
      case 'Legendary':
        return 25
      case 'Epic':
        return 10
      case 'Uncommon':
        return 2
      case 'Rare':
        return 5
      case 'Common':
        return 1
      default:
        return 0
    }
  }

  return (
    <div className={styles.container}>
      {popupState == 1 ?
        <div className={styles.popup}>
          <div className={styles.close} onClick={() => { close(false) }}>
            <Image className={styles.img} src={closeicon} style={{ width: '62px', height: '38px' }} alt='Close' />
          </div>

          <div className={styles.title}>
            Choose a Vandal
          </div>

          <div className={styles.description}>
            Choose which vandal you would like to Stake. You can Unstake any time you want. You can only Stake one Vandal at a time. You Hash Rate is calculated using current data without Faction bonus.
          </div>

          <div className={styles.counter}>
            Megahyped NFT: {assets.length}
          </div>

          <div className={styles.grid}>
            {assets.map((asset, index) => (
              <div key={index} className={styles.gridItem}>
                <StakeCard index={index} nft={asset.image} id={asset.name} mint={asset.mintAddress} hashRate={parseInt(process.env.DAILY_REWARDS ? process.env.DAILY_REWARDS : '0') * (calculateHash(asset.rarity) / globalHash)} rarity={asset.rarity ? asset.rarity : ''} staked={false} onUnstake={() => null} setPopup={(bool) => bool == true ? setPopupState(2) : setPopupState(2)} />
              </div>
            ))}
          </div>
        </div>

        :

        <div className={styles.secondPopup}>
          <div className={styles.close} onClick={() => close(false)}>
            <Image className={styles.img} src={closeicon} style={{ width: '62px', height: '38px' }} alt='Close' />
          </div>

          <div className={styles.title}>
            Choose a Faction
          </div>

          <div className={styles.description}>
            You have to assign your Vandal to one of Hyperverse four Factions. Your Hash Rate is influenced by the Population of the faction you choose.
          </div>

          {isStaking ? (
            <div className={styles.newCounter}>
              Staking in Process: Please do not close this window until the transaction is confirmed.
            </div>
          ) : (null)}

          <div className={styles.grid}>
            <div className={styles.gridItem}>
              <Image className={styles.img} src={nft1} alt='Faction' width={180} />

              <div className={styles.counter}>
                {`${factionPopulation[2].population}/600`}
              </div>

              <div className={styles.button} onClick={() => { HandleStake('FAK') }}>
                The Guts
              </div>
            </div>

            <div className={styles.gridItem}>
              <Image className={styles.img} src={nft2} alt='Faction' width={180} />

              <div className={styles.counter}>
                {`${factionPopulation[1].population}/600`}
              </div>

              <div className={styles.button} onClick={() => { HandleStake('VIPER') }}>
                Northwest Temple
              </div>
            </div>

            <div className={styles.gridItem}>
              <Image className={styles.img} src={nft3} alt='Faction' width={180} />

              <div className={styles.counter}>
                {`${factionPopulation[0].population}/600`}
              </div>

              <div className={styles.button} onClick={() => { HandleStake('VLAD') }}>
                The Night District
              </div>
            </div>

            <div className={styles.gridItem}>
              <Image className={styles.img} src={nft4} alt='Faction' width={180} />

              <div className={styles.counter}>
                {`${factionPopulation[3].population}/600`}
              </div>

              <div className={styles.button} onClick={() => { HandleStake('SHIN') }}>
                The Undergrounds
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Popup