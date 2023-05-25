import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import MobileNav from "./MobileNav";
import Image from "next/image";
interface HeaderProps {
  text: string;
}

function Header(props: HeaderProps) {
  // console.log(props.text);
  const [showMobileNav, setShowMobileNav] = useState(false);
  function toggle() {
    setShowMobileNav(!showMobileNav);
  }

  return (
    <div className="inner-header-wrap">
      <div id="inner_header" className="inner-header">
        <div className="only-pc">
          <div className="header-pc">
            <div className="header-title">
              {!props.text ? "Advertising Management" : props.text}
            </div>
            <div className="my-info">
              <div className="info-wrap">

                <Dropdown className="drop-btns">
                  <Dropdown.Toggle id="dropdown-basic">
                    <div className="my-photo">
                      <Image
                        src="/images/img-my-pic.png"
                        alt=""
                        className="img"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="my-company">
                      <div className="company-name">Must FinTech</div>
                      <div className="email">mufincrew@mail.com</div>
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3" className="logout-danger">Log Out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

            </div>
          </div>
        </div>
        <div className="only-mb">
          <div className="header-mb">
            <h1 className="logo-wrap">
              <a href="home" className="link">
                <Image
                  src="assets/images/icons/logo-mb.svg"
                  alt=""
                  width={120}
                  height={50}
                />
              </a>
            </h1>
            <div className="util-wrap">
              <a href="/my-info" className="info-btn"></a>
              <button
                onClick={toggle}
                type="button"
                id="side_mb_btn"
                className={showMobileNav ? "side-close" : "side-mb-btn"}
              ></button>
            </div>
          </div>
        </div>
      </div>

      <div id="side_mb" className="side-mb"
        style={{
          display: showMobileNav ? "block" : "none"
        }}>

        {showMobileNav ? <MobileNav /> : null}
      </div>

    </div>
  );
}
const Text = () => <div>You clicked the button!</div>;

export default Header;
