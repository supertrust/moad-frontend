import {  Card } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import {
  useGetInquiryDetail,
  useSaveInquiry,
  useUpdateInquiry,
} from "@src/apis/inquiry";
import Image from "next/image";
import FormData from "form-data";
import useAuth from "@src/hooks/useAuth";
import Select from '@mui/material/Select';
import { useIcarusContext } from "@src/hooks/useIcarusContext";
import { Controller, FormProvider, yupResolver, useForm,Button } from '@src/components/common';

import * as Yup from 'yup';
import MenuItem from '@mui/material/MenuItem';
import { Clear } from "@mui/icons-material";
import { clsx } from "clsx";
import { ConfirmPropsType } from '@src/contexts/ConfirmDialogContext';
import { useConfirmDialog } from "@src/hooks/useConfirmationDialog";

const defaultValues = {
  inquiry_type: "",
  inquiry_title: "",
  inquiry_question: "",
  inquiry_answer: "",
  inquiry_documents: []
};

export default function Index({ id }: { id: string }) {
  const { setPageTitle} = useIcarusContext()
  const { mutateAsync: updateInquiry } = useUpdateInquiry();
  const { mutateAsync: saveInquiry } = useSaveInquiry();
  const { data } = useGetInquiryDetail({ id });
  const { user, dictionary: { inquireFormPage,pageTitle },isKorean } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [allError, setErrors] = useState<string | undefined>('')
  const [form, setForm] = useState({
    id: "",
    inquiry_type: "",
    inquiry_title: "",
    inquiry_question: "",
    inquiry_answer: "",
  });
  const router = useRouter();

  const { confirm } = useConfirmDialog();
  useEffect(()=>{
    setPageTitle(pageTitle['top_bar_inquiry'])
  },[isKorean])
  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  const setData = async (_data: any) => {
    if (!data?.inquiry_answer) {
      const oldFormData = form;
      const updatedFormData = {
        ...oldFormData,
        id: _data.id,
        inquiry_type: _data.inquiry_type,
        inquiry_title: _data.inquiry_title,
        inquiry_question: _data.inquiry_question,
        inquiry_answer: _data.inquiry_answer,
      };
      setForm(updatedFormData);
    } else {
      router.push(`/inquire/${id}`);
    }
  };

  const checkFiles = (files: File[]) => {
    const allowedImages = ['image/jpeg', 'image/jpg', 'image/png'];
		const options: ConfirmPropsType = {
			title: inquireFormPage.checkFilesModal.title,
			size: 'sm',
			cancelText: (<span className="text-[#FFFFFF]">{inquireFormPage.checkFilesModal.cancelButton}</span>),
			disableConfirmBtn: true,
			cancelButtonProps: {
				className: 'border-primary bg-primary !text-[#FFFFFF]',
			},
			footerClassName: 'flex flex-row justify-end',
		};

    let hasError = false;
    for (let index = 0; index < files.length; index++) {
      const file  = files[index];
      if (!file) return;

      if (!allowedImages.includes(file.type)) {
        hasError = true;
        confirm({
          ...options,
          description: (
            <div className='mt-3 text-center'>
              {inquireFormPage.checkFilesModal.allowedFileTypesDesc}
            </div>
          ),
        });
        break;
      }

        // 3 MB
      if (file.size > 3 * 1024 * 1024) {
        hasError = true;
        confirm({
          ...options,
          description: (
            <div className='mt-3 text-center'>
              {inquireFormPage.checkFilesModal.allowedFileSizeDesc}
            </div>
          ),
        });
        break;
      }
    }

    return hasError ;
  };

  const SaveInquirySchema = Yup.object({
    inquiry_type: Yup.string().required(inquireFormPage.validations.inquiryType.required),
    inquiry_title: Yup.string().required(inquireFormPage.validations.inquiryTitle.required).test(
      'not-only-spaces',
      inquireFormPage.validations.inquiryTitle.checkForOnlySpaces,
      value => !/^\s*$/.test(value),
    ),
    inquiry_question: Yup.string().required(inquireFormPage.validations.inquiryQuestion.required).test(
      'not-only-spaces',
      inquireFormPage.validations.inquiryQuestion.checkForOnlySpaces,
      value => !/^\s*$/.test(value),
    ),
    inquiry_answer: Yup.string().optional(),
    inquiry_documents: Yup.array().optional()
  })

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(SaveInquirySchema),
  });


  const { handleSubmit, control, formState} = methods;
  const { errors } = formState;

  const onSubmit = handleSubmit(async (event: any) => {
    const formData = new FormData();
    setSubmitting(true);
    formData.append("user_id", user?.id);
    formData.append("inquiry_type", event.inquiry_type as string);
    formData.append("inquiry_title", event.inquiry_title as string);
    formData.append("inquiry_question", event.inquiry_question as string);
    if (id !== null && id !== undefined) {
      formData.append("id", form.id);
      formData.append("inquiry_answer", event.inquiry_answer as string);
    }
    event.inquiry_documents.forEach((file, index) => {
      formData.append(`inquiry_documents[]`, file as File);
    });
    try {
      if (!id) {
        await saveInquiry(formData);
        router.push("/dashboard/customer-service/inquire");
      } else if (id !== null && id !== undefined) {
        await updateInquiry(formData);
        router.push(`/dashboard/customer-service/inquire/${id}`);
      }
    } catch (error: any) {
      toast(error?.response?.data?.message, { type: "error" });
      setSubmitting(false);
    }
  });

  const MenuItemStyles = {
    border: "0px solid",
    // "border-width": "0px 0px 1px 0px",
    color: "#535A65",
    // padding: "10px 12px",
  };
  return (
    <>
      <Head>
        <title>{inquireFormPage.title}</title>
      </Head>
      <div className="p-[20px] sm:px-[30px] sm:py-[20px] text-gray-700 flex flex-col gap-[30px]">
        <div className="flex gap-[20px] items-center p-[20px] sm:p-[0]">
          <Link href={`/dashboard/customer-service/inquire`}>
            <button className="text-[16px]  text-[#2C324C]">{inquireFormPage.checkInquiryDetailsBtn}</button>
          </Link>
          {user?.role === "Advertiser" && (
            <Link href={`form`}>
              <button className="font-bold text-[20px] text-advertiser-primary">
                {inquireFormPage.contactUsBtn}
              </button>
            </Link>
          )}
        </div>
        <Card
          variant="elevation"
          elevation={1}
          className="flex flex-col gap-2 relative"
        >
          <div className="px-[20px] pt-[50px] pb-[25px] flex gap-3 items-center inquiry-form-section">
            <div className="w-full hidden lg:flex">
              <Image
                src="/images/img-contact-us.png"
                alt="Contact Us"
                width={500}
                height={500}
              />
            </div>
            <div className="flex w-full">
            <FormProvider methods={methods}>
              <form
                // onSubmit={formik.handleSubmit}
                method=""
                className="flex flex-col gap-4 w-full text-[16px]"
              >
                <Controller
                            control={control}
                            name="inquiry_type"
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                <div className="flex flex-col gap-1">
                  <label className="font-bold" htmlFor="inquiry_type">
                    {inquireFormPage.inquiryType}<span className="text-[#D12953] font-medium">*</span>
                  </label>
                  <div
                    className={(submitting || (id !== null && id !== undefined) ? "opacity-70" : "")
                    }
                  >
                    {/* <InquryTypeComponent/> */}
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={value}
                      // onChange={handleInput}
                      onChange={e => onChange(e.target.value)}
                      name="inquiry_type"
                      variant="filled"
                      label="type"
                      displayEmpty
                      className={`border border-gray-300 rounded ${errors?.inquiry_type? "!border-[#F24747]" : ''}`}
                      sx={{ width: "100%", background: "#fff", "border-radius": "5px" }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            '.MuiSelect-select': {
                              padding: "8px 16px",
                            },
                            '.MuiList-root': {
                              padding: "0"
                            },
                            '.Mui-selected' :{
                              background: "#FFFFFF",
                              color: 'var(--primary-color)',
                            }
                          },
                        },
                      }}
                    >
                      <MenuItem sx={MenuItemStyles} selected value="">{inquireFormPage.inquiryTypes[0]}</MenuItem>
                      <MenuItem sx={MenuItemStyles} value={"classification_of_payments"}>{inquireFormPage.inquiryTypes[1]}</MenuItem>
                      <MenuItem sx={MenuItemStyles} value={"error"}>{inquireFormPage.inquiryTypes[2]}</MenuItem>
                      <MenuItem sx={MenuItemStyles} value={"usage_inquiry"}>{inquireFormPage.inquiryTypes[3]}</MenuItem>
                      <MenuItem sx={MenuItemStyles} value={"member_related"}>{inquireFormPage.inquiryTypes[4]}</MenuItem>
                    </Select>

                  </div>
                </div>
                )}
                />
                <Controller
                            control={control}
                            name="inquiry_title"
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                <div className="flex flex-col gap-1">
                  <label className="font-bold" htmlFor="inquiry_title">
                    {inquireFormPage.inquirySubject}<span className="text-[#D12953] font-medium">*</span>
                  </label>
                  <div
                    className={`
                        ${(submitting || (id !== null && id !== undefined)
                        ? "opacity-70"
                        : "")}`}
                  >
                    <input
                      type="text"
                      id="inquiry_title"
                      name="inquiry_title"
                      className=
                      {`w-full text-gray-600 outline-[#EBEDF4] py-2 px-3 border border-gray-300 rounded ${errors?.inquiry_title? "!border-[#F24747]" : ''}`}
                      placeholder={inquireFormPage.inquirySubjectPlaceholder}
                      value={value}
                      // onChange={handleInput}
                      onChange={e => onChange(e.target.value)}
                      disabled={submitting || (id !== null && id !== undefined)}
                    />
                  </div>
                </div>
                )}
                />
                <Controller
                            control={control}
                            name="inquiry_question"
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                <div className="flex flex-col gap-1">
                  <label className="font-bold" htmlFor="inquiry_question">
                    {inquireFormPage.inquiry}<span className="text-[#D12953] font-medium">*</span>
                  </label>
                  <div
                    className={`${(submitting || (id !== null && id !== undefined) ? "opacity-70" : "")}`}
                  >
                    <textarea
                      rows={9}
                      id="inquiry_question"
                      name="inquiry_question"
                      className={`w-full text-gray-600 outline-[#EBEDF4] py-2 px-3 border border-gray-300 rounded textarea-input ${errors.inquiry_question? "!border-[#F24747]" : ''} `}
                      placeholder={inquireFormPage.inquiryPlaceHolder}
                      value={value}
                      // onChange={handleInput}
                      onChange={e => onChange(e.target.value)}
                      disabled={submitting || (id !== null && id !== undefined)}
                    />
                  </div>
                  <div className="text-sm text-right">(<span className="text-advertiser-primary">{value?.length || "0"}</span>/300)</div>
                </div>
                )}
                />
                {id !== null && id !== undefined && (
                  <Controller
                  control={control}
                  name="inquiry_answer"
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <div className="flex flex-col gap-1">
                    <label className="font-bold" htmlFor="inquiry_answer">
                      {inquireFormPage.inquiryResponse}<span className="text-[#D12953] font-medium">*</span>
                    </label>
                    <div
                      className={
                        "border border-gray-300 rounded " +
                        (submitting ? "opacity-70" : "")
                      }
                    >

                      <textarea
                        rows={9}
                        id="inquiry_answer"
                        name="inquiry_answer"
                        className="w-full text-gray-600 outline-[#EBEDF4] py-2 px-3 rounded textarea-input"
                        placeholder={inquireFormPage.inquiryResponsePlaceholder}
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        required
                        disabled={submitting}
                      />
                    </div>
                  </div>
                  )}
                  />
                )}

              <Controller
                  control={control}
                  name="inquiry_documents"
                  render={({ field: { value, onChange }, fieldState: { error } }) => {
                    const removeFile = (index: number) => {
                      onChange(value?.filter((_, docIndex) =>  docIndex !== index ))
                    }

                    return <>
                      <div className="mb-2">
                        <label className="font-bold mb-1">
                          {inquireFormPage.attachments}
                        </label>
                        <div className="flex flex-row gap-2 items-center">
                          <input
                            type="file"
                            name={`file-list`}
                            id={`file-list`}
                            multiple
                            accept='image/*'
                            className="hidden"
                            onChange={(e) => {
                              const files = e.target.files ? Array.from(e.target.files) : [];
                              if(!checkFiles(files))
                                onChange([...(value || []), ...files])
                            }}
                          />
                          <label
                            htmlFor={`file-list`}
                            className="py-2 px-3 bg-[#3e4164] text-[#ffffff] rounded cursor-pointer hover:bg-gray-300"
                          >
                            {inquireFormPage.selectFile}
                          </label>
                          <span className="text-[#3e4164] text-sm">
                           {inquireFormPage.validFilesMsg}
                          </span>
                        </div>
                        {!!value?.length  &&
                          <div className="flex flex-row items-center flex-wrap gap-2 mt-3" >
                            {value?.map((doc: File, index) => (
                              <div  key={index} className={
                                clsx(
                                  "flex flex-row justify-between items-center gap-1 ",
                                  "bg-[#fff] rounded border border-[#EBEDF4] py-1 px-2 "
                                )}
                              >
                                <span className="text-advertiser-primary">{doc.name}</span>
                                <Clear className="text-[#7B756B] cursor-pointer" onClick={() => removeFile(index)}/>
                              </div>
                            ))}

                          </div>
                        }
                      </div>
                    </>
                  }}
                  />
                <Button
                disabled={submitting}
                loading={submitting}
                className="w-full bg-advertiser-primary text-[#fff] p-[13px] h-[50px] items-center	justify-center"
                  onClick={onSubmit}
                >
                  {inquireFormPage.btnText}
                </Button>
              </form>
            </FormProvider>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
