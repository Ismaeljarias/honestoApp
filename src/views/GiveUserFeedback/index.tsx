import styles from './giveUserFeedback.module.css'
import MainLayout from '../../layouts/MainLayout/MainLayout'
import { AiOutlineLeft } from 'react-icons/ai'
import Question from '../../components/Question'
import { useQuestions } from '../../hooks/useQuestions'

export const GiveUserFeedback = () => {
  const {
    backToFeedbacks,
    selectedUser,
    currentQuestion,
    questionIndex,
    nextQuestion,
    previousQuestion,
    totalQuestions,
    submitFeedback,
  } = useQuestions()

  return (
    <MainLayout loggedIn>
      <div className={styles.wrapper}>
        <button className={styles.back} onClick={() => backToFeedbacks()}>
          <AiOutlineLeft
            className={styles.backIcon}
            color={'#59636e'}
            size={15}
          />
          Back
        </button>
        <div className={styles.questionHeader}>
          <div>
            <p className={styles.questionLabel}>{currentQuestion?.label}</p>
            <p className={styles.feedbackInfo}>
              Share your feedback to {selectedUser?.name}
            </p>
          </div>
          <img
            className={styles.userAvatar}
            src={selectedUser?.avatarUrl}
            alt="User avatar"
          />
        </div>

        {currentQuestion && (
          <Question
            question={currentQuestion}
            questionIndex={questionIndex}
            nextQuestion={nextQuestion}
            prevQuestion={previousQuestion}
            submitFeedback={submitFeedback}
            totalQuestions={totalQuestions()}
          />
        )}
      </div>
    </MainLayout>
  )
}
