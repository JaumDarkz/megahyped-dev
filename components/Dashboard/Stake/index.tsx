import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'

import Sidebar from '@/components/Reusable/Sidebar'
import Popup from './components/Popup'
import StakeCard from './components/StakeCard'

import styles from './styles.module.scss'

import mhtoken from '@/public/assets/mhtoken.png'
import global from '@/public/assets/global.png'
import soundicon from '@/public/assets/sound.svg'
import muteicon from '@/public/assets/mute.svg'
import addimage from '@/public/assets/stake/add.svg'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import AudioPlayer from 'react-audio-player'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { getGlobalHash, getUserData, getStakes } from '@/utils'
import { AssetsContext } from '@/contexts/AssetsProvider'

const StakePage = () => {
  const [popup, setPopup] = useState(false)
  const [audio, setAudio] = useState(false)
  const { publicKey, sendTransaction } = useWallet()
  const { wallet, setWallet, assets } = useContext(AssetsContext)
  const [ globalHash, setGlobalHash ] = useState(0)
  const [ userMail, setUserMail ] = useState('')
  const [ stakedAssets, setStakedAssets ] = useState([])
  const [ airdropValue, setAirdropValue] = useState(0)
  const [ myMiningPower, setMyMiningPower ] = useState(0)


  const handleUnstake = (id: number) => {
    // Remove o StakeCard com o ID correspondente
    //setStakeCards((prevStakeCards) => prevStakeCards.filter((card) => card.id !== id))
  }

  useEffect(() => {
    if (!process.env.API_URL) return
    getUserData(process.env.API_URL).then(
      (response) => {
        setAirdropValue(response.data.AirdropValue)
        setUserMail(response.data.email)
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
    getGlobalHash(process.env.API_URL).then(
      (response) => {
        setGlobalHash(response.data)
      }).catch(
        (error) => {
          console.log(error)
        }
      )
  }, [])

  useEffect(() => {
    if (!process.env.API_URL) return
    getStakes(process.env.API_URL, userMail).then(
      (response) => {
        setStakedAssets(response.data)
        console.log(assets)
        // sum all hashes from assets
        const allHashes = response.data.reduce((acc, asset) => acc + asset.hashRate, 0)
        if (!process.env.DAILY_REWARDS) return
        setMyMiningPower(parseInt(process.env.DAILY_REWARDS)*(allHashes/globalHash))
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
  } , [userMail])

  useEffect(() => {
    if (!publicKey) { return }
    setWallet(publicKey.toBase58())
    console.log(wallet)
  }, [publicKey, wallet, setWallet])

  const buttonStyles = {
    width: 'fit-content',
    height: '45px',
    padding: '12px 14px',
    borderRadius: '12px',
    border: '2px solid #000',
    background: '#BBF209',
    boxShadow: '4px 4px 0px 0px #000',
    color: '#000',
    fontFamily: 'Consolas',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal',
    letterSpacing: '-0.05px',
    transition: '0.3s',
    '&:hover': {
      filter: 'brightness(0.75)',
    },
  }

  return (
    <>
    {popup && (
        <div className={styles.popup}>
          <Popup close={(newValue: boolean) => setPopup(newValue)} />
        </div>
      )}
    <div className={styles.container}>
      {audio && (
        <AudioPlayer
          src="./main.mp3"
          autoPlay
        />
      )}
      <div className={styles.sidebarContainer}>
        <Sidebar />
      </div>

      <div className={styles.stakeContainer}>
        <div className={styles.header}>
          <div className={styles.coinInfo}>
            <div className={styles.info}>
              <div className={styles.icon}>
                <Image src={mhtoken} alt='Token' style={{ width: '42px', height: '42px' }} />
              </div>

              <div className={styles.text}>
                MHT AIRDROP: <span>{airdropValue}</span>
              </div>
            </div>

            <div className={styles.info}>
              <div className={styles.icon}>
                <Image src={mhtoken} alt='Token' style={{ width: '42px', height: '42px' }} />
              </div>

              <div className={styles.text}>
                MINING POWER: <span>{myMiningPower} $MHT/day</span>
              </div>
            </div>

            <div className={styles.info}>
              <div className={styles.icon}>
                <Image src={global} alt='Hash' style={{ width: '42px', height: '42px' }} />
              </div>

              <div className={styles.text}>
                GLOBAL HASH RATE: <span>{globalHash}</span>
              </div>
            </div>
          </div>

          <div className={styles.buttons}>

            <WalletMultiButton style={buttonStyles} />

            <div className={styles.sound} onClick={() => setAudio(!audio)}>
              <Image className={styles.img} src={audio == false ? muteicon : soundicon} alt='' />
            </div>
          </div>
        </div>
        <div className={styles.gridContainer}>
            {stakedAssets.map((asset, index) => (
              //@ts-ignore
              <StakeCard index={index} key={index} id={asset.name} rarity={asset.rarity} staked={true} mint={asset.mintAddress} hashRate={process.env.DAILY_REWARDS*(asset.hashRate/globalHash)} onUnstake={null} nft={asset.image} setPopup={() => null} />
            )
            )}
            <div className={styles.gridItem}>
              <Image
                onClick={() => setPopup(true)}
                className={styles.addImg}
                src={addimage}
                alt={'Add Stake'}
              />
            </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default StakePage