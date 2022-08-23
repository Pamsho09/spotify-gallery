import axios, { AxiosInstance } from 'axios'
import credential from '../config/config'
import { stringify } from 'qs'
import { ResponseItem } from './dto/responseItem'
import { ResponseSearch } from './dto/responseSearch'
import { ResponseTrack } from './dto/responseTrack'
import { ResposeTrackDetail } from './dto/responseTrackDetail'
import { ResponseArtistDetail } from './dto/responseArtistDetail'
import { ResponseAlbumDetail } from './dto/responseAlbumDetail'

export class SpotifyService {
  request: AxiosInstance
  constructor(token: string) {
    this.request = axios.create({
      baseURL: 'https://api.spotify.com/v1/',
      headers: {
        Authorization: token,
      },
    })
  }
  static async getToken(): Promise<string> {
    const { clientId, clientSecret } = credential()
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
  }
  async getSearch(query: string, type: string): Promise<ResponseSearch> {
    const { data } = await this.request.get(`search?q=${query}&type=${type}`)
    return new ResponseSearch(data)
  }
  async getAlbumsByArtistId(id: string): Promise<ResponseItem[]> {
    const { data } = await this.request.get(`artists/${id}/albums`)
    return data.items.map(
      (item: any) => new ResponseItem(item.name, item.id, item.images[0].url)
    )
  }

  async getTracksByAlbumId(id: string): Promise<ResponseTrack[]> {
    const { data } = await this.request.get(`albums/${id}/tracks`)
    return data.items.map((item: any) => new ResponseTrack(item))
  }

  async getTrackById(id: string): Promise<ResposeTrackDetail> {
    const { data } = await this.request.get(`tracks/${id}`)
    return new ResposeTrackDetail(data)
  }
  async getArtistById(id: string): Promise<ResponseArtistDetail> {
    const { data } = await this.request.get(`artists/${id}`)
    return new ResponseArtistDetail(data)
  }
  async getAlbumById(id: string): Promise<ResponseAlbumDetail> {
    const { data } = await this.request.get(`albums/${id}`)
    return new ResponseAlbumDetail(data)
  }
}
