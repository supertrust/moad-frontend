import React, { Ref } from 'react'
import { Autocomplete, AutocompleteProps } from '@react-google-maps/api'
import Input, { InputProps }from '@src/components/common/Input'
import { clsx } from 'clsx'

type PlaceAutoCompleteProps = Omit<AutocompleteProps , 'ref'> & InputProps & {
  // ref?:  Ref<typeof Input>
}


function PlaceAutoComplete( {
  bounds,
  restrictions,
  fields,
  options,
  types,
  onPlaceChanged,
  onLoad,
  onUnmount,
  className,
  ref,
  ...rest
} : PlaceAutoCompleteProps) {

  const autoCompleteProps = { bounds, restrictions,fields,options,types,onPlaceChanged,onLoad,onUnmount }
  return (
    <Autocomplete {...autoCompleteProps} >
      {/* @ts-ignore */}
      <Input {...rest} className={clsx("border rounded-md p-2" , className)} ref={ref} />
    </Autocomplete>
  )
}

export default  PlaceAutoComplete