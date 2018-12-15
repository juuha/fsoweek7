import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
  let blogComponent
  let blog
  let user
  let mockAddLike
  let mockDeleteBlog

  beforeEach(() => {
    blog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 'likes',
      user: 'user'
    }
    user = {
      id: 1,
      name: 'user',
      username: 'username'
    }
    mockAddLike = () => {
      console.log('added like')
    }
    mockDeleteBlog = () => {
      console.log('deleted')
    }

    blogComponent = shallow(<Blog blog={blog} user={user} addLike={mockAddLike} deleteBlog={mockDeleteBlog}/>)
  })

  it('renders title and author', () => {
    const visibleDiv = blogComponent.find('.visible')

    expect(visibleDiv.text()).toContain(blog.title)
    expect(visibleDiv.text()).toContain(blog.author)
  })

  it('before clicking name, doesn\'t display the details', () => {
    const hiddenDiv = blogComponent.find('.hidden')

    expect(hiddenDiv.getElement().props.style).toEqual({ display: 'none', margin: 5 })
  })

  it('after clicking the button, displays the details', () => {
    const button = blogComponent.find('.button')
    button.simulate('click')

    const hiddenDiv = blogComponent.find('.hidden')
    expect(hiddenDiv.text()).toContain(blog.url)
    expect(hiddenDiv.text()).toContain(blog.likes)
    expect(hiddenDiv.text()).toContain('added by')
  })
})