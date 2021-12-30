import { all } from 'redux-saga/effects';
import { movieWatcher } from './movieSaga';

const watchers = [
    movieWatcher(),
];

export default function* rootSaga() {
    yield all(watchers);
}