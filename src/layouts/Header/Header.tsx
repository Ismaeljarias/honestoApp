import { NavLink } from 'react-router-dom'
import styles from './header.module.css'
import * as React from 'react'
import {
  AccountContext,
  DispatchAccountContext,
} from '../../context/AccountProvider'
import { FeedbackContext } from '../../context/FeedbackProvider'

const Header = () => {
  const currentUser = React.useContext(AccountContext)
  const logoutUser = React.useContext(DispatchAccountContext)
  const feedbacks = React.useContext(FeedbackContext)

  const unreadFeedbacks = React.useMemo(() => {
    return feedbacks
      ? feedbacks.filter(
          (feedback) => feedback.to.id === currentUser?.id && !feedback.read,
        ).length
      : 0
  }, [currentUser?.id, feedbacks])

  console.log('current user', currentUser)

  const handleLogout = () => {
    logoutUser({ action: 'logout' })
  }

  return (
    <div className={styles.header}>
      <h1>Honesto</h1>
      <NavLink to="/share-feedback" activeClassName={styles.active}>
        Share Feedback
      </NavLink>
      <NavLink exact to="/my-feedback" activeClassName={styles.active}>
        My Feedback
      </NavLink>
      <NavLink
        exact
        to="/team-feedback"
        activeClassName={styles.active}
        className={styles.navlink}
      >
        {!!unreadFeedbacks && (
          <span className={styles.badge}>{unreadFeedbacks}</span>
        )}
        <span>Team Feedback</span>
      </NavLink>
      <span className={styles.spacer} />
      <NavLink exact to="/" onClick={handleLogout}>
        Logout {currentUser && `${currentUser.name}`}
      </NavLink>
    </div>
  )
}
export default Header
