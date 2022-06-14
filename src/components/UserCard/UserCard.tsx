import User from '../User/User'
import { FeedbackT } from '../../context/FeedbackProvider'
import classnames from 'classnames'
import styles from './userCard.module.css'

type UserCardProps = {
  givenFeedbacks: FeedbackT[]
  changeUserFeedback: (feedback: FeedbackT) => void
  selectedUserFeedback: FeedbackT | null
}

const UserCard = (props: UserCardProps) => {
  const { givenFeedbacks, changeUserFeedback, selectedUserFeedback } = props

  return (
    <div className={styles.users}>
      <h4 className={styles.userText}>Feedback given</h4>
      <ul className={styles.userList}>
        {givenFeedbacks.map((feedback, index) => (
          <li key={`feedback-${index}`}>
            <button
              className={classnames(styles.userButton, {
                [styles.activeUser]:
                  selectedUserFeedback?.to.id === feedback.to.id,
              })}
              onClick={() => changeUserFeedback(feedback)}
            >
              <User
                key={feedback.to.id}
                name={feedback.to.name}
                avatarUrl={feedback.to.avatarUrl}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserCard
