import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import DropdownComponent, {
  IOptionsDropdown,
} from '../../components/DropdownComponent'

describe('DropdownComponent', () => {
  it('Should render DropdownComponent', () => {
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
    const { container } = render(
      <DropdownComponent
        onChange={() => null}
        value={optSearch[0]}
        options={optSearch}
      />
    )
    expect(container.querySelector('button')?.innerHTML).toContain('All')
    expect(container.querySelector('ul')).toBeNull()
  })

  it('Should render DropdownComponent and render list potions when click in button', () => {
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
    const { container } = render(
      <DropdownComponent
        onChange={() => null}
        value={optSearch[0]}
        options={optSearch}
      />
    )
    expect(container.querySelector('button')?.innerHTML).toContain('All')
    fireEvent.click(container.querySelector('button')!)
    expect(container.querySelector('ul')?.childNodes).toHaveLength(4)
  })
})
