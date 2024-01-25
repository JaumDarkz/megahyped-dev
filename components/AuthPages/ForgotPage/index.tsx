import Image from 'next/image'
import { useState } from 'react'

import LoginTextInput from '@/components/Reutilizables/LoginTextInputs'

import styles from './styles.module.scss'

import hyperlogo from '@/public/assets/brand/LogoHyperverse.svg'
import discord from '@/public/assets/discord.svg'
import twitter from '@/public/assets/twitter.svg'
import musicicon from '@/public/assets/sound.svg'
import muteicon from '@/public/assets/mute.svg'

const ForgotPage = () => {
  const [resetState, setResetState] = useState(3)
  const [emailConfirmation, setEmailConfirmation] = useState(false)
  const [passConfirmation, setPassConfirmation] = useState(false)
  const [audio, setAudio] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image src={hyperlogo} alt='Logo' width={190} />

        <div className={styles.sound} onClick={() => setAudio(!audio)}>
          <Image className={styles.img} src={audio == false ? musicicon : muteicon} alt='Sound' />
        </div>
      </div>

      {resetState == 1 ?
        <div className={styles.loginContainer}>

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

        : resetState == 2 ?

        <div className={styles.loginContainer}>
          <div className={styles.loginBox}>
            <div className={styles.title}>Check e-mail!</div>

            <div className={styles.description}>
              We have sent the reset email to <br />
              <span style={{color: '#FF2673'}}>{'youremailaccount@gmail.com'}</span>
            </div>

            <div className={styles.createAccount}>
              <span onClick={() => window.open('/login', '_self')}>
                Back to Login Page
              </span>
            </div>
          </div>
        </div>

        : resetState == 3 ? 

        <div className={styles.loginContainer}>
          <div className={styles.loginBox}>
            <div className={styles.title}>Choose new password!</div>

            <div className={styles.description}>
              Almost done. Enter your new password and you&apos;re all set.
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

            <div onClick={() => {setPassConfirmation(true), setTimeout( () => setResetState(4), 2000)}} className={styles.loginButton}>Reset Password</div>

            <div className={styles.createAccount}>
              <span onClick={() => window.open('/login', '_self')}>
                Back to Login Page
              </span>
            </div>
          </div>
        </div>

        :

        <div className={styles.loginContainer}>
          <div className={styles.loginBox}>
            <div className={styles.title}>Reset complete!</div>

            <div className={styles.description}>
              All done successfully! Return to login.
            </div>

            <div className={styles.createAccount}>
              <span onClick={() => window.open('/login', '_self')}>
                Back to Login Page
              </span>
            </div>
          </div>
        </div>
      }

      <div className={styles.rightsContainer}>
        <div className={styles.option}>Privacy and Cookies</div>
        <span>|</span>
        <div className={styles.text}>Megahyped ©️ 2024</div>
      </div>
    </div>
  )
}

export default ForgotPage