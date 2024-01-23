import styles from './styles.module.scss'

interface Props {
  placeholder: string
}

const LoginTextInput = ({placeholder}:Props) => {
  return (
    <div className={styles.container}>
      <input type="text" placeholder={placeholder} />
    </div>
  )
}

export default LoginTextInput