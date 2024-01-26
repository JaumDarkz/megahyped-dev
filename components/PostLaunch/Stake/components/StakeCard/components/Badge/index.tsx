import styles from './styles.module.scss'

interface Props {
  rarity: string,
  quantity: number,
  chance: string
}

const Badge = ({rarity, quantity, chance}: Props) => {
  return (
    <div className={styles.container}>
      <div className={rarity == 'mythic' ? styles.numMythic : rarity == 'legendary' ? styles.numLegendary : rarity == 'epic' ? styles.numEpic : rarity == 'uncommon' ? styles.numUncommon : rarity == 'rare' ? styles.numRare : rarity == 'common' ? styles.numCommon : ''}>
        {quantity}
      </div>

      <div className={rarity == 'mythic' ? styles.mythic : rarity == 'legendary' ? styles.legendary : rarity == 'epic' ? styles.epic : rarity == 'uncommon' ? styles.uncommon : rarity == 'rare' ? styles.rare : rarity == 'common' ? styles.common : ''}>
        {rarity.toUpperCase()} ({chance})
      </div>
    </div>
  )
}

export default Badge