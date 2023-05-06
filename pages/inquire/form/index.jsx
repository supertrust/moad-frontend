import { getInquiryDetail, saveInquiry, updateInquiry } from '@/store/api/inquiryApi';
import { Button, Card, CircularProgress, Select } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function Index({ id }) {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [dataId, setDataId] = useState(null);
  const [form, setForm] = useState({
    id: '',
    inquiry_type: '',
    inquiry_title: '',
    inquiry_question: '',
    inquiry_answer: ''
  });
  const [files, setFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setDataId(id);
    if (id !== undefined) {
      getData(id);
    } else {
      setLoading(false);
    }
  }, [id]);

  const getData = async (id) => {
    const res = await getInquiryDetail(id);
    const data = res.data;
    if (data.inquiry_answer !== null) {
      router.push(`/inquire/${id}`);
    } else {
      form.id = data.id;
      form.inquiry_type = data.inquiry_type;
      form.inquiry_title = data.inquiry_title;
      form.inquiry_question = data.inquiry_question;
      form.inquiry_answer = data.inquiry_answer;

      setForm({ ...form });
      setLoading(false);
    }
  }

  const handleInput = (e) => {
    form[e.target.name] = e.target.value;
    setForm({ ...form });
  }

  const renderFileInputs = () => {
    const inputs = [];
    for (let i = 0; i < 5; i++) {
      inputs.push(
        <div className='py-2 px-3 border border-gray-300 rounded flex gap-2 items-center' key={i}>
          <input type="file" name={`file-${i}`} id={`file-${i}`} className='hidden' onChange={e => handleFileSelect(e, i)} disabled={submitting} />
          <label htmlFor={`file-${i}`} className='px-2 py-1 text-xs bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 transition-all duration-200'>파일 선택</label>
          <span className='text-xs text-gray-600'>{fileNames[i] !== undefined && fileNames[i] !== null ? fileNames[i] : '선택된 파일 없음'}</span>
        </div>
      )
    }

    return inputs;
  }

  const handleFileSelect = (event, index) => {
    const file = event.target.files[0];
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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    const formData = new FormData();
    formData.append('inquiry_type', form.inquiry_type);
    formData.append('inquiry_title', form.inquiry_title);
    formData.append('inquiry_question', form.inquiry_question);
    formData.append('inquiry_question', form.inquiry_question);
    if (dataId !== null && dataId !== undefined) {
      formData.append('id', form.id);
      formData.append('inquiry_answer', form.inquiry_answer);
    }
    files.forEach((file, index) => {
      formData.append(`inquiry_documents[]`, file);
    });
    try {
      const res = dataId !== null && dataId !== undefined ? await updateInquiry(formData) : await saveInquiry(formData);
      if (dataId !== null && dataId !== undefined) {
        router.push(`/inquire/${dataId}`);
      } else {
        router.push('/inquire');
      }
    } catch (error) {
      console.log(error);
      toast(error.response.data.message, { type: 'error' });
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>{loading ? "Loading page ..." : `Contact Us`}</title>
      </Head>
      <div className="p-7 text-gray-700 flex flex-col gap-5">
        <div className="flex gap-5 items-center">
          <Link href={`/inquire`}><button>문의내역확인</button></Link>
          <Link href={`/inquire/form`}><button className="font-bold text-lg text-blue-700">문의하기</button></Link>
        </div>
        <Card
          variant="elevation"
          elevation={1}
          className="flex flex-col gap-2 relative"
        >
          {loading ? (
            <div className="flex justify-center items-center w-full h-32 backdrop-blur-sm">
              <CircularProgress color="primary" />
            </div>
          ) : (
            <div className="px-7 py-9 flex gap-3 items-center">
              <div className="w-full hidden lg:flex">
                <img src="/images/img-contact-us.png" alt="Contact Us" />
              </div>
              <div className="flex w-full">
                <form className='flex flex-col gap-4 w-full' onSubmit={handleFormSubmit}>
                  <div className="flex flex-col gap-1">
                    <label className='font-bold' htmlFor="inquiry_type">문의유형<span className='text-red-500'>*</span></label>
                    <div className={'border border-gray-300 rounded ' + (submitting || (dataId !== null && dataId !== undefined) ? 'opacity-70' : '')}>
                      <select id='inquiry_type' name='inquiry_type' className='w-full text-gray-600 outline-none py-2 px-3 rounded disabled:bg-gray-50 read-only:bg-gray-50' value={form.inquiry_type} onChange={handleInput} required disabled={submitting || (dataId !== null && dataId !== undefined)}>
                        <option value="">선택</option>
                        <option value="classification_of_payments">결제</option>
                        <option value="error">오류</option>
                        <option value="usage_inquiry">이용문의</option>
                        <option value="member_related">회원관련</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className='font-bold' htmlFor="inquiry_title">문의제목<span className='text-red-500'>*</span></label>
                    <div className={'border border-gray-300 rounded ' + (submitting || (dataId !== null && dataId !== undefined) ? 'opacity-70' : '')}>
                      <input type='text' id='inquiry_title' name='inquiry_title' className='w-full text-gray-600 outline-none py-2 px-3 rounded' placeholder='(필수) 문의 제목을 입력해주세요' value={form.inquiry_title} onChange={handleInput} required disabled={submitting || (dataId !== null && dataId !== undefined)} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className='font-bold' htmlFor="inquiry_question">문의사항<span className='text-red-500'>*</span></label>
                    <div className={'border border-gray-300 rounded ' + (submitting || (dataId !== null && dataId !== undefined) ? 'opacity-70' : '')}>
                      <textarea rows={9} type='text' id='inquiry_question' name='inquiry_question' className='w-full text-gray-600 outline-none py-2 px-3 rounded' placeholder='(필수) 문의 제목을 입력해주세요' value={form.inquiry_question} onChange={handleInput} required disabled={submitting || (dataId !== null && dataId !== undefined)}></textarea>
                    </div>
                  </div>
                  {dataId !== null && dataId !== undefined &&
                    <div className="flex flex-col gap-1">
                      <label className='font-bold' htmlFor="inquiry_answer">문의 답변<span className='text-red-500'>*</span></label>
                      <div className={'border border-gray-300 rounded ' + (submitting ? 'opacity-70' : '')}>
                        <textarea rows={9} type='text' id='inquiry_answer' name='inquiry_answer' className='w-full text-gray-600 outline-none py-2 px-3 rounded' placeholder='(필수) 문의 제목을 입력해주세요' value={form.inquiry_answer} onChange={handleInput} required disabled={submitting}></textarea>
                      </div>
                    </div>
                  }
                  <div className="flex flex-col gap-1">
                    <label className='font-bold'>파일 첨부하기 <span className="text-xs text-gray-600 font-normal">(png, pdf, jpeg, jpg 확장자 가능)</span></label>
                    <div className="flex flex-col gap-2">
                      {renderFileInputs()}
                    </div>
                  </div>
                  <Button type='submit' size='large' variant='contained' color='primary' disabled={submitting}>문의 등록</Button>
                </form>
              </div>
            </div>
          )}
        </Card>
      </div>
    </>
  )
}
