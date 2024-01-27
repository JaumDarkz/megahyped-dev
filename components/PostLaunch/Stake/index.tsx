import Image from 'next/image'
import { useState } from 'react'

import Sidebar from '@/components/Reutilizables/Sidebar'
import Popup from './components/Popup'
import StakeCard from './components/StakeCard'

import styles from './styles.module.scss'

import mhtoken from '@/public/assets/mhtoken.svg'
import soundicon from '@/public/assets/sound.svg'
import muteicon from '@/public/assets/mute.svg'
import addimage from '@/public/assets/stake/add.svg'
import blankimage from '@/public/assets/stake/blank.svg'

import nft1 from '@/public/assets/stake/nfts/1.gif'
import nft2 from '@/public/assets/stake/nfts/2.gif'
import nft3 from '@/public/assets/stake/nfts/3.gif'
import nft4 from '@/public/assets/stake/nfts/4.gif'

const nftImages = [nft1, nft2, nft3, nft4]

const StakePage = () => {
  const [sound, setSound] = useState(false)
  const [popup, setPopup] = useState(false)

  const numberOfImages = 16

  const getRandomRarity = () => {
    const rarities = ['mythic', 'rare', 'common', 'uncommon', 'legendary', 'epic']
    return rarities[Math.floor(Math.random() * rarities.length)]
  }

  const [stakeCards, setStakeCards] = useState(
    Array.from({ length: numberOfImages }, (_, index) => ({
      staked: true,
      hashRate: Math.floor(Math.random() * 100),
      id: index + 1,
      rarity: getRandomRarity(),
      nft: nftImages[Math.floor(Math.random() * nftImages.length)],
    }))
  )

  const handleUnstake = (id:number) => {
    // Remove o StakeCard com o ID correspondente
    setStakeCards((prevStakeCards) => prevStakeCards.filter((card) => card.id !== id))
  }

  return (
    <>
      {popup && (
        <div className={styles.popup}>
          <Popup close={(newValue: boolean) => setPopup(newValue)} />
        </div>
      )}

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
              <div className={styles.button}>Link Wallet</div>

              <div className={styles.sound} onClick={() => setSound(!sound)}>
                <Image className={styles.img} src={sound == false ? muteicon : soundicon} alt='Sound' />
              </div>
            </div>
          </div>

          <div className={styles.gridContainer}>
            {stakeCards.map((card) => (
              <StakeCard key={card.id} {...card} onUnstake={() => handleUnstake(card.id)} setPopup={() => null} />
            ))}
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