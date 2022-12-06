import React from 'react'

const UserCard = ({ item, id }) => {
    return (
        <div key={id}>
            <div className='flex items-center gap-2'>
                <img src={`${item.userimage}`} alt={`${item.userimage}`} className='h-[50px] w-[50px] rounded-full object-cover' />
                <h1>{item?.displayName}</h1>
            </div>
        </div>
    )
}

export default UserCard