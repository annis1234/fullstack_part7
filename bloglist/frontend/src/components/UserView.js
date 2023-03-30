
const UserView = ( { userToShow }) => {

  if(!userToShow) {
    return null
  }

  const blogs = userToShow.blogs

  return(
    <div>
      <h2>{ userToShow.name }</h2>
      <h3>added blogs</h3>
      <ul>
        {blogs.map(blog =>
          <li key={blog.id}> {blog.title} </li>
        )}
      </ul>
    </div>
  )

}

export default UserView