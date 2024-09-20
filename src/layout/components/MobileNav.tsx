import useAuth from "@src/hooks/useAuth";
import { PageRouting } from "@src/utils/values";
import clsx from "clsx";
import Link from "next/link";

function MobileNav({toggle} :{ toggle : ()=>void}) {

  const { logout, dictionary : {sidebar},isKorean } = useAuth();

  return (
        <div className="side-content"><div className="inner-header-wrap"></div>
          <div className="side-menu-wrap">
            <ul className="menu-wrap">
              <li className="list-menu home">
                <Link onClick={toggle} href={PageRouting.dashboard} className="link">
                  <i className="icon home"></i>
                    <div className="text">{sidebar?.advertisementManagement}</div>
                  </Link>
              </li>
              <li className="list-menu statistics ">
                <Link onClick={toggle} href={PageRouting.statistics} className="link">
                  <i className="icon statistics"></i>
                  <div className="text">{sidebar?.statistics}</div>
                </Link>
              </li>
              <li className="list-menu mypage ">
                <Link onClick={toggle} href={PageRouting.myInfo} className="link">
                  <i className="icon mypage"></i>
                  <div className="text">{sidebar?.myInfo}</div>
                </Link>
              </li>
              <li className="list-menu center ">
                <Link onClick={toggle} href={PageRouting.notice} className="link">
                  <i className="icon center"></i>
                  <div className="text">{sidebar?.customerService}</div>
                </Link>
                <ul className="sub-wrap-menu">
                  <li className="sub-list notice">
                    <Link onClick={toggle} href={PageRouting.notice} className="sub-link">{sidebar?.notice}</Link>
                  </li>
                  <li className="sub-list guide">
                    <Link onClick={toggle} href={PageRouting.guide} className="sub-link">{sidebar.guide}</Link>
                  </li>
                  <li className="sub-list faq">
                    <Link onClick={toggle} href={PageRouting.faq} className="sub-link">{sidebar?.faq}</Link>
                  </li>
                  <li className="sub-list inquire">
                    <Link onClick={toggle} href={PageRouting.inquire} className="sub-link">{sidebar?.inquiry}</Link>
                  </li>
                  <li className="sub-list terms">
                    <Link onClick={toggle} href={PageRouting.terms} className="sub-link">{sidebar?.termsAndPolicies}</Link>
                  </li>
                </ul>
              </li>
            </ul>
            <Link onClick={()=>{
              toggle()
              logout()
            }} href="" className={clsx("side-logout", isKorean && "!left-[37%]")}>
              <i className="ic-logout"></i>
              <div className="text">{sidebar?.logout}</div>
            </Link>
          </div>
        </div>
  );
}

export default MobileNav;