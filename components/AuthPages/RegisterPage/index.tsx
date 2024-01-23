import Image from 'next/image'
import { useState } from 'react'

import LoginTextInput from '@/components/Reutilizables/LoginTextInputs'

import styles from './styles.module.scss'

import hyperlogo from '@/public/assets/brand/LogoHyperverse.svg'
import discord from '@/public/assets/discord.svg'
import twitter from '@/public/assets/twitter.svg'
import musicicon from '@/public/assets/sound.svg'
import comingsoonart from '@/public/assets/comingsoonart.svg'
import litepaper from '@/public/assets/litepaper.svg'
import unchecked from '@/public/assets/checkboxnotchecked.svg'
import audionotchecked from '@/public/assets/checkboxchecked.svg'

const RegisterPage = () => {
  const [checkbox, setCheckbox] = useState(false)
  const [audio, setAudio] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <div className={styles.logo}>
          <Image src={hyperlogo} alt='Logo' width={290} />
        </div>

        <div className={styles.loginContainer}>
          <div className={styles.detail}>Lorem ipsum dolor sit amet</div>

          <div className={styles.loginBox}>
            <div className={styles.title}>Register account</div>

            <div className={styles.description}>
              Enter your credentials to register your account.
            </div>

            <div className={styles.emailInput}>
              <LoginTextInput placeholder='Enter e-mail' />
            </div>

            <div className={styles.passwordInput}>
              <LoginTextInput placeholder='Enter password' />
            </div>

            <div className={styles.passwordInput}>
              <LoginTextInput placeholder='Re-Enter password' />
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

      <div className={styles.rightContainer}>
        <div className={styles.soundContainer}>
          <div className={styles.sound} onClick={() => setAudio(!audio)}>
          <Image className={styles.img} src={audio == false ? musicicon : audionotchecked} alt='Music' />
          </div>
        </div>

        <div className={styles.rightSide}>
          <div className={styles.boxContainer}>
            <div className={styles.title}>Lorem ipsum dolor sit amet.</div>
            <div className={styles.description}>
              Lorem ipsum dolor sit amet. Sed atque libero ut sint dolorum eos
              placeat voluptate qui fugiat ratione!
            </div>
            <div className={styles.comingSoon}>
              <Image className={styles.img} src={comingsoonart} alt='Coming Soon...' fill={true} />
            </div>

            <div className={styles.description}>
              Lorem ipsum dolor sit amet. Sed atque libero ut sint dolorum eos
              placeat voluptate qui fugiat ratione! Eos harum libero sed fugiat
              voluptatem ut eaque odit ut modi sint qui quisquam voluptatem et
              labore debitis.
            </div>
            <div className={styles.button}>
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

export default RegisterPage