import Image from 'next/image'
import { useState } from 'react'

import LoginTextInput from '@/components/Reusable/LoginTextInputs'

import styles from './styles.module.scss'

import hyperlogo from '@/public/assets/brand/LogoHyperverse.svg'
import musicicon from '@/public/assets/sound.svg'
import muteicon from '@/public/assets/mute.svg'
import discord from '@/public/assets/discord2.svg'
import twitter from '@/public/assets/twitter2.svg'
import { recoverPassword } from '@/utils/index'

const ForgotPage = () => {
  const [resetState, setResetState] = useState(3)
  const [emailConfirmation, setEmailConfirmation] = useState(false)
  const [passConfirmation, setPassConfirmation] = useState(false)
  const [audio, setAudio] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleRedefinePass = () => {
    if(process.env.API_URL) {
      setIsLoading(true)
      recoverPassword(process.env.API_URL, email)
        .then((response) => {
          if (response.status === 201) {
            setEmailConfirmation(true)
            setIsLoading(false)
          }
        })
        .catch((error) => {
          setEmailError(true)
          setIsLoading(false)
        })
    } else {
      alert('The server is not available. Please try again later.')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image src={hyperlogo} alt='Logo' width={190} />

        <div className={styles.sound} onClick={() => setAudio(!audio)}>
          <Image className={styles.img} src={audio == false ? musicicon : muteicon} alt='Sound' />
        </div>
      </div>

        <div className={styles.loginContainer}>
          <div className={styles.detail}>Megahyped ©️ 2024</div>

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
            <LoginTextInput error={emailError} isPassword={false} placeholder='Enter mail' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div onClick={handleRedefinePass} className={`${styles.loginButton} ${isLoading ? styles.loading : ''}`}>Send Confirmation</div>

            <div className={styles.createAccount}>
              <span onClick={() => window.open('/', '_self')}>
                Back to Login Page
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
          <Image src={discord} alt='Discord' className={styles.img} style={{ width: '24px', height: '18.18px'}} />
        </div>

        <div
          className={styles.social}
          onClick={() =>
            window.open('https://twitter.com/MegaHypedDAO', '_blank')
          }
        >
          <Image src={twitter} alt='Twitter' className={styles.img} style={{ width: '24px', height: '24px'}} />
        </div>
      </div>

      <div className={styles.rightsContainer}>
        {/* <div className={styles.option}>Privacy and Cookies</div>
        <span>|</span> */}
        <div className={styles.text}>Megahyped ©️ 2024</div>
      </div>
    </div>
  )
}

export default ForgotPage