import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch } from 'react-redux'
import LoadingComponent from '../../../components/LoadingComponent'
import ThumbnailComponent from '../../../components/ThumbnailComponent'
import { ResponseItem } from '../../../service/dto/responseItem'
import {
  useGetAlbumByIdQuery,
  useGetTracksByAlbumIdQuery,
} from '../../../store/service/spotifyService'
import { openModal } from '../../../store/slice/uiStore'
import Custom404 from '../../404'

const Index = () => {
  const router = useRouter()
  const { slug } = router.query
  const dispatch = useDispatch()
  const { data: albumDetail, error } = useGetAlbumByIdQuery({
    id: slug as string,
  })
  const {
    data: albums,
    isLoading,
    isFetching,
  } = useGetTracksByAlbumIdQuery({
    id: slug as string,
  })
  const handleClickThumbnail = (item: ResponseItem) => {
    dispatch(
      openModal({
        component: 'modalTrack',
        id: item.id,
      })
    )
  }
  return (
    <>
      {!error ? (
        <div className="w-3/4 m-auto">
          <div className="w-full flex flex-col sm:flex-row p-4 rounded-sm shadow-md gap-6">
            <img
              className="w-56 h-56 object-cover rounded-md"
              src={albumDetail?.img}
              alt={albumDetail?.name}
            />
            <div className="w-full flex flex-col justify-around">
              <h1 className="font-bold text-5xl">
                <a
                  href={`https://open.spotify.com/album/${albumDetail?.id}`}
                  target={'_blank'}
                  rel="noreferrer"
                >
                  {albumDetail?.name}
                </a>
              </h1>
              <h4 className="text-3xl">
                Relese date: {albumDetail?.releaseDate}
              </h4>
            </div>
          </div>
          <div className="  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mt-6">
            {isLoading || isFetching ? (
              <LoadingComponent />
            ) : (
              albums?.map((item: ResponseItem) => (
                <ThumbnailComponent
                  action={() => handleClickThumbnail(item)}
                  key={item.id}
                  label={item.name}
                  img={albumDetail?.img || ''}
                />
              ))
            )}
          </div>
        </div>
      ) : (
        <Custom404 />
      )}
    </>
  )
}

export default Index
