import { ACTION_TYPE } from "../actions/actionType";

const userReducer = (state = {}, action) => {
  const result = { ...state }
  const dataPayload = action?.payload?.data

  switch (action?.type) {
    case ACTION_TYPE.LOGIN:
    case ACTION_TYPE.PROFILE:
    case ACTION_TYPE.CHANGE_PASSWORD:
    case ACTION_TYPE.LIST_USER:
    case ACTION_TYPE.DELETE_USER:
      result[action.type] = dataPayload
      break

      // const array = [...state.LIST_USER?.items];
      // result.LIST_USER.items = array.filter(i => i.id !== action?.payload)

    default:
      break
  }
  return result
}

export default userReducer
