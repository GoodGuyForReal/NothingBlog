import React from 'react'
import CreateBlog from './CreateBlog'

const CreatePage = () => {
    return (
        <section className='py-10'>
            <div className='flex flex-col items-center gap-5'>
                <h1 className='text-[18px] text-[#0000007a]'>Lets Write an Amazing Story</h1>
                <section className='flex justify-center w-full'>
                    <div className='w-[140vh]'>
                        <CreateBlog />
                    </div>
                </section>
            </div>
        </section>
    )
}

export default CreatePage