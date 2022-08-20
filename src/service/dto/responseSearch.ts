import { ResponseItem } from './responseItem'

export class ResponseSearch {
  albums: ResponseItem[]
  artists: ResponseItem[]
  tracks: ResponseItem[]

  constructor(data: any) {
    this.albums = data.albums?.items?.map(
      (item: any) => new ResponseItem(item.name, item.id, item.images[0].url)
    )
    this.artists = data.artists?.items?.map(
      (item: any) => new ResponseItem(item.name, item.id, item.images[0].url)
    )
    this.tracks = data.tracks?.items?.map(
      (item: any) =>
        new ResponseItem(item.name, item.id, item.album.images[0].url)
    )
  }
}
