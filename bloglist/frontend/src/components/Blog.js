import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

  const style = {
    color: 'black',
  }

  return (
    <tr>
      <td>
        <Link style={style} to = {`/blogs/${blog.id}`}>{blog.title}</Link>
      </td>
    </tr>
  )}


Blog.propTypes = {
  blog: PropTypes.object.isRequired,

}

export default Blog
