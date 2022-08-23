export class ResponseTrack {
  artist: string[]
  name: string
  previewUrl: string
  id: string

  constructor(data: any) {
    this.artist = data.artists.map((item: any) => item.name)
    this.name = data.name
    this.previewUrl = data.preview_url
    this.id = data.id
  }
}
