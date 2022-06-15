import User from '../User/User'
import { FeedbackT } from '../../context/FeedbackProvider'
import classnames from 'classnames'
import styles from './userCard.module.css'

type UserCardProps = {
  index: any
  feedback: FeedbackT
  changeUserFeedback: (feedback: FeedbackT) => void
  selectedUserFeedback: FeedbackT | null
  isFrom?: boolean
}

const UserCard = (props: UserCardProps) => {
  const {
    index,
    feedback,
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

  let feedbackData = !isFrom ? feedback.to.id : feedback.from.id
  let selectedUserName = isFrom ? feedback.from.name : feedback.to.name
  let selectedUserPic = isFrom ? feedback.from.avatarUrl : feedback.to.avatarUrl

  return (
    <li key={`user-feedback-${index}`}>
      <button
        className={classnames(styles.userButton, {
          [styles.activeUser]: selectedUserData === feedbackData,
        })}
        onClick={() => handleUserChange(feedback)}
      >
        <User
          key={feedbackData}
          name={selectedUserName}
          avatarUrl={selectedUserPic}
          newFeedback={isFrom && !feedback.read}
        />
      </button>
    </li>
  )
}

export default UserCard
