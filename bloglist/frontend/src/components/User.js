import { Link } from 'react-router-dom'

const User = ({ user }) => {
  const style = {
    color: 'black',
  }

  if (!user) {
    return null
  }

  const blogs = user.blogs.length

  return (
    <tr>
      <td>
        <Link style={style} to={`/users/${user.id}`}>
          {user.name}
        </Link>
      </td>
      <td align="center">{blogs}</td>
    </tr>
  )
}
export default User
