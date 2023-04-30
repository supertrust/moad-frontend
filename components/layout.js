import React, { useEffect, useState } from 'react';

import Sidebar from './sidebar';
import Header from './header';
import Footer from './footer';
import { useRouter } from 'next/router';

function Layout(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };
  const router = useRouter();
  const userPages = [];

  useEffect(() => {
    // const token = localStorage.getItem('token');
    // const decodedJwt = parseJwt(token);
    // const isTokenValid = decodedJwt && decodedJwt?.exp * 1000 > Date.now();
    // setIsAuthenticated(isTokenValid);

    // if (!userPages.includes(router.pathname) && isTokenValid) {
    //   router.push('/dashboard');
    // }
    if (router.pathname === '/login') {
      setIsAuthenticated(false);
    }
  }, [router.pathname]);

  if (!isAuthenticated) return <>{props.children}</>;

  return (
    <div className='min-h-screen flex flex-col'>
      <header>
        <Header />
      </header>
      <div className='flex h-20 flex-col md:flex-row flex-1'>
        <Sidebar />
        <main className='flex-1'>{props.children}</main>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
