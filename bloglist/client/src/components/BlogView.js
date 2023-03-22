import { useQueryClient, useMutation } from 'react-query'
import { update, remove } from '../services/blogs'

const BlogView = ( { blog, user } ) => {

  const queryClient = useQueryClient()
  const updateBlogMutation = useMutation(update, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  })

  const removeBlogMutation = useMutation(remove, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  })

  const handleLikes = () => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes +1 })
  }

  const handleRemove = () => {
    removeBlogMutation.mutate(blog)
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{ blog.title } { blog.author }</h2>
      <div>
        {blog.url}
      </div>
      <div>
        {blog.likes} <button id='like' onClick={handleLikes}>like</button>
      </div>
      <div>
        {blog.user.name}
      </div>
      <div>
        {user && user.name === blog.user.name ? <button id='remove' onClick={handleRemove} >remove</button> : ''}
      </div>
    </div>

  )

}

export default BlogView