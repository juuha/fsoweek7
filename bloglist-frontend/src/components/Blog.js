import React from 'react'
import { connect } from 'react-redux'

import { like, remove, addComment } from '../reducers/blogsReducer'

class Blog extends React.Component {
  remove = () => {
    this.props.remove(this.props.blog)
    this.props.history.push('/')
  }

  sendComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    this.props.addComment(this.props.blog, comment)
    event.target.comment.value = ''
  }

  render(){
    const { blog } = this.props
    const user = window.localStorage.getItem('loggedInBlogUser')
    
    if (blog === null || blog === undefined) return null
    const canDelete = blog.user === undefined || blog.user.username === JSON.parse(user).username
    return(
      <div>
        <h2>{blog.title}</h2>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes! <button onClick={() => this.props.like(blog)}>like</button>
        </div>
        <div>
          added by {blog.user ? blog.user.name : 'no one'}
        </div>
        <div>
          {canDelete && <div>
            <button onClick={this.remove}>delete</button>  
          </div>}
        </div>
        <div>
          <h4>Comments:</h4>
          <ul>
            {blog.comments.map((comment, key) => 
              <li key={key}>{comment}</li>   
            )}
          </ul>
          <div>
            <form onSubmit={this.sendComment}>
              <input name='comment'></input>
              <button type='submit'>Add comment!</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, { blogId }) => {
  if (state.blogs === null) {
    return { blog: null }
  }
  return {
    blog: state.blogs.find(blog => blog._id === blogId)
  }
}

export default connect(
  mapStateToProps,
  { like, remove, addComment }
)(Blog)