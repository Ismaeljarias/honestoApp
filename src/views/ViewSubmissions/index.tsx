import * as React from 'react'
import { AiOutlineLeft } from 'react-icons/ai'
import { useHistory, useParams } from 'react-router-dom'

import { AccountContext } from '../../context/AccountProvider'
import { FeedbackContext, FeedbackT } from '../../context/FeedbackProvider'
import MainLayout from '../../layouts/MainLayout'
import styles from './viewSubmissions.module.css'
import ScaleQuestion from '../../components/ScaleQuestion/ScaleQuestion'

interface ViewSubmissionsRouteParams {
  userId: string
}

const ViewSubmissions = () => {
  const feedbacks = React.useContext(FeedbackContext)
  const currentUser = React.useContext(AccountContext)
  const [userFeedback, setUserFeedback] = React.useState<FeedbackT | null>(null)
  const history = useHistory()
  let { userId } = useParams<ViewSubmissionsRouteParams>()

  React.useEffect(() => {
    if (userId && feedbacks) {
      const feedback = feedbacks.find(
        (feedback) =>
          feedback.from.id === currentUser?.id && feedback.to.id === userId,
      )
      if (feedback) {
        setUserFeedback(feedback)
      } else {
        history.push('/share-feedback/not-found')
      }
    } else {
      history.push('/share-feedback/not-found')
    }
  }, [currentUser?.id, feedbacks, history, userId])

  const handleBackToFeedbacks = React.useCallback(() => {
    history.goBack()
  }, [history])

  return (
    <MainLayout loggedIn>
      <div className={styles.wrapper}>
        <button className={styles.back} onClick={handleBackToFeedbacks}>
          <AiOutlineLeft
            className={styles.backIcon}
            color={'#59636e'}
            size={15}
          />
          Back
        </button>
        <div className={styles.container}>
          <h2 className={styles.title}>{userFeedback?.to?.name}'s Feedback</h2>
          {userFeedback && userFeedback.questionAnswers.length > 0 ? (
            <ul className={styles.questions}>
              {userFeedback.questionAnswers.map((questionAnswer) => (
                <li key={questionAnswer.questionId} className={styles.question}>
                  <span className={styles.questionLabel}>
                    {questionAnswer.questionLabel}
                  </span>
                  <div className={styles.questionAnswerContainer}>
                    {questionAnswer.answer === null ? (
                      <span className={styles.skipped}>SKIPPED</span>
                    ) : questionAnswer.questionType === 'scale' ? (
                      <ScaleQuestion
                        displayData={true}
                        value={questionAnswer.answer}
                      />
                    ) : questionAnswer.questionType === 'text' ||
                      questionAnswer.questionType === 'multipleChoice' ? (
                      <span className={styles.questionLabel}>
                        {questionAnswer.answer}
                      </span>
                    ) : (
                      <span>Invalid Answer</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.title}>
              Sorry, there's no feedback submissions for this user
            </p>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default ViewSubmissions
