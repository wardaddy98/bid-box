'use client';
import Button from '@/components/Button';
import LottieAnimation from '@/components/LottieAnimation';
import NavButton from '@/components/NavButton';
import TextInput from '@/components/TextInput';
import GoogleIcon from '@/icons/GoogleIcon';
import Image from 'next/image';
import React, { useState } from 'react';
import LoginAnimationJson from '../../../../public/assets/login_animation.json';

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="flex w-full max-w-[90vw] mx-auto overflow-hidden bg-white rounded-lg shadow-2xl lg:max-w-4xl border-2 border-gray-200">
        <div className="hidden bg-cover lg:block lg:w-1/2 border-r-2 border-gray-200 ">
          <LottieAnimation lottieJson={LoginAnimationJson} />
        </div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="relative h-8 sm:h-9">
            <Image
              fill
              alt="Logo"
              src={'/assets/logo_transparent.png'}
              className="object-contain"
            />
          </div>

          <p className="mt-6 text-xl text-center text-gray-600 font-semibold">Welcome back!</p>

          <Button
            variant="secondary"
            startIcon={<GoogleIcon className="w-6 h-6" />}
            onClick={() => {}}
            className="w-full mt-6"
            childrenClassName="text-center block w-full"
          >
            Sign in with Google
          </Button>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b border-gray-200 lg:w-1/4"></span>

            <span className="text-gray-600">or login with email</span>

            <span className="w-1/5 border-b border-gray-200 lg:w-1/4"></span>
          </div>

          <div className="mt-4 flex flex-col gap-4">
            <TextInput
              label="Email Address"
              value={formValues?.email}
              onChange={handleChange}
              name="email"
              placeholder="jhon@example.com"
            />
            <TextInput
              label="Password "
              value={formValues?.password}
              onChange={handleChange}
              extraContent={<Button variant="text">Forgot Password?</Button>}
              name="password"
              type="password"
              placeholder="********"
            />
          </div>

          <div className="mt-6">
            <Button variant="primary" childrenClassName="text-center" className="w-full">
              Sign In
            </Button>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b border-gray-200 md:w-1/4"></span>
            <NavButton href="/register" variant="text">
              or sign up
            </NavButton>
            <span className="w-1/5 border-b border-gray-200 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
