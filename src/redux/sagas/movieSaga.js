
import { put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import {
    GET_LIST_MOVIE,
    GET_LIST_MOVIE_START,
    GET_LIST_MOVIE_SUCCESS,
    GET_LIST_MOVIE_FAILED,
    GET_LIST_TV,
    GET_LIST_TV_START,
    GET_LIST_TV_SUCCESS,
    GET_LIST_TV_FAILED
} from '../../config/actionType'
import { GetListMovieApi, GetListTVApi, apiKey } from '../../config/api'

export const movieWatcher = [
    takeLatest(GET_LIST_MOVIE, getListMovie),
    takeLatest(GET_LIST_TV, getListTV),
]

const request = async (api) => {
    const res = await axios.get(api)
    return res?.data?.results
}

function* getListMovie() {
    yield put({ type: GET_LIST_MOVIE_START })
    try {
        const api = `${GetListMovieApi}?api_key=${apiKey}&language=en-US&page=1`
        const data = yield request(api)
        yield put({ type: GET_LIST_MOVIE_SUCCESS, data: data ? data.slice(0, 10) : [] })
    } catch (error) {
        yield put({ type: GET_LIST_MOVIE_FAILED })
    }
}

function* getListTV() {
    yield put({ type: GET_LIST_TV_START })
    try {
        const api = `${GetListTVApi}?api_key=${apiKey}&language=en-US&page=1`
        const data = yield request(api)
        yield put({ type: GET_LIST_TV_SUCCESS, data: data ? data.slice(0, 10) : [] })
    } catch (error) {
        yield put({ type: GET_LIST_TV_FAILED })
    }
}