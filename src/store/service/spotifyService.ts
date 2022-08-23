import { ResponseAlbumDetail } from '../../service/dto/responseAlbumDetail'
import { ResponseArtistDetail } from '../../service/dto/responseArtistDetail'
import { ResponseItem } from '../../service/dto/responseItem'
import { ResponseSearch } from '../../service/dto/responseSearch'
import { ResposeTrackDetail } from '../../service/dto/responseTrackDetail'
import { setToken } from '../slice/userStore'
import { rootServices } from './rootService'

interface IResposeToken {
  token: string
}
export const spotifyServiceApi = rootServices.injectEndpoints({
  endpoints: (builder) => ({
    getToken: builder.query<IResposeToken, null>({
      query: () => ({
        url: () => `auth/spotify`,
        method: 'GET',
        extraSuccessActions: [(response) => setToken(response.token)],
      }),
    }),
    search: builder.query<
      ResponseSearch,
      {
        p: string
        type: string
      }
    >({
      query: ({ p, type }) => ({
        url: () => `spotify/search?p=${p}&type=${type}`,
        method: 'GET',
      }),
    }),
    getAlbumsByArtist: builder.query<ResponseItem[], { id: string }>({
      query: ({ id }) => ({
        url: () => `spotify/get-albums-by-artist-id?id=${id}`,
        method: 'GET',
      }),
    }),
    getArtistById: builder.query<ResponseArtistDetail, { id: string }>({
      query: ({ id }) => ({
        url: () => `spotify/get-artist-by-id?id=${id}`,
        method: 'GET',
      }),
    }),
    getAlbumById: builder.query<ResponseAlbumDetail, { id: string }>({
      query: ({ id }) => ({
        url: () => `spotify/get-album-by-id?id=${id}`,
        method: 'GET',
      }),
    }),
    getTracksByAlbumId: builder.query<ResponseItem[], { id: string }>({
      query: ({ id }) => ({
        url: () => `spotify/get-tracks-by-album-id?id=${id}`,
        method: 'GET',
      }),
    }),
    getTrackById: builder.query<ResposeTrackDetail, { id: string }>({
      query: ({ id }) => ({
        url: () => `spotify/get-track-by-id?id=${id}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetTokenQuery,
  useSearchQuery,
  useGetAlbumsByArtistQuery,
  useGetArtistByIdQuery,
  useGetAlbumByIdQuery,
  useGetTracksByAlbumIdQuery,
  useGetTrackByIdQuery,
} = spotifyServiceApi
