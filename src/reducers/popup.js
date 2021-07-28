import { ACTION_TYPE } from '../actions/actionType'
import initialState from "./initialState";


const PopupReducer = (state = initialState.popup, { type, data }) => {
    const result = { ...state }
    switch (type) {
        case ACTION_TYPE.OPEN_POPUP: {
            return { popupName: data?.name, ...data}
        }
        case ACTION_TYPE.CLOSE_POPUP: {
            return  result[ACTION_TYPE.OPEN_POPUP] = null
        }
        default:
            return result
    }
}

export default PopupReducer