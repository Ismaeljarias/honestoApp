import * as React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../components/Button'
import MainLayout from '../../layouts/MainLayout'
import styles from './notFoundPage.module.css'

const NotFoundPage = () => {
  const history = useHistory()

  const handleBackToShareFeedback = React.useCallback(() => {
    history.push('/share-feedback')
  }, [history])

  return (
    <MainLayout loggedIn>
      <div className={styles.container}>
        <p className={styles.errorCode}>404</p>
        <p className={styles.title}>
          Sorry, the URL you have used may be incorrect. 😢
        </p>
        <Button
          onClick={handleBackToShareFeedback}
          customStyle={{ marginTop: 39, padding: '11px 22px' }}
        >
          Back to Share Feedback
        </Button>
      </div>
    </MainLayout>
  )
}

export default NotFoundPage
