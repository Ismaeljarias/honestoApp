import styles from './scaleQuestion.module.css'
import * as React from 'react'
import classnames from 'classnames'

type ScaleQuestionProps = {
  value: number | string | null
  onSetValue?: (value: number) => void
  displayData?: boolean
}

const ScaleQuestion = ({
  value,
  displayData = false,
  onSetValue,
}: ScaleQuestionProps) => {
  const [currentValue, setCurrentValue] = React.useState(0)
  const [hoverValue, setHoverValue] = React.useState<number | undefined>(
    undefined,
  )
  const pointSelector = Array(10).fill(0)

  const handleOnChange = (value: number) => {
    if (onSetValue) {
      onSetValue(value)
    }
    setCurrentValue(value)
  }

  const handleMouseOver = (newHoverValue: number | undefined) => {
    setHoverValue(newHoverValue)
  }

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }

  if (displayData) {
    return (
      <div className={styles.scaleContainerDisplay}>
        {pointSelector &&
          pointSelector.map((_, index) => (
            <button
              key={index}
              className={classnames(styles.scaleDisplay, {
                [styles.active]: value && value >= index + 1,
              })}
            ></button>
          ))}
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.scaleContainer}>
        {pointSelector &&
          pointSelector.map((_, index) => (
            <button
              key={`${index}-pointer`}
              className={classnames(styles.scale, {
                [styles.active]:
                  (hoverValue || currentValue) > index ? styles.active : null,
              })}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleOnChange(index + 1)}
            ></button>
          ))}
      </div>
      <p className={styles.scaleValue}>{currentValue ? currentValue : 0}/10</p>
    </div>
  )
}

export default ScaleQuestion
