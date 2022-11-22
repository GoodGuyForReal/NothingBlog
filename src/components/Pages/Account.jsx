import React from 'react'
import CreateBlog from './CreateBlog'
import MyBlogs from './MyBlogs'

const Account = () => {
  return (
    <div>

      <section>
        <MyBlogs />
      </section>

      <section>
        <CreateBlog />
      </section>
    </div>
  )
}

export default Account