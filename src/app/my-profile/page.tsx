'use client';

import Avatar from '@/components/Avatar';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import TextInput from '@/components/TextInput';
import { useCreatePasswordMutation } from '@/redux/api/user.api';
import { getUser } from '@/redux/slices/auth.slice';
import { UserRole } from '@/types/user.type';
import validateUserInput from '@/utils/validateUserInput';
import { createPasswordSchema } from '@/validations/user.validation';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import {
  CalendarDaysIcon,
  CurrencyRupeeIcon,
  EnvelopeIcon,
  HeartIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const user = useSelector(getUser);

  const [triggerCreatePassword, { isLoading }] = useCreatePasswordMutation();

  const [formValues, setFromValues] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleCreatePassword = async () => {
    const isValidated = validateUserInput(formValues, createPasswordSchema);
    if (!isValidated) return;

    await triggerCreatePassword({ password: formValues.password });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-5xl px-4">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <Avatar size={24} userName={user?.name} imageUrl={user?.profileImage} />

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-5">
                <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>

                <Badge text={user?.role === UserRole.Admin ? 'Admin' : 'Customer'} />
              </div>

              <div className="mt-3 flex items-center gap-2 text-gray-500">
                <EnvelopeIcon className="h-5 w-5" />
                <span>{user?.email}</span>
              </div>
            </div>
          </div>
        </div>

        {user?.requiresPasswordCreation && (
          <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Create Password</h2>

                <p className="mt-1 text-sm text-gray-600">
                  Your account was created using Google Sign-In. Create a password to enable
                  email/password login as well.
                </p>
              </div>

              <Badge text="Action Required" />
            </div>

            <Divider className="my-5" />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <TextInput
                disabled={isLoading}
                label="Password"
                type="password"
                value={formValues.password}
                startIcon={<LockClosedIcon className="h-5 w-5" />}
                onChange={e =>
                  setFromValues(prev => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                tooltip="8-16 characters. Must contain at least one uppercase letter, one number and one special character."
              />

              <TextInput
                label="Confirm Password"
                disabled={isLoading}
                type="password"
                value={formValues.confirmPassword}
                startIcon={<LockClosedIcon className="h-5 w-5" />}
                onChange={e =>
                  setFromValues(prev => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
              />
            </div>

            <div className="mt-5 rounded-xl bg-white p-4 border border-gray-200">
              <span className="text-sm font-semibold text-gray-700">Password Requirements</span>

              <ul className="mt-2 text-sm text-gray-600 list-disc ml-5 space-y-1">
                <li>8 to 16 characters long</li>
                <li>At least one uppercase letter</li>
                <li>At least one number</li>
                <li>At least one special character</li>
              </ul>
            </div>

            <div className="mt-6 flex justify-end">
              <Button variant="primary" onClick={handleCreatePassword} isLoading={isLoading}>
                Create Password
              </Button>
            </div>
          </div>
        )}
        <div
          className={`mt-6 grid grid-cols-1 gap-4 md:${user?.role === UserRole.Admin ? 'grid-cols-2' : 'grid-cols-3'}`}
        >
          {user?.role === UserRole.Customer && (
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <CurrencyRupeeIcon className="h-6 w-6 text-primary" />
                <span className="font-medium text-gray-500">Bid Balance</span>
              </div>

              <p className="mt-3 text-3xl font-bold text-gray-900">{user?.bidsBalance ?? 0}</p>
            </div>
          )}

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <HeartIcon className="h-6 w-6 text-red-500" />
              <span className="font-medium text-gray-500">Favorite Auctions</span>
            </div>

            <p className="mt-3 text-3xl font-bold text-gray-900">
              {user?.favoriteAuctions?.length ?? 0}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <CalendarDaysIcon className="h-6 w-6 text-green-600" />
              <span className="font-medium text-gray-500">Member Since</span>
            </div>

            <p className="mt-3 text-lg font-semibold text-gray-900">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : '-'}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Account Information</h2>

          <Divider className="my-5" />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <span className="text-sm font-semibold text-gray-500">Full Name</span>

              <div className="mt-2 flex items-center gap-2">
                <UserCircleIcon className="h-6 w-6 text-gray-400" />
                <span className="font-medium text-gray-900">{user?.name}</span>
              </div>
            </div>

            <div>
              <span className="text-sm font-semibold text-gray-500">Email Address</span>

              <div className="mt-2 flex items-center gap-2">
                <EnvelopeIcon className="h-6 w-6 text-gray-400" />
                <span className="font-medium text-gray-900">{user?.email}</span>
              </div>
            </div>

            <div>
              <span className="text-sm font-semibold text-gray-500">Role</span>

              <div className="mt-2">
                <Badge text={user?.role === UserRole.Admin ? 'Admin' : 'Customer'} />
              </div>
            </div>

            <div>
              <span className="text-sm font-semibold text-gray-500">User ID</span>

              <div className="mt-2 font-medium text-gray-900 break-all">{user?._id}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
