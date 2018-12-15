import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notificationReducer'
import usersReducer from './reducers/usersReducer'
import blogsReducer from './reducers/blogsReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  users: usersReducer,
  blogs: blogsReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store