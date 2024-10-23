import { FaEye } from "react-icons/fa";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { PiMoneyWavyLight } from "react-icons/pi";
const ViewsCount = () =>{
    return <div className="border w-1/3 rounded-lg p-4 bg-gray-500">
    <div className="flex justify-between items-center">
   
      <span className="text-white">Views</span>
      

      <FaEye color="white"/>
    </div>

    <div className="mt-2">
      <span className="text-xl font-bold text-white">50 </span>
    </div>
  </div>
    
}
const FollowersCount = ()=>{
    return <div className="border w-1/3 rounded-lg p-4 bg-gray-500">
    <div className="flex justify-between items-center">
   
      <span className="text-white">
            Followers
        </span>
       
      <MdOutlinePeopleAlt color="white"/>
    </div>

    <div className="mt-2">
      <span className="text-xl font-bold text-white">56</span>
    </div>
</div>
}
const MoneyMade = ()=>{
    return <div className="border w-1/3 rounded-lg p-4 bg-gray-500">
    <div className="flex justify-between items-center">
   
      <span className="text-white">
            Funds Collected
        </span>
        <PiMoneyWavyLight color="white"/>
    </div>

    <div className="mt-2">
      <span className="text-xl font-bold text-white">
            $150.32
        </span>
    </div>
</div>
}

export {ViewsCount,FollowersCount,MoneyMade}