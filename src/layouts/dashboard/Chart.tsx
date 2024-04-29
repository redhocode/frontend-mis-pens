import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'

type Props = {}

const Chart = (props: Props) => {
  return (
    <div className="flex flex-col px-4 py-4 w-full justify-between gap-4">
      <div className="flex flex-warp w-full">
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
      <div className="flex flex-warp gap-4 w-full md:flex-col">
        <div className='flex'>
          <Card className='w-full shadow-md'>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum facere nostrum debitis nam deleniti impedit ducimus, labore nesciunt esse totam molestias excepturi nihil! Fuga tenetur, atque quis quaerat tempora rem!</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
        <div className='flex'>
          {" "}
          <Card className='w-full'>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet aperiam ex aliquid magnam, iusto maiores quas qui est eligendi repellendus harum ducimus officia, cum sequi dolor corporis? Architecto, iste veritatis.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Chart