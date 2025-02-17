import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlogFrom from './AddBlogForm'

test('createBlog is called with correct information when blog is created', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(
    <AddBlogFrom  createBlog={createBlog}/>
  )
  screen.debug()

  const title = screen.getByPlaceholderText('title')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')
  const sendButton = screen.getByText('Save')

  await user.type(title, 'React Patterns')
  await user.type(author, 'Michael Chan')
  await user.type(url, 'https://reactpatterns.com/')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('React Patterns')
  expect(createBlog.mock.calls[0][0].author).toBe('Michael Chan')
  expect(createBlog.mock.calls[0][0].url).toBe('https://reactpatterns.com/')
})