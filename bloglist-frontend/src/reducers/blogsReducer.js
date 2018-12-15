import blogsService from '../services/blogs'

import { notifyWithDispatch } from './notificationReducer'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.blogs
    case 'UPDATE_BLOG':
      return state.map(blog => blog._id === action.updatedBlog.id ? blog : action.updatedBlog)
    case 'REMOVE_BLOG':
      return state.filter(blog => blog._id !== action.blog._id)
    default:
      return state
  }
}

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      blogs
    })
  }
}

export const like = (blog) => {
  return async (dispatch) => {
    blog.likes = blog.likes + 1
    const updatedBlog = await blogsService.update(blog, blog._id)
    notifyWithDispatch(`Blog '${updatedBlog.title}' has been liked.`, false, dispatch)

    dispatch({
      type: 'UPDATE_BLOG',
      updatedBlog
    })
  }
}

export const remove = (blog) => {
  return async (dispatch) => {
    if (window.confirm(`delete '${blog.title}' by ${blog.author}?`)){
      await blogsService.remove(blog._id)

      notifyWithDispatch('Blog deleted successfully.', false, dispatch)
      dispatch({
        type: 'REMOVE_BLOG',
        blog
      })
    }
  }
}

export const addComment = (blog, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogsService.addComment(blog, comment)
    notifyWithDispatch(`Comment '${comment}' added to '${blog.title}'`, false, dispatch)
    dispatch({
      type: 'UPDATE_BLOG',
      updatedBlog
    })
  }
}

export default reducer