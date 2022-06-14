import styles from './button.module.css'
import * as React from 'react'
import classnames from 'classnames'

type Props = {
  onClick: (se: React.SyntheticEvent) => void
  children: React.ReactNode
  secondary?: boolean
  disabled?: boolean
  customStyle?: React.CSSProperties
}

const Button = (props: Props) => {
  const { children, secondary, disabled = false, customStyle, onClick } = props

  return (
    <button
      disabled={disabled}
      className={classnames(styles.button, {
        [styles.secondaryButton]: secondary,
      })}
      style={customStyle}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
