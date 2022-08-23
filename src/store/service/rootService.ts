import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../uitils/axiosCustom'

export const rootServices = createApi({
  reducerPath: 'rootServices',
  baseQuery: axiosBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
  }),
  endpoints: () => ({}),
})
