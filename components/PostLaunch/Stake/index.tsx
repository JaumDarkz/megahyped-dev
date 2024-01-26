import Image from 'next/image'
import { useState } from 'react'

import Sidebar from '@/components/Reutilizables/Sidebar'
import Popup from './components/Popup'

import styles from './styles.module.scss'

import mhtoken from '@/public/assets/mhtoken.svg'
import soundicon from '@/public/assets/sound.svg'
import muteicon from '@/public/assets/mute.svg'
import addimage from '@/public/assets/stake/add.svg'
import blankimage from '@/public/assets/stake/blank.svg'

const StakePage = () => {
  const [sound, setSound] = useState(false)
  const [popup, setPopup] = useState(false)

  const numberOfImages = 16

  const imageArray = Array.from({ length: numberOfImages }, (_, index) => index + 1)

  return (
    <>
      {popup &&
        <div className={styles.popup}>
          <Popup close={(newValue: boolean) => setPopup(newValue)} />
        </div>
      }

      <div className={styles.container}>
        <div className={styles.sidebarContainer}>
          <Sidebar />
        </div>

        <div className={styles.stakeContainer}>
          <div className={styles.header}>
            <div className={styles.coinInfo}>
              <div className={styles.info}>
                <div className={styles.icon}>
                  <Image src={mhtoken} alt='Token' />
                </div>

                <div className={styles.text}>
                  MHT: <span>{300}</span>
                </div>
              </div>

              <div className={styles.info}>
                <div className={styles.icon}>
                  <Image src={mhtoken} alt='Token' />
                </div>

                <div className={styles.text}>
                  GLOBAL HASH: <span>{'57.000,00'}</span>
                </div>
              </div>
            </div>

            <div className={styles.buttons}>
              <div className={styles.button}>
                Link Wallet
              </div>

              <div className={styles.sound} onClick={() => setSound(!sound)}>
                <Image className={styles.img} src={sound == false ? muteicon : soundicon} alt=''/>
              </div>
            </div>
          </div>

          <div className={styles.gridContainer}>
            {imageArray.map((imageNumber) => (
              <div key={imageNumber} className={imageNumber == 1 ? styles.addItem : styles.gridItem}>
                <Image onClick={() => imageNumber == 1 ? setPopup(true) : null} className={imageNumber == 1 ? styles.addImg : styles.img} src={imageNumber == 1 ? addimage : blankimage} alt={`Image ${imageNumber}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default StakePage