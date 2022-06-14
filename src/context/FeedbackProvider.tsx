import * as React from 'react'
import { UserT } from './types'

export type QuestionAnswerT = {
  questionLabel: string
  questionId: string
  questionType: string
  answer: number | string | null
}

export type FeedbackT = {
  from: UserT
  to: UserT
  questionAnswers: QuestionAnswerT[]
  read: boolean
}

type DispatchFeedbackContextT = any

export const DispatchFeedbackContext =
  React.createContext<DispatchFeedbackContextT | null>(null)
export const FeedbackContext = React.createContext<FeedbackT[] | null>(null)

type SubmitFeedback = {
  action: 'add'
  payload: FeedbackT
}

type ReadFeedback = {
  action: 'read'
  payload: FeedbackT
}

const reducer = (
  state: FeedbackT[] | null,
  update: SubmitFeedback | ReadFeedback,
): FeedbackT[] | null => {
  if (update.action === 'add') {
    return state ? [...state, update.payload] : [update.payload]
  }
  if (update.action === 'read') {
    return state
      ? state.map((feedback) => {
          if (
            feedback.from.id === update.payload.from.id &&
            feedback.to.id === update.payload.to.id
          ) {
            return { ...feedback, read: true }
          } else {
            return feedback
          }
        })
      : state
  }

  return state
}

const UIProvider = ({ children }: { children: React.ReactNode }): any => {
  const [state, dispatch] = React.useReducer(reducer, [])
  console.log('feedbacks', state)

  const getFeeback = (user: UserT) => {
    return state?.filter((feedback) => feedback.from === user)
  }

  return (
    <DispatchFeedbackContext.Provider value={{ dispatch, getFeeback }}>
      <FeedbackContext.Provider value={state}>
        {children}
      </FeedbackContext.Provider>
    </DispatchFeedbackContext.Provider>
  )
}

export default UIProvider
