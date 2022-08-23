export class ResponseArtistDetail {
  name: string
  id: string
  img: string
  followers: number
  uri: string

  constructor(data: any) {
    this.name = data.name
    this.id = data.id
    this.img = data.images[0].url
    this.followers = data.followers.total
    this.uri = data.href
  }
}
