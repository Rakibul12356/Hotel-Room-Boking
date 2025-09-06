import PropTypes from 'prop-types'
import Button from '../Shared/Button/Button'
import { DateRange } from 'react-date-range';
import { useState } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import BookingModal from '../Modal/BookingModal';
import useAuth from '../../hooks/useAuth';

const RoomReservation = ({ room }) => {
  console.log('room:', room);
  const [isOpen, setIsOpen] = useState(false);
const {user}=useAuth();
console.log(user?.displayName
)
  const [state, setState] = useState([
    {
      startDate: new Date(room.from),
      endDate: new Date(room.to),
      key: 'selection'
    }
  ]);
  //total price calculation
  const totalPrice = parseInt(differenceInCalendarDays(new Date(room.to), new Date(room.from)) + 1) * room.price
  const closeModal = () => {
    setIsOpen(false);
  };
const handleReservation = () => {
    setIsOpen(true);
  };
  return (
    <div className='rounded-xl border-[1px] border-neutral-200 overflow-hidden bg-white'>
      <div className='flex items-center gap-1 p-4'>
        <div className='text-2xl font-semibold'>$ {room?.price}</div>
        <div className='font-light text-neutral-600'> /night</div>
      </div>
      <hr />
      <div className='flex justify-center'>
        {/* Calender */}
        <DateRange
          showDateDisplay={false}
          rangeColors={['#f43f5e', '#f87171', 'orange']}
          editableDateInputs={true}
          onChange={item => {
            console.log(item)
            setState([
              {
                startDate: new Date(room.from),
                endDate: new Date(room.to),
                key: 'selection',
              },
            ])
          }}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
      </div>
      <hr />
      <div className='p-4'>
        <Button label={'Reserve'} onClick={handleReservation} />
         {/**set reserve modal */}
      <BookingModal
        isOpen={isOpen}
        closeModal={closeModal}
        bookingInfo={
          {
            ...room,
            price: totalPrice,
            gust:{ name: user?.displayName } // Example guest info, replace with actual data
          }
        } />
      </div>
     
      <hr />
      <div className='p-4 flex items-center justify-between font-semibold text-lg'>
        <div>Total</div>
        <div>${totalPrice}</div>
      </div>
    </div>
  )
}

RoomReservation.propTypes = {
  room: PropTypes.object,
}

export default RoomReservation
