import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog, user }) =>  {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLikes = (event) => {
    event.preventDefault()
    updateBlog(blog)
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    removeBlog(blog)
  }

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const titleView = { display: visible ? 'none' : '' }
  const infoView = { display: visible ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div style={titleView}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={infoView}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <br></br>
        {blog.url}
        <br></br>
        likes {blog.likes}
        <button onClick={addLikes}>like</button>
        <br></br>
        {blog.user.name}
        {user.username === blog.user.username && <button onClick={deleteBlog}>remove</button> }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog