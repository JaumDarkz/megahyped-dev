import Image, { StaticImageData } from 'next/image'
import Badge from './components/Badge'
import styles from './styles.module.scss'

import nft1 from '@/public/assets/stake/nfts/1.gif'
import nft2 from '@/public/assets/stake/nfts/2.gif'
import nft3 from '@/public/assets/stake/nfts/3.gif'
import nft4 from '@/public/assets/stake/nfts/4.gif'

interface Props {
  id: number;
  staked: boolean;
  rarity: string;
  hashRate: number;
  onUnstake: () => void;
  nft: StaticImageData;
  setPopup: (boolean:boolean) => void
}

const nftImages = [nft1, nft2, nft3, nft4]

const StakeCard = ({ id, staked, rarity, hashRate, onUnstake, nft, setPopup }: Props) => {
  const handleButtonClick = () => {
    if (staked) {
      onUnstake()
    } else {
      setPopup(false)
    }
  }

  const nftIndex = nftImages.indexOf(nft)
  const containerStyle = nftIndex !== -1 ? styles[`nft${nftIndex + 1}Background`] : ''

  return (
    <div className={`${styles.container} ${containerStyle}`}>
      <div className={styles.infoContainer}>
        <div className={styles.nft}>
          <Image src={nft} className={styles.img} width={100} alt="NFT" />
        </div>

        <div className={styles.badges}>
          <Badge id={id} rarity={rarity} hashRate={hashRate} />
        </div>
      </div>

      <div className={styles.button} onClick={handleButtonClick}>
        {staked === false ? 'Stake' : 'Unstake'}
      </div>
    </div>
  )
}

export default StakeCard