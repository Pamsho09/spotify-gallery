import React from 'react'
import { render } from '@testing-library/react'
import LoadingComponent from '../../components/LoadingComponent'

describe('LoadingComponent', () => {
  it('Should render LoadingComponent', () => {
    const { container } = render(<LoadingComponent />)
    expect(container.querySelectorAll('svg')).toHaveLength(12)
  })
})
