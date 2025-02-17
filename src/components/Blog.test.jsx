import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('renders', () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    user: {
      username: 'koira',
      password: 'kissa',
      name: 'superuser'
    },
  }

  test('title', () => {
    const { container } = render(<Blog blog={blog} user={{ username: null }} />)
    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent(
      'React patterns Michael Chan'
    )
  })

  test('more info when button is clicked', async () => {
    const { container } = render(<Blog blog={blog} user={{ username: null }} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'React patterns Michael Chan'
    )
    expect(div).toHaveTextContent(
      'https://reactpatterns.com/'
    )
    expect(div).toHaveTextContent(
      'likes'
    )
    expect(div).toHaveTextContent(
      'superuser'
    )
  })
})

test('mock hander is called twice when blog is likes twice', async () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    user: {
      username: 'koira',
      password: 'kissa',
      name: 'superuser'
    },
  }

  const mockHandler = vi.fn()

  render(
    <Blog blog={blog} updateBlog={mockHandler} user={{ username: null }} />
  )

  const user = userEvent.setup()
  const showButton = screen.getByText('view')
  await user.click(showButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
