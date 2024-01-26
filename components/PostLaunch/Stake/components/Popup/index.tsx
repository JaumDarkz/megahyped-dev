import Image from 'next/image'
import { useState } from 'react'

import styles from './styles.module.scss'

import closeicon from '@/public/assets/stake/closeicon.svg'
import nft from '@/public/assets/stake/1.gif'

interface Props {
  close: (newValue: boolean) => void
}

const Popup = ({close}:Props) => {
  const [popupState, setPopupState] = useState(1)

  const numberOfImages = 16

  const imageArray = Array.from({ length: numberOfImages }, (_, index) => index + 1)

  return (
    <div className={styles.container}>
      {popupState == 1 ? 
        <div className={styles.popup}>
          <div className={styles.close} onClick={() => close(false)}>
            <Image className={styles.img} src={closeicon} alt='Close' />
          </div>

          <div className={styles.title}>
            Choose Vandal
          </div>

          <div className={styles.counter}>
            Megahyped NFT: {12}
          </div>

          <div className={styles.grid}>
            {imageArray.map((imageNumber) => (
              <div key={imageNumber} className={styles.gridItem}>
                <Image className={styles.img} src={nft} alt={`Image ${imageNumber}`} width={180} />
                
                <div className={styles.button} onClick={() => setPopupState(2)}>
                  Stake
                </div>
              </div>
            ))}
          </div>
        </div>

        :

        <div className={styles.secondPopup}>
          <div className={styles.close} onClick={() => close(false)}>
            <Image className={styles.img} src={closeicon} alt='Close' />
          </div>

          <div className={styles.title}>
            Choose Vandal
          </div>

          <div className={styles.description}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </div>

          <div className={styles.grid}>
            <div className={styles.gridItem}>
              <Image className={styles.img} src={nft} alt='Faction' width={180} />
              
              <div className={styles.counter}>
                {'333/600'}
              </div>

              <div className={styles.button} onClick={() => close(false)}>
                Faction Name
              </div>
            </div>

            <div className={styles.gridItem}>
              <Image className={styles.img} src={nft} alt='Faction' width={180} />
              
              <div className={styles.counter}>
                {'333/600'}
              </div>

              <div className={styles.button} onClick={() => close(false)}>
                Faction Name
              </div>
            </div>

            <div className={styles.gridItem}>
              <Image className={styles.img} src={nft} alt='Faction' width={180} />
              
              <div className={styles.counter}>
                {'333/600'}
              </div>

              <div className={styles.button} onClick={() => close(false)}>
                Faction Name
              </div>
            </div>

            <div className={styles.gridItem}>
              <Image className={styles.img} src={nft} alt='Faction' width={180} />
              
              <div className={styles.counter}>
                {'333/600'}
              </div>

              <div className={styles.button} onClick={() => close(false)}>
                Faction Name
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Popup