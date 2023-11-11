
import clsx from 'clsx'
import Link from 'next/link'
import React, { ReactNode, useState } from 'react';
import Arrow from '@images/gray-arrow.png'
import Image from 'next/image';

interface MenuItemProps {
    title: string,
    icon?: ReactNode,
    selected?: boolean
    onClick?: VoidFunction,
    href?: string
    subMenus?: {
        title: string,
        href?: string
    }[]
}

function MenuItem({title , icon, selected , subMenus, onClick}: MenuItemProps) {

    const [showSubMenu, setSubMenu ] = useState(false);

    const handleClick = () => {
        subMenus?.length ? setSubMenu(!showSubMenu) : (onClick && onClick())
    }

    return (
        <>
            <div 
                className={clsx(
                    "flex flex-row items-center rounded-lg cursor-pointer lg:pr-2 lg:w-full",
                    selected ? "bg-[#EFF4FD]" : "bg-white"
                )}
                onClick={handleClick}
            >
                {icon}
                <div className={clsx(
                    'flex-grow text-base font-medium relative',
                    'hidden  lg:block',
                    selected ? "text-admin-primary" : "text-admin-grey-50"
                )}>
                    <span>{title}</span>
                    {subMenus && 
                        <Image 
                            src={Arrow} alt='' 
                            className={clsx(
                                'absolute right-1  transform top-[40%]',
                                showSubMenu ? "rotate-180" : "rotate-0"
                            )}
                        />
                    }
                </div>
            </div>
            
            <div className={clsx(
                "flex flex-col gap-2 mt-3 text-sm lg:text-base lg:ml-12 ",
                showSubMenu ? "block" : "hidden"
            )}>
                {subMenus?.map((sub, index)  => (
                    <Link 
                        key={index}
                        className='text-admin-grey-50 hover:text-admin-primary hover:no-underline' 
                        href={sub.href || '#'}
                    >
                        {sub.title}
                    </Link>
                ))}
            </div>

        </>
    )
}

export default MenuItem