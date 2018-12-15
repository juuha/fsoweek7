const initialState = {
  message: '',
  error: false
}

const reducer = (store = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIF':
      return {
        message: action.data.message,
        error: action.data.error
      }
    case 'REMOVE_NOTIF':
      return initialState
    default:
      return store
  }
}

const setNotification = (message, error) => {
  return {
    type: 'SET_NOTIF',
    data: { message, error }
  }
}

const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIF'
  }
}

export const notify = (message, error) => {
  return async (dispatch) => {
    dispatch(setNotification(message, error))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 3000);
  }
}

export const notifyWithDispatch = (message, error, dispatch) => {
  dispatch(setNotification(message, error))
  setTimeout(() => {
    dispatch(removeNotification())
  }, 3000);
}

export default reducer