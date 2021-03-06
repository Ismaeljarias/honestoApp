import MainLayout from '../../layouts/MainLayout'
import styles from './teamFeedback.module.css'
import NoFeedback from '../../components/NoFeedback'
import UserCard from '../../components/UserCard'
import FeedbackDetail from '../../components/feedbackDetail'
import { useFeedback } from '../../hooks/useFeedback'
import React from 'react'
import {
  DispatchFeedbackContext,
  FeedbackT,
} from '../../context/FeedbackProvider'

const TeamFeedback = () => {
  const { givenFeedbacks, changeUserFeedback, selectedUserFeedback } =
    useFeedback(false)
  const { dispatch } = React.useContext(DispatchFeedbackContext)

  const [localUserFeedback, setLocalUserFeedback] =
    React.useState<FeedbackT | null>(null)
  const contentLoaded = React.useRef(false)

  React.useEffect(() => {
    contentLoaded.current = true

    if (!selectedUserFeedback) {
      setLocalUserFeedback(givenFeedbacks[0])
      if (localUserFeedback?.read === false) {
        dispatch({
          action: 'read',
          payload: localUserFeedback,
        })
      }
    } else {
      setLocalUserFeedback(selectedUserFeedback)
    }
  }, [dispatch, givenFeedbacks, localUserFeedback, selectedUserFeedback])

  if (!contentLoaded.current)
    return (
      <MainLayout loggedIn>
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
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
            <div className={styles.users}>
              <h4 className={styles.userText}>Feedback Received</h4>
              <ul className={styles.userList}>
                {givenFeedbacks.map((feedback, index) => {
                  return (
                    <React.Fragment key={`TeamFeedback-${index}`}>
                      <UserCard
                        index={index}
                        feedback={feedback}
                        isFrom={true}
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

export default TeamFeedback
