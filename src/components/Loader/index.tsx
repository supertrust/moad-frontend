import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { SpinFCType } from 'antd/es/spin';

enum SizeEnum  {
  sm = 15,
  md = 24 ,
  lg = 40,
}

interface LoaderProps  {
  size?: "sm" | "lg" | "md",
  className? : string
}

function Loader({ size = "md" , className} : LoaderProps) {
  return (
    <div className={className}>
      <Spin 
        indicator={
          <LoadingOutlined style={{ fontSize: SizeEnum[size] }} spin className='text-secondary' />
        } 
      />
    </div>
  )
}

export default Loader