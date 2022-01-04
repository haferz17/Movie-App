import * as a from '../../config/actionType'

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    movieList: [],
    tvList: [],
    similarList: []
}

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case a.GET_LIST_MOVIE_START:
            return {
                ...state,
                isLoading: true,
                isSuccess: false,
                isError: false,
            }
        case a.GET_LIST_MOVIE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                movieList: action.data,
            }
        case a.GET_LIST_MOVIE_FAILED:
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        case a.GET_LIST_TV_START:
            return {
                ...state,
                isLoading: true,
                isSuccess: false,
                isError: false,
            }
        case a.GET_LIST_TV_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                tvList: action.data,
            }
        case a.GET_LIST_TV_FAILED:
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        case a.GET_SIMILAR_MOVIE_START:
            return {
                ...state,
                isLoading: true,
                isSuccess: false,
                isError: false,
            }
        case a.GET_SIMILAR_MOVIE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                similarList: action.data,
            }
        case a.GET_SIMILAR_MOVIE_FAILED:
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
