
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
    return {
        page: res?.data?.total_pages,
        data: res?.data?.results
    }
}

function* getListMovie(action) {
    const { page, reset } = action.payload
    yield put({ type: a.GET_LIST_MOVIE_START, reset })
    try {
        const res = yield request(GetListMovieApi(page))
        const pages = res.page
        const isLoadMore = page > 1
        yield put({
            type: a.GET_LIST_MOVIE_SUCCESS,
            data: res.data ? res.data.slice(0, 10) : [],
            pages, isLoadMore
        })
    } catch (error) {
        yield put({ type: a.GET_LIST_MOVIE_FAILED })
    }
}

function* getListTV(action) {
    const { page, reset } = action.payload
    yield put({ type: a.GET_LIST_TV_START, reset })
    try {
        const res = yield request(GetListTVApi(page))
        const pages = res.page
        const isLoadMore = page > 1
        yield put({
            type: a.GET_LIST_TV_SUCCESS,
            data: res.data ? res.data.slice(0, 10) : [],
            pages, isLoadMore
        })
    } catch (error) {
        yield put({ type: a.GET_LIST_TV_FAILED })
    }
}

function* getSimilar(action) {
    const { id } = action.payload
    yield put({ type: a.GET_SIMILAR_MOVIE_START })
    try {
        const res = yield request(GetSimilarApi(id))
        yield put({
            type: a.GET_SIMILAR_MOVIE_SUCCESS,
            data: res.data ? res.data.slice(0, 10) : []
        })
    } catch (error) {
        yield put({ type: a.GET_SIMILAR_MOVIE_FAILED })
    }
}