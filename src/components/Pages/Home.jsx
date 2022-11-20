import React, { useEffect, useState } from 'react'
import {  collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../../Firebase'
import BlogCard from '../BlogCard'

const Home = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'Blogs'));
    const unsubscribe = onSnapshot(q, (query) => {
      let blogsarray = [];
      query.forEach((doc) => {
        blogsarray.push({ ...doc.data(), id: doc.id })
      });

      setBlogs(blogsarray)

    })
    return () => unsubscribe()

  }, [])


  return (
    <div>

      <div>
        {blogs.map((item, id) => (

          <BlogCard item={item} key={id}/>
        ))}
      </div>


    </div>
  )
}

export default Home