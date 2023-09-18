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
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Controller, FormProvider, yupResolver, useForm,Button } from '@src/components/common';

import * as Yup from 'yup';
import MenuItem from '@mui/material/MenuItem';

const defaultValues = {
  inquiry_type: "",
  inquiry_title: "",
  inquiry_question: "",
  inquiry_answer: "",
};

const SaveInquirySchema = Yup.object({
  inquiry_type: Yup.string().required("고유형을 선택해주세요."),
  inquiry_title: Yup.string().required("광고이름을 입력해주세요."),
  inquiry_question: Yup.string().required("광고기간을 6개월 또는 12개월 선택해주세요."),
  inquiry_answer: Yup.string().optional(),
})
export default function Index({ id }: { id: string }) {
  const { mutateAsync: updateInquiry } = useUpdateInquiry();
  const { mutateAsync: saveInquiry } = useSaveInquiry();
  const { data } = useGetInquiryDetail({ id });
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [allError, setErrors] = useState<string | undefined>('')
  const [form, setForm] = useState({
    id: "",
    inquiry_type: "",
    inquiry_title: "",
    inquiry_question: "",
    inquiry_answer: "",
  });
  const [files, setFiles] = useState<any[]>([]);
  const [fileNames, setFileNames] = useState<any[]>([]);
  const router = useRouter();

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

  const handleInput = (e: any) => {
    if (e) {
      const { name, value } = e.target;
      const updatedForm = { ...form, [name]: value };
      setForm(updatedForm);
    }
    else {
      const { name } = e.target;
      setErrors(`${name} is Required`)
    }
  };

  const renderFileInputs = () => {
    const inputs: any[] = [];
    for (let i = 0; i < 5; i++) {
      inputs.push(
        <div
          className="py-2 px-3 border border-gray-300 rounded flex gap-2 items-center"
          key={i}
        >
          <input
            type="file"
            name={`file-${i}`}
            id={`file-${i}`}
            className="hidden"
            onChange={(e) => handleFileSelect(e, i)}
            disabled={submitting}
          />
          <label
            htmlFor={`file-${i}`}
            className="px-[9px] py-[3px] text-xs bg-[#E3E5ED] rounded-lg cursor-pointer hover:bg-gray-300 transition-all duration-200"
          >
            파일 선택
          </label>
          <span className="text-xs text-[#999999]">
            {fileNames[i] !== undefined && fileNames[i] !== null
              ? fileNames[i]
              : "선택된 파일 없음"}
          </span>
        </div>
      );
    }

    return inputs;
  };

  const handleFileSelect = (event: any, index: number) => {
    const file = event?.target?.files?.[0];
    if (file !== undefined) {
      const newFiles = [...files];
      newFiles[index] = file;
      setFiles(newFiles);

      fileNames[index] = file.name;
      setFileNames(fileNames);
    } else {
      files.splice(index, 1);
      fileNames.splice(index, 1);
      setFiles([...files]);
      setFileNames([...fileNames]);
    }
  };
  
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(SaveInquirySchema),
  });


  const { handleSubmit, control, formState} = methods;
  const { errors } = formState;

  const onSubmit = handleSubmit(async (event: any) => {
    const formData = new FormData();
    setSubmitting(true);
    formData.append("inquiry_type", event.inquiry_type as string);
    formData.append("inquiry_title", event.inquiry_title as string);
    formData.append("inquiry_question", event.inquiry_question as string);
    if (id !== null && id !== undefined) {
      formData.append("id", form.id);
      formData.append("inquiry_answer", event.inquiry_answer as string);
    }
    files.forEach((file, index) => {
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
    "border-width": "0px 0px 1px 0px",
    color: "#999999",
    padding: "10px 12px",
  };
  return (
    <>
      <Head>
        <title>Contact Us</title>
      </Head>
      <div className="p-[20px] sm:px-[30px] sm:py-[20px] text-gray-700 flex flex-col gap-[30px]">
        <div className="flex gap-[20px] items-center p-[20px] sm:p-[0]">
          <Link href={`/dashboard/customer-service/inquire`}>
            <button className="text-[16px]">문의내역확인</button>
          </Link>
          {user?.role === "Advertiser" && (
            <Link href={`form`}>
              <button className="font-bold text-[20px] text-blue-700">
                문의하기
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
                    문의유형<span className="text-[#D12953] font-medium">*</span>
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
                      sx={{ width: "100%", background: "#fff", border: "1px solid #EBEDF4", "border-radius": "5px" }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            '.MuiSelect-select': {
                              padding: "8px 16px",
                            },
                            '.MuiList-root': {
                              padding: "0"
                            },
                          },
                        },
                      }}
                    >
                      <MenuItem sx={[MenuItemStyles, { "border-top": "1px solid" }]} selected value=""><em>선택</em></MenuItem>
                      <MenuItem sx={MenuItemStyles} value={"classification_of_payments"}>결제</MenuItem>
                      <MenuItem sx={MenuItemStyles} value={"error"}>오류</MenuItem>
                      <MenuItem sx={MenuItemStyles} value={"usage_inquiry"}>이용문의</MenuItem>
                      <MenuItem sx={MenuItemStyles} value={"member_related"}>회원관련</MenuItem>
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
                    문의제목<span className="text-[#D12953] font-medium">*</span>
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
                      placeholder="(필수) 문의 제목을 입력해주세요"
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
                    문의사항<span className="text-[#D12953] font-medium">*</span>
                  </label>
                  <div
                    className={`${(submitting || (id !== null && id !== undefined) ? "opacity-70" : "")}`}
                  >
                    <textarea
                      rows={9}
                      id="inquiry_question"
                      name="inquiry_question"
                      className={`w-full text-gray-600 outline-[#EBEDF4] py-2 px-3 border border-gray-300 rounded ${errors.inquiry_question? "!border-[#F24747]" : ''} `}
                      placeholder="(필수) 문의 제목을 입력해주세요"
                      value={value}
                      // onChange={handleInput}
                      onChange={e => onChange(e.target.value)}
                      disabled={submitting || (id !== null && id !== undefined)}
                    />
                  </div>
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
                      문의 답변<span className="text-[#D12953] font-medium">*</span>
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
                        className="w-full text-gray-600 outline-[#EBEDF4] py-2 px-3 rounded"
                        placeholder="(필수) 문의 제목을 입력해주세요"
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
                <div className="flex flex-col gap-1">
                  <label className="font-bold">
                    파일 첨부하기{" "}
                    <span className="text-xs text-[#999999] font-normal">
                      (png, pdf, jpeg, jpg 확장자 가능)
                    </span>
                  </label>
                  <div className="flex flex-col gap-2">
                    {renderFileInputs()}
                  </div>
                </div>
                <Button
                disabled={submitting}
                className="w-full bg-[#2F48D1] text-[#fff] p-[13px] h-[50px] items-center	justify-center"
                  onClick={onSubmit}
                >
                  문의 등록
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
