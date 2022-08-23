import { useRouter } from 'next/router'
import React from 'react'
import LoadingComponent from '../../../components/LoadingComponent'
import ThumbnailComponent from '../../../components/ThumbnailComponent'
import { ResponseItem } from '../../../service/dto/responseItem'
import {
  useGetAlbumsByArtistQuery,
  useGetArtistByIdQuery,
} from '../../../store/service/spotifyService'

const Index = () => {
  const router = useRouter()
  const { slug } = router.query
  const { data: artistDetail } = useGetArtistByIdQuery({
    id: slug as string,
  })
  const {
    data: albums,
    isLoading,
    isFetching,
  } = useGetAlbumsByArtistQuery({
    id: slug as string,
  })
  const handleClickThumbnail = (item: ResponseItem, type: string) => {
    router.push(`/${type}/${item.id}`)
  }
  return (
    <div className="w-3/4 m-auto">
      <div className="w-full flex flex-col sm:flex-row p-4 rounded-sm shadow-md gap-6">
        <img
          className="w-56 h-56 object-cover rounded-md"
          src={artistDetail?.img}
          alt={artistDetail?.name}
        />
        <div className="w-full flex flex-col justify-around">
          <h1 className="font-bold text-5xl">
            <a
              href={`https://open.spotify.com/artist/${artistDetail?.id}`}
              target={'_blank'}
              rel="noreferrer"
            >
              {artistDetail?.name}
            </a>
          </h1>
          <h4 className="text-3xl">Followers: {artistDetail?.followers}</h4>
        </div>
      </div>
      <div className="  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mt-6">
        {isLoading || isFetching ? (
          <LoadingComponent />
        ) : (
          albums?.map((item: ResponseItem) => (
            <ThumbnailComponent
              action={() => handleClickThumbnail(item, 'albums')}
              key={item.id}
              label={item.name}
              img={item.img}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Index
