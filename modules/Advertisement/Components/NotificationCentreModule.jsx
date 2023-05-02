import React from "react";

export default function NotificationCentreModule() {
  return (
    <>
      <div className="notification">
        <div className="title-wraps">
          <div className="title">
            <font>notification center</font>
          </div>
          <div className="line"></div>
          <a href="/notification-center" className="text">
            view all
          </a>
        </div>
        <div className="notification-content">
          <a href="#">
            <ul className="content-wrap">
              <li className="list">
                <div className="text-wrap">
                  <div className="title text">
                    <font>[[Promotion of new Icarus products]]</font>
                  </div>
                  <div className="text">
                    <font>Vehicle No. 10150122 has started operating.</font>
                  </div>
                </div>
                <div className="timestamp">
                  <font>3 hours ago</font>
                </div>
              </li>
            </ul>
          </a>
        </div>
      </div>
    </>
  );
}
