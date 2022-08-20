import React from 'react'
import { render } from '@testing-library/react'
import Index from '../../../pages'

describe('index', () => {
  it('should render the index page', () => {
    const { getByText } = render(<Index />)
    expect(getByText('Next.js')).toBe('')
  })
})
