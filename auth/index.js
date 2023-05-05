import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const ProtectRoute = ({ children }) => {
  const router = useRouter();
  const [loading, setloading] = useState(true);
  const publicRoutes = ['/login/', '/signup/'];

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedJwt = parseJwt(token);
    const isTokenValid = decodedJwt && decodedJwt?.exp * 1000 > Date.now();
    const isAuthRoute = publicRoutes.includes(router.asPath);

        if (isAuthRoute && isTokenValid) {
          router.replace('/');
        } else if (!isTokenValid) {
     
          if(router.asPath =='/signup'){
            router.replace('/SignUp/');
          }else{
            router.replace('/login/');
          }
        }
      

    setTimeout(() => setloading(false), 500);

    console.log(router.asPath,"router")



  }, []);


  return loading ? <></> : <>{children}</>;
};
