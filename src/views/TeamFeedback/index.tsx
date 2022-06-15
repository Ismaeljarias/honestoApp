import MainLayout from '../../layouts/MainLayout'
import styles from './teamFeedback.module.css'
import NoFeedback from '../../components/NoFeedback'
import UserCard from '../../components/UserCard'
import FeedbackDetail from '../../components/feedbackDetail'
import { useFeedback } from '../../hooks/useFeedback'
import React from 'react'
import PleaseSelect from '../../components/PleaseSelect'

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
                        selectedUserFeedback={selectedUserFeedback}
                      />
                    </React.Fragment>
                  )
                })}
              </ul>
            </div>
            <div className={styles.userFeedback}>
              {selectedUserFeedback ? (
                <>
                  <span className={styles.feedbackUserName}>
                    {selectedUserFeedback &&
                      `${selectedUserFeedback?.from.name} 's Feedback`}
                  </span>
                  <FeedbackDetail selectedUserFeedback={selectedUserFeedback} />
                </>
              ) : (
                <PleaseSelect />
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
