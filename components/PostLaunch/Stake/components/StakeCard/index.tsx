import Image from 'next/image'

import styles from './styles.module.scss'

import nftimg from '@/public/assets/stake/1.gif'
import Badge from './components/Badge'

const StakeCard = () => {
  return (
    <div className={styles.stakeCard}>
      <div className={styles.infoContainer}>
        <div className={styles.nft}>
          <Image src={nftimg} className={styles.img} width={140} alt='NFT' />
        </div>

        <div className={styles.badges}>
          <Badge chance='1%' quantity={1} rarity='mythic' />
          <Badge chance='5%' quantity={1} rarity='legendary' />
          <Badge chance='15%' quantity={1} rarity='epic' />
          <Badge chance='60%' quantity={1} rarity='uncommon' />
          <Badge chance='35%' quantity={1} rarity='rare' />
          <Badge chance='100%' quantity={1} rarity='common' />  
        </div>
      </div>
    </div>
  )
}

export default StakeCard