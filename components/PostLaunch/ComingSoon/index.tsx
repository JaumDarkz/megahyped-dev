import Image from 'next/image'

import styles from './styles.module.scss'

import discord from '@/public/assets/social/discord.webp'
import twitter from '@/public/assets/social/twitter.webp'
import whitepaper from '@/public/assets/icons/whitepaper.svg'
import hyperverse from '@/public/assets/brand/LogoHyperverse.svg'

const ComingSoonComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.bg} />

      <div className={styles.navbar}>
        <div className={styles.social} onClick={() => window.open('https://discord.gg/megahyped', '_blank')}>
          <Image className={styles.img} width={50} height={50} src={discord} alt='Discord' />
        </div>

        <div className={styles.social} onClick={() => window.open('https://twitter.com/MegaHypedDAO', '_blank')}>
          <Image className={styles.img} width={50} height={50} src={twitter} alt='Twitter' />
        </div>

        <div className={styles.button}>
          <div>
            <Image className={styles.img} src={whitepaper} alt='Litepaper' />
          </div>

          <div className={styles.text}>
            Litepaper
          </div>
        </div>
      </div> 

      <div className={styles.comingSoon}>
        <div className={styles.image}>
          <Image className={styles.img} src={hyperverse} alt='Coming soon' fill={true} />
        </div>
      </div>
    </div>
  )
}

export default ComingSoonComponent