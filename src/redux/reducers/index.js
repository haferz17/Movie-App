import { combineReducers } from 'redux'
import { persistReducer } from "redux-persist"
import movieReducer from './movieReducer'
import AsyncStorage from '@react-native-community/async-storage'

const appReducer = combineReducers({
    movie: persistReducer({
        key: 'MOVIE',
        storage: AsyncStorage
    }, movieReducer)
})

export default rootReducer = (state, action) => {
    return appReducer(state, action)
}