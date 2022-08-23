import { render } from '@testing-library/react'
import React from 'react'
import InputComponent from '../../components/InputComponent'

describe('InputComponent', () => {
  it('should render', () => {
    const { container } = render(
      <InputComponent
        id="data"
        placeholder="a"
        value="test"
        onChange={() => null}
      />
    )
    expect(container.querySelector('input')?.value).toBe('test')
    expect(container.querySelector('input')?.placeholder).toBe('a')
    expect(container.querySelector('input')?.id).toBe('data')
  })
})
