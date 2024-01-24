import { useState } from 'react'
import styles from './styles.module.scss'

interface Props {
  placeholder: string,
  error: boolean
}

const LoginTextInput = ({placeholder, error}:Props) => {
  return (
    <div className={styles.container}>
      <input className={error == false ? styles.noError : styles.error} type="text" placeholder={placeholder} />
    </div>
  )
}

export default LoginTextInput