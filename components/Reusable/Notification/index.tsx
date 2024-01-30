import styles from './styles.module.scss'

interface Props {
  text: string,
  loadingState: boolean
}

const Notification = ({text, loadingState}:Props) => {
  return (
    <div className={styles.container}>
      {loadingState == false ?
        <div className={styles.message}>
          {text}
        </div>

        :

        <div className={styles.loading}>
          <span>Loading...</span>
        </div>
      }
    </div>
  )
}

export default Notification