import AsyncStorage from '@react-native-community/async-storage';

const persistKey = {
    todo: 'TODO'
}

const todoConfig = {
    key: persistKey.todo,
    storage: AsyncStorage
}

export {
    todoConfig
}