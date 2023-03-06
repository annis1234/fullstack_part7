import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('test BlogForm', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm create = {createBlog}/>)

  const inputs = screen.getAllByRole('textbox')

  const save = screen.getByText('save')

  await user.type(inputs[0], 'testTitle')
  await user.type(inputs[1], 'testAuthor')
  await user.type(inputs[2], 'testUrl')

  await user.click(save)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testTitle')
  expect(createBlog.mock.calls[0][0].author).toBe('testAuthor')
  expect(createBlog.mock.calls[0][0].url).toBe('testUrl')
})