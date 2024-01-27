import Image from 'next/image'
import { useState } from 'react'

import styles from './styles.module.scss'

import closeicon from '@/public/assets/stake/closeicon.svg'
import nft1 from '@/public/assets/stake/nfts/1.gif'
import nft2 from '@/public/assets/stake/nfts/2.gif'
import nft3 from '@/public/assets/stake/nfts/3.gif'
import nft4 from '@/public/assets/stake/nfts/4.gif'
import StakeCard from '../StakeCard'

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
                <StakeCard nft={nft1} id={1111} hashRate={32} rarity='Mythic' staked={false} onUnstake={() => null} setPopup={(bool) => bool == true ? setPopupState(2) : setPopupState(2)}  />
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
              <Image className={styles.img} src={nft1} alt='Faction' width={180} />
              
              <div className={styles.counter}>
                {'333/600'}
              </div>

              <div className={styles.button} onClick={() => close(false)}>
                Faction Name
              </div>
            </div>

            <div className={styles.gridItem}>
              <Image className={styles.img} src={nft2} alt='Faction' width={180} />
              
              <div className={styles.counter}>
                {'333/600'}
              </div>

              <div className={styles.button} onClick={() => close(false)}>
                Faction Name
              </div>
            </div>

            <div className={styles.gridItem}>
              <Image className={styles.img} src={nft3} alt='Faction' width={180} />
              
              <div className={styles.counter}>
                {'333/600'}
              </div>

              <div className={styles.button} onClick={() => close(false)}>
                Faction Name
              </div>
            </div>

            <div className={styles.gridItem}>
              <Image className={styles.img} src={nft4} alt='Faction' width={180} />
              
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