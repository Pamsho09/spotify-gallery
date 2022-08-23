import React from 'react'

const Custom404 = (): JSX.Element => (
  <div className="flex-1 w-80 grid m-auto place-items-center ">
    <div className="text-center w-6/12 flex flex-col justify-center items-center text-black ">
      <img src="/notfound.png" className="w-full max-w-xs" />
      <h3>
        <span className="w-full">Hmmm!</span>{' '}
        {`Didn't find what you were looking
        for.`}
      </h3>
      <h4 className="font-o">Forgive me </h4>
    </div>
  </div>
)
export default Custom404
