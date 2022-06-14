import * as React from 'react'
import { AccountContext } from '../../context/AccountProvider'
import { FeedbackContext, FeedbackT } from '../../context/FeedbackProvider'
import MainLayout from '../../layouts/MainLayout'
import styles from './userFeedback.module.css'
import NoFeedback from '../../components/NoFeedback'
import UserCard from '../../components/UserCard'
import FeedbackDetail from '../../components/feedbackDetail'

const UserFeedback = () => {
  const feedbacks = React.useContext(FeedbackContext)
  const currentUser = React.useContext(AccountContext)

  const [givenFeedbacks, setGivenFeedbacks] = React.useState<FeedbackT[]>([])

  const [selectedUserFeedback, setSelectedUserFeedback] =
    React.useState<FeedbackT | null>(null)

  React.useEffect(() => {
    const filteredFeedbacks = feedbacks?.filter(
      (feedback) => feedback.from.id === currentUser?.id,
    )
    setGivenFeedbacks(filteredFeedbacks ? filteredFeedbacks : [])
    setSelectedUserFeedback(
      filteredFeedbacks && filteredFeedbacks.length > 0
        ? filteredFeedbacks[0]
        : null,
    )
  }, [currentUser?.id, feedbacks])

  const changeUserFeedback = React.useCallback((feedback: FeedbackT) => {
    setSelectedUserFeedback(feedback)
  }, [])

  return (
    <MainLayout loggedIn>
      {givenFeedbacks && givenFeedbacks.length > 0 ? (
        <div className={styles.wrapper}>
          <h1 className={styles.title}>My Feedback</h1>
          <div className={styles.feedbackContainer}>
            <UserCard
              givenFeedbacks={givenFeedbacks}
              changeUserFeedback={changeUserFeedback}
              selectedUserFeedback={selectedUserFeedback}
            />
            <div className={styles.userFeedback}>
              <span className={styles.feedbackUserName}>
                {selectedUserFeedback?.to.name}'s Feedback
              </span>
              {selectedUserFeedback &&
                selectedUserFeedback.questionAnswers.length > 0 && (
                  <FeedbackDetail selectedUserFeedback={selectedUserFeedback} />
                )}
            </div>
          </div>
        </div>
      ) : (
        <NoFeedback />
      )}
    </MainLayout>
  )
}

export default UserFeedback
