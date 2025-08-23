import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from './/MenuItem'
import useRole from '../../../../hooks/useRole'
import { useState } from 'react'

import toast from 'react-hot-toast'
import useAuth from '../../../../hooks/useAuth'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import HostRequestModal from '../../../Modal/HostRequestModal'

const GuestMenu = () => {
  const[role]=useRole()
   const { user } = useAuth()
   const axiosSecure=useAxiosSecure()
   const [isModalOpen,setIsModalOpen]=useState(false);
  const closeModal = () => setIsModalOpen(false); 
  const modalHandler=async()=>{
    console.log('i want to become a host')
    
    try{
       const currentUser={
      email:user?.email,
      role:'guest',
      status:'Requested'
    }
    const {data}=await axiosSecure.put(`/user`,currentUser)
    if(data.modifiedCount>0){
      toast.success('Your request has been sent to admin! successfully')
    }else{
      toast.success('please,wait for admin approval')
    }

    }catch(err){
      console.error('Error in becoming a host:', err)
    }finally{
      closeModal()
  }
  }
  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label='My Bookings'
        address='my-bookings'
      />

      {role === 'guest' && <div  onClick={() => setIsModalOpen(true)}className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'>
        <GrUserAdmin className='w-5 h-5' />

        <span className='mx-4 font-medium'>Become A Host</span>
      </div>}
      <HostRequestModal isOpen={isModalOpen} closeModal={closeModal} modalHandler={modalHandler}/>
    </>
  )
}

export default GuestMenu