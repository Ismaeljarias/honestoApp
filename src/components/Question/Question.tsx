import styles from './question.module.css'
import Button from '../Button'
import { useCallback, useMemo, useState } from 'react'
import ScaleQuestion from '../ScaleQuestion'
import TextQuestion from '../TextQuestion/TextQuestion'
import MultipleChoiceQuestion from '../MultipleChoiceQuestion'
import { QuestionAnswerT } from '../../context/FeedbackProvider'

type QuestionProps = {
  question: {
    id: string
    type: 'scale' | 'text' | 'multipleChoice'
    required: boolean
    label: string
    options?: {
      label: string
      value: number
    }[]
  }
  questionIndex: number
  totalQuestions: number
  nextQuestion: (questionAnswer: QuestionAnswerT) => void
  prevQuestion: () => void
  submitFeedback: (questionAnswer: QuestionAnswerT) => void
}

const Question = (props: QuestionProps) => {
  const {
    question,
    questionIndex,
    totalQuestions,
    nextQuestion,
    prevQuestion,
    submitFeedback,
  } = props
  const [answer, setAnswer] = useState<string | number | null>(null)

  const handleChangeAnswer = useCallback((questionAnswer: string | number) => {
    setAnswer(questionAnswer)
  }, [])

  const handleNextQuestion = () => {
    nextQuestion({
      questionLabel: question.label,
      questionId: question.id,
      questionType: question.type,
      answer,
    })
    setAnswer(null)
  }

  const handlePrevQuestion = useCallback(() => {
    prevQuestion()
    setAnswer(null)
  }, [prevQuestion])

  const handleSubmitFeedback = () => {
    submitFeedback({
      questionLabel: question.label,
      questionId: question.id,
      questionType: question.type,
      answer,
    })
  }

  const handleSkip = () => {
    if (totalQuestions === questionIndex + 1) {
      submitFeedback({
        questionLabel: question.label,
        questionId: question.id,
        questionType: question.type,
        answer: null,
      })
    } else {
      nextQuestion({
        questionLabel: question.label,
        questionId: question.id,
        questionType: question.type,
        answer,
      })
      setAnswer(null)
    }
  }

  const QuestionRenderer = useMemo(() => {
    switch (question.type) {
      case 'scale':
        return <ScaleQuestion onSetValue={handleChangeAnswer} value={answer} />
      case 'text':
        return (
          <TextQuestion onChangeValue={handleChangeAnswer} value={answer} />
        )
      case 'multipleChoice':
        return (
          <MultipleChoiceQuestion
            onSetValue={handleChangeAnswer}
            value={answer}
            options={question.options ? question.options : []}
          />
        )
      default:
        return <p className={styles.invalidTxt}>Invalid question type</p>
    }
  }, [answer, handleChangeAnswer, question.options, question.type])

  return (
    <div className={styles.questionWrapper}>
      {QuestionRenderer}
      <div className={styles.buttonsWrapper}>
        <Button
          disabled={questionIndex <= 0}
          onClick={() => handlePrevQuestion()}
        >
          Previous
        </Button>
        {!question.required && (
          <Button onClick={() => handleSkip()} secondary>
            Skip
          </Button>
        )}
        {questionIndex === totalQuestions - 1 ? (
          <Button disabled={!answer} onClick={() => handleSubmitFeedback()}>
            Submit
          </Button>
        ) : (
          <Button disabled={!answer} onClick={() => handleNextQuestion()}>
            Next
          </Button>
        )}
      </div>
      <div>
        <progress value={questionIndex} max={totalQuestions} />
        <p className={styles.questionsCompleted}>Questions Completed</p>
        <span className={styles.progressText}>
          {questionIndex + 1}/{totalQuestions}
        </span>
      </div>
    </div>
  )
}

export default Question
