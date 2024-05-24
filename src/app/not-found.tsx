"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'



export default function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1 className='text-9xl animate-bounce'>404</h1>
      <h2 className='mb-4 text-xl'>Page not found</h2>
      <Link href={'/'}>
        <Button variant="outline" size="sm">Go Home</Button>
        </Link>
      
    </div>
  )
}