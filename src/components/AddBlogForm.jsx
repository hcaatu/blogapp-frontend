import { useState } from 'react'

const AddBlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
          <h2>Create a new blog</h2>
          
          <form onSubmit={addBlog}>
            <input type="text" 
              value={title}
              name='title'
              placeholder='title'
              onChange={event => setTitle(event.target.value)}>
            </input>
              <br></br>

            <input type="text" 
              value={author}
              name='author'
              placeholder='author'
              onChange={event => setAuthor(event.target.value)}>
            </input>
              <br></br>

            <input type="text" 
              value={url}
              name='url'
              placeholder='url'
              onChange={event => setUrl(event.target.value)}>
            </input>
              <br></br>
              
            <button type='submit'>Save</button>
          </form>
        </div>
      )
}

export default AddBlogForm