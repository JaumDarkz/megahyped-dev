import styles from './styles.module.scss'

interface Props {
  id: string
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
      <div className={styles.idContainer}>{id}</div>
      <div className={styles.hashRateContainer}>{hashRate.toFixed(2)} $MHT/Day</div>
    </div>
  )
}

export default Badge
