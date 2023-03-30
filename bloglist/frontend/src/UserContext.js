import { createContext, useContext } from 'react'

const UserContext = createContext()

export const getUser = () => {
  const userAndDispatch = useContext(UserContext)

  return userAndDispatch[0]
}

export const getUserDispatch = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[1]
}

export default UserContext