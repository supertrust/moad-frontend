import { CircularProgress } from "@mui/material";
import useAuth from "@src/hooks/useAuth";
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const { push } = useRouter();
  const { isAuthenticated,loading } = useAuth()
  
  useEffect(() => {
      if(loading)
          return;
    if(isAuthenticated)push("/dashboard")
      else push("/login")
  }, [isAuthenticated,loading])

  return (
    <>
      <main className='h-full flex justify-center items-center'>
        <CircularProgress className={'mt-5'}/>
      </main>
    </>
  )
}
