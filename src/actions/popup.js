import {ACTION_TYPE, createAction} from "./actionType";


export const openPopupSuccess = (data) => {
    return createAction(ACTION_TYPE.OPEN_POPUP, data)
}
export const closePopupSuccess = () => {
    return createAction(ACTION_TYPE.CLOSE_POPUP, null)
}

export const openPopup = (params) => {
    return dispatch => {
        return dispatch(openPopupSuccess(params))
    }
}
export const closePopup = () => {
    return dispatch => {
        dispatch(closePopupSuccess())
    }
}
