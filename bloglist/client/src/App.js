import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import './index.css'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs(blogs.sort((a,b) => b.likes-a.likes))
      )
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')

    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exeption) {
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBloglistUser')
  }

  const handleCreate = async (newBlog) => {

    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(
        newBlog
      )
      setBlogs(blogs.concat(blog))
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} was added`)
      setTimeout(() => {
        setMessage(null) }, 5000)
    } catch(exeption) {
      setMessage('check blog information')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

  }

  const handleLikes = async (id) => {

    const blogToLike = blogs.find((blog) => blog.id === id)

    const updatedBlog = {
      title: blogToLike.title,
      author: blogToLike.author,
      url: blogToLike.url,
      likes: blogToLike.likes + 1
    }

    const response = await blogService.update(blogToLike.id, updatedBlog)

    setBlogs(blogs.map(blog => blog.id !== blogToLike.id ? blog : response))

    const blogsToSort = await blogService.getAll()
    setBlogs(blogsToSort.sort((a,b) => b.likes-a.likes))

  }

  const handleRemove =async (id) => {

    const blogToRemove = blogs.find((blog) => blog.id === id)

    if (window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)){
      await blogService.remove(blogToRemove.id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

  const handleNameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className ='notification'>
        {message}
      </div>
    )
  }
  if (user===null) {

    return(
      <div>
        <Notification message = {message}/>
        <h2>Log in to application</h2>
        <LoginForm onSubmit = {handleLogin} name = {username} password = {password}
          onNameChange = {handleNameChange} onPasswordChange = {handlePasswordChange}/>
      </div>
    )
  }

  return (
    <div>

      <Notification message = {message}/>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout} >logout</button></p>
      <h2>create a new</h2>
      <Togglable buttonLabel ='create a new blog' ref={blogFormRef}>
        <BlogForm create = {handleCreate} loggedUser = {user}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key = {blog.id} blog ={blog} handleLikes = {() => handleLikes(blog.id)} handleRemove = {() => handleRemove(blog.id)}/>
      )}
    </div>
  )}




export default App