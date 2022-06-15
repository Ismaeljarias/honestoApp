import * as React from 'react'
import Badge from '../Badge'
import styles from './user.module.css'

type Props = {
  name: string
  avatarUrl?: string
  newFeedback?: boolean
}

const User = (props: Props) => {
  const { name, avatarUrl, newFeedback } = props
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')

  return (
    <div className={styles.user}>
      {avatarUrl ? (
        <img className={styles.avatar} alt={name} src={avatarUrl} />
      ) : (
        <span className={styles.initials}>{initials}</span>
      )}
      {name}
      {newFeedback && <Badge message="New" />}
    </div>
  )
}

export default User
