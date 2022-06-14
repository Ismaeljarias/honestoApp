import * as React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../components/Button'
import User from '../../components/User'
import { AccountContext } from '../../context/AccountProvider'
import { FeedbackContext } from '../../context/FeedbackProvider'
import { UserContext } from '../../context/UserProvider'
import MainLayout from '../../layouts/MainLayout'
import styles from './thankYouForSharingFeedback.module.css'

const ThankYouForSharingFeedback = () => {
  const users = React.useContext(UserContext)
  const feedbacks = React.useContext(FeedbackContext)
  const currentUser = React.useContext(AccountContext)
  const history = useHistory()

  const firstThreeUsersWithoutFeedback = React.useMemo(() => {
    return users
      ? users
          .filter((user) => {
            const findUserFeedback = feedbacks
              ? feedbacks.find(
                  (feedback) =>
                    feedback.from.id === currentUser?.id &&
                    feedback.to.id === user.id,
                )
              : false
            return !findUserFeedback && user.id !== currentUser?.id
          })
          .slice(0, 3)
      : []
  }, [currentUser?.id, feedbacks, users])

  return (
    <MainLayout loggedIn>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Thank you for sharing your feedback!</h1>
        <h4 className={styles.info}>
          Continue to give feedback to other team members.
        </h4>
        {firstThreeUsersWithoutFeedback &&
          firstThreeUsersWithoutFeedback.length > 0 && (
            <ul className={styles.users}>
              {firstThreeUsersWithoutFeedback.map((user) => (
                <li key={user.id} className={styles.user}>
                  <User name={user.name} avatarUrl={user.avatarUrl} />
                  <span style={{ flex: 1 }} />
                  <Button
                    onClick={() => {
                      history.push(`/share-feedback/user/${user.id}`)
                    }}
                  >
                    Fill out
                  </Button>
                </li>
              ))}
            </ul>
          )}
      </div>
    </MainLayout>
  )
}

export default ThankYouForSharingFeedback
