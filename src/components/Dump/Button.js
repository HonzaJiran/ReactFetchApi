import React from 'react'

const Button = () => {
  return (
    <button type={this.props.btnType} className={"btn btn-" + this.props.className } onClick={this.props.onClick}>{this.props.text}</button>
  )
}

export default Button
