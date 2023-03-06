import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title', () => {
  const blog={
    title: 'testblog',
    author: 'testauthor',
    url: 'testurl',
    likes: 2
  }
  render(<Blog blog={blog}/>)

  const e = screen.getByText('testblog')
  expect(e).toBeDefined()
})

test('shows blog info after clicking view', async() => {

  const testUser = {
    username: 'testUser',
    name : 'testUser'
  }

  const blog ={
    title: 'testblog',
    author: 'testauthor',
    url: 'testurl',
    likes: 2,
    user: testUser
  }

  render(<Blog blog = {blog}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const url = screen.getByText('testurl')
  const likes = screen.getByText('likes: 2')
  const blogAdder = screen.getByText('testUser')

  expect(url).toBeDefined()
  expect(likes).toBeDefined()
  expect(blogAdder).toBeDefined()
})

test('clicking like twice calls event handler twice', async() => {

  const testUser = {
    username: 'testUser',
    name : 'testUser'
  }

  const blog ={
    title: 'testblog',
    author: 'testauthor',
    url: 'testurl',
    likes: 2,
    user: testUser
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog = {blog} handleLikes = {mockHandler}/>
  )

  const user = userEvent.setup()

  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.dblClick(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})