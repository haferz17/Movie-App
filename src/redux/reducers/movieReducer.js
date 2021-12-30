import {
    GET_LIST_MOVIE_START,
    GET_LIST_MOVIE_SUCCESS,
    GET_LIST_MOVIE_FAILED,
} from '../../config/actionType';

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    movieList: [],
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
                movieList: action.data.studyData,
            }
        case GET_LIST_MOVIE_FAILED:
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
