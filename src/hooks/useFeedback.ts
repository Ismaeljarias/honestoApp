import React from 'react'
import { AccountContext } from '../context/AccountProvider'
import {
  DispatchFeedbackContext,
  FeedbackContext,
  FeedbackT,
} from '../context/FeedbackProvider'

export const useFeedback = (isTeam = false) => {
  const feedbacks = React.useContext(FeedbackContext)
  const currentUser = React.useContext(AccountContext)
  const { dispatch } = React.useContext(DispatchFeedbackContext)

  const [givenFeedbacks, setGivenFeedbacks] = React.useState<FeedbackT[]>([])
  const [selectedUserFeedback, setSelectedUserFeedback] =
    React.useState<FeedbackT | null>(null)

  React.useEffect(() => {
    let fromTo = null
    const filteredFeedbacks = feedbacks?.filter((feedback) => {
      fromTo = !isTeam ? feedback.to.id : feedback.from.id

      return fromTo === currentUser?.id
    })
    setGivenFeedbacks(filteredFeedbacks ? filteredFeedbacks : [])
  }, [currentUser?.id, dispatch, feedbacks, isTeam])

  const changeUserFeedback = React.useCallback(
    (feedback: FeedbackT) => {
      setSelectedUserFeedback(feedback)
      if (feedback.read === false && !isTeam) {
        dispatch({
          action: 'read',
          payload: feedback,
        })
      }
    },
    [dispatch, isTeam],
  )

  return {
    givenFeedbacks,
    changeUserFeedback,
    selectedUserFeedback,
  }
}
