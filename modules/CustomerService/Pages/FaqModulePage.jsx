import React , {useState , useEffect}from "react";
import { Accordion, Pagination, Tab, Tabs } from "react-bootstrap";
import { faqService } from '../../../_services';
export default function FaqModulePage() {

  const token = localStorage.getItem('token');

  const [faq, setFaq] = useState();
  const [faqServiceUse, setFaqServicesUse] = useState();

  useEffect(() => { 

      faqService.faq(token).then(
        (res)=>{
          setFaq(res.data.data)
        }
      ).catch((error)=>{ console.log(error)})


      faqService.faq_service_use(token).then(
        (res)=>{
          setFaqServicesUse(res.data.data)
        }
      ).catch((error)=>{ console.log(error)})


  },[]);

  const AccordianContent = [
    {
      title: "질문 제목",
      category: "서비스이용",
      body: "아래 문의를 이용해주시면 빠른 연락 드리겠습니다.",
    },
    {
      title: "질문 제목",
      category: "서비스이용",
      body: "아래 문의를 이용해주시면 빠른 연락 드리겠습니다.",
    },
    {
      title: "질문 제목",
      category: "서비스이용",
      body: "아래 문의를 이용해주시면 빠른 연락 드리겠습니다.",
    },
    {
      title: "질문 제목",
      category: "서비스이용",
      body: "아래 문의를 이용해주시면 빠른 연락 드리겠습니다.",
    },
    {
      title: "질문 제목",
      category: "서비스이용",
      body: "아래 문의를 이용해주시면 빠른 연락 드리겠습니다.",
    },
    {
      title: "질문 제목",
      category: "서비스이용",
      body: "아래 문의를 이용해주시면 빠른 연락 드리겠습니다.",
    },
    {
      title: "질문 제목",
      category: "서비스이용",
      body: "아래 문의를 이용해주시면 빠른 연락 드리겠습니다.",
    },
    {
      title: "질문 제목",
      category: "서비스이용",
      body: "아래 문의를 이용해주시면 빠른 연락 드리겠습니다.",
    },
    {
      title: "질문 제목",
      category: "서비스이용",
      body: "아래 문의를 이용해주시면 빠른 연락 드리겠습니다.",
    },
  ];

  return (
    <div className="faq-content">
      <div className="faq">
        <Tabs defaultActiveKey="전체" className="mb-4 tab-section">
          <Tab eventKey="전체" title="전체">
            <Accordion className="accordion-section">
              {faq && faq.map((item, i) => {
                return (
                  <Accordion.Item eventKey={i} key={i}>
                    <Accordion.Header>
                      <div className="list-title">
                        {/* <div className="category">{item.category}</div> */}
                        <div className="title">{item.question}</div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>{item.answer}</Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
            <Pagination>
              <Pagination.Prev className="prev-btn" />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Next className="next-btn" />
            </Pagination>
          </Tab>
          <Tab eventKey="서비스이용" title="서비스이용">
            {/* {faqServiceUse?.length} */}
            <Accordion className="accordion-section">
              {faqServiceUse && faqServiceUse.map((item, i) => {
                return (
                  <Accordion.Item eventKey={i} key={i}>
                    <Accordion.Header>
                      <div className="list-title">
                        {/* <div className="category">{item.category}</div> */}
                        <div className="title">{item.question}</div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>{item.answer}</Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
            <Pagination>
              <Pagination.Prev className="prev-btn" />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Next className="next-btn" />
            </Pagination>
          </Tab>
          <Tab eventKey="결제/환불" title="결제/환불">
            <div className="none-list">등록된 FAQ가 없습니다.</div>
          </Tab>
          <Tab eventKey="기타" title="기타">
            <div className="none-list">등록된 FAQ가 없습니다.</div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
