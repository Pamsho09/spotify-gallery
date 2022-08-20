import axios, { Axios } from 'axios'
import { SpotifyService } from '../../service/spotifyService'

describe('SpotifyService', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  describe('When call getToken', () => {
    process.env.CLIENT_ID = 'clientId'
    process.env.CLIENT_SECRET = 'clientSecret'
    process.env.GRANT_TYPE = 'i am grantType'

    it('should return access_token', async () => {
      const mockAxios = jest.spyOn(axios, 'post').mockResolvedValue({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        data: { access_token: 'soy el token de spotify :v' },
      })
      const token = await SpotifyService.getToken()
      expect(token).toBe('soy el token de spotify :v')
      expect(mockAxios).toHaveBeenCalledTimes(1)
      expect(mockAxios).toHaveBeenCalledWith(
        'https://accounts.spotify.com/api/token',
        'grant_type=client_credentials',
        {
          headers: {
            Authorization: 'Basic Y2xpZW50SWQ6Y2xpZW50U2VjcmV0',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
    })
  })

  describe('When call getSearch', () => {
    it('should return data', async () => {
      const mockAxios = jest.spyOn(Axios.prototype, 'get').mockResolvedValue({
        data: {
          artists: {
            items: [
              {
                name: 'John Doe',
                id: '123',
                images: [{ url: 'https://image.com' }],
              },
            ],
          },
          albums: {
            items: [
              {
                name: 'John Doe',
                id: '123',
                images: [{ url: 'https://image.com' }],
              },
            ],
          },
          traks: {
            items: [
              {
                name: 'John Doe',
                id: '123',
                album: {
                  images: [{ url: 'https://image.com' }],
                },
              },
            ],
          },
        },
      })

      const res = await new SpotifyService(
        'soy el token de spotify :v'
      ).getSearch('John Doe', 'artist')
      expect(res).toEqual({
        albums: [
          {
            name: 'John Doe',
            id: '123',
            img: 'https://image.com',
          },
        ],
        artists: [
          {
            name: 'John Doe',
            id: '123',
            img: 'https://image.com',
          },
        ],
        tracks: undefined,
      })
      expect(mockAxios).toHaveBeenCalledTimes(1)
      expect(mockAxios).toHaveBeenCalledWith('search?q=John Doe&type=artist')
    })
  })

  describe('When call getAlbumsByArtistId', () => {
    it('should return list Of albums', async () => {
      const mockAxios = jest.spyOn(Axios.prototype, 'get').mockResolvedValue({
        data: {
          href: '',
          items: [
            {
              href: '',
              id: '1234',
              images: [{ url: 'img.png' }],
              name: 'La cagaste… Burt Lancaster',
              type: '',
              uri: '111',
            },
          ],
          limit: 0,
          next: '',
          offset: 10,
          previous: '',
          total: 10,
        },
      })

      const token = await new SpotifyService(
        'soy el token de spotify :v'
      ).getAlbumsByArtistId('hombres g')
      expect(token).toEqual([
        {
          name: 'La cagaste… Burt Lancaster',
          id: '1234',
          img: 'img.png',
        },
      ])
      expect(mockAxios).toHaveBeenCalledTimes(1)
      expect(mockAxios).toHaveBeenCalledWith('artists/hombres g/albums')
    })
  })

  describe('When call getTracksByAlbumId', () => {
    it('should return list Of tracks', async () => {
      const mockAxios = jest.spyOn(Axios.prototype, 'get').mockResolvedValue({
        data: {
          href: '',
          items: [
            {
              artists: [{ name: 'John Doe' }],
              id: '1234',
              name: 'Te quiero',
              type: '',
              uri: '111',
              // eslint-disable-next-line @typescript-eslint/naming-convention
              preview_url: 'https://preview.com',
            },
          ],
          limit: 0,
          next: '',
          offset: 10,
          previous: '',
          total: 10,
        },
      })

      const token = await new SpotifyService(
        'soy el token de spotify :v'
      ).getTracksByAlbumId('1234')
      expect(token).toEqual([
        {
          name: 'Te quiero',
          previewUrl: 'https://preview.com',
          id: '1234',
          artist: ['John Doe'],
        },
      ])
      expect(mockAxios).toHaveBeenCalledTimes(1)
      expect(mockAxios).toHaveBeenCalledWith('albums/1234/tracks')
    })
  })

  describe('When call getTrackById', () => {
    it('should return track', async () => {
      const mockAxios = jest.spyOn(Axios.prototype, 'get').mockResolvedValue({
        data: {
          artists: [{ name: 'John Doe', id: '1234' }],
          album: {
            images: [{ url: 'img.png' }],
            name: 'La cagaste… Burt Lancaster',
            id: '1234',
          },
          id: '1234',
          name: 'Te quiero',
          type: '',
          uri: '111',
          // eslint-disable-next-line @typescript-eslint/naming-convention
          duration_ms: 180000,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          preview_url: 'https://preview.com',
        },
      })

      const token = await new SpotifyService(
        'soy el token de spotify :v'
      ).getTrackById('1234')
      expect(token).toEqual({
        name: 'Te quiero',
        spotifyUri: '111',
        previewUrl: 'https://preview.com',
        id: '1234',
        duration: '3:00',
        album: {
          name: 'La cagaste… Burt Lancaster',
          id: '1234',
          img: 'img.png',
        },
        artists: [{ name: 'John Doe', id: '1234' }],
      })
      expect(mockAxios).toHaveBeenCalledTimes(1)
      expect(mockAxios).toHaveBeenCalledWith('tracks/1234')
    })
  })
})
