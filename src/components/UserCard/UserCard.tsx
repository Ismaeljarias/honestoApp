import User from '../User/User'
import { FeedbackT } from '../../context/FeedbackProvider'
import classnames from 'classnames'
import styles from './userCard.module.css'

type UserCardProps = {
  givenFeedbacks: FeedbackT[]
  changeUserFeedback: (feedback: FeedbackT) => void
  selectedUserFeedback: FeedbackT | null
  isFrom?: boolean
}

const UserCard = (props: UserCardProps) => {
  const {
    givenFeedbacks,
    selectedUserFeedback,
    isFrom = false,
    changeUserFeedback,
  } = props

  let selectedUserData = isFrom
    ? selectedUserFeedback?.from.id
    : selectedUserFeedback?.to.id

  const handleUserChange = (feedback: FeedbackT) => {
    changeUserFeedback(feedback)
  }

  return (
    <div className={styles.users}>
      <h4 className={styles.userText}>Feedback given</h4>
      <ul className={styles.userList}>
        {givenFeedbacks.map((feedback, index) => {
          let feedbackData = !isFrom ? feedback.to.id : feedback.from.id

          return (
            <li key={`feedback-${index}`}>
              <button
                className={classnames(styles.userButton, {
                  [styles.activeUser]: selectedUserData === feedbackData,
                })}
                onClick={() => handleUserChange(feedback)}
              >
                <User
                  key={feedback.to.id}
                  name={feedback.to.name}
                  avatarUrl={feedback.to.avatarUrl}
                  newFeedback={!feedback.read}
                />
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default UserCard
