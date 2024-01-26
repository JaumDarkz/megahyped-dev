import Image from 'next/image'
import { useState } from 'react'

import LoginTextInput from '@/components/Reutilizables/LoginTextInputs'

import styles from './styles.module.scss'

import hyperlogo from '@/public/assets/brand/LogoHyperverse.svg'
import discord from '@/public/assets/discord2.svg'
import twitter from '@/public/assets/twitter2.svg'

const RegisterPage = () => {

  const [emailError, setEmailError] = useState(false)
  const [passError, setPassError] = useState(false)
  const [passError2, setPassError2] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <div className={styles.logo}>
          <Image src={hyperlogo} alt='Logo' width={290} />
        </div>

        <div className={styles.loginContainer}>
          <div className={styles.detail}>Megahyped ©️ 2024</div>

          <div className={styles.loginBox}>
            <div className={styles.title}>Register account</div>

            <div className={styles.description}>
              Enter your credentials to register your account.
            </div>

            <div className={styles.emailInput}>
              <LoginTextInput error={false} isPassword={false} placeholder='Enter Nickname' />
            </div>

            <div className={styles.emailInput}>
              <LoginTextInput error={emailError} isPassword={false} placeholder='Enter e-mail' />
            </div>

            <div className={styles.passwordInput}>
              <LoginTextInput error={passError} isPassword={true} placeholder='Enter password' />
            </div>

            <div className={styles.passwordInput}>
              <LoginTextInput error={passError2} isPassword={true} placeholder='Re-Enter password' />
            </div>

            <div className={styles.loginButton}>Create Account</div>

            <div className={styles.loginAccount}>
              Currently a member?{' '}
              <span onClick={() => window.open('/', '_self')}>
                Login to Account
              </span>
            </div>
          </div>
        </div>

        <div className={styles.socialContainer}>
          <div
            className={styles.social}
            onClick={() =>
              window.open('https://discord.com/invite/megahyped', '_blank')
            }
          >
            <Image src={discord} alt='Discord' className={styles.img} style={{ width: '24px', height: '18.18px'}}/>
          </div>

          <div
            className={styles.social}
            onClick={() =>
              window.open('https://twitter.com/MegaHypedDAO', '_blank')
            }
          >
            <Image src={twitter} alt='Twitter' className={styles.img} style={{ width: '24px', height: '24px'}}/>
          </div>
        </div>

        <div className={styles.rightsContainer}>
{/*           <div className={styles.option}>Privacy and Cookies</div>
          <span>|</span> */}
          <div className={styles.text}>Megahyped ©️ 2024</div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage