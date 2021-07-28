import {ACTION_TYPE} from "../actions/actionType";

const InStreamAdsReducer = (state = {}, action) => {
  const result = { ...state }
  const dataPayload = action?.payload?.data

  switch (action?.type) {
    case ACTION_TYPE.INSTREAM_ADS:
    case ACTION_TYPE.LIST_INSTREAM_ADS:
    case ACTION_TYPE.LIST_INSTREAM_ADS_ID:
    case ACTION_TYPE.DELETE_INSTREAM_ADS_ID:
    case ACTION_TYPE.EDIT_INSTREAM_ADS_ID:
    case ACTION_TYPE.LIST_ALL_INSTREAM_ADS:
      result[action.type] = dataPayload
      break
    default:
      break
  }
  return result
}

export default InStreamAdsReducer
