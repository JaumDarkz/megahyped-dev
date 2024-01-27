import Image from 'next/image'
import { useState } from 'react'

import Sidebar from '@/components/Reutilizables/Sidebar'

import styles from './styles.module.scss'

import mhtoken from '@/public/assets/mhtoken.png'
import global from '@/public/assets/global.png'
import soundicon from '@/public/assets/sound.svg'
import muteicon from '@/public/assets/mute.svg'
import addimage from '@/public/assets/stake/add.svg'
import blankimage from '@/public/assets/stake/blank.svg'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import AudioPlayer from 'react-audio-player'

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

const StakePage = () => {
  const [audio, setAudio] = useState(false)
  const { publicKey, sendTransaction } = useWallet()
  const numberOfImages = 16

  const imageArray = Array.from({ length: numberOfImages }, (_, index) => index + 1)

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

  console.log(publicKey?.toBase58())

  return (
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
                <Image src={mhtoken} alt='Token' style={{ width: '42px', height: '42px'}}/>
              </div>

              <div className={styles.text}>
                MHT AIRDROP VALUE: <span>{300}</span>
              </div>
            </div>

            <div className={styles.info}>
              <div className={styles.icon}>
                <Image src={global} alt='Hash' style={{ width: '42px', height: '42px'}} />
              </div>

              <div className={styles.text}>
                GLOBAL HASH: <span>{'57.000,00'}</span>
              </div>
            </div>
          </div>

          <div className={styles.buttons}>

              <WalletMultiButton style={buttonStyles}/>

            <div className={styles.sound} onClick={() => setAudio(!audio)}>
              <Image className={styles.img} src={audio == false ? muteicon : soundicon} alt=''/>
            </div>
          </div>
        </div>

        <div className={styles.gridContainer}>
          {imageArray.map((imageNumber) => (
            <div key={imageNumber} className={imageNumber == 1 ? styles.addItem : styles.gridItem}>
              <Image className={imageNumber == 1 ? styles.addImg : styles.img} src={imageNumber == 1 ? addimage : blankimage} alt={`Image ${imageNumber}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StakePage