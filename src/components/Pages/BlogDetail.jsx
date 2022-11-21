import React from 'react'
import { useLocation, useParams } from 'react-router-dom';

const BlogDetail = () => {

    const { state: details } = useLocation();
    console.log(details)

    const { id } = useParams();
    console.log(id);



    return (
        <div className='flex justify-center items-center'>
            <div className='py-10 mx-5 w-[800px]'>
                <div className='top-name'>

                    <div className='py-4 flex gap-4'>
                        <img src="" alt="" className='bg-black object-cover h-[42px] w-[42px] rounded-full' />
                        <div>
                            <p className='text-[15px] leading-[120%] text-[#0000007a]'>{details?.userid}</p>
                            <p className='text-[15px] leading-[120%] text-[#0000007a]'>Nov 9</p>
                        </div>
                    </div>

                </div>

                <div className='mainBlog flex flex-col gap-10'>
                    <h1 className='text-[38px] font-bold'>{details?.title}</h1>
                    <img src={details?.img} alt={details?.img} className='object-cover w-full' />
                    <p className='text-[18px] font-normal leading-[160%]'>{details?.desc}</p>
                </div>

            </div>
        </div>
    )
}

export default BlogDetail