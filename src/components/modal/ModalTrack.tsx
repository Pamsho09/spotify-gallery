import React from 'react'
import { useSelector } from 'react-redux'
import { useGetTrackByIdQuery } from '../../store/service/spotifyService'
import { IUiStore } from '../../store/slice/uiStore'

const ModalTrack = () => {
  const { idTrack } = useSelector((state: { ui: IUiStore }) => state.ui)
  const { data } = useGetTrackByIdQuery({
    id: idTrack as string,
  })
  return (
    <div className="w-full p-6 flex h-auto gap-5 flex-col md:flex-row justify-center items-center">
      <img
        src={data?.album.img}
        className="w-56 object-cover rounded-sm"
        alt=""
      />
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-xl">{data?.name}</h1>
        <h4 className="text-lg">{data?.album.name}</h4>
        <h4 className="text-lg">
          Artist:{' '}
          {data?.artists.map((item) => (
            <a
              href={`https://open.spotify.com/artist/${item.id}`}
              target={'_blank'}
              rel="noreferrer"
              className="font-bold"
              key={item.id}
            >
              {item.name}{' '}
            </a>
          ))}
        </h4>
        <h4 className="text-lg">Duration : {data?.duration}</h4>
        <div className=" gap-3 flex flex-col">
          <audio controls src={data?.previewUrl} />
          <a
            className="font-bold text-green-500"
            rel="noreferrer"
            target="_blank"
            href={`https://open.spotify.com/track/${data?.id}`}
          >
            Continue to listen here
          </a>
        </div>
      </div>
    </div>
  )
}

export default ModalTrack
