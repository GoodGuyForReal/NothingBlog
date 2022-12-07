import React from 'react'

const UserCard = ({ item, id }) => {



    const capital = (name) => {

        const str = name;
        return str.charAt(0).toUpperCase() + str.slice(1);

    }

    console.log(capital(item?.displayName))

    return (
        <div key={id}>
            <div className='flex items-center gap-2'>
                <img src={`${item.ppImage}`} alt={`${item.ppImage}`} className='h-[50px] w-[50px] rounded-full object-cover' />
                <div>
                    <h1 className='font-medium '>{capital(item?.displayName)}</h1>
                    <p className='font-medium text-[#0000007a]'>{item?.joinedDate}</p>
                </div>
            </div>
        </div>
    )
}

export default UserCard