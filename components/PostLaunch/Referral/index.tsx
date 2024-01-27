import { useEffect, useState } from 'react'
import Image from 'next/image'

import Sidebar from '@/components/Reutilizables/Sidebar'

import styles from './styles.module.scss'

import mhtoken from '@/public/assets/mhtoken.svg'
import soundicon from '@/public/assets/sound.svg'
import muteicon from '@/public/assets/mute.svg'
import copyicon from '@/public/assets/copyicon.svg'

const ReferralPage = () => {
  const [sound, setSound] = useState(false)
  const [copyModal, setCopyModal] = useState(false)

  useEffect(() => {
    if (copyModal == true) {
      setTimeout(() => setCopyModal(false), 3000)
    }
  }, [copyModal])

  const referralLink = 'http://megahyped.com/referral=?123456'
  const handleCopyClick = () => {
    navigator.clipboard.writeText(referralLink)
    .then(() => {
      null
    })
    .catch(err => {
      console.error('Error to copy:', err)
    })

    setCopyModal(true)
  }

  return (
    <>
      {copyModal &&
        <div className={styles.copyModal}>
          <div className={styles.message}>
            Copied to Clipboard!
          </div>
        </div>
      }

      <div className={styles.container}>
        <div className={styles.sidebarContainer}>
          <Sidebar />
        </div>

        <div className={styles.referralContainer}>
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

          <div className={styles.referralLink}>
            <div className={styles.text}>
              Your Referral Link Is
            </div>

            <div className={styles.linkContainer}>
              <div className={styles.link}>
                {referralLink}
              </div>

              <div className={styles.icon} onClick={handleCopyClick}>
                <Image onClick={() => setCopyModal(true)} src={copyicon} alt='Copy' className={styles.img} />
              </div>
            </div>
          </div>

          <div className={styles.referralInfo}>
            <div className={styles.infoContainer}>
              <div className={styles.label}>
                {100} Referrals
              </div>
              
              <div className={styles.data}>
                {100} Points
              </div>
            </div>

            <div className={styles.infoContainer}>
              <div className={styles.label}>
                {5} Referrals Staking
              </div>
              
              <div className={styles.data}>
                {100} Points
              </div>
            </div>

            <div className={styles.infoContainer}>
              <div className={styles.label}>
                Total
              </div>
              
              <div className={styles.data}>
                {100} Points
              </div>
            </div>
          </div>

          <div className={styles.referralInfo}>
            <div className={styles.infoContainer}>
              <div className={styles.label}>
                My rank
              </div>
              
              <div className={styles.data}>
                Noob
              </div>
            </div>

            <div className={styles.dotInfoContainer}>
              <div className={styles.label}>
                Top 325 - User Z
              </div>

              <div className={styles.line} />
              
              <div className={styles.data}>
                {9999} Points
              </div>
            </div>
          </div>

          <div className={styles.referralRanking}>
            <div className={styles.title}>
              Referral Ranking
            </div>

            <div className={styles.position}>
              <div className={styles.user}>
                Top 1 - Caprio
              </div>

              <div className={styles.line} />

              <div className={styles.points}>
                {9999}
              </div>
            </div>

            <div className={styles.position}>
              <div className={styles.user}>
                Top 2 - Tauri
              </div>

              <div className={styles.line} />

              <div className={styles.points}>
                {9999}
              </div>
            </div>

            <div className={styles.position}>
              <div className={styles.user}>
                Top 3 - Koroshy
              </div>

              <div className={styles.line} />

              <div className={styles.points}>
                {9999}
              </div>
            </div>

            <div className={styles.position}>
              <div className={styles.user}>
                Top 4 - Null
              </div>

              <div className={styles.line} />

              <div className={styles.points}>
                {9999}
              </div>
            </div>

            <div className={styles.position}>
              <div className={styles.user}>
                Top 5 - Null
              </div>

              <div className={styles.line} />

              <div className={styles.points}>
                {9999}
              </div>
            </div>

            <div className={styles.position}>
              <div className={styles.user}>
                Top 6 - Null
              </div>

              <div className={styles.line} />

              <div className={styles.points}>
                {9999}
              </div>
            </div>

            <div className={styles.position}>
              <div className={styles.user}>
                Top 7 - Null
              </div>

              <div className={styles.line} />

              <div className={styles.points}>
                {9999}
              </div>
            </div>

            <div className={styles.position}>
              <div className={styles.user}>
                Top 8 - Null
              </div>

              <div className={styles.line} />

              <div className={styles.points}>
                {9999}
              </div>
            </div>

            <div className={styles.position}>
              <div className={styles.user}>
                Top 9 - Null
              </div>

              <div className={styles.line} />

              <div className={styles.points}>
                {9999}
              </div>
            </div>

            <div className={styles.position}>
              <div className={styles.user}>
                Top 10 - Null
              </div>

              <div className={styles.line} />

              <div className={styles.points}>
                {9999}
              </div>
            </div>

            <div className={styles.position}>
              <div className={styles.user}>
                Top 11 - Null
              </div>

              <div className={styles.line} />

              <div className={styles.points}>
                {9999}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReferralPage