import styles from './badge.module.css'
import classnames from 'classnames'

type BadgeProps = {
  unreadFeedbacks?: number
  message?: string
}

const Badge = (props: BadgeProps) => {
  const { unreadFeedbacks, message } = props

  return (
    <span
      className={classnames(styles.badge, {
        [styles.message]: !!message,
      })}
    >
      {message ? message : unreadFeedbacks}
    </span>
  )
}

export default Badge
