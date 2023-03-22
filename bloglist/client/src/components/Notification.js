const Notification = ({ message }) => {

  if (message) {

    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      <div style={style}>
        {message}
      </div>
    )
  }
}

export default Notification