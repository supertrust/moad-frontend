import React from "react";
import { styles } from "@src/sections/vehicle-info";

export default function VehicleInfoScreen() {
  return (
    <div
      id={styles.vehicle_information}
      className={`${styles.page} ${styles.statistics}`}
    >
      <div className={styles.container}>
        <div className={styles.board_content}>
          <div className={styles.vehicle_information_content}>
            <div className={styles.page_link}>
              <a href="/ad-management" className={styles.link}>
                광고관리
              </a>
              <span className={styles.link}>&gt;</span>
              <a href="/ad-detail-list" className={styles.link}>
                신제품 홍보 출시기념
              </a>
              <span className={styles.link}>&gt;</span>
              <div className={styles.link}>차량정보</div>
            </div>

            <div className="content-inner">
              <div className="slide-box content-body">
                <div
                  id="slider"
                  className="swiper slider swiper-initialized swiper-horizontal swiper-backface-hidden"
                >
                  <div
                    className="swiper-wrapper"
                    id="swiper-wrapper-272914705cac83fc"
                    aria-live="polite"
                  >
                    <div className="swiper-slide swiper-slide-active">
                      <div className="badge">
                        <div className="text">옆면</div>
                        <div className="text-sub">(운전석)</div>
                      </div>
                      <img
                        src="http://localhost/wordpress/wp-content/themes/icarus/assets/images/vehicle-information/img-mockup-sample-01.png"
                        alt=""
                        className="img"
                      />
                    </div>
                    <div className="swiper-slide swiper-slide-next">
                      <div className="badge">
                        <div className="text">옆면</div>
                        <div className="text-sub">(조수석)</div>
                      </div>
                      <img
                        src="http://localhost/wordpress/wp-content/themes/icarus/assets/images/vehicle-information/img-mockup-sample-02.png"
                        alt=""
                        className="img"
                      />
                    </div>
                    <div
                      className="swiper-slide"
                      role="group"
                      aria-label="3 / 4"
                      data-swiper-slide-index="2"
                    >
                      <div className="badge">
                        <div className="text">후면</div>
                      </div>
                      <img
                        src="http://localhost/wordpress/wp-content/themes/icarus/assets/images/vehicle-information/img-mockup-sample-03.png"
                        alt=""
                        className="img"
                      />
                    </div>
                    <div
                      className="swiper-slide"
                      role="group"
                      aria-label="4 / 4"
                      data-swiper-slide-index="3"
                    >
                      <div className="badge">
                        <div className="text">계측기</div>
                      </div>
                      <img
                        src="http://localhost/wordpress/wp-content/themes/icarus/assets/images/vehicle-information/img-mockup-sample-04.png"
                        alt=""
                        className="img"
                      />
                    </div>
                  </div>
                  <span
                    className="swiper-notification"
                    aria-live="assertive"
                    aria-atomic="true"
                  ></span>
                </div>

                <div className="swiper thumbs-slider swiper-initialized swiper-horizontal swiper-free-mode swiper-watch-progress swiper-backface-hidden swiper-thumbs">
                  <div
                    className="swiper-wrapper"
                    id="swiper-wrapper-274100f46735107375"
                    aria-live="polite"
                  >
                    <div
                      className="swiper-slide swiper-slide-visible swiper-slide-active swiper-slide-thumb-active"
                      role="group"
                      aria-label="1 / 4"
                      data-swiper-slide-index="0"
                    >
                      <img
                        src="http://localhost/wordpress/wp-content/themes/icarus/assets/images/vehicle-information/img-mockup-sample-01.png"
                        alt=""
                        className="img"
                      />
                    </div>
                    <div
                      className="swiper-slide swiper-slide-visible swiper-slide-next"
                      role="group"
                      aria-label="2 / 4"
                      data-swiper-slide-index="1"
                    >
                      <img
                        src="http://localhost/wordpress/wp-content/themes/icarus/assets/images/vehicle-information/img-mockup-sample-02.png"
                        alt=""
                        className="img"
                      />
                    </div>
                    <div
                      className="swiper-slide swiper-slide-visible"
                      role="group"
                      aria-label="3 / 4"
                      data-swiper-slide-index="2"
                    >
                      <img
                        src="http://localhost/wordpress/wp-content/themes/icarus/assets/images/vehicle-information/img-mockup-sample-03.png"
                        alt=""
                        className="img"
                      />
                    </div>
                    <div
                      className="swiper-slide swiper-slide-visible"
                      role="group"
                      aria-label="4 / 4"
                    >
                      <img
                        src="http://localhost/wordpress/wp-content/themes/icarus/assets/images/vehicle-information/img-mockup-sample-04.png"
                        alt=""
                        className="img"
                      />
                    </div>
                  </div>
                  <span
                    className="swiper-notification"
                    aria-live="assertive"
                    aria-atomic="true"
                  ></span>
                </div>

                <div id="viewer_slider" className="viewer-slider">
                  <div className="swiper viewer swiper-initialized swiper-horizontal swiper-autoheight">
                    <div
                      className="swiper-wrapper"
                      id="swiper-wrapper-4baf367272a2dbf8"
                      aria-live="polite"
                    >
                      <div
                        className="swiper-slide swiper-slide-active"
                        data-swiper-slide-index="0"
                        role="group"
                        aria-label="1 / 4"
                      >
                        <div className="slide-content">
                          <div className="ic-close"></div>
                          <div className="badge target">
                            <div className="text target">옆면</div>
                            <div className="text-sub target">(운전석)</div>
                          </div>
                          <img
                            src="http://localhost/wordpress/wp-content/themes/icarus/assets/images/vehicle-information/img-mockup-sample-01.png"
                            alt=""
                            className="img target"
                          />
                          <div
                            className="slide-arrow ic-prev target"
                            tabIndex={0}
                            role="button"
                            aria-label="Previous slide"
                            aria-controls="swiper-wrapper-4baf367272a2dbf8"
                          ></div>
                          <div
                            className="slide-arrow ic-next target"
                            tabIndex={0}
                            role="button"
                            aria-label="Next slide"
                            aria-controls="swiper-wrapper-4baf367272a2dbf8"
                          ></div>
                        </div>
                      </div>
                      <div
                        className="swiper-slide swiper-slide-next"
                        data-swiper-slide-index="1"
                        role="group"
                        aria-label="2 / 4"
                      >
                        <div className="slide-content">
                          <div className="ic-close"></div>
                          <div className="badge target">
                            <div className="text target">옆면</div>
                            <div className="text-sub target">(조수석)</div>
                          </div>
                          <img
                            src="http://localhost/wordpress/wp-content/themes/icarus/assets/images/vehicle-information/img-mockup-sample-02.png"
                            alt=""
                            className="img target"
                          />
                          <div
                            className="slide-arrow ic-prev target"
                            tabIndex={0}
                            role="button"
                            aria-label="Previous slide"
                            aria-controls="swiper-wrapper-4baf367272a2dbf8"
                          ></div>
                          <div
                            className="slide-arrow ic-next target"
                            tabIndex={0}
                            role="button"
                            aria-label="Next slide"
                            aria-controls="swiper-wrapper-4baf367272a2dbf8"
                          ></div>
                        </div>
                      </div>
                      <div
                        className="swiper-slide"
                        data-swiper-slide-index="2"
                        role="group"
                        aria-label="3 / 4"
                      >
                        <div className="slide-content">
                          <div className="ic-close"></div>
                          <div className="badge target">
                            <div className="text target">후면</div>
                          </div>
                          <img
                            src="http://localhost/wordpress/wp-content/themes/icarus/assets/images/vehicle-information/img-mockup-sample-03.png"
                            alt=""
                            className="img target"
                          />
                          <div
                            className="slide-arrow ic-prev target"
                            tabIndex={0}
                            role="button"
                            aria-label="Previous slide"
                            aria-controls="swiper-wrapper-4baf367272a2dbf8"
                          ></div>
                          <div
                            className="slide-arrow ic-next target"
                            tabIndex={0}
                            role="button"
                            aria-label="Next slide"
                            aria-controls="swiper-wrapper-4baf367272a2dbf8"
                          ></div>
                        </div>
                      </div>
                      <div
                        className="swiper-slide"
                        data-swiper-slide-index="3"
                        role="group"
                        aria-label="4 / 4"
                      >
                        <div className="slide-content">
                          <div className="ic-close"></div>
                          <div className="badge target">
                            <div className="text target">계측기</div>
                          </div>
                          <img
                            src="http://localhost/wordpress/wp-content/themes/icarus/assets/images/vehicle-information/img-mockup-sample-04.png"
                            alt=""
                            className="img target"
                          />
                          <div
                            className="slide-arrow ic-prev target"
                            tabIndex={0}
                            role="button"
                            aria-label="Previous slide"
                            aria-controls="swiper-wrapper-4baf367272a2dbf8"
                          ></div>
                          <div
                            className="slide-arrow ic-next target"
                            tabIndex={0}
                            role="button"
                            aria-label="Next slide"
                            aria-controls="swiper-wrapper-4baf367272a2dbf8"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <span
                      className="swiper-notification"
                      aria-live="assertive"
                      aria-atomic="true"
                    ></span>
                  </div>
                </div>
              </div>

              <div className="table-box content-body">
                <div className="vehicle-number">제 22101301호</div>
                <ul className="list-wrap">
                  <li className="list">
                    <div className="title text">차량종류</div>
                    <div className="value text">윙바디 1.5t</div>
                  </li>
                  <li className="list">
                    <div className="title text">평균 운행거리 (월)</div>
                    <div className="value text">1500km</div>
                  </li>
                  <li className="list">
                    <div className="title text">평균 운행일수 (월)</div>
                    <div className="value text">25일</div>
                  </li>
                  <li className="list">
                    <div className="title text">일평균 운행시간 (일)</div>
                    <div className="value text">일 7시간</div>
                  </li>
                  <li className="list">
                    <div className="title text">고정 출발지</div>
                    <div className="value text">-</div>
                  </li>
                  <li className="list">
                    <div className="title text">고정 도착지</div>
                    <div className="value text">
                      경기도 안산시 상록구 월피동
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
