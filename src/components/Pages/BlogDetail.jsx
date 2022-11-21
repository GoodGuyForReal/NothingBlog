import React from 'react'
import { useLocation, useParams } from 'react-router-dom';

const BlogDetail = () => {
    
    const { state: details } = useLocation();
    console.log(details)
    
    const { id } = useParams();
    console.log(id);



    return (

        <div>BlogDetail</div>

    )
}

export default BlogDetail