import Image, { StaticImageData } from 'next/image'
import Badge from './components/Badge'
import styles from './styles.module.scss'
import { StakeContext } from '@/contexts/StakeContextProvider'
import { useContext, useEffect, useState } from 'react'
import { getUserData, unstake } from '@/utils'

interface Props {
  index: number;
  id: string;
  staked: boolean;
  rarity: string;
  mint: string;
  hashRate: number;
  onUnstake: () => void;
  nft: string;
  setPopup: (boolean:boolean) => void
}

const StakeCard = ({ index, id, staked, rarity, mint, hashRate, nft, setPopup }: Props) => {
  const { nftMintAddress, setNftMintAddress, nftName, setNftName, nftFaction, setNftFaction } = useContext(StakeContext)
  const [ userMail, setUserMail ] = useState('')
  const [ isUnstaking, setIsUnstaking ] = useState(false)

  useEffect(() => {
    if (!process.env.API_URL) return
    getUserData(process.env.API_URL).then(
      (response) => {
        setUserMail(response.data.email)
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
  }, [])
  

  const onUnstake = () => {
    if(!process.env.API_URL) return
    setIsUnstaking(true)
    unstake(process.env.API_URL, userMail, mint).then(
      (response) => {
        console.log(response)
        setIsUnstaking(false)
      }
    ).catch(
      (error) => {
        console.log(error)
        setIsUnstaking(false)
      }
    )
  }

  const handleButtonClick = () => {
    if (staked) {
      onUnstake()
    } else {
      setNftMintAddress(mint)
      setNftName(id)
      setPopup(false)
    }
  }

  const nftIndex = index
  const containerStyle = nftIndex !== -1 ? styles[`nft${nftIndex + 1}Background`] : ''

  return (
    <div className={`${styles.container} ${containerStyle}`}>
      <div className={styles.infoContainer}>
        <div className={styles.nft}>
          <Image src={nft} className={styles.img} width={100} height={100} alt="NFT" />
        </div>

        <div className={styles.badges}>
          <Badge id={id} rarity={rarity} hashRate={hashRate} />
        </div>
      </div>

      <div className={`${styles.button} ${isUnstaking ? styles.loading : ''}`} onClick={handleButtonClick}>
        {staked === false ? 'Stake' : isUnstaking ? 'Unstaking...' : 'Unstake'}
      </div>
    </div>
  )
}

export default StakeCard