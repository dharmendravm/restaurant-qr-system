import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {
  console.log(children);
  
const accessToken = localStorage.getItem('accessToken')
console.log(accessToken);
if(!accessToken){
    return <Navigate to='/login'/>
}

  return (
    <div>
       {children}
    </div>
  )
}

export default ProtectedRoutes