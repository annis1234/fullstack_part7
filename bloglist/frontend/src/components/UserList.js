import User from './User'

const UserList = ({ users }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User key={user.id} user={user}></User>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default UserList
