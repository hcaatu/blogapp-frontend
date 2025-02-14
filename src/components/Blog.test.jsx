import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
  }

  render(<Blog blog={blog} user={{ username: null }} />)

  const title = screen.getByText('React patterns')
  expect(title).toBeDefined()
})
