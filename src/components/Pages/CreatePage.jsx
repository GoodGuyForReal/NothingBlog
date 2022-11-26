import React from 'react'
import CreateBlog from './CreateBlog'

const CreatePage = () => {
    return (
        <section className='flex flex-col'>

            <h1>Create Something Amazing</h1>
            <section className='flex justify-center w-full'>
                <div className='w-[100vh]'>
                    <CreateBlog />
                </div>
            </section>
        </section>
    )
}

export default CreatePage