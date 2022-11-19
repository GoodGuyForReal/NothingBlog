import React, { useEffect, useState } from 'react'
import BlogCard from '../BlogCard'

const Home = () => {
    const [blogs, setBlogs] = useState([{
        img : '/oibwewovbweurl/img/default',
        title : 'life of tarik',
        desc : 'bcnwobvoewbvowebvwbvbewjbvjkwbvwkjbvjkwbvjkwbvkjasbvsbdkvjkdsbvouiewbvowbvowbovwbovob',
    }])



    



    return (
        <div>

            <form action="">
                <input type="text" placeholder='Create a New Blog' />
                <button type="submit">Publish</button>
            </form>

            <div>
                {blogs.map((item, id) => (

                    <BlogCard item={item} key={id} />
                ))}
            </div>


        </div>
    )
}

export default Home