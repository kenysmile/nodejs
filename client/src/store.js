import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReduce from './reducers'

const initialSate = {}

const middleware = [thunk]

const store = createStore(
    rootReduce,
    initialSate,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store