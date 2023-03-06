const LoginForm = ({ onSubmit, name, password, onNameChange, onPasswordChange }) => {

  return(
    <form onSubmit = {onSubmit}>
      <div>
        username
        <input
          type='text'
          id ='username'
          value={name}
          name='Username'
          onChange={onNameChange}
        />
      </div>
      <div>
        password
        <input
          type='password'
          id ='password'
          value={password}
          name='Password'
          onChange={onPasswordChange}
        />
      </div>
      <button id='login-button' type ='submit'>login</button>
    </form>
  )
}

export default LoginForm