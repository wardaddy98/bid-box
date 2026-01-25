'use client';
import Button from '@/components/Button';
import NavButton from '@/components/NavButton';
import TextInput from '@/components/TextInput';
import { ArrowUpTrayIcon, EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React, { useState } from 'react';
const Register = () => {
  const [formValues, setFormValues] = useState<{
    userName: string;
    profileImage: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    userName: '',
    profileImage: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="w-full max-w-[90vw] mx-auto overflow-hidden bg-white rounded-lg shadow-2xl lg:max-w-4xl border-2 border-gray-200">
      <div className="container flex items-center justify-center p-6 mx-auto ">
        <div className="w-full max-w-md">
          <div className="flex justify-center mx-auto border-b-2 border-gray-200 p-2">
            <div className="relative h-8 sm:h-9 w-full">
              <Image
                fill
                alt="Logo"
                src={'/assets/logo_transparent.png'}
                className="object-contain"
              />
            </div>
          </div>

          <TextInput
            name="userName"
            label="User Name"
            value={formValues.userName}
            onChange={handleChange}
            startIcon={<UserIcon className="h-5 w-5" />}
            containerClassName="mt-4"
          />

          <TextInput
            name="profileImage"
            label="Profile Image"
            value={formValues.profileImage}
            onChange={handleChange}
            startIcon={<ArrowUpTrayIcon className="h-5 w-5" />}
            containerClassName="mt-4"
          />
          <TextInput
            name="email"
            label="Email Address"
            value={formValues.email}
            onChange={handleChange}
            startIcon={<EnvelopeIcon className="h-5 w-5" />}
            containerClassName="mt-4"
          />
          <TextInput
            name="password"
            label="password"
            value={formValues.password}
            type="password"
            onChange={handleChange}
            startIcon={<LockClosedIcon className="h-5 w-5" />}
            containerClassName="mt-4"
          />
          <TextInput
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formValues.confirmPassword}
            onChange={handleChange}
            startIcon={<LockClosedIcon className="h-5 w-5" />}
            containerClassName="mt-4"
          />

          <div className="mt-6">
            <Button className="w-full" variant="primary">
              Sign Up
            </Button>

            <NavButton className="block text-center w-full mt-4" href="/login" variant="text">
              Already have an account? Sign In
            </NavButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
