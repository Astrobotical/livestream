import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import streamModel from '../../../components/Models/Streams/streamModel';

const StreamCatalog = () => {
  const tokenSaved = useSelector((state: RootState) => state.auth.token);
  const [streams, setStreams] = useState<streamModel[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter]= useState('Filter');
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleFilterOptions = (when:string)=>{
    switch(when){
      case "Future":
        setFilter('Future Streams');
        toggleDropdown();
      break;
      case "Past":
        setFilter('Past Streams');
        toggleDropdown();
        break;
      case "All":
        setFilter('All Streams');
        toggleDropdown();
        break;
    }
  }
  useEffect(() => {
  const getStreams = async () =>{
    const response = await fetch('http://localhost:8000/api/admin/getStreams', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenSaved}`,
      },
    }
    );
    if(response.ok){
      const data = await response.json();
      console.log(data);
      setStreams(data);
    }
  }
  getStreams();
},[tokenSaved]);
  return (
    <div className="p-8">
   <div className='flex justify-between items-center'>
      <h2 className="text-3xl font-bold text-white mb-6">Streams</h2>

      {/* Dropdown Menu */}
      <div className="relative">
        <button 
          onClick={toggleDropdown} 
          className="bg-gray-700 text-white mb-6 font-semibold py-2 px-4 rounded inline-flex items-center"
        >
          <span className='text-2xl'>{filter}</span>
          <svg className="fill-current w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M5.516 7.548l4.006 4.906 4.005-4.906H5.516z" />
          </svg>
        </button>
        
        {/* Dropdown content */}
        {isOpen && (
          <ul className="absolute right-0  bg-white text-gray-700 shadow-lg rounded-lg w-48">
            <li className="hover:bg-gray-400 py-2 px-4 block cursor-pointer" onClick={()=>handleFilterOptions("Future")} >Upcoming Streams</li>
            <li className="hover:bg-gray-400 py-2 px-4 block cursor-pointer"  onClick={()=>handleFilterOptions("Past")} >Past Streams</li>
            <li className="hover:bg-gray-400 py-2 px-4 block cursor-pointer"  onClick={()=>handleFilterOptions("All")} >All Streams</li>
          </ul>
        )}
      </div>
    </div>
      <div className="space-y-4">
        {streams.map((stream, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-md p-4 text-white"
          >
            <h3 className="text-xl font-semibold">{
            new Date(stream.stream_time)>
            new Date() ? 'Future' : 'Passed'
            }</h3>
            <p className="text-sm text-gray-400">
              Date: {new Date(stream.stream_time).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreamCatalog;