import styles from './textQuestion.module.css'
import * as React from 'react'

type TextQuestionProps = {
  value: number | string | null
  onChangeValue: (value: string) => void
}

const TextQuestion = (props: TextQuestionProps) => {
  const { value, onChangeValue } = props
  return (
    <textarea
      className={styles.textarea}
      placeholder="Say something"
      rows={7}
      value={value ? value.toString() : ''}
      onChange={(e) => onChangeValue(e.target.value)}
    ></textarea>
  )
}

export default TextQuestion
