export class ResponseAlbumDetail {
  name: string
  id: string
  img: string
  releaseDate: string
  uri: string
  type: string

  constructor(data: any) {
    this.name = data.name
    this.id = data.id
    this.img = data.images[0].url
    this.releaseDate = data.release_date
    this.uri = data.uri
    this.type = data.album_type
  }
}
