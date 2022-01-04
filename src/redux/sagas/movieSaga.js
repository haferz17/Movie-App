
import { put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import * as a from '../../config/actionType'
import { GetListMovieApi, GetListTVApi, GetSimilarApi } from '../../config/api'

export const movieWatcher = [
    takeLatest(a.GET_LIST_MOVIE, getListMovie),
    takeLatest(a.GET_LIST_TV, getListTV),
    takeLatest(a.GET_SIMILAR_MOVIE, getSimilar),
]

const request = async (api) => {
    const res = await axios.get(api)
    return res?.data?.results
}

function* getListMovie() {
    yield put({ type: a.GET_LIST_MOVIE_START })
    try {
        const data = yield request(GetListMovieApi)
        yield put({ type: a.GET_LIST_MOVIE_SUCCESS, data: data ? data.slice(0, 10) : [] })
    } catch (error) {
        yield put({ type: a.GET_LIST_MOVIE_FAILED })
    }
}

function* getListTV() {
    yield put({ type: a.GET_LIST_TV_START })
    try {
        const data = yield request(GetListTVApi)
        yield put({ type: a.GET_LIST_TV_SUCCESS, data: data ? data.slice(0, 10) : [] })
    } catch (error) {
        yield put({ type: a.GET_LIST_TV_FAILED })
    }
}

function* getSimilar(action) {
    const { id } = action.payload
    yield put({ type: a.GET_SIMILAR_MOVIE_START })
    try {
        const data = yield request(GetSimilarApi(id))
        yield put({ type: a.GET_SIMILAR_MOVIE_SUCCESS, data: data ? data.slice(0, 10) : [] })
    } catch (error) {
        yield put({ type: a.GET_SIMILAR_MOVIE_FAILED })
    }
}