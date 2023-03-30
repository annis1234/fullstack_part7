import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import LinkRouter from './components/LinkRouter'
import Menu from './components/Menu'
import './index.css'
import Notification from './components/Notification'
import NotificationContext from './NotificationContext'
import UserContext from './UserContext'
import NotificationReducer from './reducers/NotificationReducer'
import UserReducer from './reducers/UserReducer'
import { useReducer } from 'react'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, userDispatch] = useReducer(UserReducer)
  const [notification, notificationDispatch] = useReducer(NotificationReducer)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({
        type: 'SET_USER',
        payload: user,
      })
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({
        type: 'SET_USER',
        payload: user,
      })
      setUsername('')
      setPassword('')
    } catch (exeption) {
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: 'wrong username or password',
      })
      setTimeout(() => {
        notificationDispatch({
          type: 'REMOVE_NOTIFICATION',
        })
      }, 5000)
    }
  }

  const handleLogout = () => {
    userDispatch({
      type: 'LOGOUT_USER',
    })
    window.localStorage.removeItem('loggedBloglistUser')
  }

  const handleNameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const padding = {
    color: 'black',
    fontFamily: 'Chalkduster',
    fontSize: 60,
  }

  const Header = () => {
    return (
      <div>
        <h1 style={padding}>blog app</h1>
      </div>
    )
  }

  if ((user === undefined) | (user === null)) {
    return (
      <UserContext.Provider value={[user, userDispatch]}>
        <NotificationContext.Provider
          value={[notification, notificationDispatch]}
        >
          <div className="container">
            <Notification message={notification} />
            <h2>Log in to application</h2>
            <LoginForm
              onSubmit={handleLogin}
              name={username}
              password={password}
              onNameChange={handleNameChange}
              onPasswordChange={handlePasswordChange}
            />
          </div>
        </NotificationContext.Provider>
      </UserContext.Provider>
    )
  }

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      <NotificationContext.Provider
        value={[notification, notificationDispatch]}
      >
        <div className="container">
          <div>
            <Menu handleLogout={handleLogout} />
          </div>
          <div>
            <Header />
          </div>
          <LinkRouter />
        </div>
      </NotificationContext.Provider>
    </UserContext.Provider>
  )
}

export default App
