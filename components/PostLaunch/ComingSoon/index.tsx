import Image from 'next/image'

import styles from './styles.module.scss'

import discord from '@/public/assets/social/discord.webp'
import twitter from '@/public/assets/social/twitter.webp'
import whitepaper from '@/public/assets/icons/whitepaper.svg'
import hyperverse from '@/public/assets/brand/LogoHyperverse.svg'

const ComingSoonComponent = () => {
  return (
    <div className={styles.container}>
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
          <Image className={styles.img} src={hyperverse} alt='Coming soon' width={400} />
        </div>

        <div className={styles.waviy}>
        <span style={{ '--i': 1 } as React.CSSProperties}>C</span>
        <span style={{ '--i': 2 } as React.CSSProperties}>o</span>
        <span style={{ '--i': 3 } as React.CSSProperties}>m</span>
        <span style={{ '--i': 4 } as React.CSSProperties}>i</span>
        <span style={{ '--i': 5 } as React.CSSProperties}>n</span>
        <span style={{ '--i': 6 } as React.CSSProperties}>g</span>
        <span style={{ '--i': 7 } as React.CSSProperties}>&nbsp;</span>
        <span style={{ '--i': 8 } as React.CSSProperties}>S</span>
        <span style={{ '--i': 9 } as React.CSSProperties}>o</span>
        <span style={{ '--i': 10 } as React.CSSProperties}>o</span>
        <span style={{ '--i': 11 } as React.CSSProperties}>n</span>
        <span style={{ '--i': 12 } as React.CSSProperties}>!</span>
        </div>
      </div>
    </div>
  )
}

export default ComingSoonComponent