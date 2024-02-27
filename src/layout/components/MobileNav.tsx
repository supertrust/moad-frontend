import { PageRouting } from "@src/utils/values";
import Link from "next/link";

function MobileNav({toggle} :{ toggle : ()=>void}) {

  return (
        <div className="side-content"><div className="inner-header-wrap"></div>
          <div className="side-menu-wrap">
            <ul className="menu-wrap">
              <li className="list-menu home">
                <Link onClick={toggle} href={PageRouting.dashboard} className="link">
                  <i className="icon home"></i>
                    <div className="text">광고관리</div>
                  </Link>
              </li>
              <li className="list-menu statistics ">
                <Link onClick={toggle} href={PageRouting.statistics} className="link">
                  <i className="icon statistics"></i>
                  <div className="text">통계</div>
                </Link>
              </li>
              <li className="list-menu mypage ">
                <Link onClick={toggle} href={PageRouting.myInfo} className="link">
                  <i className="icon mypage"></i>
                  <div className="text">마이페이지</div>
                </Link>
              </li>
              <li className="list-menu center ">
                <Link onClick={toggle} href={PageRouting.notice} className="link">
                  <i className="icon center"></i>
                  <div className="text">고객센터</div>
                </Link>
                <ul className="sub-wrap-menu">
                  <li className="sub-list notice">
                    <Link onClick={toggle} href={PageRouting.notice} className="sub-link">공지사항</Link>
                  </li>
                  <li className="sub-list guide">
                    <Link onClick={toggle} href={PageRouting.guide} className="sub-link">가이드</Link>
                  </li>
                  <li className="sub-list faq">
                    <Link onClick={toggle} href={PageRouting.faq} className="sub-link">FAQ</Link>
                  </li>
                  <li className="sub-list inquire">
                    <Link onClick={toggle} href={PageRouting.inquire} className="sub-link">1:1문의</Link>
                  </li>
                  <li className="sub-list terms">
                    <Link onClick={toggle} href={PageRouting.terms} className="sub-link">정책 및 약관</Link>
                  </li>
                </ul>
              </li>
            </ul>
            <Link onClick={toggle} href="" className="side-logout">
              <i className="ic-logout"></i>
              <div className="text">로그아웃</div>
            </Link>
          </div>
        </div>
  );
}

export default MobileNav;