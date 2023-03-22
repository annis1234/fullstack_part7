import { Routes, Route, Link, useMatch } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getUsers } from '../services/users'
import UserList from './UserList'
import UserView from './UserView'
import BlogView from './BlogView'
import BlogList from './BlogList'

const Menu = ( { user }) => {
  const padding = {
    paddingRight:5
  }

  const userResult = useQuery('users', getUsers, { retry: false })
  const blogsResult = useQuery('blogs', getUsers, { retry: false })
  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')

  if(userResult.isLoading) {
    return <div>loading data...</div>
  }

  if(blogsResult.isLoading) {
    return <div>loading data...</div>
  }

  const users = userResult.data

  const blogs = blogsResult.data

  const userToShow = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogToShow = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null


  return (
    <div>
      <div>
        <Link style={padding} to ='/users'>users</Link>
        <Link style={padding} to ='/'>blogs</Link>
      </div>
      <Routes>
        <Route path ='/users/:id' element={<UserView userToShow = { userToShow }/>}/>
        <Route path ='/blogs/:id' element={<BlogView blog = { blogToShow } user = { user }/>}/>
        <Route path ='/users' element={<UserList users = { users }/>} />
        <Route path ='/' element={<BlogList user = {user} />}/>
      </Routes>
    </div>
  )
}

export default Menu