import * as a from '../../config/actionType'

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    movieList: [],
    tvList: [],
    similarList: [],
    pages: 0,
    tvPages: 0
}

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case a.GET_LIST_MOVIE_START:
            return {
                ...state,
                isLoading: true,
                isSuccess: false,
                isError: false,
                movieList: action.reset ? [] : state.movieList
            }
        case a.GET_LIST_MOVIE_SUCCESS:
            const stateData = state.movieList
            const data = action.isLoadMore ? stateData.concat(action.data) : action.data
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                movieList: data,
                pages: action.pages
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
                tvList: action.reset ? [] : state.tvList
            }
        case a.GET_LIST_TV_SUCCESS:
            const stateDataTV = state.tvList
            const dataTV = action.isLoadMore ? stateDataTV.concat(action.data) : action.data
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                tvList: dataTV,
                tvPages: action.pages
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
