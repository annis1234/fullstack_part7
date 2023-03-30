import { useRef } from 'react'
import { useQueryClient, useMutation, useQuery } from 'react-query'
import Blog from './Blog'
import { create, getBlogs } from '../services/blogs'
import { useReducer } from 'react'
import Notification from '../components/Notification'
import NotificationReducer from '../reducers/NotificationReducer'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import { Table } from 'react-bootstrap'

const BlogList =  () => {


  const blogFormRef = useRef()
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useReducer(NotificationReducer)

  const newBlogMutation = useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  })


  const handleCreate = newBlog => {
    try {

      blogFormRef.current.toggleVisibility()
      newBlogMutation.mutate(newBlog)

      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `a new blog ${newBlog.title} by ${newBlog.author} was added`
      })
      setTimeout(() => {
        notificationDispatch({
          type: 'REMOVE_NOTIFICATION'
        })}, 5000)
    } catch(exeption) {
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: 'check blog information'
      })
      setTimeout(() => {
        notificationDispatch({
          type: 'REMOVE_NOTIFICATION'
        })
      }, 5000)
    }
  }

  const res = useQuery('blogs', getBlogs, { retry: false })
  if (res.isLoading) {
    return <div>loading data... </div>
  }

  if (res.isError) {
    return <div>error</div>
  }

  const blogs = res.data
  const sorted = blogs.sort((a,b) => b.likes-a.likes)


  return (
    <div>
      <Notification message = {notification}/>
      <Togglable buttonLabel ='create a new blog' ref={blogFormRef}>
        <BlogForm create = {handleCreate} />
      </Togglable>
      <Table striped>
        <tbody>
          { sorted.map(blog =>
            <Blog key = {blog.id} blog = {blog}/>
          )}
        </tbody>
      </Table>
    </div>
  )

}

export default BlogList