import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLikes, handleRemove }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showBlog, setShowBlog] = useState(false)

  const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
  const user = JSON.parse(loggedUserJSON)

  const handleShow = () => {
    setShowBlog(!showBlog)
  }

  if (showBlog === false) {
    return (
      <div style= {blogStyle}>
        {blog.title} <button onClick={handleShow}>{showBlog? 'hide' : 'view'}</button>
      </div>
    )

  } else {


    return(
      <div style = {blogStyle} className = 'blog'>
        <div>
          {blog.title} <button id='view' onClick={handleShow}>{showBlog? 'hide' : 'view'}</button>
        </div>
        <div>
          {blog.author}
        </div>
        <div>
          {blog.url}
        </div>
        <div>
        likes: {blog.likes} <button id='like' onClick={handleLikes}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <div>
          {user && user.name === blog.user.name ? <button id='remove' onClick ={handleRemove}>remove</button> : ''}
        </div>
      </div>
    )}
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikes: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
}

export default Blog