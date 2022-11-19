import React from 'react'

const BlogCard = ({ item }) => {
    return (
        <div>
            <img src={item?.img} alt="" />
            <h1>{item?.title}</h1>
            <p>{item?.desc}</p>
        </div>
    )
}

export default BlogCard