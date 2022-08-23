import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { rootServices } from './service/rootService'
import userReducer from './slice/userStore'
import uiReducer from './slice/uiStore'

export const reducers = combineReducers({
  user: userReducer,
  ui: uiReducer,
  [rootServices.reducerPath]: rootServices.reducer,
})
export const store = configureStore({
  reducer: reducers,
})
export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: reducers,
    preloadedState,
  })
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof reducers>
export type AppStore = ReturnType<typeof setupStore>
export type IRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
