import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(`logging in with ${username} ${password}`)

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
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


  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in</p>
        </div>
        }
      
    </div>
  )
}

export default App