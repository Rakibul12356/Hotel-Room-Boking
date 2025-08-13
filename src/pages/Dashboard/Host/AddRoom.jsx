import { useState } from "react";
import AddRoomForm from "../../../components/form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/utils";
import { Helmet } from 'react-helmet-async'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddRoom = () => {
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })
   const [imagePreview, setImagePreview] = useState(null);
   const [imageText, setImageText] = useState('Upload Image')
  //Date range handler
  const handleDates = (item) => {
    console.log(item)
    setDates(item.selection)
  }
  //post data to db with tanstack query UseMutation
  
  const { mutateAsync } = useMutation({
    mutationFn: async roomData => {
      const { data } = await axiosSecure.post(`/room`, roomData)
      return data
    },
    onSuccess: () => {
      console.log('Data Saved Successfully')
      toast.success('Room Added Successfully!')
      navigate('/dashboard/my-listings')
      setLoading(false)
    },
  })
  const handleSubmit =async (e) => {
    e.preventDefault()
    setLoading(true)
    const form = e.target
    const location = form.location.value
    const category = form.category.value
    const title = form.title.value
    const to = dates.endDate
    const from = dates.startDate
    const price = form.price.value
    const guests = form.total_guest.value
    const bathrooms = form.bathrooms.value
    const description = form.description.value
    const bedrooms = form.bedrooms.value
    const image = form.image.files[0]

    const host = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    }
    try{
      const image_Url = await imageUpload(image)
      const roomData={
        location,
        category,
        title,
        to,
        from,
        price,
        guests,
        bathrooms,
        description,
        bedrooms,
        image: image_Url,
        host
      }
        //   Post request to server
      await mutateAsync(roomData)
      console.log(roomData)
    }catch (error) {
      console.error( error);
     toast.error(error.message)
      setLoading(false)
    }
    
  }
  const handleImage = image => {
    setImagePreview(URL.createObjectURL(image))
    setImageText(image.name)
  }
  return (
  
      <>
     <Helmet>
        <title>Add Room | Dashboard</title>
      </Helmet>
        <AddRoomForm 
      dates={dates} 
      handleDates={handleDates} 
      handleSubmit={handleSubmit} 
      imagePreview={imagePreview} 
      setImagePreview={setImagePreview}
      handleImage={handleImage}
      imageText={imageText}
      loading={loading}/>
      </>
    
 
  );
};

export default AddRoom;