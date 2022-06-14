import * as React from 'react'
import {
  DispatchFeedbackContext,
  QuestionAnswerT,
} from '../context/FeedbackProvider'
import { useHistory, useParams } from 'react-router-dom'
import {
  Question2T,
  QuestionContext,
  QuestionT,
} from '../context/QuestionProvider'
import { AccountContext } from '../context/AccountProvider'
import { UserT } from '../context/types'
import { DispatchUserContext } from '../context/UserProvider'

interface GiveUserFeedbackRouteParams {
  userId: string
}

export const useQuestions = () => {
  const { dispatch } = React.useContext(DispatchFeedbackContext)
  const { getSelectedUser } = React.useContext(DispatchUserContext)
  const questions = React.useContext(QuestionContext)
  const currentUser = React.useContext(AccountContext)

  const [selectedUser, setSelectedUser] = React.useState<UserT | null>(null)
  const [currentQuestion, setCurrentQuestion] = React.useState<
    QuestionT | Question2T | null
  >(null)
  const [questionIndex, setQuestionIndex] = React.useState<number>(0)

  const [answers, setAnswers] = React.useState<QuestionAnswerT[]>([])

  let { userId } = useParams<GiveUserFeedbackRouteParams>()
  let history = useHistory()

  React.useEffect(() => {
    if (userId) {
      setSelectedUser(getSelectedUser(userId))
    }
  }, [getSelectedUser, userId])

  React.useEffect(() => {
    if (questions) {
      setCurrentQuestion(questions[0])
      setQuestionIndex(0)
    }
  }, [questions])

  const nextQuestion = (questionAnswer: QuestionAnswerT) => {
    let nextQuestionIndex = questionIndex + 1
    if (questions) {
      setCurrentQuestion(questions[nextQuestionIndex])
      setQuestionIndex(nextQuestionIndex)
    }
    setAnswers([...answers, questionAnswer])
  }

  const previousQuestion = () => {
    const previousAnswers = [...answers]
    previousAnswers.pop()

    const previousQuestionIndex = questionIndex - 1
    if (questions && questions[previousQuestionIndex]) {
      setCurrentQuestion(questions[previousQuestionIndex])
      setQuestionIndex(previousQuestionIndex)
    }

    setAnswers(previousAnswers)
  }

  const submitFeedback = (questionAnswer: QuestionAnswerT) => {
    const feedback = {
      from: currentUser,
      to: selectedUser,
      questionAnswers: [...answers, questionAnswer],
      read: false,
    }
    dispatch({
      action: 'add',
      payload: feedback,
    })
    history.push('/share-feedback/thank-you')
  }

  const backToFeedbacks = () => {
    history.goBack()
  }

  const totalQuestions = () => {
    return questions ? questions?.length : 0
  }

  return {
    questionIndex,
    currentQuestion,
    selectedUser,
    nextQuestion,
    previousQuestion,
    submitFeedback,
    backToFeedbacks,
    totalQuestions,
  }
}
