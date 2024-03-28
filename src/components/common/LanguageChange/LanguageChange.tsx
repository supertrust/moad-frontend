import useAuth from "@src/hooks/useAuth";
import { Langs } from "@src/types/auth";
import { MenuProps,Dropdown } from "antd";
import clsx from "clsx";
import React from 'react';
import langIcon from '../../../../public/assets/images/icons/lang.svg'
import { DownOutlined } from '@ant-design/icons';
import Image from 'next/image';

const languageChoices: { value: Langs; label: string }[] = [
    { value: 'en', label: 'ENG' },
    { value: 'kr', label: 'KOR' },
];

const LanguageChange = ({iconShow =true,dropClassName =''}) => {
    const { changeLocale, lang : locale } = useAuth();

    //@ts-ignore
    const items: MenuProps['items'] = languageChoices.map(obj=>{
        return {
            ...obj,
            label : <span onClick={()=>changeLocale(obj.value)} className={clsx(locale===obj.value && 'text-[#2F48D1]')}>{obj.label}</span>
        }
    })

    return (
      <div className={'flex gap-2'}>
          {iconShow &&  <Image src={langIcon} alt='' />}
          <Dropdown menu={{items}} placement="bottom" arrow className={clsx('pr-4',dropClassName)}>
              <div style={{ display: "flex", gap: "10px", alignItems: "center",cursor : "pointer" }}>
                  <span  style={{ fontSize: "16px",color : "#606060" }}>{languageChoices.filter(obj=>obj.value===locale)?.[0]?.label}</span>
                  <DownOutlined className='m-auto' />
              </div>
          </Dropdown>
      </div>
    );
};

export default LanguageChange;