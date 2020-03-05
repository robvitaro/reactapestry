import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react'
import ResourceTrackMessage, {costImageSources} from "./ResourceTrackMessage";

// describe('<ResourceTrackMessage />', () => {
//   it('renders blank when not PayingCost', () => {
//     const myMock = jest.fn();
//     myMock.mockReturnValue('');
//     const adv =  {state: {matches: myMock}}
//     const {asFragment, container} = render(<ResourceTrackMessage advanceTurnState={adv} />);
//     // debug()
//     expect(asFragment()).toMatchSnapshot()
//     // expect(wrapper).contains(<p className="smallMessage animated pulse"><span>&nbsp;</span></p>).to.equal(true)
//   });
//
//   it.skip('renders wild image in PayingCost', () => {
//     const mockMethod = jest.fn(() => 'PayingCost');
//     adv.state = {}
//     adv.state.matches = mockMethod;
//
//     const wrapper = shallow(<ResourceTrackMessage advanceTurnState={adv} />);
//     expect(wrapper).contains(<p className="smallMessage animated pulse"><span>To advance, pay: <img
//       className="icon-in-text" src="wild.png"/></span></p>).to.equal(true)
//   });
// });

describe('costImageSources()', () => {
  it('returns empty array when there is no cost', () => {
    const adv =  {state: {context:{advancementCost: []}}}
    const result = costImageSources(adv)
    expect(result).toStrictEqual([])
  })

  it('returns array of image sources when there is cost', () => {
    const adv =  {state: {context:{advancementCost: ['wild', 'wild', 'culture']}}}
    const result = costImageSources(adv)
    expect(result).toStrictEqual(['culture.png','wild.png', 'wild.png'])
  })
})