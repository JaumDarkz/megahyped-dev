import styles from './styles.module.scss'

interface Props {
  id: number
  hashRate: number
  rarity: string
}

const Badge = ({ rarity, id, hashRate }: Props) => {
  const formattedRarity = rarity.toLowerCase()

  const getRarityClassName = () => {
    switch (formattedRarity) {
      case 'mythic':
        return styles.mythic
      case 'legendary':
        return styles.legendary
      case 'epic':
        return styles.epic
      case 'uncommon':
        return styles.uncommon
      case 'rare':
        return styles.rare
      case 'common':
        return styles.common
      default:
        return ''
    }
  }

  return (
    <div className={styles.container}>
      <div className={getRarityClassName()}>{formattedRarity.toUpperCase()}</div>
      <div className={styles.idContainer}>Vandal#{id}</div>
      <div className={styles.hashRateContainer}>Hash Rate: {hashRate} $MHT/Day</div>
    </div>
  )
}

export default Badge
