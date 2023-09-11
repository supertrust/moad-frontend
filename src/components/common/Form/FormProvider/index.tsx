import React, { ReactNode } from 'react';
import { FormProvider as RHFFormProvider, UseFormReturn } from 'react-hook-form';

interface FormProviderProps {
    children: ReactNode;
    methods: UseFormReturn<any>
}

const FormProvider = ({ children, methods }: FormProviderProps) => {
    return (
        <RHFFormProvider {...methods}>
            {children}
        </RHFFormProvider>
    );
};

export default FormProvider;