import { FeedbackT } from '../../context/FeedbackProvider'
import ScaleQuestion from '../ScaleQuestion/ScaleQuestion'

import styles from './feedbackDetail.module.css'

type feedbackDetialProps = {
  selectedUserFeedback: FeedbackT | null
}

const FeedbackDetail = (props: feedbackDetialProps) => {
  const { selectedUserFeedback } = props

  return (
    <ul className={styles.questions}>
      {selectedUserFeedback?.questionAnswers.map((questionAnswer) => (
        <li key={`${questionAnswer.questionId}`} className={styles.question}>
          <span className={styles.questionLabel}>
            {questionAnswer.questionLabel}
          </span>
          <div className={styles.questionAnswerContainer}>
            {questionAnswer.answer === null ? (
              <span className={styles.skipped}>SKIPPED</span>
            ) : questionAnswer.questionType === 'scale' ? (
              <ScaleQuestion displayData={true} value={questionAnswer.answer} />
            ) : questionAnswer.questionType === 'text' ||
              questionAnswer.questionType === 'multipleChoice' ? (
              <span className={styles.questionLabel}>
                {questionAnswer.answer}
              </span>
            ) : (
              <span>Invalid Answer</span>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default FeedbackDetail
