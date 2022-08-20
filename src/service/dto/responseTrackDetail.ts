const milliseconds = 1000
const seconds = 60
const length = 2
export class ResposeTrackDetail {
  name: string
  spotifyUri: string
  previewUrl: string
  id: string
  duration: string
  album: {
    name: string
    id: string
    img: string
  }
  artists: { name: string; id: string }[]

  constructor(data: any) {
    this.name = data.name
    this.spotifyUri = data.uri
    this.previewUrl = data.preview_url
    this.id = data.id
    this.duration = `${data.duration_ms / milliseconds / seconds}:${(
      data.duration_ms % milliseconds
    )
      .toString()
      .padStart(length, '0')}`
    this.album = {
      name: data.album.name,
      id: data.album.id,
      img: data.album.images[0].url,
    }
    this.artists = data.artists.map((item: any) => ({
      name: item.name,
      id: item.id,
    }))
  }
}
