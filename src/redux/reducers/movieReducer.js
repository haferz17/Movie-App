import {
    GET_LIST_MOVIE_START,
    GET_LIST_MOVIE_SUCCESS,
    GET_LIST_MOVIE_FAILED,
    GET_LIST_TV_START,
    GET_LIST_TV_SUCCESS,
    GET_LIST_TV_FAILED
} from '../../config/actionType';

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    movieList: [],
    tvList: [],
}

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_MOVIE_START:
            return {
                ...state,
                isLoading: true,
                isSuccess: false,
                isError: false,
            }
        case GET_LIST_MOVIE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                movieList: action.data,
            }
        case GET_LIST_MOVIE_FAILED:
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        case GET_LIST_TV_START:
            return {
                ...state,
                isLoading: true,
                isSuccess: false,
                isError: false,
            }
        case GET_LIST_TV_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                tvList: action.data,
            }
        case GET_LIST_TV_FAILED:
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        default:
            return state
    }
}

export default movieReducer
