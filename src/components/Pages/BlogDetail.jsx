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
                        <img src={details?.userimage} alt="" className='bg-black object-cover h-[58px] w-[58px] rounded-full' />
                        <div>
                            <p className='text-[20px] font-semibold leading-[120%] text-[#000000] mb-2'>{details?.displayname}</p>
                            <p className='text-[15px] leading-[120%] text-[#0000007a]'>{details?.time}</p>
                        </div>
                    </div>

                </div>

                <div className='mainBlog flex flex-col gap-10'>
                    <h1 className='text-[38px] font-bold'>{details?.title}</h1>
                    <img src={details?.img} alt={details?.img} className='object-cover w-full rounded-md' />
                    <p className='text-[18px] font-normal leading-[160%]'>{details?.desc}</p>
                </div>

            </div>
        </div>
    )
}

export default BlogDetail