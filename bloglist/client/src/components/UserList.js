/* eslint-disable */
import { Route, Routes, useMatch } from 'react-router-dom'
import User from './User'
import { useQuery } from 'react-query'
import { getUsers } from '../services/users'

const UserList = ( { users }) => {
/*
  const res = useQuery('users', getUsers, { retry: false })

  if(res.isLoading) {
    return <div>loading data...</div>
  }

  const users = res.data
*/
  return(
    <div>
    <table>
      <thead>
      <tr>
        <th></th>
        <th>blogs created</th>
      </tr>
      </thead>
      <tbody>
          { users.map(user =>
             <User key={user.id} user = {user}></User>
          )}
    </tbody>
    </table>

</div>
  )
}
export default UserList