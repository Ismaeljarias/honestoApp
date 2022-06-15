import MainLayout from '../../layouts/MainLayout'
import styles from './teamFeedback.module.css'
import NoFeedback from '../../components/NoFeedback'
import UserCard from '../../components/UserCard'
import FeedbackDetail from '../../components/feedbackDetail'
import { useFeedback } from '../../hooks/useFeedback'
import React from 'react'

const TeamFeedback = () => {
  const { givenFeedbacks, changeUserFeedback, selectedUserFeedback } =
    useFeedback(false)

  const contentLoaded = React.useRef(false)

  React.useEffect(() => {
    contentLoaded.current = true
  }, [])

  if (!contentLoaded.current)
    return (
      <MainLayout loggedIn>
        <div style={{ width: 100, display: 'flex', justifyContent: 'center' }}>
          Loading...
        </div>
      </MainLayout>
    )

  return (
    <MainLayout loggedIn>
      {givenFeedbacks && givenFeedbacks.length > 0 ? (
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Team Feedback</h1>
          <div className={styles.feedbackContainer}>
            <UserCard
              isFrom={true}
              givenFeedbacks={givenFeedbacks}
              changeUserFeedback={changeUserFeedback}
              selectedUserFeedback={selectedUserFeedback}
            />
            <div className={styles.userFeedback}>
              <span className={styles.feedbackUserName}>
                {selectedUserFeedback?.from.name}'s Feedback
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

export default TeamFeedback
