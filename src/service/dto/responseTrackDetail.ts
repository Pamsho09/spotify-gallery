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
    this.duration = millisToMinutesAndSeconds(data.duration_ms)
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

const millisToMinutesAndSeconds = (millis: number) => {
  const MINUTES = 60000
  const SECONDS = 1000
  const DIGITS = 2
  const minutes = Math.floor(millis / MINUTES)
  const seconds = ((millis % MINUTES) / SECONDS).toFixed(0)
  return `${minutes}:${seconds.padStart(DIGITS, '0')}`
}
