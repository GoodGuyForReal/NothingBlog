import { collection, onSnapshot, query } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../Firebase";


const BlogContext = createContext();

export function BlogContextProvider({ children }) {

    const [blogs, setBlogs] = useState([])
    console.log(blogs)
   
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
        <BlogContext.Provider value={{ blogs }}>
            {children}
        </BlogContext.Provider>
    )
}

export function UserBlog() {
    return useContext(BlogContext);
}