import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

export default function VerifyBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location.search)
  const token = urlParams.get('token')
  const hospitalId = urlParams.get('hospitalId')
  const [statusVerify,setStatusVerify] = useState(false)
  const dataVerify = {
    hospitalId,token
  }
  useEffect( ()=>{
    axios.post('http://localhost:8080/api/verify-book-appointment',dataVerify).then((res)=> {
      console.log('res status: ' , res.data.statusCode);
      if(res.data.statusCode === 200){
        setStatusVerify(true)
      }
    })
  },[])
  const handleNavigate = () => {
    navigate('/donor/manage_schedule')
  }
  return (
    <>
    {statusVerify === true ? 
    <div><p>Đặt lịch hiến máu thành công, mọi thông tin liên hệ .....</p>
      <div onClick={handleNavigate}>Quay lại trang quản lý lịch hẹn</div>
    </div> : <div>Đặt lịch hiến máu thất bại</div>}
    </>
  )
}
