import Image from 'next/image'
import { useState } from 'react'

import LoginTextInput from '@/components/Reutilizables/LoginTextInputs'

import styles from './styles.module.scss'

import hyperlogo from '@/public/assets/brand/LogoHyperverse.svg'
import discord from '@/public/assets/discord.svg'
import twitter from '@/public/assets/twitter.svg'
import musicicon from '@/public/assets/sound.svg'
import muteicon from '@/public/assets/mute.svg'

const RegisterPage = () => {
  const [audio, setAudio] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div />

        <div className={styles.logo}>
          <Image src={hyperlogo} alt='Logo' width={290} />
        </div>

        <div className={styles.sound} onClick={() => setAudio(!audio)}>
          <Image className={styles.img} src={audio == false ? musicicon : muteicon} alt='Sound' />
        </div>
      </div>

      <div className={styles.leftSide}>
        <div className={styles.loginContainer}>
          <div className={styles.detail}>Lorem ipsum dolor sit amet</div>

          <div className={styles.loginBox}>
            <div className={styles.title}>Register account</div>

            <div className={styles.description}>
              Enter your credentials to register your account.
            </div>

            <div className={styles.userInput}>
              <LoginTextInput error={false} placeholder='Enter username ' />
            </div>

            <div className={styles.emailInput}>
              <LoginTextInput error={false} placeholder='Enter e-mail' />
            </div>

            <div className={styles.passwordInput}>
              <LoginTextInput error={false} placeholder='Enter password' />
            </div>

            <div className={styles.passwordInput}>
              <LoginTextInput error={true} placeholder='Re-Enter password' />
            </div>

            <div className={styles.loginButton}>Register</div>

            <div className={styles.loginAccount}>
              Currently a member?{' '}
              <span onClick={() => window.open('/login', '_self')}>
                Login to Account
              </span>
            </div>
          </div>
        </div>

        <div className={styles.rightsContainer}>
          <div className={styles.option}>Privacy and Cookies</div>
          <span>|</span>
          <div className={styles.text}>Megahyped ©️ 2024</div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage