import React from "react";

export default function NotificationCentre() {
  return (
    <>
      <div className="notification">
        <div className="title-wraps">
          <div className="title">
            <span>notification center</span>
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
                    <span>[[Promotion of new Icarus products]]</span>
                  </div>
                  <div className="text">
                    <span>Vehicle No. 10150122 has started operating.</span>
                  </div>
                </div>
                <div className="timestamp">
                  <span>3 hours ago</span>
                </div>
              </li>
            </ul>
          </a>
        </div>
      </div>
    </>
  );
}
