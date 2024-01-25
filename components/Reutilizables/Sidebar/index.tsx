/* eslint-disable quotes */
import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './styles.module.scss'
import logo from '@/public/assets/brand/LogoHyperverse.svg'
import hide from '@/public/assets/hidesidebar.svg'

const Sidebar = () => {
  const [webpath, setWebpath] = useState('')
  const [sidebarClosed, setSidebarClosed] = useState(false)

  useEffect(() => {
    setWebpath(window.location.pathname)
  }, [])

  const toggleSidebar = () => {
    setSidebarClosed(!sidebarClosed)
  }

  return (
    <div
      className={`${styles.container} ${
        sidebarClosed ? styles['sidebar-closed'] : ''
      }`}
    >
      <div className={styles.content}>
        <div className={styles.logo}>
          <Image src={logo} alt='logo' width={190} />
        </div>

        <div className={styles.optionsContainer}>
          <div onClick={() =>  {return null /*webpath == '/play' ? null : window.open('/play', '_self')*/}} className={styles.comingOption}>
            Play
          </div>

          <div onClick={() => webpath == '/stake' ? null : window.open('/stake', '_self')} className={webpath == '/stake' ? styles.activeOption : styles.option}>
            Stake
          </div>

          <div onClick={() => webpath == '/referral' ? null : window.open('/referral', '_self')} className={webpath == '/referral' ? styles.activeOption : styles.option}>
            Referral
          </div>

          <div onClick={() => {return null /*webpath == '/marketplace' ? null : window.open('/marketplace', '_self')*/}} className={styles.comingOption}>
            Marketplace
          </div>
        </div>

        <div className={styles.exit}>
          <div className={styles.option} onClick={() => window.open('/', '_self')}>
            Exit
          </div>
        </div>
      </div>

      <div className={styles.hide}>
        <Image onClick={toggleSidebar} className={styles.img} src={hide} alt='Hide Sidebar' />
      </div>
    </div>
  )
}

export default Sidebar
