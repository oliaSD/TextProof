import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../src/redux/reducers/UserSlice'
import checkReducer from '../src/redux/reducers/CkeckReducer'
import reportReducer from '../src/redux/reducers/ReportReducer'
import menuReducer from '../src/redux/reducers/MenuReducer'

export const store = configureStore({
    reducer: {
        user: userReducer,
        check: checkReducer,
        report : reportReducer,
        menu : menuReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch