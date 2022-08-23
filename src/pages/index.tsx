import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch } from 'react-redux'
import DropdownComponent, {
  IOptionsDropdown,
} from '../components/DropdownComponent'
import InputComponent from '../components/InputComponent'
import LoadingComponent from '../components/LoadingComponent'
import ThumbnailComponent from '../components/ThumbnailComponent'
import { ResponseItem } from '../service/dto/responseItem'
import { ResponseSearch } from '../service/dto/responseSearch'
import { useSearchQuery } from '../store/service/spotifyService'
import { openModal } from '../store/slice/uiStore'
interface IFormState {
  [key: string]: string
}
const optSearch: IOptionsDropdown[] = [
  {
    label: 'All',
    value: 'artist,album,track',
  },
  {
    label: 'Artist',
    value: 'artist',
  },
  {
    label: 'Album',
    value: 'album',
  },
  {
    label: 'Track',
    value: 'track',
  },
]
const Home: NextPage = () => {
  const router = useRouter()
  const [form, setForm] = React.useState<IFormState>({})
  const [optSelect, setOptSelect] = React.useState(optSearch[0])
  const dispatch = useDispatch()
  const handleChangeForm = (id: string, value: string) =>
    setForm({
      ...form,
      [id]: value,
    })
  const { data, isLoading, isFetching } = useSearchQuery(
    {
      p: form?.search || '',
      type: optSelect.value,
    },
    {
      skip: !form?.search,
    }
  )

  const handleClickThumbnail = (item: ResponseItem, type: string) => {
    switch (type) {
      case 'artists':
      case 'albums':
        router.push(`/${type}/${item.id}`)

        break
      case 'tracks':
        dispatch(
          openModal({
            component: 'modalTrack',
            id: item.id,
          })
        )
        break
    }
  }
  return (
    <div className=" w-full h-auto flex flex-col flex-1 justify-center items-center ">
      <div className="w-full  p-4 md:w-2/4 flex flex-col gap-12 transition ease-in-out delay-150 ">
        <h3 className="text-center text-lg md:text-4xl font-bold">
          Hi welcome to Spotifu Gallery here you can search for your favorite
          artist, album and track.
        </h3>
        <div className="w-full flex gap-3">
          <InputComponent
            id="search"
            onChange={handleChangeForm}
            value={form?.search}
            placeholder="Search"
          />
          <DropdownComponent
            onChange={(e) => setOptSelect(e)}
            options={optSearch}
            value={optSelect}
          />
        </div>
      </div>
      {form.search && (
        <>
          {isLoading || isFetching ? (
            <div className=" w-3/4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-6">
              <LoadingComponent />
            </div>
          ) : (
            data &&
            Object.keys(data).map((key) => (
              <div key={key} className="w-3/4">
                <h1>{key}</h1>
                <div className="  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mt-6">
                  {data[key as keyof ResponseSearch].map(
                    (item: ResponseItem) => (
                      <ThumbnailComponent
                        action={() => handleClickThumbnail(item, key)}
                        key={item.id}
                        label={item.name}
                        img={item.img}
                      />
                    )
                  )}
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  )
}

export default Home
