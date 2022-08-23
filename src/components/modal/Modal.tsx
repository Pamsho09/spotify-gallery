import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal, IUiStore } from '../../store/slice/uiStore'
import ModalTrack from './ModalTrack'
const Modals: { [key: string]: JSX.Element } = {
  modalTrack: <ModalTrack />,
}
const Modal = () => {
  const dispatch = useDispatch()
  const { show, component: Component } = useSelector(
    (state: { ui: IUiStore }) => state.ui
  )
  return (
    <>
      {show && (
        <div className="z-30 w-full h-screen bg-slate-800/50 fixed grid place-items-center">
          <div
            className="z-40 w-full  h-screen bg-slate-800/50 fixed"
            onClick={() => dispatch(closeModal())}
          ></div>
          <div className="w-auto  h-auto bg-white rounded-md shadow-md z-50">
            {Modals[Component as keyof { [key: string]: JSX.Element }] &&
              Modals[Component]}
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
