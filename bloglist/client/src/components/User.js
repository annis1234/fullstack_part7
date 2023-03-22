import { Link } from 'react-router-dom'

const User = ({ user }) => {

  if (!user) {
    return null
  }

  const blogs = user.blogs.length

  return(
    <tr>
      <td><Link to= {`/users/${user.id}`}>{user.name}</Link></td>
      <td>{blogs}</td>
    </tr>
  )
}
export default User