import React from 'react'
import { render } from '@testing-library/react'
import ThumbnailComponent from '../../components/ThumbnailComponent'

describe('ThumbnailComponent', () => {
  it('Should render ThumbnailComponent', () => {
    const { container } = render(
      <ThumbnailComponent action={() => null} img="imagen.png" label="test" />
    )
    expect(container.querySelector('img')?.src).toBe(
      'http://localhost/imagen.png'
    )
    expect(container.querySelector('h1')?.textContent).toBe('test')
  })
})
