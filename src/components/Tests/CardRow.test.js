import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Card from '../Game/Card'
import CardRow from '../Game/CardRow'
import { mockCardRow } from './mocks/mockBoard'

Enzyme.configure({ adapter: new Adapter() })

describe('CardRow ', () => {
  it('renders four cards', () => {
    const wrapper = shallow(
      <CardRow cardRow={mockCardRow} gameLevel={'easy'} cardClick={() => null} />
    )
    expect(wrapper.find(Card)).length === 4
  })
})
