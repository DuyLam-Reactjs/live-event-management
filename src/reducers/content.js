import {ACTION_TYPE} from "../actions/actionType";

const contentReducer = (state = {}, action) => {
  const result = { ...state }
  const dataPayload = action?.payload?.data

  switch (action?.type) {
    case ACTION_TYPE.CONTENT_PROVIDER:
    case ACTION_TYPE.LIST_CONTENT_PROVIDER:
    case ACTION_TYPE.CREATE_CONTENT_PROVIDER:
    case ACTION_TYPE.DELETE_CONTENT_PROVIDER:
    case ACTION_TYPE.EDIT_CONTENT_PROVIDER:
    case ACTION_TYPE.LIST_CONTENT:
    case ACTION_TYPE.EDIT_CONTENT:
      result[action.type] = dataPayload
      break
    default:
      break
  }
  return result
}

export default contentReducer
