import { useState } from 'react'
import styles from './styles.module.scss'

interface Props {
  placeholder: string,
  isPassword: boolean,
  error: boolean,
  value: string,
  onChange: (e: any) => void
  onKeyPress?: (e: any) => void
}

const LoginTextInput = ({placeholder, isPassword, error, value, onChange, onKeyPress}:Props) => {
  return (
    <div className={styles.container}>
      <input className={error == false ? styles.noError : styles.error} type={isPassword ? 'password' : 'text'} placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyPress}/>
    </div>
  )
}

export default LoginTextInput