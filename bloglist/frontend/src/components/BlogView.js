import { useQueryClient, useMutation } from 'react-query'
import { update, remove, addComment } from '../services/blogs'
import { getUser } from '../UserContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BlogView = ({ blog }) => {
  const user = getUser()
  const navigate = useNavigate()

  const [comment, setComment] = useState('')

  const queryClient = useQueryClient()
  const updateBlogMutation = useMutation(update, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const removeBlogMutation = useMutation(remove, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
      navigate('/')
    },
  })

  const newCommentMutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const handleLikes = () => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const handleRemove = () => {
    removeBlogMutation.mutate(blog)
  }

  const createComment = async (comment) => {
    newCommentMutation.mutate(comment)
  }

  const handleAddComment = (event) => {
    event.preventDefault()

    createComment({
      content: comment,
      blog: blog,
    })

    setComment('')
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>{blog.url}</div>
      <div>
        {blog.likes}{' '}
        <button id="like" onClick={handleLikes}>
          like
        </button>
      </div>
      <div>{blog.user.name}</div>
      <div>
        {user && user.name === blog.user.name ? (
          <button id="remove" onClick={handleRemove}>
            remove
          </button>
        ) : (
          ''
        )}
      </div>
      <div>
        <h2>comments</h2>
      </div>
      <div>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </div>
      <div>
        <form onSubmit={handleAddComment}>
          <input
            type="text"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  )
}

export default BlogView
