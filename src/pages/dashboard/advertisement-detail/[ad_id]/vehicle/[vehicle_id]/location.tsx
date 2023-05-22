import React, { useEffect, useRef, useState } from "react";
import { getMapScriptTag, registerEvents } from "@src/helpers/map";
import { Button } from "react-bootstrap";
import { useSaveLocation } from "@src/apis/map";
import { toast } from "react-toastify";
import { dateFormat } from "@src/helpers";
import useDebouncedState from "@restart/hooks/useDebouncedState";
import { Drawer, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { styles } from "@src/sections/vehicle-location";

const Map = () => {
  const { query } = useRouter();
  const { ad_id, vehicle_id } = query;

  const mapRef = useRef(null);
  const startInputRef = useRef<HTMLInputElement | null>(null);
  const endInputRef = useRef<HTMLInputElement | null>(null);
  const [savingRide, setSavingRide] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const { mutateAsync: saveLocation } = useSaveLocation();
  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };
  const handleStartRide = async (event: any) => {
    try {
      setSavingRide(true);
      event.preventDefault();
      const currentDate = new Date();
      const data = {
        cargo_vehicle_id: 1,
        starting_point: startInputRef.current?.value || "",
        end_point: endInputRef.current?.value || "",
        start_time: dateFormat(currentDate.toLocaleDateString()),
        end_time: dateFormat(currentDate.toLocaleDateString()),
        route_no: Date.now(),
      };
      await saveLocation(data);
    } catch {
      setSavingRide(false);
    }
  };
  useEffect(() => {
    const mapScript = getMapScriptTag(mapRef.current);
    registerEvents(mapScript, mapRef, startInputRef, endInputRef);
    document.head.appendChild(mapScript);
    return () => {
      document.head.removeChild(mapScript);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div>
        <input type="hidden" id="start" ref={startInputRef} />
        <input type="hidden" id="end" ref={endInputRef} />
        <div id="button-container">
          <Button
            disabled={savingRide}
            onClick={handleStartRide}
            variant="primary"
            className="bg-sky-500/100 absolute mt-[350px] ml-[450px] z-50"
          >
            Save Ride
          </Button>
        </div>
      </div>
      <div></div>
      <div
        ref={mapRef}
        style={{ width: "100%", minHeight: "49vw", position: "relative" }}
      />
      <div>
        <div className={styles.button_wrap}>
          <button
            type="button"
            id="location_detail_btn"
            className={`${styles.arrow_wrap} ${
              isOpen ? styles.btn_closed : styles.btn_open
            }`}
            onClick={handleClose}
          >
            <i className={styles.ic_arrrow}></i>
          </button>
        </div>
        <div className={styles.vehicle_location_content}>
          <div
            className={`${styles.location_detail_wrap} ${
              isOpen ? styles.closed : styles.open
            }`}
          >
            <div className={styles.address}>안산시 상록구 월피동</div>
            <div className={styles.content_inner}>
              <div className={styles.inner}>
                <div className={`${styles.section} ${styles.now_location}`}>
                  <div className={styles.title}>지금 이곳은?</div>
                  <img
                    src="/images/img-location.png"
                    alt=""
                    className={styles.img}
                  />
                  <div className={styles.location_name}>영동고속도로</div>
                  <div className={styles.text_wrap}>
                    <div className={styles.text}>평균(일) 통과차량</div>
                    <div className={styles.text}>상행 : 26800대</div>
                    <div className={styles.text}>하행 : 18900대</div>
                  </div>
                </div>

                <div
                  className={`${styles.section} ${styles.operation_history}`}
                >
                  <div className={styles.text}>운행내역</div>
                  <ul className={styles.history}>
                    <li className={styles.list}>
                      <i className={`${styles.icons} ${styles.ic_start}`}></i>
                      <div className={styles.data}>08:00</div>
                      <div className={styles.text}>운행시작</div>
                    </li>
                    <li className={styles.list}>
                      <i className={`${styles.icons} ${styles.ic_end}`}></i>
                      <div className={styles.data}>18:00</div>
                      <div className={styles.text}>운행종료</div>
                    </li>
                    <li className={styles.list}>
                      <i className={`${styles.icons} ${styles.ic_drive}`}></i>
                      <div className={styles.data}>100km</div>
                      <div className={styles.text}>운행거리</div>
                    </li>
                  </ul>
                </div>

                <div
                  className={`${styles.section} ${styles.accomplishment_rate}`}
                >
                  <div className={styles.title}>운행 달성률</div>
                  <ul className={styles.list_wrap}>
                    <li className={styles.list}>
                      <div className={styles.bar_wrap}>
                        <div className={`${styles.text} ${styles.km}`}>
                          100km
                        </div>
                        <div className={`${styles.bar} ${styles.today}`}></div>
                      </div>
                      <div className={`${styles.text} ${styles.desc}`}>
                        오늘 운행거리
                      </div>
                    </li>
                    <li className={styles.list}>
                      <div className={styles.bar_wrap}>
                        <div className={`${styles.text} ${styles.km}`}>
                          800km
                        </div>
                        <div className={`${styles.bar} ${styles.total}`}></div>
                      </div>
                      <div className={`${styles.text} ${styles.desc}`}>
                        총 운행거리
                      </div>
                    </li>
                    <li className={styles.list}>
                      <div className={styles.bar_wrap}>
                        <div className={`${styles.text} ${styles.km}`}>
                          1500km
                        </div>
                        <div
                          className={`${styles.bar} ${styles.average}`}
                        ></div>
                      </div>
                      <div className={`${styles.text} ${styles.desc}`}>
                        평균 월 운행거리
                      </div>
                    </li>
                  </ul>
                </div>
                <div className={styles.standard}>
                  2023.03.01 ~ 2023.03.28 기준
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
