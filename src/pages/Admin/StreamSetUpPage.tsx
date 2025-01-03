import { useState } from "react";
import { FaClock, FaLink } from "react-icons/fa6";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
const StreamSetUpPage = () => {
    const [streamDate, setStreamDate] = useState('');
    const [streamTime, setStreamTime] = useState('');
    const [streamLink, setStreamLink] = useState('');

   const promptToast =()=>{
     const Toast = withReactContent(Swal).mixin({
        toast: true,
        position:'top-right',
        iconColor: 'white',
        showConfirmButton:false,
        timer:1500,
        timerProgressBar:true,
      });
        Toast.fire({
          icon: 'success',
          title: 'Submitted',
      }
    )
    }
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      promptToast();
      // Handle the form submission
      const formData = {
        title:'testing',
        description: 'This is a description',
        date: streamDate,
        time: streamTime,
        link: streamLink,
      };
    //  alert(`Scheduled Stream Data: ${formData.date}`);
   
      
  
      // Submit form data to the server or process it as needed
    };
  
    return (
      <div className="mx-auto p-6  rounded-lg bg-gray-800 h-1/2 shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-white">Schedule a Stream</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
    
        {/* Date Field */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
          <label className="sm:w-1/3 text-white mb-2 sm:mb-0">Stream Date</label>
          <input
            type="date"
            className="input input-bordered bg-gray-600 text-white w-full sm:w-1/2"
            value={streamDate}
            onChange={(e) => setStreamDate(e.target.value)}
            required
          />
        </div>
    
        {/* Time Field */}
<div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
  <label className="sm:w-1/3 text-white mb-2 sm:mb-0">Stream Time</label>
  <div className="relative w-full sm:w-1/2">
    <input
      type="time"
      className="input input-bordered bg-gray-600 text-white w-full pr-10"
      value={streamTime}
      onChange={(e) => setStreamTime(e.target.value)}
      required
    />
    {/* Add a time icon inside the input */}
    <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
      <FaClock className="text-white" /> {/* Replace FaClock with your time icon */}
    </span>
  </div>
</div>
        {/* Link Field */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
  <label className="sm:w-1/3 text-white mb-2 sm:mb-0">Stream Link</label>
  <div className="relative w-full sm:w-1/2">
    <input
      type="url"
      className="input input-bordered w-full bg-gray-600 text-white pr-10"
      placeholder="https://www.example.com/stream"
      value={streamLink}
      onChange={(e) => setStreamLink(e.target.value)}
      required
    />
    {/* Add an icon to the right with white color */}
    <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
      <FaLink className="text-white" /> {/* Replace FaLink with the relevant icon */}
    </span>
  </div>
</div>
    
        {/* Submit Button */}
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary text-white">
            Schedule Stream
          </button>
        </div>
      </form>
    </div>
    );
  };

export default StreamSetUpPage;