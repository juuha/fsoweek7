import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'semantic-ui-react'

const BlogForm = ({ onSubmit, handleChange, title, author, url }) => {
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={author}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Url:</label>
          <input
            type="text"
            name="url"
            value={url}
            onChange={handleChange}
          />
        </Form.Field>
        <Button inverted color='green' type="submit">create</Button>
      </Form>
    </div>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default BlogForm