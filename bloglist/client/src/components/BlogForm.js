import { useState } from 'react'

const BlogForm = ({ create }) => {
  const [blogTitle, setTitle] = useState('')
  const [blogAuthor, setAuthor] = useState('')
  const [blogUrl, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    create({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
                    Title:
          <input
            type='text'
            id = 'title'
            value={blogTitle}
            name='Title'
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div>
                    Author:
          <input
            type='text'
            id = 'author'
            name='Author'
            value={blogAuthor}
            onChange={event => setAuthor(event.target.value)}
          />
        </div>
        <div>
                    Url:
          <input
            type='text'
            id = 'author'
            name='Url'
            value={blogUrl}
            onChange={event => setUrl(event.target.value)}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm