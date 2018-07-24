import {SHOW_ALL} from './types'

export const showAll = () => dispatch => {
  if (this.props.payload === 'hide') {
      dispatch({
        type: SHOW_ALL,
        payload: 'show'
      })
  }else {
    dispatch({
      type: SHOW_ALL,
      payload: 'hide'
    })
  }
}