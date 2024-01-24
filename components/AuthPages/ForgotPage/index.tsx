import Image from 'next/image'
import { useState } from 'react'

import LoginTextInput from '@/components/Reutilizables/LoginTextInputs'

import styles from './styles.module.scss'

import hyperlogo from '@/public/assets/brand/LogoHyperverse.svg'
import discord from '@/public/assets/discord.svg'
import twitter from '@/public/assets/twitter.svg'

const ForgotPage = () => {
  const [resetState, setResetState] = useState(1)
  const [emailConfirmation, setEmailConfirmation] = useState(false)
  const [passConfirmation, setPassConfirmation] = useState(false)

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

            {emailConfirmation &&
              <div className={styles.emailConfirmation}>
                Your e-mail has been sent.
              </div>
            }

            <div className={styles.emailInput}>
              <LoginTextInput error={false} placeholder='Enter e-mail' />
            </div>

            <div onClick={() => {setTimeout( () => setResetState(2), 2000); setEmailConfirmation(true)}} className={styles.loginButton}>Send Confirmation</div>

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
              Enter a new password for your account.
            </div>

            {passConfirmation &&
              <div className={styles.passConfirmation}>
                Your password has been changed with success!
              </div>
            }

            <div className={styles.emailInput}>
              <LoginTextInput error={false} placeholder='Enter New Password' />
            </div>

            <div className={styles.emailInput}>
              <LoginTextInput error={false} placeholder='Re-enter New Password' />
            </div>

            <div onClick={() => {setPassConfirmation(true), setTimeout( () => window.open('/login', '_self'), 2000)}} className={styles.loginButton}>Reset Password</div>

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