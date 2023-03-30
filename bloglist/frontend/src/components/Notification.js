import { Alert } from 'react-bootstrap'
const Notification = ({ message }) => {

  if (message) {

    return (
      <div >
        {(message &&
        <Alert variant="info">
          {message}
        </Alert>
        )}
      </div>
    )
  }
}

export default Notification
