import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css'
import { Container, Form, Button } from 'semantic-ui-react'

import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogInList from './components/BlogInList'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Users from './components/users'
import User from './components/user'
import Navigation from './components/Navigation'

import blogService from './services/blogs'
import loginService from './services/login'

import { notify } from './reducers/notificationReducer'
import { initUsers } from './reducers/usersReducer'
import { initBlogs } from './reducers/blogsReducer'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      title: '',
      author: '',
      url: ''
    }
  }

  componentDidMount() {
    this.props.initBlogs()
    this.props.initUsers()

    const loggedInBlogUser = window.localStorage.getItem('loggedInBlogUser')
    if (loggedInBlogUser) {
      const user = JSON.parse(loggedInBlogUser)
      blogService.setToken(user.token)
    }
  }

  handleTextFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  createBlog = async (event) => {
    event.preventDefault()
    this.BlogForm.toggleVisibility()
    try{
      const blog = await blogService.create({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      })

      this.props.notify(`a new blog '${blog.title}' by ${blog.author} added`)
      this.setState({ blogs:[...this.state.blogs, blog] })
      this.setState({ title: '', author: '', url: '' })
    } catch (exception) {
      this.props.notify('Missing either title or url', true)
    }
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      console.log(JSON.stringify(user))
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedInBlogUser', JSON.stringify(user))

      this.props.notify(`Logged in as ${user.username}`)
      this.setState({ username: '', password: '' })
    } catch (exception) {
      this.props.notify('Wrong username or password.', true)
    }
  }

  logout = () => {
    window.localStorage.removeItem('loggedInBlogUser')
    this.setState({})
    this.props.notify('Logged out!')
  }

  render() {
    const user = JSON.parse(window.localStorage.getItem('loggedInBlogUser'))
    if (user === null) {
      return (
        <Container>
          <div className="notLogged">
            <Notification />
            <h2>Log in to application</h2>
            <Form onSubmit={this.login}>
              <Form.Field>
                <label>username:</label>
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleTextFieldChange}
                />
              </Form.Field>
              <Form.Field>
                <label>password:</label>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleTextFieldChange}
                />
              </Form.Field>
              <div>
                <Button color='blue' type="submit">login</Button>
              </div>
            </Form>
          </div>
        </Container>
      )
    }
    return (
      <Container>
        <div className="logged">
          <h2>Blog app</h2>
          <Router>
            <div>
              <div>
                <Navigation logout={this.logout} user={user}/>
              </div>
              <Notification/>
              <div>
                <br/>
                <Togglable buttonLabel="new blog" ref={ component => this.BlogForm = component }>
                  <BlogForm
                    onSubmit={this.createBlog}
                    title={this.state.title}
                    author={this.state.author}
                    url={this.state.url}
                    handleChange={this.handleTextFieldChange}
                  />
                </Togglable>
              </div>
              <div>
                <Route exact path='/' render={() =>
                  <div>
                    {this.props.blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                      <BlogInList
                        key={blog._id}
                        blog={blog}
                      />
                    )}
                  </div>
                }/>
              </div>

              <Route exact path='/users' render={() => <Users />} />

              <Route path='/users/:id' render={({ match }) =>
                <User userId={match.params.id} />
              }/>

              <Route path='/blogs/:id' render={({ history, match }) =>
                <Blog blogId={match.params.id} history={history} />
              } />
            </div>
          </Router>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs ? state.blogs : []
  }
}

export default connect(
  mapStateToProps,
  { notify, initUsers, initBlogs }
)(App)
