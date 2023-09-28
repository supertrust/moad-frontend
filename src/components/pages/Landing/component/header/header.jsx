import React, { useState } from "react";
import logo from "../../../../../../public/images/landing/header/logo-pc.svg";
import logoMb from "../../../../../../public/images/landing/header/logo-mb.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const paths = [
  { name: "서비스소개", path: "/landing" },
  { name: "회사소개", path: "/landing/about" },
  { name: "문의하기", path: "/landing/inquire" },
];
const HeaderComp = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const showMobileMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <header
      id='header'
      className='header'>
      <div className='header-continer'>
        <h1 className='logo'>
          <a
            href='#'
            className='logo-pc'>
            <Image
              src={logo}
              alt=''
              className='_img'
            />
          </a>
          <a
            href='#'
            className='logo-mb'>
            <Image
              src={logoMb}
              alt=''
            />
          </a>
        </h1>
        <button
          className='menu-mb-btn only-mb'
          onClick={showMobileMenu}
          id='menu_mb_btn'></button>
        <nav
          id='_nav'
          className={`_nav ${showMenu ? "active" : ""}`}>
          <div className='menu-mb-top only-mb'>
            <h1 className='menu-logo'>
              <a
                href='#'
                className='logo-mb'>
                <Image
                  src={logoMb}
                  alt=''
                />
              </a>
            </h1>
            <button
              className='menu-close-btn'
              onClick={showMobileMenu}
              id='menu_close_btn'></button>
          </div>
          <ul className='menu'>
            {paths.map((item, index) => (
              <li
                key={index} 
                className={`menu-list main ${
                  item.path == router.pathname ? "active" : ""
                }`}>
                <Link
                  href={item.path}
                  className={`menu-link`}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className='menu-terms-wrap only-mb'>
            <a
              href='#'
              className='_text'>
              이용약관
            </a>
            <a
              href='#'
              className='_text'>
              개인정보처리방침
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default HeaderComp;
