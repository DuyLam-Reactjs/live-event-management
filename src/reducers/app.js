import { ACTION_TYPE } from '../actions/actionType'
import initialState from './initialState'

const appReducer =  (state = initialState.app, action) => {
  const data = action?.data
  const type = action?.type
  switch (type) {
    case ACTION_TYPE.SET_TOKEN:{
      return {...state, token: data}
    }
    default:
      return state
  }

}

export default appReducer
