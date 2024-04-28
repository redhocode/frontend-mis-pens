/* eslint-disable @next/next/no-img-element */
"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import loginUser from '../../features/user/loginUser'; 
// Import loginUser function
import { useToast } from '../ui/use-toast';
import { Button } from '../ui/button';
import { axiosInstance } from '@/lib/axios';
const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const handleLogin = async (
    values: any,
    { setSubmitting, setErrors }: any
  ) => {
    try {
      const response = await loginUser(values);
      const accessToken = response.data.accessToken;
      localStorage.setItem("accessToken", accessToken);

      // Tambahkan token auth ke header Axios secara default
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      // Redirect to dashboard after successful login
      router.push("/dashboard");
    } catch (error) {
      // Handle login errors
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
        className: "w-[400px] md:w-[300px]",
      });
      setSubmitting(false);
    }
  };

  return (
    <section>
      <div className="flex items-center justify-center">
        <div className=" max-w-max max-h-screen">
         
         
          <div className="flex flex-wrap shadow-lg px-20 py-20 justify-center ">
            <div className="outline outline-2 outline-secondary px-4 py-4 rounded-sm ">
               <h1 className="mb-2 text-3xl font-bold text-center text-primary">
            Welcome
          </h1>
               <p className="mb-8 font-medium text-center text-slate-800 ">
            Login dulu cuy
          </p>
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={Yup.object().shape({
                  username: Yup.string().required('Username not empty'),
                  password: Yup.string().required('Password not empty'),
                })}
                onSubmit={handleLogin}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div>
                      <Field
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

                      />
                      <ErrorMessage name="username" component="div" className="text-red-500" />
                    </div>
                    <div>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full mt-4 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <ErrorMessage name="password" component="div" className="text-red-500" />
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                      {isSubmitting ? 'Loading...' : 'Login'}
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
            <div>
              <img
                className="pl-5 mt-4"
                src="https://pmb.pens.ac.id/wp-content/uploads/2024/01/LOGO-PJJ-300x98.png"
                alt=""
                width="500"
                height="126"
                srcSet="https://pmb.pens.ac.id/wp-content/uploads/2024/01/LOGO-PJJ-300x98.png 300w, https://pmb.pens.ac.id/wp-content/uploads/2024/01/LOGO-PJJ-768x251.png 768w, https://pmb.pens.ac.id/wp-content/uploads/2024/01/LOGO-PJJ.png 840w"
                sizes="(max-width: 386px) 100vw, 386px"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
