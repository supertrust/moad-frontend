function MobileNav() {
  return (
        <div className="side-content"><div className="inner-header-wrap"></div>
          <div className="side-menu-wrap">
            <ul className="menu-wrap">
              <li className="list-menu home">
                <a href="home" className="link">
                  <i className="icon home"></i>
                    <div className="text">광고관리</div>
                  </a>
              </li>
              <li className="list-menu statistics ">
                <a href="statistics" className="link">
                  <i className="icon statistics"></i>
                  <div className="text">통계</div>
                </a>
              </li>
              <li className="list-menu mypage ">
                <a href="mypage" className="link">
                  <i className="icon mypage"></i>
                  <div className="text">마이페이지</div>
                </a>
              </li>
              <li className="list-menu center ">
                <a href="notice" className="link">
                  <i className="icon center"></i>
                  <div className="text">고객센터</div>
                </a>
                <ul className="sub-wrap-menu">
                  <li className="sub-list notice">
                    <a href="notice" className="sub-link">공지사항</a>
                  </li>
                  <li className="sub-list guide">
                    <a href="guide" className="sub-link">가이드</a>
                  </li>
                  <li className="sub-list faq">
                    <a href="faq" className="sub-link">FAQ</a>
                  </li>
                  <li className="sub-list inquire">
                    <a href="inquire/?step=step01" className="sub-link">1:1문의</a>
                  </li>
                  <li className="sub-list terms">
                    <a href="/terms/?step=step01" className="sub-link">정책 및 약관</a>
                  </li>
                </ul>
              </li>
            </ul>
            <a href="" className="side-logout">
              <i className="ic-logout"></i>
              <div className="text">로그아웃</div>
            </a>
          </div>
        </div>
  );
}

export default MobileNav;