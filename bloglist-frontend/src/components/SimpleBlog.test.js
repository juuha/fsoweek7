import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  it('renders title, author and likes', () => {
    const simpleBlog = {
      title: 'Jepulis',
      author: 'minä',
      likes: 50
    }

    const blogComponent = shallow(<SimpleBlog blog={simpleBlog} />)
    const titleDiv = blogComponent.find('.title')
    const likesDiv = blogComponent.find('.likes')

    expect(titleDiv.text()).toContain(simpleBlog.title)
    expect(titleDiv.text()).toContain(simpleBlog.author)
    expect(likesDiv.text()).toContain(simpleBlog.likes)
  })

  it('calls handler when button is pressed', () => {
    const mockHandler = jest.fn()

    const simpleBlog = {
      title: 'Jepulis',
      author: 'minä',
      likes: 50
    }

    const blogComponent = shallow(<SimpleBlog blog={simpleBlog} onClick={mockHandler}/>)
  
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})