import Image from 'next/image'
import { useState } from 'react'

import LoginTextInput from '@/components/Reutilizables/LoginTextInputs'

import styles from './styles.module.scss'

import hyperlogo from '@/public/assets/brand/LogoHyperverse.svg'
import discord from '@/public/assets/discord.svg'
import twitter from '@/public/assets/twitter.svg'

const ForgotPage = () => {
  const [resetState, setResetState] = useState(1)

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src={hyperlogo} alt='Logo' width={290} />
      </div>

      {resetState == 1 ?
        <div className={styles.loginContainer}>
          <div className={styles.detail}>Lorem ipsum dolor sit amet</div>

          <div className={styles.loginBox}>
            <div className={styles.title}>Forgot your Password?</div>

            <div className={styles.description}>
              Enter your email so that we can send you an email with instructions to reset your password.
            </div>

            <div className={styles.emailInput}>
              <LoginTextInput placeholder='Enter e-mail' />
            </div>

            <div onClick={() => setResetState(2)} className={styles.loginButton}>Send Confirmation</div>

            <div className={styles.createAccount}>
              <span onClick={() => window.open('/login', '_self')}>
                Back to Login Page
              </span>
            </div>
          </div>
        </div>

        :

        <div className={styles.loginContainer}>
          <div className={styles.detail}>Lorem ipsum dolor sit amet</div>

          <div className={styles.loginBox}>
            <div className={styles.title}>Forgot your Password?</div>

            <div className={styles.description}>
              Enter your email so that we can send you an email with instructions to reset your password.
            </div>

            <div className={styles.emailInput}>
              <LoginTextInput placeholder='Enter New Password' />
            </div>

            <div className={styles.emailInput}>
              <LoginTextInput placeholder='Re-enter New Password' />
            </div>

            <div onClick={() => window.open('/login', '_self')} className={styles.loginButton}>Reset Password</div>

            <div className={styles.createAccount}>
              <span onClick={() => window.open('/login', '_self')}>
                Back to Login Page
              </span>
            </div>
          </div>
        </div>
      }

      <div className={styles.socialContainer}>
        <div
          className={styles.social}
          onClick={() =>
            window.open('https://discord.com/invite/megahyped', '_self')
          }
        >
          <Image src={discord} alt='Discord' className={styles.img} />
        </div>

        <div
          className={styles.social}
          onClick={() =>
            window.open('https://twitter.com/MegaHypedDAO', '_self')
          }
        >
          <Image src={twitter} alt='Twitter' className={styles.img} />
        </div>
      </div>

      <div className={styles.rightsContainer}>
        <div className={styles.option}>Privacy and Cookies</div>
        <span>|</span>
        <div className={styles.text}>Megahyped ©️ 2024</div>
      </div>
    </div>
  )
}

export default ForgotPage