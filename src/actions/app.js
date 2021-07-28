import { createAction, ACTION_TYPE } from './actionType'

const setTokenSuccess = (data) => {
	return createAction(ACTION_TYPE.SET_TOKEN, data)
}

export const setToken = (token) => {
	return dispatch => {
		dispatch(setTokenSuccess(token))
	}
}


