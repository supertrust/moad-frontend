import api from '@/services/api';
import Link from 'next/link';
import React, { useState } from 'react';
import { Alert, Backdrop, Button, Card, CircularProgress, TextField } from '@mui/material';
import Head from 'next/head';
import { loginApi } from '@/store/api/authApi';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [process, setProcess] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    form[e.target.name] = e.target.value;
    setForm(form);
  }

  const submit = async (e) => {
    e.preventDefault();
    setProcess(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await loginApi(form);
      // localStorage.setItem('token', res.data.data.token);
      // api.defaults.headers.Authorization = `Bearer ${res.data.data.token}`;
      setSuccess('Login Succesful');
      setProcess(false);
    } catch (error) {
      setError(error.response.data.message);
      setProcess(false);
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex w-full justify-center h-screen items-center bg-gray-100 text-gray-600">
        <div className="flex flex-col gap-5 w-full max-w-md">
          <h1 className='text-2xl font-semibold text-center uppercase'>please login first</h1>
          <Card variant='elevation' className='p-10 w-full relative' elevation={3}>
            <Backdrop
              open={process}
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
              <CircularProgress color='inherit' />
            </Backdrop>
            <form onSubmit={submit} className="flex w-full flex-col gap-3">
              {success && <Alert severity='success'>{success}</Alert>}
              {error && <Alert severity='error'>{error}</Alert>}
              <div className="flex flex-col">
                <TextField variant='outlined' label='Email' name='email' id='email' onChange={handleChange} disabled={process} />
              </div>
              <div className="flex flex-col">
                <TextField variant='outlined' label='Password' name='password' id='password' type='password' onChange={handleChange} disabled={process} />
              </div>
              <Button size='large' variant="contained" disabled={process} type='submit'>LOGIN</Button>
              {success && <Link href={`/`}><button type='button' className='p-2 rounded bg-emerald-500'>HOME</button></Link>}
            </form>
          </Card>
        </div>
      </div>
    </>
  )
}
