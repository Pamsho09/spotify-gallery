import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IUiStore {
  show: boolean
  component: string
  idTrack: string
}

const initialState: IUiStore = {
  show: false,
  component: '',
  idTrack: '',
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ component: string; id: string }>
    ) => {
      state.show = true
      state.component = action.payload.component
      state.idTrack = action.payload.id
    },
    closeModal: (state) => {
      state.show = false
      state.component = ''
      state.idTrack = ''
    },
  },
})

export const { openModal, closeModal } = uiSlice.actions

export default uiSlice.reducer
