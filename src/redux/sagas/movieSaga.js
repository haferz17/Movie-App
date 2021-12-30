
import { put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import {
    GET_LIST_MOVIE,
    GET_LIST_MOVIE_START,
    GET_LIST_MOVIE_SUCCESS,
    GET_LIST_MOVIE_FAILED,
} from '../../config/actionType'
import { GetListMovieApi } from '../../config/api'

function* getListMovie() {
    yield put({ type: GET_LIST_MOVIE_START })
    try {
        const res = yield axios.get(GetListMovieApi)
        const data = res.data.slice(0, 10)
        const newData = createTodoListData(data)
        yield put({ type: GET_LIST_MOVIE_SUCCESS, data: newData })
    } catch (error) {
        yield put({ type: GET_LIST_MOVIE_FAILED })
    }
}

export function* movieWatcher() {
    yield takeLatest(GET_LIST_MOVIE, getListMovie)
}   