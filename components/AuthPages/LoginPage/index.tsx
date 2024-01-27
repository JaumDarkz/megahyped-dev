import Image from 'next/image'
import { useState } from 'react'

import LoginTextInput from '@/components/Reusable/LoginTextInputs'

import styles from './styles.module.scss'

import hyperlogo from '@/public/assets/brand/LogoHyperverse.svg'
import discord from '@/public/assets/discord2.svg'
import twitter from '@/public/assets/twitter2.svg'
import musicicon from '@/public/assets/sound.svg'
import comingsoonart from '@/public/assets/comingsoonart.svg'
import litepaper from '@/public/assets/litepaper.svg'
import audionotchecked from '@/public/assets/checkboxchecked.svg'
import { login } from '../../../utils'

import AudioPlayer from 'react-audio-player'

const LoginPage = () => {
  const [audio, setAudio] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passError, setPassError] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin()
      console.log(email, password)
    }
  }

  const handleLogin = () => {
    if (process.env.API_URL) {
      login(email, password, process.env.API_URL)
        .then(
          (response) => {
            if (response.status === 201) {
              const userToken = response.data.accessToken
              localStorage?.setItem('userToken', userToken)
              window.open('/stake', '_self')
            }
          }
        ).catch(
          (error) => {
            if (error.response.status === 404) {
              setEmailError(!emailError)
              // Set a timer to reset emailError to false after 2000ms
              setTimeout(() => setEmailError(false), 2000)
            }
            if (error.response.status === 401) {
              setPassError(!passError)
              // Set a timer to reset passError to false after 2000ms
              setTimeout(() => setPassError(false), 2000)
            }
          }
        )
    } else {
      alert('The server seems to be offline. Please try again later.')
    }
  }



  return (
    <div className={styles.container}>
      {!audio && (
        <AudioPlayer
          src="./main.mp3"
          autoPlay
        />
      )}
      <div className={styles.leftSide}>
        <div className={styles.logo}>
          <Image src={hyperlogo} alt='Logo' width={290} />
        </div>

        <div className={styles.loginContainer}>
          <div className={styles.detail}>Megahyped ©️ 2024</div>

          <div className={styles.loginBox}>
            <div className={styles.title}>Login</div>

            <div className={styles.description}>
              Enter your credentials to access your account.
            </div>

            <div className={styles.emailInput}>
            <LoginTextInput error={emailError} isPassword={false} placeholder='Enter mail' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className={styles.passwordInput}>
              <LoginTextInput error={passError} isPassword={true} placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handleEnter}/>
            </div>

            <div className={styles.loginButton} onClick={handleLogin}>Login</div>

            <div className={styles.optionsContainer}>
              <div className={styles.rememberMe}>
{/*                 <div
                  className={styles.checkbox}
                  onClick={() => setCheckbox(!checkbox)}
                >
                  {checkbox == false ? (
                    <Image src={unchecked} alt='Checkbox' />
                  ) : null}
                </div>

                <div className={styles.text}>
                  Remember this machinhe for 30 days
                </div> */}
              </div>

              <div
                className={styles.forgot}
                onClick={() => window.open('/forgot', '_self')}
              >
                Forgot your password?
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
              window.open('https://discord.com/invite/megahyped', '_blank')
            }
          >
            <Image className={styles.img} src={discord} alt='Discord' style={{ width: '24px', height: '18.18px'}}/>
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

        {/* <div className={styles.rightsContainer}>
          <div className={styles.option}>Privacy and Cookies</div>
          <span>|</span>
          <div className={styles.text}>Megahyped ©️ 2024</div>
        </div> */}
      </div>

      <div className={styles.rightContainer}>
        <div className={styles.soundContainer}>
          <div className={styles.sound} onClick={() => setAudio(!audio)}>
            <Image className={styles.img} src={audio == false ? musicicon : audionotchecked} alt='Music' />
          </div>
        </div>

        <div className={styles.rightSide}>
          <div className={styles.boxContainer}>
            <div className={styles.title}>Hyperverse - The Megahyped Gaming Hub</div>
            <div className={styles.description}>
            Hyperverse is a groundbreaking project poised to revolutionize the gaming industry by introducing a cutting-edge platform known as The Megahyped Gaming Hub!
            </div>
            <div className={styles.comingSoon}>
              <Image className={styles.img} src={comingsoonart} alt='Coming Soon...' fill={true} />
            </div>

            <div className={styles.description}>
            The Hyperverse is designed as a dynamic and inclusive space where gamers can connect, compete, and collaborate in a decentralized environment. Hyperverse envisions a platform that goes beyond traditional gaming hubs by enabling users to truly own and trade in-game assets, ensuring a more equitable and engaging gaming ecosystem.
            </div>
            <div className={styles.button} onClick={() => window.open('./Litepaper_v0.1.pdf', '_blank')}>
              <div className={styles.icon}>
                <Image src={litepaper} alt='Litepaper' className={styles.img} />
              </div>

              <div className={styles.text}>Litepaper</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
