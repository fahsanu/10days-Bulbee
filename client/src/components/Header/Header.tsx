import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

const Header = () => {

  const [bulb, setBulb] = useState(0);
  const navigate = useNavigate();

  // Get user
  useEffect(() => {
    try {
      const token = window.localStorage.getItem("access_token")
      // console.log(token)
      const response = fetch(`http://127.0.0.1:4000/auth/get_bulb` , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
      })
      .then((res) => res.json())
      // .then((data) => console.log(data))
      .then((data) => setBulb(data.result))
      .catch((error) => console.log("Getting error", error));
    } catch (error) {
        console.error(error);
    }
  }, [bulb])
  
  const handleLogout = () => {
    window.localStorage.removeItem("access_token");
    alert("logged out");
    navigate('/login')
  }

  // const userSid = { param: "6438888821" };
  // const queryParam2 = new URLSearchParams(userSid).toString();


  // useEffect(() => {
  //   let isRun = false;

  //   fetch(`http://localhost:4000/info/get?${queryParam2}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setBulb(data.bulb))
  //     .catch((error) => console.log("Getting error", error));

  //   return () => {
  //     isRun = true;
  //   };
  // }, []);
  
  return (
    <div className="header">
      <div className="profile">
        <img src="/profile-icon.png" className="profile" onClick={handleLogout}/>
      </div>
      <div className='bulbee-logo'>
        <p>Bulbee</p>
      </div>
      <div className='bulb-balance-top'>
        <img src='/light-bulb.png' className='balance-top-img' />
        <p>{bulb}</p>
      </div>
    </div>
  );
}

export default Header