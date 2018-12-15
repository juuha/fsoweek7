import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Form } from 'semantic-ui-react'

import { like, remove, addComment } from '../reducers/blogsReducer'

class Blog extends React.Component {
  static propTypes = {
    blogId: PropTypes.string.isRequired
  }
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

    if (blog === null || blog === undefined) return null
    const canDelete = blog.user === undefined || blog.user.username === JSON.parse(user).username
    return(
      <div>
        <h2>{blog.title}</h2>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes! <Button size='tiny' compact color='pink' onClick={() => this.props.like(blog)}>like</Button>
        </div>
        <div>
          added by {blog.user ? blog.user.name : 'no one'}
        </div>
        <div>
          {canDelete && <div>
            <Button size='tiny' compact inverted color='red' onClick={this.remove}>delete</Button>
          </div>}
        </div>
        <div>
          <h4>Comments:</h4>
          <ol>
            {blog.comments.map((comment, key) =>
              <li key={key}>{comment}</li>
            )}
          </ol>
          <div>
            <Form onSubmit={this.sendComment}>
              <input name='comment'></input>
              <Button color='blue' type='submit'>Add comment!</Button>
            </Form>
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