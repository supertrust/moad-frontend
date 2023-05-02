import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
export default function Advertisement() {
  return (
    <Container>
      <Row>
        {/* <Col md="6">
          <div className="ad-status">
            <div className="title-wrap">
              <div className="title">
                    Advertising status
              </div>
              <div className="line"></div>
             
              <div className="text">
                    As of 12:00 am on March 10, 2023
              </div>
            </div>
            <div className="ad-content">
              <div className="card">
                <div className="title">
                      registered advertisement
                </div>
                <div className="value">-</div>
              </div>
              <div className="card">
                <div className="title">total vehicle
                </div>
                <div className="value">20s
                </div>
              </div>
              <div className="card">
                <div className="title">running
                </div>
                <div className="value">15th
                </div>
              </div>
              <div className="card">
                <div className="title">Suspension
                </div>
                <div className="value">5 generations
                </div>
              </div>
              <div className="card">
                <div className="title">
                      total distance 
                </div>
                <div className="value">-
                </div>
              </div>
              <div className="card">
                <div className="title">
                      total running time
                </div>
                <div className="value">,460 hours
                </div>
              </div>
            </div>
          </div>
        </Col> */}
        <Col md="6">
          <div className="ad-status">
            <div className="title-wrap">
              <div class="title">
                <font>Advertising status</font>
              </div>
              <div class="line"></div>
              <div class="text">
                <font>As of 12:00 am on March 10, 2023</font>
              </div>
            </div>
          </div>
          <div className="ad-content">
            <div className="cards">
              <div className="title">
                <font>registered advertisement</font>
              </div>
              <div className="value">
                <font>-</font>
              </div>
            </div>
            <div className="cards">
              <div className="title">
                <font>total vehicle</font>
              </div>
              <div className="value">
                <font>20's</font>
              </div>
            </div>
            <div className="cards">
              <div className="title">
                <font> running</font>
              </div>
              <div className="value">
                <font>15th</font>
              </div>
            </div>
            <div className="cards">
              <div className="title">
                <font>Suspension</font>
              </div>
              <div className="value">
                <font>5 generations</font>
              </div>
            </div>
          </div>
        </Col>
        <Col md="6">
          <div className="notification">
            <div className="title-wraps">
              <div class="title">
                <font>notification center</font>
              </div>
              <div class="line"></div>
              <a href="/notification-center" class="text">
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
        </Col>
        <Col md="12">
          <div className="ad-list">
            <h4>ad list</h4>{" "}
          </div>
          <div className="ad-contents">
            <div className="menu-hd">
              <div className="tab-menu">
                <div className="tab-01 tab-title active">
                  <font>entire</font>
                </div>
                <div className="tab-02 tab-title">
                  <font>Proceeding</font>
                </div>
                <div className="tab-02 tab-title">
                  <font>Applying</font>
                </div>
                <div className="tab-02 tab-title">
                  <font>end</font>
                </div>
              </div>
              <div className="right-menu">
                <button className="ad-add-btn">
                  <img src="/images/add-icon.png" alt="add"></img>
                  Advertisement registration
                </button>
                <button className="ad-delet-btn">delete</button>
                <div className="select-box only-pc">
                  <Form.Select aria-label="Default select example">
                    <option>Choose your campaign type</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="tab-wrap">
              <div className="list-hd list-flex">
                <div className="chk-box hd-all-chk">
                  <input
                    type="checkbox"
                    name="all_chk"
                    id="all_chk"
                    class="all-chk"
                    value=""
                  />
                </div>
                <div class="grid">
                  <div class="grid-box type-wrap hd-type">ad name</div>
                  <div class="grid-box title-wrap hd-name">ad name</div>
                  <div class="grid-box car-wrap hd-car only-pc">ad name</div>
                  <div class="grid-box car-wrap hd-car only-mb">ad name</div>
                  <div class="grid-box date-wrap hd-date">ad name</div>
                </div>
              </div>
              <div className="list-hd list-flex">
                <div className="chk-box hd-all-chk">
                  <input
                    type="checkbox"
                    name="all_chk"
                    id="all_chk"
                    class="all-chk"
                    value=""
                  />
                </div>
                <div class="grid">
                  <div class="grid-box type-wrap hd-type">ad name</div>
                  <div class="grid-box title-wrap hd-name">Celebrating the opening of the Icarus service. 25 characters</div>
                  <div class="grid-box car-wrap hd-car only-pc">ad name</div>
                  <div class="grid-box car-wrap hd-car only-mb">ad name</div>
                  <div class="grid-box date-wrap hd-date">ad name</div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
