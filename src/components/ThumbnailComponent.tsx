import React from 'react'
interface Iprops {
  label: string
  img: string
  action: () => void
}
const ThumbnailComponent = ({ label, img, action }: Iprops) => (
  <div
    className="flex-col gap-3 flex box-border px-2 md:px-10 py-5 w-full h-full shadow-lg rounded-lg cursor-pointer "
    onClick={action}
  >
    <div className="flex justify-center items-center  h-full w-auto overflow-hidden rounded  ">
      <img
        className="w-full text-gray-200  object-contain rounded-md   flex-1 h-32"
        src={img}
      />
    </div>
    <div className=" w-full">
      <h1>{label}</h1>
    </div>
  </div>
)

export default ThumbnailComponent
