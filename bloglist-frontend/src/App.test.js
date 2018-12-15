import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('When user is not logged in', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('renders login form and not blogs', () => {
      app.update()
      const notLoggedComponents = app.find('.notLogged')
      expect(notLoggedComponents.text()).toContain('password')
      
      const loggedComponents = app.find('.logged')
      expect(loggedComponents.length).toEqual(0)
    })
  })  

  describe('When user is logged in', () => {
    beforeEach(() => {
      app = mount(<App />)
      const user = {
        username: 'tester',
        token: '1231231234',
        name: 'Super Testaaja'
      }
      window.localStorage.setItem('loggedInBlogUser', JSON.stringify(user))
    })

    it('renders blogs', () => {
      app.update()
      const loggedComponents = app.find(Blog)
      expect(loggedComponents.length).toEqual(blogService.blogs.length)
    })
  })
})