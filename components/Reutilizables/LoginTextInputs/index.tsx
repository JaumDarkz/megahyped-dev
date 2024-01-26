import { useState } from 'react'
import styles from './styles.module.scss'

interface Props {
  placeholder: string,
  isPassword: boolean,
  error: boolean
}

const LoginTextInput = ({placeholder, isPassword, error}:Props) => {
  return (
    <div className={styles.container}>
      <input className={error == false ? styles.noError : styles.error} type={isPassword ? 'password' : 'text'} placeholder={placeholder} />
    </div>
  )
}

export default LoginTextInput