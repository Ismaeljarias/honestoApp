import styles from './multipleChoiceQuestion.module.css'
import * as React from 'react'
import classnames from 'classnames'

type MultipleChoiceQuestionProps = {
  value: number | string | null
  onSetValue: (value: string) => void
  options: {
    label: string
    value: number
  }[]
}

const MultipleChoiceQuestion = (props: MultipleChoiceQuestionProps) => {
  const { options, onSetValue } = props
  const [active, setActive] = React.useState<number | null>(null)

  const handleClick = (index: number, optionLabel: string) => {
    setActive(index)
    onSetValue(optionLabel)
  }

  return (
    <div className={styles.container}>
      {options.map((option, index) => (
        <button
          key={option.label}
          className={classnames(styles.option, {
            [styles.active]: active === index,
          })}
          onClick={() => handleClick(index, option.label)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default MultipleChoiceQuestion
