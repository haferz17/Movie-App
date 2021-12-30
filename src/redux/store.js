import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore } from 'redux-persist'
import rootSaga from './sagas'
import rootReducer from './reducers'

const sagaMiddleware = createSagaMiddleware()
const middleware = applyMiddleware(sagaMiddleware)
const store = createStore(rootReducer, middleware)
const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

export { store, persistor }