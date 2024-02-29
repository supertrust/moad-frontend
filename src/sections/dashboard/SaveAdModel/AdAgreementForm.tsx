import SaveAdForm from "@src/sections/dashboard/SaveAdModel/SaveAdForm";
import { parseHtml } from "@src/utils/formatter";
import { Modal } from "antd";
import clsx from "clsx";
import React, { useEffect } from "react";
import styles from "./styles.module.css";
import useAuth from "@src/hooks/useAuth";
import ArrowBack from "@src/components/icons/ArrowBack";
import { ThreeDots } from "react-loader-spinner";
import layoutStyles from "@src/sections/dashboard/SaveAdModel/styles.module.css"

const Part = ({ title, children }) => {
    return (
        <div className={'flex flex-col gap-2.5 items-start'}>
            <div className={styles.part_title}>{title}</div>
            <div className={styles.part_content}>{children}</div>
        </div>
    );
}

const OrderingComponent = ({ lists,isSub=false }) => {
    return <ol className={clsx(isSub? 'pl-10' : 'pl-8')}>
        {lists.map((list, index) => {
            return <li key={index}>
                <div className={'flex gap-3'}>
                    <span>{index + 1}.</span> <InfoText>
                    {parseHtml(list.title)}
                </InfoText>
                </div>
                {
                    list?.subLists?.length ? <OrderingComponent isSub={true} lists={list?.subLists}/> : <></>
                }
            </li>
        })}
    </ol>
}

const InfoText = ({ className = '', children }) => {
    return <p className={className}>
        {children}
    </p>
}

function AdAgreementForm({
                             onClose,
                             onAgree,
    open =false
                         }: {
    onClose: VoidFunction;
    onAgree: VoidFunction;
    open : boolean
}) {
    const { user } = useAuth();

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.code === "Enter") {
                event.preventDefault(); // Prevent form submission
                onAgree();
            }
        };
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);
    return (
        <Modal
            open={open}
            onCancel={() => onClose}
            width={'972px'}
            footer={false}
            closable={false}
            className={'ad_modal'}
        >
            <div id={layoutStyles.ad_apply_modal} className={`ad-apply-modal`}>
            <div className={`${styles.ad_modal_wrap} ${styles.aggreement_section}`}>
                <div className={`only-mb`}>
                    <div className={`${styles["mobile-top-header"]} ${styles["aggreement-header"]}`}>
                        <ArrowBack handleAction={onClose}/>
                        <div className={styles['header']}>
                            광고신청
                        </div>
                        <div></div>
                    </div>

                </div>
                <div className={styles.ad_apply_title}>
                    <p>광고신청</p>
                </div>

                <div className={`${styles.agrement_content} ${styles.ad_apply_content}`}>
                    <div className={'h-[250px] overflow-auto mb-2'}>
                        <div className={styles.terms_title}>이카루스 광고 신청 약관 계약서</div>
                        <InfoText className={'pt-4'}>
                            이카루스(이하 ‘위탁자’ 또는 ‘갑’)와 화물주(이하 ‘수탁자’ 또는 ‘을’)는 '갑'이 위탁하는 업무를 '을'이 수행하고, '갑'은 '을'에게 이에 대한 대가를 지급하기로 하는
                            내용의 약정에 관하여 다음과 같이 계약(이하 ‘본 계약’)을 체결한다.
                        </InfoText>
                        <div className={'flex flex-col items-start gap-3 pt-3'}>
                            <Part title="제1조(계약의 목적)">
                                <InfoText>
                                    본 계약은 '갑'이 필요로 하는 업무(이하 ‘본 건 용역 업무’)를 ‘을’에게 위탁하여 수행하도록 함에 있어, ‘갑’과 ‘을’이 사이에 필요한 사항을 정하는 것을
                                    목적으로 한다.
                                </InfoText>
                            </Part>
                            <Part title="제2조(관계법령의 준수)">
                                <InfoText>
                                    양 당사자는 대등한 관계에서 본 계약을 합의하고 체결하며, 독점규제 및 공정거래에 관한 법률 등 관계 법규를 준수하여 이행한다.
                                </InfoText>
                            </Part>
                            <Part title="제3조(신의성실의 원칙)">
                                <InfoText>
                                    양 당사자는 본 계약에 따른 권리와 의무를 신의성실 원칙에 따라 성실히 이행함으로써 상호 간에 공정한 관계를 형성하고 지속한다.
                                </InfoText>
                            </Part>

                            <Part title="제4조(용역의 내용)">
                                <OrderingComponent lists={[{
                                    title: "‘갑’은 ‘을’에게 아래와 같은 내용의 용역(이하 '본 건 용역')의 수행을 위탁한다.",
                                    subLists: [{
                                        title: "수행할 용역명 : 이카루스에서 제공해주는 광고를 가지고 운행"
                                    }, { title: "용역의 목적 : 광고 노출" }, { title: "용역수행의 목표 <br/>- 운행목표거리달성, 운행목표시간달성" }, {
                                        title: "용역 수행자", subLists: [{
                                            title: "용역 책임자 : 화물주"
                                        }, { title: "용역 참여자 : 계약된 거리운행의 이행" }]
                                    }]
                                }]}/>
                            </Part>

                            <Part title="제5조(용역의 성실이행)">
                                <OrderingComponent lists={[{
                                    title: "용역을 제공함에 있어서 '을'은 그 축적된 지식 및 경험을 활용하여 '갑'이 본 계약을 통해 도달하고자 하는 목표가 도달되도록 가능한 최고 수준의 용역을 성실히 제공한다.",
                                },
                                    {
                                        title: "'을'은 본 건 용역의 목적을 달성하고 관련 결과물이 도출되는 것을 보증하고, '갑'과 '을'은 별도의 약정을 통해 보증보험증서 교부 여부를 정할 수 있다.",
                                    }, {
                                        title: "'을'이 계약서에서 정한 바와 달리, 성실하게 용역업무를 이행하지 않을 경우, '갑'은 '을'과 합의하에 계약을 해지할 수 있다."
                                    },
                                    {
                                        title: "‘을’은 계약의 효력 발생과 동시에 본 건 용역 업무를 수행하여야 하며 3일이 지나도록 본 건 용역 업무 내용에 따른 업무 성과물의 교부" +
                                            " 또는 보고가 없는 경우 ‘을’이 특별한 사정으로 인한 진행 상황의 지연에 대해 사전 승인을 얻지 않은 이상 ‘갑’은 ‘을’에게 위약벌로 이미 지급한 금액의 " +
                                            "당사 협의된%를 추가하여 반환 및 청구할 수 있다."
                                    }
                                ]
                                }/>
                            </Part>

                            <Part title="제6조(용역대금 및 비용의 처리)">
                                <OrderingComponent lists={[{
                                    title: "‘갑’은 '을'에게 본 건 용역의 대가를 아래와 같이 지급하며, 부가세를 포함한 금액으로 한다.",
                                    subLists: [{
                                        title: "계약금 : 0원, 지급"
                                    }, { title: "잔금 : 0원, 지급" }]
                                }, {
                                    title: "본 건 용역 과정에서 발생하는 비용은 '을'이 부담한다. 다만, 본 건 용역수행으로 예상할 수 없는 특별한 비용 지출 사정이 생긴 경우 " +
                                        "'을'은 '갑'에게 비용의 부담을 요청할 수 있다."
                                }
                                ]
                                }/>
                            </Part>

                            <Part title="제7조(자료의 공개 및 용역 내용 검토 등)">
                                <OrderingComponent lists={[{
                                    title: "'갑'과 '을’은 상호 간에 법이 허용하는 범위 내에서 본 건 용역 수행 및 성과와 관련한 기록, 보고서 등의 자료 및 시스템에 접근하여 열람 및 확인 할 수 있도록 협조하여야 한다.\n",
                                }, {
                                    title: "‘을’은 본 건 용역 업무 수행 완료 후 7일 이내에 용역 수행 결과를 정리하여 최종 보고서 2부 이상을 ‘갑’에게 제출하여야 한다."
                                }, {
                                    title: "'을'은 아래와 같이 '갑'에게 본 건 용역 업무 수행 경과에 대한 보고를 해야 한다. 그 밖에 '을'은 '갑'이 요구하는 경우 지체없이 본 건 용역 업무 수행 경과에 대하여 보고하여야 한다." +
                                        "<br/> -7"
                                }, {
                                    title: "'갑'은 다음 각호의 경우에는 그 사유가 해소되기 전까지 '을'에게 본 계약에 따른 중도금이나 잔금을 지급하지 아니할 수 있다.",
                                    subLists: [
                                        { title: "‘을’이 본 계약에 따른 중도금이나 잔금 지급 기일 전까지 행한 본 건 용역 업무 수행에 관한 중간보고서나 최종 보고서를 제출하지 아니한 경우" },
                                        { title: "중간 또는 최종 보고서의 내용이 사실에 반하는 등의 사유로 본 건 용역 업무 진행에 중대한 지장이 있거나, 본 건 용역 업무를 달성할 수 없는 경우" }
                                    ]
                                }, {
                                    title: "'갑'은 '을'이 제공한 용역 결과물에 대하여 검수 요청일로부터 3 영업일 이내 검수를 완료하여 그 결과를 통보를 발송하여야 하며, 만일 결과의 통보의 " +
                                        "발송이 없는 경우 '갑'은 '을'이 제공한 산출물에 대한 검수를 완료한 것으로 본다. 다만, '갑'이 검수하는 과정에서 본 건 용역 성과물 관련한 질의가 있는 경우 " +
                                        "'을'은 구두, 이메일, 보고서 등을 통해 관련 응답을 하여야 하며 을의 회신이 늦어지는 만큼 갑의 검수완료 기한도 연장된다."
                                }
                                ]
                                }/>
                            </Part>

                            <Part title="제8조(계약기간)">
                                <OrderingComponent lists={[{
                                    title: "본 계약의 계약기간은 2024.02.19부터 광고주가 지정한 날 까지로 한다.",
                                }, {
                                    title: "‘갑’과 ‘을’은 본 계약 만료 7 전까지 서면으로 그 연장의 의사를 표시할 수 있으며 계약 연장의 의사표시를 받은 상대방이 이를 승낙하는 경우 계약기간은 1년간 연장된다."
                                }
                                ]
                                }/>
                            </Part>

                            <Part title="제9조(소유권 및 지식재산권 등의 귀속)">
                                <OrderingComponent lists={[{
                                    title: "본건 용역의 최종 결과물을 비롯하여 그 과정에 발생한 보고서, 중간 산출물, 2차적 저작물 및 본 건 용역 산출물을 기초로 한 2차적 산출물로 인한 이득에 관한 소유권, 지식재산권은 갑에게 있다.",
                                }, {
                                    title: "다만, 보다 효율적인 활용을 위하여 필요하다고 인정되는 경우 '갑'은 '을'에게 이를 무상으로 양도할 수 있다."
                                }
                                ]
                                }/>
                            </Part>
                            <Part title="제10조(제3자의 지적재산권 등 권리 침해 금지)">
                                <OrderingComponent lists={[
                                    { title: "'을'은 본 건 용역 수행 과정에서 제3자의 지식재산권, 소유권 등을 침해하지 않도록 적극 노력하여야 한다." },
                                    {
                                        title: "‘을'의 본 건 용역 수행과 관련한 산출물 등에 관하여 '갑'이 제3자로부터 지식재산권의 침해 등 권리 침해를" +
                                            " 이유로 법적조치 등을 당한 경우 ‘을’은 ‘갑’에게 ‘갑’이 위 법적조치 등을 방어하기 위하여 소요한 비용(제3자에 대한 손해배상액, 소송비용이나 법적 자문료 등 포함) 및 손해('갑'이 본 건 용역물을 목적에 따라 사용 수익할 수 없으므로 인한 손해 포함)를 배상하여야 한다."
                                    }
                                ]
                                }/>
                            </Part>

                            <Part title="제11조(양도 금지)">
                                <OrderingComponent lists={[
                                    { title: "양 당사자는 상호 간의 서면 승인 없이 본 계약의 내용 및 본 계약으로 인하여 발생하는 권리의무를 제3자에게 양도할 수 없다." },
                                    { title: "전 항을 위반하여 제3자에게 본 계약상의 권리 의무가 이전됨으로 인하여 발생한 손해에 대하여, 위반 당사자는 그 배상책임을 진다." }
                                ]
                                }/>
                            </Part>
                            <Part title="제12조(계약의 해제, 해지)
">
                                <OrderingComponent lists={[
                                    {
                                        title: "양 당사자는 다음 각호에 해당하는 사유가 발생한 경우에 서면 통지로써 본 계약을 해제 또는 해지할 수 있다.",
                                        subLists: [{ title: "천재지변, 법적 규제의 변경 등으로 본 건 용역을 통해 달성하고자 하는 목적을 달성할 수 없게 된 때" }]
                                    },
                                    {
                                        title: "양 당사자 중 일방에게 아래의 사유가 발생한 경우, 기한의 이익을 상실하고, 즉시 상대방은 본 계약의 해지나 해제를 청구할 수 있고, 이미 발생된 채무를 변제하는 등 정산하여야 한다.",
                                        subLists: [{
                                            title: "거래은행으로부터 당좌 거래정지 등 그에 상응하는 사유가 발생하는 경우"
                                        }, { title: "조세 체납으로 압류 처분을 받은 때" }, { title: "양 당사자 중 일방에 대하여 회사정리 또는 파산, 회의개시가 신청된 때" },
                                            {
                                                title: "양 당사자 중 일방의 재산에 대하여 그 일방의 귀책사유에 의해 보전처분(가압류, 가처분)이나 강제집행이 개시되고 이로 인해 본 계약의 이행을 기대하기 어려운 객관적인 사정이 발생한 경우"
                                            }]
                                    }
                                ]
                                }/>
                            </Part>

                            <Part title="제13조(계약해석의 원칙)">
                                <InfoText>
                                    계약의 해석상 의문이나 이견이 있을 시 상호 합의 하에 결정하며, 합의되지 않는 경우 및 기타 본 계약서에 명시되지 아니한 사항에 대하여서는 일반 상관례에 준하여
                                    처리한다.
                                </InfoText>
                            </Part>
                            <Part title="제14조(관할법원)">
                                <InfoText>
                                    본 계약과 관련한 분쟁이 발생할 경우 '갑'의 주소지를 관할하는 법원을 관할법원으로 한다.
                                </InfoText>
                            </Part>
                            <Part title="제15조(계약의 효력)">
                                <OrderingComponent lists={[
                                    { title: "양 당사자는 본 계약의 성립을 증명하기 위하여 본 계약서를 작성하고, 서명 또는 기명날인하여 각 1통씩 보관한다." },
                                    { title: "전자서명을 통해 본 계약을 체결할 경우 계약서의 작성, 서명, 교부에 대한 전자적 방법의 효력을 인정하고 그 진행에 동의한 것으로 본다." }
                                ]
                                }/>
                            </Part>

                        </div>

                        <div className={'flex flex-col pt-5 gap-5 pb-4'}>
                            <p className={clsx(styles.part_title, 'text-center')}>2024년 02월 19일 </p>
                            <Part title="위탁자">
                                <InfoText>
                                    법인명 : 이카루스
                                </InfoText>
                                <InfoText>
                                    대표이사 : 차주헌 (서명 또는 인)
                                </InfoText>
                                <InfoText>
                                    주소 : 서울 강남구 테헤란로 418 (대치동, 다봉빌딩) 1115, 1116호
                                </InfoText>
                                <InfoText>
                                    전화번호 :
                                </InfoText>
                            </Part>
                            <Part title="수탁자">
                                <InfoText>
                                    성명 : 화물주 (서명 또는 인)
                                </InfoText>
                                <InfoText>
                                    주민등록번호 :
                                </InfoText>
                                <InfoText>
                                    주소 :
                                </InfoText>
                                <InfoText>
                                    전화번호 :
                                </InfoText>
                            </Part>

                        </div>
                    </div>

                </div>


                <div className={`${styles.agrement_content} ${styles.ad_apply_content}`}>
                    <div className={'border-t px-[30px] pb-3'}>
                    </div>
                    <div className={'h-[250px] overflow-auto'}>
                        <div className={styles.terms_title}>이카루스 광고 신청 약관 계약서</div>
                        <InfoText className={'pt-4'}>
                            이카루스(이하 ‘위탁자’ 또는 ‘갑’)와 화물주(이하 ‘수탁자’ 또는 ‘을’)는 '갑'이 위탁하는 업무를 '을'이 수행하고, '갑'은 '을'에게 이에 대한 대가를 지급하기로 하는
                            내용의 약정에 관하여 다음과 같이 계약(이하 ‘본 계약’)을 체결한다.
                        </InfoText>
                        <div className={'flex flex-col items-start gap-3 pt-3'}>
                            <Part title="제1조(계약의 목적)">
                                <InfoText>
                                    본 계약은 '갑'이 필요로 하는 업무(이하 ‘본 건 용역 업무’)를 ‘을’에게 위탁하여 수행하도록 함에 있어, ‘갑’과 ‘을’이 사이에 필요한 사항을 정하는 것을
                                    목적으로 한다.
                                </InfoText>
                            </Part>
                            <Part title="제2조(관계법령의 준수)">
                                <InfoText>
                                    양 당사자는 대등한 관계에서 본 계약을 합의하고 체결하며, 독점규제 및 공정거래에 관한 법률 등 관계 법규를 준수하여 이행한다.
                                </InfoText>
                            </Part>
                            <Part title="제3조(신의성실의 원칙)">
                                <InfoText>
                                    양 당사자는 본 계약에 따른 권리와 의무를 신의성실 원칙에 따라 성실히 이행함으로써 상호 간에 공정한 관계를 형성하고 지속한다.
                                </InfoText>
                            </Part>

                            <Part title="제4조(용역의 내용)">
                                <OrderingComponent lists={[{
                                    title: "‘갑’은 ‘을’에게 아래와 같은 내용의 용역(이하 '본 건 용역')의 수행을 위탁한다.",
                                    subLists: [{
                                        title: "수행할 용역명 : 이카루스에서 제공해주는 광고를 가지고 운행"
                                    }, { title: "용역의 목적 : 광고 노출" }, { title: "용역수행의 목표 <br/>- 운행목표거리달성, 운행목표시간달성" }, {
                                        title: "용역 수행자", subLists: [{
                                            title: "용역 책임자 : 화물주"
                                        }, { title: "용역 참여자 : 계약된 거리운행의 이행" }]
                                    }]
                                }]}/>
                            </Part>

                            <Part title="제5조(용역의 성실이행)">
                                <OrderingComponent lists={[{
                                    title: "용역을 제공함에 있어서 '을'은 그 축적된 지식 및 경험을 활용하여 '갑'이 본 계약을 통해 도달하고자 하는 목표가 도달되도록 가능한 최고 수준의 용역을 성실히 제공한다.",
                                },
                                    {
                                        title: "'을'은 본 건 용역의 목적을 달성하고 관련 결과물이 도출되는 것을 보증하고, '갑'과 '을'은 별도의 약정을 통해 보증보험증서 교부 여부를 정할 수 있다.",
                                    }, {
                                        title: "'을'이 계약서에서 정한 바와 달리, 성실하게 용역업무를 이행하지 않을 경우, '갑'은 '을'과 합의하에 계약을 해지할 수 있다."
                                    },
                                    {
                                        title: "‘을’은 계약의 효력 발생과 동시에 본 건 용역 업무를 수행하여야 하며 3일이 지나도록 본 건 용역 업무 내용에 따른 업무 성과물의 교부" +
                                            " 또는 보고가 없는 경우 ‘을’이 특별한 사정으로 인한 진행 상황의 지연에 대해 사전 승인을 얻지 않은 이상 ‘갑’은 ‘을’에게 위약벌로 이미 지급한 금액의 " +
                                            "당사 협의된%를 추가하여 반환 및 청구할 수 있다."
                                    }
                                ]
                                }/>
                            </Part>

                            <Part title="제6조(용역대금 및 비용의 처리)">
                                <OrderingComponent lists={[{
                                    title: "‘갑’은 '을'에게 본 건 용역의 대가를 아래와 같이 지급하며, 부가세를 포함한 금액으로 한다.",
                                    subLists: [{
                                        title: "계약금 : 0원, 지급"
                                    }, { title: "잔금 : 0원, 지급" }]
                                }, {
                                    title: "본 건 용역 과정에서 발생하는 비용은 '을'이 부담한다. 다만, 본 건 용역수행으로 예상할 수 없는 특별한 비용 지출 사정이 생긴 경우 " +
                                        "'을'은 '갑'에게 비용의 부담을 요청할 수 있다."
                                }
                                ]
                                }/>
                            </Part>

                            <Part title="제7조(자료의 공개 및 용역 내용 검토 등)">
                                <OrderingComponent lists={[{
                                    title: "'갑'과 '을’은 상호 간에 법이 허용하는 범위 내에서 본 건 용역 수행 및 성과와 관련한 기록, 보고서 등의 자료 및 시스템에 접근하여 열람 및 확인 할 수 있도록 협조하여야 한다.\n",
                                }, {
                                    title: "‘을’은 본 건 용역 업무 수행 완료 후 7일 이내에 용역 수행 결과를 정리하여 최종 보고서 2부 이상을 ‘갑’에게 제출하여야 한다."
                                }, {
                                    title: "'을'은 아래와 같이 '갑'에게 본 건 용역 업무 수행 경과에 대한 보고를 해야 한다. 그 밖에 '을'은 '갑'이 요구하는 경우 지체없이 본 건 용역 업무 수행 경과에 대하여 보고하여야 한다." +
                                        "<br/> -7"
                                }, {
                                    title: "'갑'은 다음 각호의 경우에는 그 사유가 해소되기 전까지 '을'에게 본 계약에 따른 중도금이나 잔금을 지급하지 아니할 수 있다.",
                                    subLists: [
                                        { title: "‘을’이 본 계약에 따른 중도금이나 잔금 지급 기일 전까지 행한 본 건 용역 업무 수행에 관한 중간보고서나 최종 보고서를 제출하지 아니한 경우" },
                                        { title: "중간 또는 최종 보고서의 내용이 사실에 반하는 등의 사유로 본 건 용역 업무 진행에 중대한 지장이 있거나, 본 건 용역 업무를 달성할 수 없는 경우" }
                                    ]
                                }, {
                                    title: "'갑'은 '을'이 제공한 용역 결과물에 대하여 검수 요청일로부터 3 영업일 이내 검수를 완료하여 그 결과를 통보를 발송하여야 하며, 만일 결과의 통보의 " +
                                        "발송이 없는 경우 '갑'은 '을'이 제공한 산출물에 대한 검수를 완료한 것으로 본다. 다만, '갑'이 검수하는 과정에서 본 건 용역 성과물 관련한 질의가 있는 경우 " +
                                        "'을'은 구두, 이메일, 보고서 등을 통해 관련 응답을 하여야 하며 을의 회신이 늦어지는 만큼 갑의 검수완료 기한도 연장된다."
                                }
                                ]
                                }/>
                            </Part>

                            <Part title="제8조(계약기간)">
                                <OrderingComponent lists={[{
                                    title: "본 계약의 계약기간은 2024.02.19부터 광고주가 지정한 날 까지로 한다.",
                                }, {
                                    title: "‘갑’과 ‘을’은 본 계약 만료 7 전까지 서면으로 그 연장의 의사를 표시할 수 있으며 계약 연장의 의사표시를 받은 상대방이 이를 승낙하는 경우 계약기간은 1년간 연장된다."
                                }
                                ]
                                }/>
                            </Part>

                            <Part title="제9조(소유권 및 지식재산권 등의 귀속)">
                                <OrderingComponent lists={[{
                                    title: "본건 용역의 최종 결과물을 비롯하여 그 과정에 발생한 보고서, 중간 산출물, 2차적 저작물 및 본 건 용역 산출물을 기초로 한 2차적 산출물로 인한 이득에 관한 소유권, 지식재산권은 갑에게 있다.",
                                }, {
                                    title: "다만, 보다 효율적인 활용을 위하여 필요하다고 인정되는 경우 '갑'은 '을'에게 이를 무상으로 양도할 수 있다."
                                }
                                ]
                                }/>
                            </Part>
                            <Part title="제10조(제3자의 지적재산권 등 권리 침해 금지)">
                                <OrderingComponent lists={[
                                    { title: "'을'은 본 건 용역 수행 과정에서 제3자의 지식재산권, 소유권 등을 침해하지 않도록 적극 노력하여야 한다." },
                                    {
                                        title: "‘을'의 본 건 용역 수행과 관련한 산출물 등에 관하여 '갑'이 제3자로부터 지식재산권의 침해 등 권리 침해를" +
                                            " 이유로 법적조치 등을 당한 경우 ‘을’은 ‘갑’에게 ‘갑’이 위 법적조치 등을 방어하기 위하여 소요한 비용(제3자에 대한 손해배상액, 소송비용이나 법적 자문료 등 포함) 및 손해('갑'이 본 건 용역물을 목적에 따라 사용 수익할 수 없으므로 인한 손해 포함)를 배상하여야 한다."
                                    }
                                ]
                                }/>
                            </Part>

                            <Part title="제11조(양도 금지)">
                                <OrderingComponent lists={[
                                    { title: "양 당사자는 상호 간의 서면 승인 없이 본 계약의 내용 및 본 계약으로 인하여 발생하는 권리의무를 제3자에게 양도할 수 없다." },
                                    { title: "전 항을 위반하여 제3자에게 본 계약상의 권리 의무가 이전됨으로 인하여 발생한 손해에 대하여, 위반 당사자는 그 배상책임을 진다." }
                                ]
                                }/>
                            </Part>
                            <Part title="제12조(계약의 해제, 해지)
">
                                <OrderingComponent lists={[
                                    {
                                        title: "양 당사자는 다음 각호에 해당하는 사유가 발생한 경우에 서면 통지로써 본 계약을 해제 또는 해지할 수 있다.",
                                        subLists: [{ title: "천재지변, 법적 규제의 변경 등으로 본 건 용역을 통해 달성하고자 하는 목적을 달성할 수 없게 된 때" }]
                                    },
                                    {
                                        title: "양 당사자 중 일방에게 아래의 사유가 발생한 경우, 기한의 이익을 상실하고, 즉시 상대방은 본 계약의 해지나 해제를 청구할 수 있고, 이미 발생된 채무를 변제하는 등 정산하여야 한다.",
                                        subLists: [{
                                            title: "거래은행으로부터 당좌 거래정지 등 그에 상응하는 사유가 발생하는 경우"
                                        }, { title: "조세 체납으로 압류 처분을 받은 때" }, { title: "양 당사자 중 일방에 대하여 회사정리 또는 파산, 회의개시가 신청된 때" },
                                            {
                                                title: "양 당사자 중 일방의 재산에 대하여 그 일방의 귀책사유에 의해 보전처분(가압류, 가처분)이나 강제집행이 개시되고 이로 인해 본 계약의 이행을 기대하기 어려운 객관적인 사정이 발생한 경우"
                                            }]
                                    }
                                ]
                                }/>
                            </Part>

                            <Part title="제13조(계약해석의 원칙)">
                                <InfoText>
                                    계약의 해석상 의문이나 이견이 있을 시 상호 합의 하에 결정하며, 합의되지 않는 경우 및 기타 본 계약서에 명시되지 아니한 사항에 대하여서는 일반 상관례에 준하여
                                    처리한다.
                                </InfoText>
                            </Part>
                            <Part title="제14조(관할법원)">
                                <InfoText>
                                    본 계약과 관련한 분쟁이 발생할 경우 '갑'의 주소지를 관할하는 법원을 관할법원으로 한다.
                                </InfoText>
                            </Part>
                            <Part title="제15조(계약의 효력)">
                                <OrderingComponent lists={[
                                    { title: "양 당사자는 본 계약의 성립을 증명하기 위하여 본 계약서를 작성하고, 서명 또는 기명날인하여 각 1통씩 보관한다." },
                                    { title: "전자서명을 통해 본 계약을 체결할 경우 계약서의 작성, 서명, 교부에 대한 전자적 방법의 효력을 인정하고 그 진행에 동의한 것으로 본다." }
                                ]
                                }/>
                            </Part>

                        </div>

                        <div className={'flex flex-col pt-5 gap-5 pb-4'}>
                            <p className={clsx(styles.part_title, 'text-center')}>2024년 02월 19일 </p>
                            <Part title="위탁자">
                                <InfoText>
                                    법인명 : 이카루스
                                </InfoText>
                                <InfoText>
                                    대표이사 : 차주헌 (서명 또는 인)
                                </InfoText>
                                <InfoText>
                                    주소 : 서울 강남구 테헤란로 418 (대치동, 다봉빌딩) 1115, 1116호
                                </InfoText>
                                <InfoText>
                                    전화번호 :
                                </InfoText>
                            </Part>
                            <Part title="수탁자">
                                <InfoText>
                                    성명 : 화물주 (서명 또는 인)
                                </InfoText>
                                <InfoText>
                                    주민등록번호 :
                                </InfoText>
                                <InfoText>
                                    주소 :
                                </InfoText>
                                <InfoText>
                                    전화번호 :
                                </InfoText>
                            </Part>

                        </div>
                    </div>

                    <div className={'border-t px-[30px] mt-5'}></div>

                    <div className={styles.terms_company}>
                        {`회사명 : ${user?.company_name}`}
                        <br/>
                        {`사업자 등록번호 : ${user?.business_registration_number}`}
                    </div>
                    <div className={styles.modal_step}>
                        <div className={styles.btn_section}>
                            <button
                                type="button"
                                id={styles.ad_apply_cancel}
                                className={`${styles.btns} ${styles.cancel_btn}`}
                                onClick={onClose}
                            >
                                이전
                            </button>
                            <button
                                type="button"
                                id={styles.ad_apply_btn}
                                className={`${styles.btns} ${styles.active} ${styles.ad_apply_btn}`}
                                onClick={onAgree}
                            >
                                {/*{isLoading ? (*/}
                                {/*    <div className='d-flex justify-content-center'>*/}
                                {/*        <ThreeDots*/}
                                {/*            height='20'*/}
                                {/*            width='40'*/}
                                {/*            radius='9'*/}
                                {/*            color='#FFFFFF'*/}
                                {/*            ariaLabel='three-dots-loading'*/}
                                {/*            visible*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*) : (*/}
                                확인
                                {/*)}*/}
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
