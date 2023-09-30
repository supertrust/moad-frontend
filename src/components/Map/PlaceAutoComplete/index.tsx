import React, { Ref, forwardRef, useEffect, useState } from 'react'
import Input from '@src/components/common/Input'
import { clsx } from 'clsx'
import { AutoComplete } from 'antd';
import { usePlaceSearchByKeyword, useSearchAddress } from '@src/apis/kakap.map';
import { DefaultOptionType } from 'antd/es/select';
import { ILocation } from '@src/types/kakao.map';

interface PlaceAutoCompleteProps {
  map?: kakao.maps.Map
  value?: { name:  string, lat: number, lng: number},
  className?: string,
  placeholder?: string,
  onChange?:(value?: { name:  string, lat: number, lng: number}) =>  void
  error?: string
}


function PlaceAutoComplete( {
  value,
  className,
  placeholder,
  onChange,
  error
} : PlaceAutoCompleteProps, ref:Ref<any>  ) {

  // const autoCompleteRef = useRef<AutoComplete>()
  const [options , setOptions] = useState<DefaultOptionType[]>([]);
  const [search, setSearch] = useState('');
  const [label, setLabel] = useState("");
  const [localValue, setValue] = useState<DefaultOptionType | undefined>(value && {
    label:  value?.name,
    value: JSON.stringify(value)
  });
  
  const { data } = usePlaceSearchByKeyword(search);
  useEffect(() => {
    let options: DefaultOptionType []= []; 
    if(search && data) 
      options = data.documents.map((doc) =>  {
        return { 
          label: doc.address_name , 
          value: JSON.stringify({ 
            name: doc.address_name ,  
            lat: doc.y , 
            lng: doc.x 
          })
        } 
      }) ;
    setOptions(options);
  }, [data]);

  useEffect(() => {
    if(value){
      const _value = JSON.stringify(value);
      if(localValue?.value !== _value) {
        setValue({
          label:  value?.name,
          value: _value
        });
        setLabel(value.name)
      }
    }
  },[value]);
  // console.log("Value =>", value)
  // console.log("localValue =>", localValue)


  const handleSelect = ( option?: DefaultOptionType  ) => {
    const { value, label  } = option || {}; 
    setLabel(label as string);
    setValue(option)
    setOptions([]);
    onChange && onChange(value ? JSON.parse(value as string) : undefined);
  }


  return (
    <>
      <AutoComplete
        ref={ref}
        options={options}
        open={!!options}
        value={label}
        onChange={(label) => setLabel(label)}
        className={clsx('w-52',className)}
        onSearch={(search) => setSearch(search)}
        placeholder={placeholder}
        onSelect={(_, option)=> handleSelect (option || undefined)}
        allowClear={true}
        size="large"
        status={error && 'error'}
      />
      { error && <span className='text-danger text-xs'>{error}</span>}
    </>
  )
}

export default forwardRef(PlaceAutoComplete)