import Image from 'next/image'
import { useState } from 'react'

import LoginTextInput from '@/components/Reutilizables/LoginTextInputs'

import styles from './styles.module.scss'

import hyperlogo from '@/public/assets/brand/LogoHyperverse.svg'
import discord from '@/public/assets/discord2.svg'
import twitter from '@/public/assets/twitter2.svg'

const ResetPage = () => {
  const [resetState, setResetState] = useState(1)
  const [emailConfirmation, setEmailConfirmation] = useState(false)
  const [passConfirmation, setPassConfirmation] = useState(false)

  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src={hyperlogo} alt='Logo' width={290} />
      </div>

      

        <div className={styles.loginContainer}>
          <div className={styles.detail}>Megahyped ©️ 2024</div>

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
              <LoginTextInput error={false} isPassword={true} placeholder='Enter New Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className={styles.emailInput}>
              <LoginTextInput error={false} isPassword={true} placeholder='Re-enter New Password' value={password2} onChange={(e) => setPassword2(e.target.value)} />
            </div>

            <div className={styles.loginButton}>Reset Password</div>

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

export default ResetPage