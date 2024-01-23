import Image from 'next/image'
import { useState } from 'react'

import LoginTextInput from '@/components/Reutilizables/LoginTextInputs'

import styles from './styles.module.scss'

import hyperlogo from '@/public/assets/brand/LogoHyperverse.svg'
import discord from '@/public/assets/discord.svg'
import twitter from '@/public/assets/twitter.svg'
import unchecked from '@/public/assets/checkboxnotchecked.svg'

const ForgotPage = () => {
  const [checkbox, setCheckbox] = useState(false)
  const [audio, setAudio] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src={hyperlogo} alt='Logo' width={290} />
      </div>

      <div className={styles.loginContainer}>
        <div className={styles.detail}>Lorem ipsum dolor sit amet</div>

        <div className={styles.loginBox}>
          <div className={styles.title}>Login to account</div>

          <div className={styles.description}>
            Enter your credentials to access your account.
          </div>

          <div className={styles.emailInput}>
            <LoginTextInput placeholder='Enter e-mail' />
          </div>

          <div className={styles.passwordInput}>
            <LoginTextInput placeholder='Enter password' />
          </div>

          <div className={styles.loginButton}>Login</div>

          <div className={styles.optionsContainer}>
            <div className={styles.rememberMe}>
              <div
                className={styles.checkbox}
                onClick={() => setCheckbox(!checkbox)}
              >
                {checkbox == false ? (
                  <Image src={unchecked} alt='Checkbox' />
                ) : null}
              </div>

              <div className={styles.text}>
                Remember this machinhe for 30 days
              </div>
            </div>

            <div
              className={styles.forgot}
              onClick={() => window.open('/forgot', '_self')}
            >
              Forgot?
            </div>
          </div>

          <div className={styles.createAccount}>
            Not a member?{' '}
            <span onClick={() => window.open('/register', '_self')}>
              Create Account
            </span>
          </div>
        </div>
      </div>

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