import { useState } from "react";
import AddRoomForm from "../../../components/form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/utils";


const AddRoom = () => {
  const { user } = useAuth()
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
  const handleSubmit =async (e) => {
    e.preventDefault()
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
      console.log(roomData)
    }catch (error) {
      console.error( error);
      return;
    }
    
  }
  const handleImage = image => {
    setImagePreview(URL.createObjectURL(image))
    setImageText(image.name)
  }
  return (
  
      
      <AddRoomForm 
      dates={dates} 
      handleDates={handleDates} 
      handleSubmit={handleSubmit} 
      imagePreview={imagePreview} 
      setImagePreview={setImagePreview}
      handleImage={handleImage}
      imageText={imageText}/>
 
  );
};

export default AddRoom;