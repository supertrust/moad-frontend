import React, { useEffect, useState } from "react";

import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import { useRouter } from "next/router";
import { Container } from "postcss";

function Layout(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  // const [text, setText] = useState();

  // const setStatus = ()=>{
  //   console.log(statusdata);
  // }

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
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
    if (router.pathname === "/login") {
      setIsAuthenticated(false);
    }
  }, [router.pathname]);

  if (!isAuthenticated) return <>{props.children}</>;

  return (
    <>
      <div id="dashboard" className="dashboard page">
        <div className="sidebar_menu">
          <Sidebar/>
        </div>
        <div className="main_content">
          <Header />
          <main>{props.children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Layout;
