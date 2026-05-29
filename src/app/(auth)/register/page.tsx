'use client';
import Button from '@/components/Button';
import NavButton from '@/components/NavButton';
import TextInput from '@/components/TextInput';
import Toggle from '@/components/Toggle';
import useIsLoggedIn from '@/hooks/useIsLoggedIn';
import { useRegisterMutation } from '@/redux/api/user.api';
import { UserRole } from '@/types/user.type';
import validateUserInput from '@/utils/validateUserInput';
import { createUserSchema } from '@/validations/user.validation';
import { ArrowUpTrayIcon, EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

interface IRegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  adminCode?: string;
}

const initialFormValues: IRegisterFormValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  adminCode: '',
};

const Register = () => {
  const router = useRouter();
  const { isLoggedIn } = useIsLoggedIn();
  const [triggerRegister, { isLoading }] = useRegisterMutation();
  const [isAdmin, setIsAdmin] = useState(false);

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const previewUrl = profileImage ? URL.createObjectURL(profileImage) : null;
  const inputRef = useRef<HTMLInputElement>(null);

  const [formValues, setFormValues] = useState<IRegisterFormValues>(initialFormValues);

  useEffect(() => {
    if (router && isLoggedIn) router.replace('/');
  }, [isLoggedIn, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async () => {
    const isValidated = validateUserInput({ ...formValues, isAdmin }, createUserSchema);
    if (!isValidated) return;

    const formData = new FormData();

    if (profileImage) {
      formData.append('file', profileImage);
    }

    if (formValues.adminCode) {
      formData.append('adminCode', String(formValues.adminCode));
    }

    formData.append('password', String(formValues.password));
    formData.append('email', String(formValues.email));
    formData.append('name', String(formValues.name));
    formData.append('role', String(isAdmin ? UserRole.Admin : UserRole.Customer));

    await triggerRegister(formData);
  };

  return (
    <section className="w-full max-w-[90vw] mx-auto overflow-hidden bg-white rounded-lg shadow-2xl lg:max-w-2xl border-2 border-gray-200 my-6">
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

          <div className="flex justify-end mt-4">
            <Toggle
              checked={isAdmin}
              onChange={e => setIsAdmin(e.target.checked)}
              label="Is Admin?"
              disabled={isLoading}
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm text-gray-500 font-semibold mb-2">Profile Image</label>

            <div className="flex items-center gap-6">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-gray-100">
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Profile Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <UserIcon className="h-10 w-10 text-gray-400" />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  startIcon={<ArrowUpTrayIcon className="h-4 w-4" />}
                  onClick={() => inputRef.current?.click()}
                  disabled={isLoading}
                >
                  {previewUrl ? 'Choose Another' : 'Upload Image'}
                </Button>

                <span className="text-xs text-gray-400">PNG, JPG or WEBP • Max 5MB</span>

                {profileImage && (
                  <span className="max-w-52 truncate text-sm font-medium text-gray-600">
                    {profileImage.name}
                  </span>
                )}
              </div>
            </div>

            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              disabled={isLoading}
              onChange={e => {
                const file = e.target.files?.[0];
                if (!file) return;
                setProfileImage(file);
              }}
            />
          </div>

          <TextInput
            name="name"
            label="Name"
            value={formValues.name}
            onChange={handleChange}
            startIcon={<UserIcon className="h-5 w-5" />}
            containerClassName="mt-4"
            disabled={isLoading}
          />

          <TextInput
            name="email"
            label="Email Address"
            value={formValues.email}
            onChange={handleChange}
            startIcon={<EnvelopeIcon className="h-5 w-5" />}
            containerClassName="mt-4"
            disabled={isLoading}
          />
          <TextInput
            name="password"
            label="Password"
            value={formValues.password}
            type="password"
            onChange={handleChange}
            startIcon={<LockClosedIcon className="h-5 w-5" />}
            containerClassName="mt-4"
            disabled={isLoading}
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
            disabled={isLoading}
          />
          {isAdmin && (
            <TextInput
              name="adminCode"
              label="Admin Code"
              type="password"
              value={formValues.adminCode}
              onChange={handleChange}
              startIcon={<LockClosedIcon className="h-5 w-5" />}
              containerClassName="mt-4"
              minLength={4}
              maxLength={4}
              onKeyDown={e => {
                const allowed = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
                if (allowed.includes(e.key)) return;

                if (!/^\d$/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              disabled={isLoading}
            />
          )}

          <div className="mt-6">
            <Button
              disabled={isLoading}
              className="w-full"
              variant="primary"
              onClick={handleRegister}
            >
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
