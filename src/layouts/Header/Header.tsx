import { NavLink } from 'react-router-dom'
import styles from './header.module.css'
import * as React from 'react'
import {
  AccountContext,
  DispatchAccountContext,
} from '../../context/AccountProvider'
import { FeedbackContext } from '../../context/FeedbackProvider'
import Badge from '../../components/Badge'

const Header = () => {
  const currentUser = React.useContext(AccountContext)
  const logoutUser = React.useContext(DispatchAccountContext)
  const feedbacks = React.useContext(FeedbackContext)

  const myFeedbacksCount = React.useMemo(() => {
    return feedbacks
      ? feedbacks.filter(
          (feedback) => feedback.to.id === currentUser?.id && !feedback.read,
        ).length
      : 0
  }, [currentUser?.id, feedbacks])

  const handleLogout = () => {
    logoutUser({ action: 'logout' })
  }
  const initials = currentUser?.name
    .split(' ')
    .map((word) => word[0])
    .join('')

  return (
    <div className={styles.header}>
      <h1>Honesto</h1>
      <NavLink to="/share-feedback" activeClassName={styles.active}>
        Share Feedback
      </NavLink>
      <NavLink exact to="/my-feedback" activeClassName={styles.active}>
        <span>My Feedback</span>
      </NavLink>
      <NavLink
        exact
        to="/team-feedback"
        activeClassName={styles.active}
        className={styles.navlink}
      >
        {!!myFeedbacksCount && <Badge unreadFeedbacks={myFeedbacksCount} />}
        <span>Team Feedback</span>
      </NavLink>
      <span className={styles.spacer} />
      <NavLink exact to="/" onClick={handleLogout}>
        {currentUser?.avatarUrl ? (
          <img
            src={currentUser?.avatarUrl}
            alt="User Avatar"
            className={styles.avatar}
          />
        ) : (
          <span className={styles.avatar}>{initials}</span>
        )}

        <div className={styles.userHeader}>
          <span className={styles.username}>
            {currentUser && `${currentUser.name}`}
          </span>
          <span className={styles.logout}>Logout</span>
        </div>
      </NavLink>
    </div>
  )
}
export default Header
