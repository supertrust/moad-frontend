import React from 'react'
import Input from '../Input'
import DataRow from '../DataRow'
import { UpdateCompanyAdProps } from '@src/types/admin/advertisment'
import { Control, UseFormSetValue } from 'react-hook-form';
import { Controller } from '@src/components/common';
import styles from "../../styles.module.scss";

const ChooseNumberOfVehicle = ({control , setValue } : { 
    control: Control<UpdateCompanyAdProps>, 
    setValue: UseFormSetValue<UpdateCompanyAdProps>
}) => {

    return <div className={"h-[196px] flex"}>
        <div className={'w-[120px] h-[100%] bg-[#f8faff] border-r border-b border-[#eaecf0] items-center flex pl-4'}>
            <span className={styles['key-field-text']}>운행 차량수</span>
        </div>
        <div className={'flex-1'}>
            <DataRow keyValue={"1t"} className={'!w-[120px]'}>
                <Controller
                    name='vehicle_details'
                    control={control}
                    render={({ field: { value, onBlur } , fieldState: { error } }) => (
                        <Input 
                            className={'w-[200px]'} 
                            inputClass={'w-[132px]'} 
                            value={value ? value["1"]?.toString() : ''} 
                            onBlur={onBlur}
                            type="number"
                            min={0}
                            onChange={(e) => setValue('vehicle_details', { ...value, 1: Number(e.target.value)}) }
                            error={!!error}
                            helperText={error?.message}
                        />
                    )}
                />
            </DataRow>
            <DataRow keyValue={"2.5t"} className={'!w-[120px]'}>
                <Controller
                    name='vehicle_details'
                    control={control}
                    render={({ field: { value, onBlur } , fieldState: { error } }) => (
                        <Input 
                            className={'w-[200px]'} 
                            inputClass={'w-[132px]'} 
                            value={value ? value[2]?.toString() : ''} 
                            onBlur={onBlur}
                            type="number"
                            min={0}
                            onChange={(e) => setValue('vehicle_details', { ...value, 2: Number(e.target.value)}) }
                            error={!!error}
                            helperText={error?.message}
                        />
                    )}
                />
            </DataRow>
            <DataRow keyValue={"5t"} className={'!w-[120px]'}>
                <Controller
                    name='vehicle_details'
                    control={control}
                    render={({ field: { value, onBlur } , fieldState: { error } }) => (
                        <Input 
                            className={'w-[200px]'} 
                            inputClass={'w-[132px]'} 
                            value={value ? value[3]?.toString() : ''} 
                            onBlur={onBlur}
                            type="number"
                            min={0}
                            onChange={(e) => setValue('vehicle_details', { ...value, 3: Number(e.target.value)}) }
                            error={!!error}
                            helperText={error?.message}
                        />
                    )}
                />
            </DataRow>
            <DataRow keyValue={"11t"} className={'!w-[120px]'}>
                <Controller
                    name='vehicle_details'
                    control={control}
                    render={({ field: { value, onBlur } , fieldState: { error } }) => (
                        <Input 
                            className={'w-[200px]'} 
                            inputClass={'w-[132px]'} 
                            value={value ? value[4]?.toString() : ''} 
                            onBlur={onBlur}
                            type="number"
                            min={0}
                            onChange={(e) => setValue('vehicle_details', { ...value, 4: Number(e.target.value)}) }
                            error={!!error}
                            helperText={error?.message}
                        />
                    )}
                />
            </DataRow>
        </div>
    </div>
}

export default ChooseNumberOfVehicle