import { useState } from 'react'
import Image from 'next/image'
import rightarrow from '@/public/assets/rightarrow.svg'
import styles from './styles.module.scss'

const images = [
  '1.svg',
  '2.svg',
  '3.svg',
  '4.svg',
  '5.svg',
  '6.svg',
  '7.svg',
  '8.svg',
  '9.svg',
]

const LitePaperComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prevIndex: number) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex: number) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const handleLeftEdgeClick = () => {
    handlePrev()
  }

  const handleRightEdgeClick = () => {
    handleNext()
  }

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div onClick={() => window.open('/', '_self')}>
          <Image src={rightarrow} alt='Quit' className={styles.backArrow} />
        </div>
      </div>
      
      <div className={styles.invisibleLeftEdge} onClick={handleLeftEdgeClick}></div>
      <div className={styles.invisibleRightEdge} onClick={handleRightEdgeClick}></div>

      <div className={styles.contentContainer}>
        <div className={styles.galleryContainer}>
          <div className={styles.imageContainer}>
            <img src={`/liteimages/${images[currentIndex]}`} alt={`Image ${currentIndex + 1}`} />
          </div>

          <div className={styles.pagination}>
            <div onClick={handlePrev}><Image src={rightarrow} alt='Quit' className={styles.leftArrow} /></div>
            <span>{currentIndex + 1}</span>
            <div onClick={handleNext}><Image src={rightarrow} alt='Quit' className={styles.rightArrow} /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LitePaperComponent