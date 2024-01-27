import Image from 'next/image'
import { useState } from 'react'

import LoginTextInput from '@/components/Reutilizables/LoginTextInputs'

import styles from './styles.module.scss'

import hyperlogo from '@/public/assets/brand/LogoHyperverse.svg'
import discord from '@/public/assets/discord2.svg'
import twitter from '@/public/assets/twitter2.svg'
import { useRouter } from 'next/router'
import { register } from '@/utils'

const RegisterPage = () => {

  const router = useRouter()
  const { referralCode } = router.query

  const [nickError, setNickError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passError, setPassError] = useState(false)
  const [passError2, setPassError2] = useState(false)
  const [nick, setNick] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = () => {
    if (process.env.API_URL) {
      if (password === password2) {
        // check if name, email or password is empty
        if (nick === '') {
          setNickError(!nickError)
          setTimeout(() => setNickError(false), 2000)
        } if(email === '') {
          setEmailError(!emailError)
          setTimeout(() => setEmailError(false), 2000)
        } if (password === '') {
          setPassError(!passError)
          setTimeout(() => setPassError(false), 2000)
        } if (!validateEmail(email)) {
          setEmailError(!emailError)
          setTimeout(() => setEmailError(false), 2000)
        } else {
          register(nick, email, password, process.env.API_URL, (referralCode ? referralCode : undefined) as string)
          .then(
            (response) => {
              if (response.status === 201) {
                window.open('/', '_self')
              }
            })
          .catch(
            (error) => {
              if (error.response.status === 500) {
                alert('The server seems to be offline. Please try again later.')
              }
            })
        }
      } else {
        setPassError(!passError)
        setPassError2(!passError2)
        setTimeout(() => setPassError(false), 2000)
        setTimeout(() => setPassError2(false), 2000)
      }
    }
  }

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
              <LoginTextInput error={nickError} isPassword={false} placeholder='Enter Nickname' value={nick} onChange={(e) => setNick(e.target.value)} />
            </div>

            <div className={styles.emailInput}>
              <LoginTextInput error={emailError} isPassword={false} placeholder='Enter e-mail' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className={styles.passwordInput}>
            <LoginTextInput error={passError} isPassword={true} placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className={styles.passwordInput}>
            <LoginTextInput error={passError2} isPassword={true} placeholder='Enter password again' value={password2} onChange={(e) => setPassword2(e.target.value)}/>
            </div>

            <div className={styles.loginButton} onClick={handleSubmit}>Create Account</div>

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