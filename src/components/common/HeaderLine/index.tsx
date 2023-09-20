import { clsx } from 'clsx';
import Link from 'next/link';
import React, { ReactNode } from 'react'

interface HeaderTitleProps {
  title: string,
  left?: string | ReactNode
  href?: string
  className?: string
}

function HeaderLine ({ title , left , href, className }: HeaderTitleProps) {

  const renderLeft = () => {
    const className = clsx('ml-2 !text-[#373737] text-[12px] font-normal', href && 'cursor-pointer');
    return href ? 
      <Link className={className} href={href}>{left}</Link>:
      <span className={className}>{left}</span>
  }

  return (
    <div className={clsx("flex flex-row items-center my-[20px]", className)}>
      <div className='mr-3 font-bold text-[20px] text-[#2C324C]'>{title}</div>
      <div className='flex-grow h-[1px] bg-[#EBEDF4] flex-1'></div>
      { left && renderLeft()}
    </div>
  )
}

export default HeaderLine 