import React from 'react';
import ArrowBack from '@src/components/icons/ArrowBack';
import { useRouter } from 'next/router';
import useAuth from '@src/hooks/useAuth';
export default function PolicyModulePage() {
  const router = useRouter();

  const { dictionary } = useAuth();

  const onBack = () => {
    router.back();
  };
  return (
    <>
      <div className='policy-container'>
        <div className='privacy-content'>
          <div className={`advertising-contract mt-[15px]`}>
            <div className={`mobile-top-header !mb-[14px]`}>
              <ArrowBack handleAction={onBack} />
              <div className={'header'}>
                {dictionary.policyPage.headerTitle}
              </div>
              <div></div>
            </div>
          </div>
          <div className='content-terms'>
            <div className='content'>{dictionary.policyPage.content}</div>
          </div>
        </div>
      </div>
    </>
  );
}
