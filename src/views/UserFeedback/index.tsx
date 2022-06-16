import MainLayout from '../../layouts/MainLayout'
import styles from './userFeedback.module.css'
import NoFeedback from '../../components/NoFeedback'
import UserCard from '../../components/UserCard'
import FeedbackDetail from '../../components/feedbackDetail'
import { useFeedback } from '../../hooks/useFeedback'
import React from 'react'
import { FeedbackT } from '../../context/FeedbackProvider'

const UserFeedback = () => {
  const { givenFeedbacks, changeUserFeedback, selectedUserFeedback } =
    useFeedback(true)

  const [localUserFeedback, setLocalUserFeedback] =
    React.useState<FeedbackT | null>(null)
  const contentLoaded = React.useRef(false)

  React.useEffect(() => {
    contentLoaded.current = true

    if (!selectedUserFeedback) {
      setLocalUserFeedback(givenFeedbacks[0])
    } else {
      setLocalUserFeedback(selectedUserFeedback)
    }
  }, [givenFeedbacks, selectedUserFeedback])

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
          <h1 className={styles.title}>My Feedback</h1>
          <div className={styles.feedbackContainer}>
            <div className={styles.users}>
              <h4 className={styles.userText}>Feedback Received</h4>
              <ul className={styles.userList}>
                {givenFeedbacks.map((feedback, index) => {
                  return (
                    <React.Fragment key={`UserFeedback-${index}`}>
                      <UserCard
                        index={index}
                        feedback={feedback}
                        isFrom={false}
                        changeUserFeedback={changeUserFeedback}
                        selectedUserFeedback={localUserFeedback}
                      />
                    </React.Fragment>
                  )
                })}
              </ul>
            </div>
            <div className={styles.userFeedback}>
              {localUserFeedback && (
                <>
                  <span className={styles.feedbackUserName}>
                    {localUserFeedback &&
                      `${localUserFeedback?.from.name} 's Feedback`}
                  </span>
                  <FeedbackDetail selectedUserFeedback={localUserFeedback} />
                </>
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
