import ArrowBack from '@src/components/icons/ArrowBack';
import useAuth from '@src/hooks/useAuth';
import layoutStyles from '@src/sections/dashboard/SaveAdModel/styles.module.css';
import { parseHtml } from '@src/utils/formatter';
import { Modal } from 'antd';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import styles from './styles.module.css';

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
                            <OrderingComponent isSub={true} lists={list?.subLists}/>
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
    return <p className={clsx('text-[black]', className)}>{children}</p>;
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
    const { user, dictionary: { buttons, terms_and_conditions: { title, content } } } = useAuth();

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
                            <ArrowBack handleAction={onClose}/>
                            <div className={styles['header']}>{title}</div>
                            <div></div>
                        </div>
                    </div>
                    <div className={styles.ad_apply_title}>
                        <p>{title}</p>
                    </div>

                    <div
                        className={`${styles.agrement_content} ${styles.ad_apply_content}`}>
                        <div className={'h-[260px] overflow-auto mb-2 pr-2'}>
                            <InfoText>{content?.first}</InfoText>
                            <InfoText>{content?.second}</InfoText><br/>

                            <InfoText>{content?.third}
                            </InfoText>

                            <br/>
                            <InfoText>
                                {content?.fourth}
                            </InfoText>
                            <InfoText>{content?.fifth}</InfoText>

                        </div>


                    </div>

                    <div className={styles.ad_apply_content}>
                        <div className={styles.modal_step}>
                            <div className={clsx('mx-[10px]',styles.btn_section)}>
                                <button
                                    type='button'
                                    id={styles.ad_apply_cancel}
                                    className={`${styles.btns} ${styles.cancel_btn}`}
                                    onClick={onClose}>
                                    {buttons.cancel}
                                </button>
                                <button
                                    type='button'
                                    id={styles.ad_apply_btn}
                                    className={`${styles.btns} ${styles.active} ${styles.ad_apply_btn}`}
                                    onClick={onAgree}>
                                    {buttons.check}
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
