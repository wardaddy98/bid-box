'use client';
import Button from '@/components/Button';
import NavButton from '@/components/NavButton';
import TextInput from '@/components/TextInput';
import useIsLoggedIn from '@/hooks/useIsLoggedIn';
import { useRegisterMutation } from '@/redux/api/user.api';
import { UserRole } from '@/types/user.type';
import validateUserInput from '@/utils/validateUserInput';
import { createUserSchema } from '@/validations/user.validation';
import { ArrowUpTrayIcon, EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Register = () => {
  const router = useRouter();
  const { isLoggedIn } = useIsLoggedIn();
  const [triggerRegister, { isLoading }] = useRegisterMutation();

  const [formValues, setFormValues] = useState<{
    name: string;
    // profileImage: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    name: '',
    // profileImage: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (router && isLoggedIn) router.replace('/');
  }, [isLoggedIn, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleRegister = async () => {
    const isValidated = validateUserInput(formValues, createUserSchema);
    if (!isValidated) return;

    await triggerRegister({
      email: formValues.email,
      name: formValues.name,
      password: formValues.password,
      role: UserRole.Customer,
    });
  };

  return (
    <section className="w-full max-w-[90vw] mx-auto overflow-hidden bg-white rounded-lg shadow-2xl lg:max-w-2xl border-2 border-gray-200 mt-12">
      <div className="container flex items-center justify-center p-6 mx-auto ">
        <div className="w-full max-w-md">
          <div className="flex justify-center mx-auto border-b-2 border-gray-200 p-2">
            <div
              className="relative h-8 sm:h-9 w-full cursor-pointer"
              onClick={() => router.replace('/')}
            >
              <Image
                fill
                alt="Logo"
                src={'/assets/logo_transparent.png'}
                className="object-contain"
              />
            </div>
          </div>

          <TextInput
            name="name"
            label="Name"
            value={formValues.name}
            onChange={handleChange}
            startIcon={<UserIcon className="h-5 w-5" />}
            containerClassName="mt-4"
          />

          <TextInput
            name="profileImage"
            label="Profile Image"
            // value={formValues.profileImage}
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
            label="Password"
            value={formValues.password}
            type="password"
            onChange={handleChange}
            startIcon={<LockClosedIcon className="h-5 w-5" />}
            containerClassName="mt-4"
            tooltip="Password must be 8–16 characters long and include at least one uppercase letter, one number, and one special character."
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
            <Button className="w-full" variant="primary" onClick={handleRegister}>
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
