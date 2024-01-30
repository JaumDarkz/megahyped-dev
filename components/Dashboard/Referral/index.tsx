import { useEffect, useState } from 'react'
import Image from 'next/image'

import Sidebar from '@/components/Reusable/Sidebar'

import styles from './styles.module.scss'

import mhtoken from '@/public/assets/mhtoken.png'
import soundicon from '@/public/assets/sound.svg'
import muteicon from '@/public/assets/mute.svg'
import copyicon from '@/public/assets/copyicon.png'
import global from '@/public/assets/global.png'
import AudioPlayer from 'react-audio-player'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { getUserData, getReferrals, getReferralRanking, getGlobalHash, getStakes } from '@/utils'

const ReferralPage = () => {
  const [audio, setAudio] = useState(false)
  const [copyModal, setCopyModal] = useState(false)
  const [referral, setReferral] = useState<string>('')
  const [totalUniqueReferrals, setTotalUniqueReferrals] = useState<number>(0)
  const [totalExtraReferrals, setTotalExtraReferrals] = useState<number>(0)
  const [userName, setUserName] = useState<string>('')
  const [referralRanking, setReferralRanking] = useState<any>([])
  const [currentPosition, setCurrentPosition] = useState<number>(0)
  const [airdropValue, setAirdropValue] = useState(0)
  const [myMiningPower, setMyMiningPower] = useState(0)
  const [globalHash, setGlobalHash] = useState(0)
  const [ userMail, setUserMail ] = useState('')

  useEffect(() => {
    if (!process.env.API_URL) return
    getUserData(process.env.API_URL).then(
      (response) => {
        // set referral as root website url + /signup?referralCode= + referral code

        setReferral(window.location.origin + '/register?referralCode=' + response.data.referralCode)
        setUserName(response.data.name)
        setAirdropValue(response.data.AirdropValue)
        setUserMail(response.data.email)

        //setReferral(response.data.referralCode)
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
    getReferrals(process.env.API_URL).then(
      (response) => {
        setTotalUniqueReferrals(response.data.count)
        setTotalExtraReferrals(response.data.totalReferralPoints)
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
    getReferralRanking(process.env.API_URL).then(
      (response) => {
        setReferralRanking(response.data.ranking)
        setCurrentPosition(response.data.currentUserPosition)
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
    getGlobalHash(process.env.API_URL).then(
      (response) => {
        setGlobalHash(response.data)
      }).catch(
        (error) => {
          console.log(error)
        }
      )
  }, [])

  useEffect(() => {
    if (!process.env.API_URL) return
    getStakes(process.env.API_URL, userMail).then(
      (response) => {
        // sum all hashes from assets
        const allHashes = response.data.reduce((acc, asset) => acc + asset.hashRate, 0)
        if (!process.env.DAILY_REWARDS) return
        setMyMiningPower(parseInt(process.env.DAILY_REWARDS)*(allHashes/globalHash))
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
  } , [userMail])

  const buttonStyles = {
    width: 'fit-content',
    height: '45px',
    padding: '12px 14px',
    borderRadius: '12px',
    border: '2px solid #000',
    background: '#BBF209',
    boxShadow: '4px 4px 0px 0px #000',
    color: '#000',
    fontFamily: 'Consolas',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal',
    letterSpacing: '-0.05px',
    transition: '0.3s',
    '&:hover': {
      filter: 'brightness(0.75)',
    },
  }

  useEffect(() => {
    if (copyModal == true) {
      setTimeout(() => setCopyModal(false), 3000)
    }
  }, [copyModal])

  const referralLink = referral
  const handleCopyClick = () => {
    navigator.clipboard.writeText(referralLink)
      .then(() => {
        null
      })
      .catch(err => {
        console.error('Error to copy:', err)
      })

    setCopyModal(true)
  }

  return (
    <>
      {copyModal &&
        <div className={styles.copyModal}>
          <div className={styles.message}>
            Copied to Clipboard!
          </div>
        </div>
      }
      {audio && (
        <AudioPlayer
          src="./main.mp3"
          autoPlay
        />
      )}

      <div className={styles.container}>
        <div className={styles.sidebarContainer}>
          <Sidebar />
        </div>

        <div className={styles.referralContainer}>
          <div className={styles.header}>
            <div className={styles.coinInfo}>
              <div className={styles.info}>
                <div className={styles.icon}>
                  <Image src={mhtoken} alt='Token' style={{ width: '42px', height: '42px' }} />
                </div>

                <div className={styles.text}>
                  MHT AIRDROP: <span>{airdropValue}</span>
                </div>
              </div>

              <div className={styles.info}>
                <div className={styles.icon}>
                  <Image src={mhtoken} alt='Token' style={{ width: '42px', height: '42px' }} />
                </div>

                <div className={styles.text}>
                  MINING POWER: <span>{myMiningPower} $MHT/day</span>
                </div>
              </div>

              <div className={styles.info}>
                <div className={styles.icon}>
                  <Image src={global} alt='Hash' style={{ width: '42px', height: '42px' }} />
                </div>

                <div className={styles.text}>
                  GLOBAL HASH RATE: <span>{globalHash}</span>
                </div>
              </div>
            </div>

            <div className={styles.buttons}>
              <WalletMultiButton style={buttonStyles} />

              <div className={styles.sound} onClick={() => setAudio(!audio)}>
                <Image className={styles.img} src={audio == false ? muteicon : soundicon} alt='Sound' />
              </div>
            </div>
          </div>

          <div className={styles.referralLink}>
            <div className={styles.text}>
              Your Referral Link Is
            </div>

            <div className={styles.linkContainer}>
              <div className={styles.link}>
                {referralLink}
              </div>

              <div className={styles.icon} onClick={handleCopyClick}>
                <Image onClick={() => setCopyModal(true)} src={copyicon} alt='Copy' style={{ width: '14px', height: '16px' }} className={styles.img} />
              </div>
            </div>
          </div>

          <div className={styles.referralInfo}>
            <div className={styles.infoContainer}>
              <div className={styles.label}>
                {totalUniqueReferrals} Referrals
              </div>

              <div className={styles.data}>
                {totalUniqueReferrals} Points
              </div>
            </div>

            <div className={styles.infoContainer}>
              <div className={styles.label}>
                Extra Point for Referrals Staking
              </div>

              <div className={styles.data}>
                {totalExtraReferrals} Points
              </div>
            </div>

            <div className={styles.infoContainer}>
              <div className={styles.label}>
                Total
              </div>

              <div className={styles.data}>
                {totalUniqueReferrals + totalExtraReferrals} Points
              </div>
            </div>
          </div>

          <div className={styles.referralInfo}>
            <div className={styles.infoContainer}>
              <div className={styles.label}>
                My rank
              </div>
            </div>

            <div className={styles.dotInfoContainer}>
              <div className={styles.label}>
                Top {currentPosition} - {userName}
              </div>

              {/*<div className={styles.line} />*/}

              <div className={styles.data}>
                {totalUniqueReferrals + totalExtraReferrals} Points
              </div>
            </div>
          </div>

          <div className={styles.referralRanking}>
            <div className={styles.title}>
              Top 50
            </div>

            {referralRanking.map((user: any, index: number) => {
              return (
                <div className={styles.position} key={index}>
                  <div className={styles.user}>
                    Top {index + 1} - {user.name}
                  </div>

                  {/*<div className={styles.line} />*/}

                  <div className={styles.points}>
                    {user.total} Points
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default ReferralPage