import styles from './noFeedback.module.css'
import * as React from 'react'

const NoFeedbackToDisplay = () => {
  return (
    <div className={styles.noFeedbackContainer}>
      <h1 className={styles.noFeedbackTitle}>No feedback to display 🔮</h1>
      <p className={styles.noFeedbackSubTitle}>
        There is no feedback to display at this time – check back in a bit!{' '}
      </p>
    </div>
  )
}

export default NoFeedbackToDisplay
