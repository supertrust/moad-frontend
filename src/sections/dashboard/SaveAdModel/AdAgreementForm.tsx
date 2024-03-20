import SaveAdForm from '@src/sections/dashboard/SaveAdModel/SaveAdForm';
import { parseHtml } from '@src/utils/formatter';
import { Modal } from 'antd';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import styles from './styles.module.css';
import useAuth from '@src/hooks/useAuth';
import ArrowBack from '@src/components/icons/ArrowBack';
import { ThreeDots } from 'react-loader-spinner';
import layoutStyles from '@src/sections/dashboard/SaveAdModel/styles.module.css';

const Part = ({ title, children }) => {
  return (
    <div className={'flex flex-col gap-2.5 items-start'}>
      <div className={styles.part_title}>{title}</div>
      <div className={styles.part_content}>{children}</div>
    </div>
  );
};

const OrderingComponent = ({ lists, isSub = false }) => {
  return (
    <ol className={clsx(isSub ? 'pl-10' : 'pl-8')}>
      {lists.map((list, index) => {
        return (
          <li key={index}>
            <div className={'flex gap-3'}>
              <span>{index + 1}.</span>{' '}
              <InfoText>{parseHtml(list.title)}</InfoText>
            </div>
            {list?.subLists?.length ? (
              <OrderingComponent isSub={true} lists={list?.subLists} />
            ) : (
              <></>
            )}
          </li>
        );
      })}
    </ol>
  );
};

const InfoText = ({ className = '', children }) => {
  return <p className={className}>{children}</p>;
};

function AdAgreementForm({
  onClose,
  onAgree,
  open = false,
}: {
  onClose: VoidFunction;
  onAgree: VoidFunction;
  open: boolean;
}) {
  const { user, dictionary } = useAuth();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Enter') {
        event.preventDefault(); // Prevent form submission
        onAgree();
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  return (
    <Modal
      open={open}
      onCancel={() => onClose}
      width={'972px'}
      footer={false}
      closable={false}
      className={'ad_modal'}>
      <div id={layoutStyles.ad_apply_modal} className={`ad-apply-modal`}>
        <div className={`${styles.ad_modal_wrap} ${styles.aggreement_section}`}>
          <div className={`only-mb`}>
            <div
              className={`${styles['mobile-top-header']} ${styles['aggreement-header']}`}>
              <ArrowBack handleAction={onClose} />
              <div className={styles['header']}>광고신청</div>
              <div></div>
            </div>
          </div>
          <div className={styles.ad_apply_title}>
            <p>광고신청</p>
          </div>

          <div
            className={`${styles.agrement_content} ${styles.ad_apply_content}`}>
            <div className={'h-[250px] overflow-auto mb-2'}>
              <div className={styles.terms_title}>
                {dictionary.toc.terms_and_conditions}
              </div>
              <InfoText className={'pt-4'}>
                {dictionary.toc.terms_and_conditions}
              </InfoText>
              <div className={'flex flex-col items-start gap-3 pt-3'}>
                <Part title={dictionary.toc.purpose_of_contract}>
                  <InfoText>{dictionary.toc.purpose_of_contract}</InfoText>
                </Part>
                <Part title={dictionary.toc.compliance_with_laws}>
                  <InfoText>{dictionary.toc.compliance_with_laws}</InfoText>
                </Part>
                <Part title={dictionary.toc.principle_of_good_faith}>
                  <InfoText>{dictionary.toc.principle_of_good_faith}</InfoText>
                </Part>
                <Part title={dictionary.toc.content_of_task}>
                  <OrderingComponent
                    lists={[
                      {
                        title: dictionary.toc.content_of_task,
                        subLists: [
                          {
                            title:
                              '수행할 용역명 : 이카루스에서 제공해주는 광고를 가지고 운행',
                          },
                          { title: '용역의 목적 : 광고 노출' },
                          {
                            title:
                              '용역수행의 목표 <br/>- 운행목표거리달성, 운행목표시간달성',
                          },
                          {
                            title: '용역 수행자',
                            subLists: [
                              {
                                title: '용역 책임자 : 화물주',
                              },
                              { title: '용역 참여자 : 계약된 거리운행의 이행' },
                            ],
                          },
                        ],
                      },
                    ]}
                  />
                </Part>
                <Part title={dictionary.toc.diligent_performance}>
                  <OrderingComponent
                    lists={[
                      {
                        title: dictionary.toc.diligent_performance,
                      },
                      {
                        title: dictionary.toc.diligent_performance,
                      },
                      {
                        title: dictionary.toc.diligent_performance,
                      },
                      {
                        title: dictionary.toc.diligent_performance,
                      },
                    ]}
                  />
                </Part>
                <Part title={dictionary.toc.task_compensation_expenses}>
                  <OrderingComponent
                    lists={[
                      {
                        title: dictionary.toc.task_compensation_expenses,
                        subLists: [
                          {
                            title: '계약금 : 0원, 지급',
                          },
                          { title: '잔금 : 0원, 지급' },
                        ],
                      },
                      {
                        title: dictionary.toc.task_compensation_expenses,
                      },
                    ]}
                  />
                </Part>
                <Part title={dictionary.toc.disclosure_and_review}>
                  <OrderingComponent
                    lists={[
                      {
                        title: dictionary.toc.disclosure_and_review,
                      },
                      {
                        title: dictionary.toc.disclosure_and_review,
                      },
                      {
                        title:
                          dictionary.toc.disclosure_and_review + '<br/> -7',
                      },
                      {
                        title: dictionary.toc.disclosure_and_review,
                        subLists: [
                          { title: dictionary.toc.disclosure_and_review },
                          { title: dictionary.toc.disclosure_and_review },
                          { title: dictionary.toc.disclosure_and_review },
                          { title: dictionary.toc.disclosure_and_review },
                        ],
                      },
                    ]}
                  />
                </Part>
                <Part title={dictionary.toc.contract_period}>
                  <OrderingComponent
                    lists={[
                      {
                        title: dictionary.toc.contract_period,
                      },
                      {
                        title: dictionary.toc.contract_period,
                      },
                    ]}
                  />
                </Part>
                <Part
                  title={dictionary.toc.ownership_and_intellectual_property}>
                  <OrderingComponent
                    lists={[
                      {
                        title:
                          dictionary.toc.ownership_and_intellectual_property,
                      },
                      {
                        title:
                          dictionary.toc.ownership_and_intellectual_property,
                      },
                    ]}
                  />
                </Part>
                <Part title={dictionary.toc.third_party_infringement}>
                  <OrderingComponent
                    lists={[
                      { title: dictionary.toc.third_party_infringement },
                      { title: dictionary.toc.third_party_infringement },
                    ]}
                  />
                </Part>
                <Part title={dictionary.toc.prohibition_of_assignment}>
                  <OrderingComponent
                    lists={[
                      { title: dictionary.toc.prohibition_of_assignment },
                      { title: dictionary.toc.prohibition_of_assignment },
                    ]}
                  />
                </Part>
                <Part title={dictionary.toc.contract_termination}>
                  <OrderingComponent
                    lists={[
                      { title: dictionary.toc.contract_termination },
                      { title: dictionary.toc.contract_termination },
                    ]}
                  />
                </Part>
                <Part title={dictionary.toc.contract_interpretation}>
                  <InfoText>{dictionary.toc.contract_interpretation}</InfoText>
                </Part>
                <Part title={dictionary.toc.jurisdiction}>
                  <InfoText>{dictionary.toc.jurisdiction}</InfoText>
                </Part>
                <Part title={dictionary.toc.contract_effectiveness}>
                  <OrderingComponent
                    lists={[
                      { title: dictionary.toc.contract_effectiveness },
                      { title: dictionary.toc.contract_effectiveness },
                    ]}
                  />
                </Part>
              </div>

              <div className={'flex flex-col pt-5 gap-5 pb-4'}>
                <p className={clsx(styles.part_title, 'text-center')}>
                  2024년 02월 19일{' '}
                </p>
                <Part title='위탁자'>
                  <InfoText>{dictionary.toc.consignor.corporate_name}</InfoText>
                  <InfoText>{dictionary.toc.consignor.ceo}</InfoText>
                  <InfoText>{dictionary.toc.consignor.address}</InfoText>
                  <InfoText>{dictionary.toc.consignor.phone_number}</InfoText>
                </Part>
                <Part title='수탁자'>
                  <InfoText>{dictionary.toc.consignee.name}</InfoText>
                  <InfoText>
                    {dictionary.toc.consignee.resident_registration_number}
                  </InfoText>
                  <InfoText>{dictionary.toc.consignee.address}</InfoText>
                  <InfoText>{dictionary.toc.consignee.phone_number}</InfoText>
                </Part>
              </div>
            </div>
          </div>

          <div
            className={`${styles.agrement_content} ${styles.ad_apply_content}`}>
            <div className={'border-t px-[30px] pb-3'}></div>
            <div className={'h-[250px] overflow-auto'}>
              <div className={styles.terms_title}>
                {dictionary.terms_and_conditions.title}
              </div>
              <InfoText className={'pt-4'}>
                {dictionary.terms_and_conditions.intro}
              </InfoText>
              <div className={'flex flex-col items-start gap-3 pt-3'}>
                <Part title={dictionary.terms_and_conditions.section1.title}>
                  <InfoText>
                    {dictionary.terms_and_conditions.section1.content}
                  </InfoText>
                </Part>
                <Part title={dictionary.terms_and_conditions.section2.title}>
                  <InfoText>
                    {dictionary.terms_and_conditions.section2.content}
                  </InfoText>
                </Part>
                <Part title={dictionary.terms_and_conditions.section3.title}>
                  <InfoText>
                    {dictionary.terms_and_conditions.section3.content}
                  </InfoText>
                </Part>

                <Part title={dictionary.terms_and_conditions.section4.title}>
                  <OrderingComponent
                    lists={[
                      {
                        title:
                          dictionary.terms_and_conditions.section4.content
                            .title,
                        subLists: [
                          {
                            title:
                              dictionary.terms_and_conditions.section4.content
                                .subLists[0].title,
                          },
                          {
                            title:
                              dictionary.terms_and_conditions.section4.content
                                .subLists[1].title,
                          },
                          {
                            title:
                              dictionary.terms_and_conditions.section12.content
                                .subLists &&
                              dictionary.terms_and_conditions.section12.content
                                .subLists.length > 1 &&
                              dictionary.terms_and_conditions.section12.content
                                .subLists[1].subLists &&
                              dictionary.terms_and_conditions.section12.content
                                .subLists[1].subLists.length > 2
                                ? dictionary.terms_and_conditions.section12
                                    .content.subLists[1].subLists[2]?.title ||
                                  ''
                                : '',
                          },
                          {
                            title:
                              (dictionary.terms_and_conditions.section4.content
                                .subLists &&
                                dictionary.terms_and_conditions.section4.content
                                  .subLists.length > 3 &&
                                dictionary.terms_and_conditions.section4.content
                                  .subLists[3] &&
                                dictionary.terms_and_conditions.section4.content
                                  .subLists[3].title) ||
                              '',
                            subLists: [
                              {
                                title:
                                  (dictionary.terms_and_conditions.section4
                                    .content.subLists &&
                                    dictionary.terms_and_conditions.section4
                                      .content.subLists.length > 3 &&
                                    dictionary.terms_and_conditions.section4
                                      .content.subLists[3] &&
                                    dictionary.terms_and_conditions.section4
                                      .content.subLists[3].subLists &&
                                    dictionary.terms_and_conditions.section4
                                      .content.subLists[3].subLists.length >
                                      0 &&
                                    dictionary.terms_and_conditions.section4
                                      .content.subLists[3].subLists[0].title) ||
                                  '',
                              },
                              {
                                title:
                                  (dictionary.terms_and_conditions.section4
                                    .content.subLists &&
                                    dictionary.terms_and_conditions.section4
                                      .content.subLists.length > 3 &&
                                    dictionary.terms_and_conditions.section4
                                      .content.subLists[3] &&
                                    dictionary.terms_and_conditions.section4
                                      .content.subLists[3].subLists &&
                                    dictionary.terms_and_conditions.section4
                                      .content.subLists[3].subLists.length >
                                      1 &&
                                    dictionary.terms_and_conditions.section4
                                      .content.subLists[3].subLists[1].title) ||
                                  '',
                              },
                            ],
                          },
                        ],
                      },
                    ]}
                  />
                </Part>

                <Part title={dictionary.terms_and_conditions.section5.title}>
                  <OrderingComponent
                    lists={[
                      {
                        title:
                          dictionary.terms_and_conditions.section5.content
                            .title,
                      },
                      {
                        title:
                          dictionary.terms_and_conditions.section5.content
                            .subLists &&
                          dictionary.terms_and_conditions.section5.content
                            .subLists.length > 0
                            ? dictionary.terms_and_conditions.section5.content
                                .subLists[0].title
                            : '',
                      },
                      {
                        title:
                          dictionary.terms_and_conditions.section5.content
                            .subLists &&
                          dictionary.terms_and_conditions.section5.content
                            .subLists.length > 0
                            ? dictionary.terms_and_conditions.section5.content
                                .subLists[1].title
                            : '',
                      },
                      {
                        title:
                          dictionary.terms_and_conditions.section5.content
                            .subLists &&
                          dictionary.terms_and_conditions.section5.content
                            .subLists.length > 0
                            ? dictionary.terms_and_conditions.section5.content
                                .subLists[2].title
                            : '',
                      },
                    ]}
                  />
                </Part>

                <Part title={dictionary.terms_and_conditions.section6.title}>
                  <OrderingComponent
                    lists={[
                      {
                        title:
                          dictionary.terms_and_conditions.section6.content
                            .title,
                        subLists: [
                          {
                            title:
                              dictionary.terms_and_conditions.section6.content
                                .subLists &&
                              dictionary.terms_and_conditions.section6.content
                                .subLists.length > 0
                                ? dictionary.terms_and_conditions.section6
                                    .content.subLists[0].title
                                : '',
                          },
                          {
                            title:
                              dictionary.terms_and_conditions.section6.content
                                .subLists &&
                              dictionary.terms_and_conditions.section6.content
                                .subLists.length > 0
                                ? dictionary.terms_and_conditions.section6
                                    .content.subLists[1].title
                                : '',
                          },
                        ],
                      },
                      {
                        title:
                          (dictionary.terms_and_conditions.section6.content
                            .subLists &&
                            dictionary.terms_and_conditions.section6.content
                              .subLists.length > 2 &&
                            dictionary.terms_and_conditions.section6.content
                              .subLists[2] &&
                            dictionary.terms_and_conditions.section6.content
                              .subLists[2].title) ||
                          '',
                      },
                    ]}
                  />
                </Part>

                <Part title={dictionary.terms_and_conditions.section7.title}>
                  <OrderingComponent
                    lists={[
                      {
                        title:
                          dictionary.terms_and_conditions.section7.content
                            .title,
                      },
                      {
                        title:
                          dictionary.terms_and_conditions.section7.content
                            .subLists &&
                          dictionary.terms_and_conditions.section7.content
                            .subLists.length > 0
                            ? dictionary.terms_and_conditions.section7.content
                                .subLists[0].title
                            : '',
                      },
                      {
                        title:
                          dictionary.terms_and_conditions.section7.content
                            .subLists &&
                          dictionary.terms_and_conditions.section7.content
                            .subLists.length > 0
                            ? dictionary.terms_and_conditions.section7.content
                                .subLists[1].title
                            : '',
                      },
                      {
                        title:
                          (dictionary.terms_and_conditions.section7.content
                            .subLists &&
                            dictionary.terms_and_conditions.section7.content
                              .subLists.length > 2 &&
                            dictionary.terms_and_conditions.section7.content
                              .subLists[2] &&
                            dictionary.terms_and_conditions.section7.content
                              .subLists[2].title) ||
                          '',
                      },
                    ]}
                  />
                </Part>

                <Part title={dictionary.terms_and_conditions.section8.title}>
                  <OrderingComponent
                    lists={[
                      {
                        title:
                          dictionary.terms_and_conditions.section8.content
                            .title,
                      },
                      {
                        title:
                          dictionary.terms_and_conditions.section8.content
                            .subLists &&
                          dictionary.terms_and_conditions.section8.content
                            .subLists.length > 0
                            ? dictionary.terms_and_conditions.section8.content
                                .subLists[0].title
                            : '',
                      },
                      {
                        title:
                          (dictionary.terms_and_conditions.section8.content
                            .subLists &&
                            dictionary.terms_and_conditions.section8.content
                              .subLists.length > 1 &&
                            dictionary.terms_and_conditions.section8.content
                              .subLists[1] &&
                            dictionary.terms_and_conditions.section8.content
                              .subLists[1].title) ||
                          '',
                      },
                    ]}
                  />
                </Part>

                <Part title={dictionary.terms_and_conditions.section9.title}>
                  <OrderingComponent
                    lists={[
                      {
                        title:
                          dictionary.terms_and_conditions.section9.content
                            .title,
                      },
                      {
                        title:
                          dictionary.terms_and_conditions.section9.content
                            .subLists &&
                          dictionary.terms_and_conditions.section9.content
                            .subLists.length > 0
                            ? dictionary.terms_and_conditions.section9.content
                                .subLists[0].title
                            : '',
                      },
                      {
                        title:
                          (dictionary.terms_and_conditions.section9.content
                            .subLists &&
                            dictionary.terms_and_conditions.section9.content
                              .subLists.length > 1 &&
                            dictionary.terms_and_conditions.section9.content
                              .subLists[1] &&
                            dictionary.terms_and_conditions.section9.content
                              .subLists[1].title) ||
                          '',
                      },
                    ]}
                  />
                </Part>

                <Part title={dictionary.terms_and_conditions.section10.title}>
                  <OrderingComponent
                    lists={[
                      {
                        title:
                          dictionary.terms_and_conditions.section10.content
                            .title,
                      },
                      {
                        title:
                          dictionary.terms_and_conditions.section10.content
                            .subLists &&
                          dictionary.terms_and_conditions.section10.content
                            .subLists.length > 0
                            ? dictionary.terms_and_conditions.section10.content
                                .subLists[0].title
                            : '',
                      },
                      {
                        title:
                          (dictionary.terms_and_conditions.section10.content
                            .subLists &&
                            dictionary.terms_and_conditions.section10.content
                              .subLists.length > 1 &&
                            dictionary.terms_and_conditions.section10.content
                              .subLists[1] &&
                            dictionary.terms_and_conditions.section10.content
                              .subLists[1].title) ||
                          '',
                      },
                    ]}
                  />
                </Part>

                <Part title={dictionary.terms_and_conditions.section11.title}>
                  <OrderingComponent
                    lists={[
                      {
                        title:
                          dictionary.terms_and_conditions.section11.content
                            .title,
                      },
                      {
                        title:
                          dictionary.terms_and_conditions.section11.content
                            .subLists &&
                          dictionary.terms_and_conditions.section11.content
                            .subLists.length > 0
                            ? dictionary.terms_and_conditions.section11.content
                                .subLists[0].title
                            : '',
                      },
                      {
                        title:
                          (dictionary.terms_and_conditions.section11.content
                            .subLists &&
                            dictionary.terms_and_conditions.section11.content
                              .subLists.length > 1 &&
                            dictionary.terms_and_conditions.section11.content
                              .subLists[1] &&
                            dictionary.terms_and_conditions.section11.content
                              .subLists[1].title) ||
                          '',
                      },
                    ]}
                  />
                </Part>

                <Part title={dictionary.terms_and_conditions.section12.title}>
                  <OrderingComponent
                    lists={[
                      {
                        title:
                          dictionary.terms_and_conditions.section12.content
                            .title,
                        subLists: [
                          {
                            title:
                              dictionary.terms_and_conditions.section12.content
                                .subLists &&
                              dictionary.terms_and_conditions.section12.content
                                .subLists.length > 0
                                ? dictionary.terms_and_conditions.section12
                                    .content.subLists[0].title
                                : '',
                          },
                          {
                            title:
                              dictionary.terms_and_conditions.section12.content
                                .subLists &&
                              dictionary.terms_and_conditions.section12.content
                                .subLists.length > 1
                                ? dictionary.terms_and_conditions.section12
                                    .content.subLists[1]?.title || ''
                                : '',
                            subLists: [
                              {
                                title:
                                  dictionary.terms_and_conditions.section12
                                    .content.subLists &&
                                  dictionary.terms_and_conditions.section12
                                    .content.subLists.length > 1
                                    ? dictionary.terms_and_conditions.section12
                                        .content.subLists[1].title
                                    : '',
                              },
                              {
                                title:
                                  dictionary.terms_and_conditions.section12
                                    .content.subLists &&
                                  dictionary.terms_and_conditions.section12
                                    .content.subLists.length > 1
                                    ? dictionary.terms_and_conditions.section12
                                        .content.subLists[1].title
                                    : '',
                              },
                              {
                                title:
                                  dictionary.terms_and_conditions.section12
                                    .content.subLists &&
                                  dictionary.terms_and_conditions.section12
                                    .content.subLists.length > 1 &&
                                  dictionary.terms_and_conditions.section12
                                    .content.subLists[1].subLists &&
                                  dictionary.terms_and_conditions.section12
                                    .content.subLists[1].subLists.length > 2
                                    ? dictionary.terms_and_conditions.section12
                                        .content.subLists[1].subLists[2]
                                        ?.title || ''
                                    : '',
                              },
                              {
                                title:
                                  dictionary.terms_and_conditions.section12
                                    .content.subLists &&
                                  dictionary.terms_and_conditions.section12
                                    .content.subLists.length > 1 &&
                                  dictionary.terms_and_conditions.section12
                                    .content.subLists[1].subLists &&
                                  dictionary.terms_and_conditions.section12
                                    .content.subLists[1].subLists.length > 3
                                    ? dictionary.terms_and_conditions.section12
                                        .content.subLists[1].subLists[3]
                                        ?.title || ''
                                    : '',
                              },
                            ],
                          },
                        ],
                      },
                    ]}
                  />
                </Part>

                <Part title={dictionary.terms_and_conditions.section13.title}>
                  <InfoText>
                    {dictionary.terms_and_conditions.section13.content}
                  </InfoText>
                </Part>
                <Part title={dictionary.terms_and_conditions.section14.title}>
                  <InfoText>
                    {dictionary.terms_and_conditions.section14.content}
                  </InfoText>
                </Part>
              </div>

              <div className={'flex flex-col pt-5 gap-5 pb-4'}>
                <p className={clsx(styles.part_title, 'text-center')}>
                  {dictionary.date}
                </p>
                <Part title={dictionary.toc.consignor.corporate_name}>
                  <InfoText>{dictionary.toc.consignor.ceo}</InfoText>
                  <InfoText>{dictionary.toc.consignor.address}</InfoText>
                  <InfoText>{dictionary.toc.consignor.phone_number}</InfoText>
                </Part>
                <Part title={dictionary.toc.consignee.name}>
                  <InfoText>
                    {dictionary.toc.consignee.resident_registration_number}
                  </InfoText>
                  <InfoText>{dictionary.toc.consignee.address}</InfoText>
                  <InfoText>{dictionary.toc.consignee.phone_number}</InfoText>
                </Part>
              </div>
            </div>

            <div className={'border-t px-[30px] mt-5'}></div>

            <div className={styles.terms_company}>
              {dictionary.terms_and_conditions.company_name}
              <br />
              {dictionary.terms_and_conditions.business_registration_number}
            </div>
            <div className={styles.modal_step}>
              <div className={styles.btn_section}>
                <button
                  type='button'
                  id={styles.ad_apply_cancel}
                  className={`${styles.btns} ${styles.cancel_btn}`}
                  onClick={onClose}>
                  {dictionary.buttons.cancel}
                </button>
                <button
                  type='button'
                  id={styles.ad_apply_btn}
                  className={`${styles.btns} ${styles.active} ${styles.ad_apply_btn}`}
                  onClick={onAgree}>
                  {dictionary.buttons.confirm}
                </button>
              </div>
            </div>
          </div>

          {/* <hr /> */}
        </div>
      </div>
    </Modal>
  );
}

export default AdAgreementForm;
