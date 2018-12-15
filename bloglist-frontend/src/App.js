import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      title: '',
      author: '',
      url: '',
      error: null,
      message: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

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

      this.setState({ message: `a new blog '${blog.title}' by ${blog.author} added` })
      this.setState({ blogs:[...this.state.blogs, blog]})
      this.setState({ title: '', author: '', url: '' })
      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)
    } catch (exception) {
      this.setState({
        error: 'Missing either title or url'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  deleteBlog = async (blog) => {
    try{
      await blogService.remove(blog._id)
      this.setState({ message: "Blog deleted successfully." })
      const updatedBlogs = this.state.blogs.filter(b => b._id !== blog._id)
      this.setState({
        blogs: updatedBlogs
      })
      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)
    } catch (exception) {
      this.setState({
        error: 'Something went wrong.'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  addLike = async (blog) => {
    try{
      const likedBlog = await blogService.update({
        likes: blog.likes,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }, blog._id)
      

      this.setState({ message: `Blog '${likedBlog.title}' has been liked.` })
      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)
    } catch (exception) {
      this.setState({
        error: 'Something went wrong..'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
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

      this.setState({ username: '', password: '', message: `Logged in as ${user.username}` })
      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)
    } catch (exception) {
      this.setState({
        error: 'Wrong username or password.'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = () => {
    window.localStorage.removeItem('loggedInBlogUser')
    this.setState({ message: "Logged out." })
  }

  render() {
    const user = JSON.parse(window.localStorage.getItem('loggedInBlogUser'))

    if (user === null) {
      return (
        <div className="notLogged">
          <Notification error={this.state.error} message={this.state.message} />
          <h2>Log in to application</h2>
          <form onSubmit={this.login}>
            <div>
              username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleTextFieldChange}
              />
            </div>
            <div>
              password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleTextFieldChange}
              />
            </div>
            <div>
              <button type="submit">login</button>
            </div>
          </form>
        </div>
      )
    }
    return (
      <div className="logged">
        <h2>blogs</h2>
        <Notification error={this.state.error} message={this.state.message} />
        <p>{user.name} logged in
          <input type="button" value="logout" style={{margin: 5}} onClick={this.logout}/>
        </p>

        <Togglable buttonLabel="new blog" ref={ component => this.BlogForm = component }>
          <BlogForm 
            onSubmit={this.createBlog}
            title={this.state.title}
            author={this.state.author}
            url={this.state.url}
            handleChange={this.handleTextFieldChange}
          />
        </Togglable>

        {this.state.blogs.sort((a, b) => b.likes - a.likes).map(blog => 
          <Blog 
            key={blog._id} 
            blog={blog} 
            addLike={this.addLike}
            deleteBlog={this.deleteBlog}
            user={user}
          />
        )}
      </div>
    )
  }
}

export default App;
