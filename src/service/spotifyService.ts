import axios, { AxiosError, AxiosInstance } from 'axios'
import credential from '../config/config'
import { stringify } from 'qs'
import { ResponseItem } from './dto/responseItem'
import { ResponseSearch } from './dto/responseSearch'
import { ResposeTrack } from './dto/responseTrack'
import { ResposeTrackDetail } from './dto/responseTrackDetail'

export class SpotifyService {
  request: AxiosInstance
  constructor(token: string) {
    console.log(token)
    this.request = axios.create({
      baseURL: 'https://api.spotify.com/v1/',
      headers: {
        Authorization: token,
      },
    })
  }
  static async getToken(): Promise<string | AxiosError> {
    const { clientId, clientSecret, grantType } = credential()
    console.log({
      clientId,
      clientSecret,
      grantType,
    })
    try {
      const {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        data: { access_token },
      } = await axios.post(
        'https://accounts.spotify.com/api/token',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        stringify({ grant_type: 'client_credentials' }),

        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${clientId}:${clientSecret}`,
              'utf-8'
            ).toString('base64')}`,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      return access_token
    } catch (error) {
      return error as AxiosError
    }
  }
  async getSearch(query: string, type: string): Promise<ResponseSearch> {
    const { data } = await this.request.get(`search?q=${query}&type=${type}`)
    return new ResponseSearch(data)
  }
  async getAlbumsByArtistId(id: string): Promise<ResponseItem[] | AxiosError> {
    try {
      const { data } = await this.request.get(`artists/${id}/albums`)
      return data.items.map(
        (item: any) => new ResponseItem(item.name, item.id, item.images[0].url)
      )
    } catch (error) {
      return error as AxiosError
    }
  }

  async getTracksByAlbumId(id: string): Promise<ResposeTrack[] | AxiosError> {
    try {
      const { data } = await this.request.get(`albums/${id}/tracks`)
      return data.items.map((item: any) => new ResposeTrack(item))
    } catch (error) {
      return error as AxiosError
    }
  }

  async getTrackById(id: string): Promise<ResposeTrackDetail | AxiosError> {
    try {
      const { data } = await this.request.get(`tracks/${id}`)
      return new ResposeTrackDetail(data)
    } catch (error) {
      return error as AxiosError
    }
  }
}
