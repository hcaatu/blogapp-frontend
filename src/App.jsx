import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  // blog form
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const timeout = () => {
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(`logging in with ${username} ${password}...`)

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
      setNotification('wrong username or password')
      timeout()
    } 
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out...')

    console.log(`${user.username} logged out`)
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const createBlog = async (event) => {
    event.preventDefault()
    console.log(`creating a new blog titled ${title}`)

    try {
      const blog = await blogService.createNew({ title, author, url })
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotification(`created a new blog titled ${title}`)
      timeout()
    } catch (exception) {
      console.log('oopsie')
      setNotification('an error occured')
      timeout()
    }
  }

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type='text' 
          value={username} 
          name='username'
          placeholder='username'
          onChange={({ target }) => setUsername(target.value)}>
        </input>
          <br></br>
        <input type='password' 
          value={password} 
          name='password'
          placeholder='password'
          onChange={({ target }) => setPassword(target.value)}>
        </input>
        <button type='submit'>login</button>
      </form>
    </div>
  )

  const logoutForm = () => (
    <div>
      <p>{user.name} logged in</p>
      <form onSubmit={handleLogout}>
        <button type='submit'>logout</button>
      </form>
    </div>
  )

  const addBlogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <input type="text" 
          value={title}
          name='title'
          placeholder='title'
          onChange={({ target }) => setTitle(target.value)}>
        </input>
          <br></br>
        <input type="text" 
          value={author}
          name='author'
          placeholder='author'
          onChange={({ target }) => setAuthor(target.value)}>
        </input>
          <br></br>
        <input type="text" 
          value={url}
          name='url'
          placeholder='url'
          onChange={({ target }) => setUrl(target.value)}>
        </input>
          <br></br>
        <button type='submit'>create</button>
      </form>
    </div>
  )


  return (
    <div>
      <h2>Blog App</h2>

      <Notification content={notification} />

      {!user && loginForm()}
      {user && <div>
          {logoutForm()}
          {addBlogForm()}
        </div>
        }

      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
      
    </div>
  )
}

export default App