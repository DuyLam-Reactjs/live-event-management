import thunkMiddleware from 'redux-thunk'
import { applyMiddleware, compose, createStore } from 'redux'
import rootReducer from '../reducers'

function createMiddlewares ({ isServer }) {
  const middlewares = [
    thunkMiddleware
  ]
  return middlewares
}

const CreateStore = (initialState = {}, context) => {
  const { isServer } = context
  const middlewares = createMiddlewares({ isServer })

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  )
}

export default CreateStore