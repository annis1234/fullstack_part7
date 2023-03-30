import { Form, Button } from 'react-bootstrap'

const LoginForm = ({
  onSubmit,
  name,
  password,
  onNameChange,
  onPasswordChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <Form.Group>
        <div>
          username
          <input
            type="text"
            id="username"
            value={name}
            name="Username"
            onChange={onNameChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            id="password"
            value={password}
            name="Password"
            onChange={onPasswordChange}
          />
        </div>
        <Button variant="secondary" id="login-button" type="submit">
          login
        </Button>
      </Form.Group>
    </form>
  )
}

export default LoginForm
