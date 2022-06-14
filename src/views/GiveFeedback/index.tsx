import * as React from 'react'
import { UserContext } from '../../context/UserProvider'
import MainLayout from '../../layouts/MainLayout'
import User from '../../components/User'
import Button from '../../components/Button'
import styles from './giveFeedback.module.css'
import { useHistory } from 'react-router-dom'
import { AccountContext } from '../../context/AccountProvider'
import { FeedbackContext } from '../../context/FeedbackProvider'

const GiveFeedback = () => {
  const users = React.useContext(UserContext)
  const feedbacks = React.useContext(FeedbackContext)
  const currentUser = React.useContext(AccountContext)

  let history = useHistory()

  const usersWithFeedback = React.useMemo(() => {
    return feedbacks
      ? feedbacks
          .filter((feedback) => feedback.from.id === currentUser?.id)
          .map((feedback) => feedback.to.id)
      : []
  }, [currentUser?.id, feedbacks])

  const usersFiltered = React.useMemo(() => {
    return users ? users.filter((user) => user.id !== currentUser?.id) : []
  }, [currentUser?.id, users])

  return (
    <MainLayout loggedIn>
      <div className={styles.wrapper}>
        <h1>Share Feedback</h1>
        {usersFiltered && usersFiltered.length > 0 && (
          <ul className={styles.users}>
            {usersFiltered.map((user) => (
              <li key={user.id} className={styles.user}>
                <User name={user.name} avatarUrl={user.avatarUrl} />
                <span style={{ flex: 1 }} />
                {usersWithFeedback.includes(user.id) ? (
                  <Button
                    customStyle={{ width: 175, padding: '12px 10px' }}
                    onClick={() => {
                      history.push(`/share-feedback/submissions/${user.id}`)
                    }}
                    secondary
                  >
                    View Submissions
                  </Button>
                ) : (
                  <Button
                    customStyle={{ width: 175 }}
                    onClick={() => {
                      history.push(`/share-feedback/user/${user.id}`)
                    }}
                  >
                    Fill out
                  </Button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </MainLayout>
  )
}

export default GiveFeedback
