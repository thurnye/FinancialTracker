import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ProfileFormData,
  SecurityFormData,
  PersonalInfoFormData,
} from '../types/settings.types';
import { defaultUserProfile, countries } from '../utils/settings.data';

export default function SettingsProfile() {
  const [avatarPreview, setAvatarPreview] = useState<string>(defaultUserProfile.avatar);

  const profileForm = useForm<ProfileFormData>();

  const securityForm = useForm<SecurityFormData>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  });

  const personalInfoForm = useForm<PersonalInfoFormData>({
    defaultValues: {
      FirstName: defaultUserProfile.FirstName,
      LastName: defaultUserProfile.LastName,
      email: defaultUserProfile.email,
      address: defaultUserProfile.address,
      city: defaultUserProfile.city,
      postCode: defaultUserProfile.postCode,
      country: defaultUserProfile.country,
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (20MB max)
      if (file.size > 20 * 1024 * 1024) {
        alert('File size must be less than 20MB');
        return;
      }

      // Create preview URL from uploaded file
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onProfileSubmit = (data: ProfileFormData) => {
    console.log('Profile data:', data);
    console.log('Avatar file:', data.avatar?.[0]);
    // Handle profile update
  };

  const onSecuritySubmit = (data: SecurityFormData) => {
    console.log('Security data:', data);
    // Handle security update
  };

  const onPersonalInfoSubmit = (data: PersonalInfoFormData) => {
    console.log('Personal info data:', data);
    // Handle personal info update
  };

  return (
    <div className='space-y-4 pb-6'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
        <div className='lg:col-span-3'>
          <div className='bg-white rounded-lg p-6 shadow-sm border border-slate-200'>
            <form
              onSubmit={profileForm.handleSubmit(onProfileSubmit)}
            >
              <div className='flex flex-col items-center'>
                <div className='mb-4'>
                  <div className='w-32 h-32 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-50 overflow-hidden border-4 border-white shadow-lg'>
                    <img
                      src={avatarPreview}
                      alt='Profile'
                      className='w-full h-full object-cover'
                    />
                  </div>
                </div>

                <div className='w-full'>
                  <label
                    htmlFor='file-upload'
                    className='cursor-pointer flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors'
                  >
                    <div className='w-4 h-4 border-2 border-white rounded'></div>
                    Upload Photo
                  </label>
                  <input
                    id='file-upload'
                    type='file'
                    accept='image/*'
                    {...profileForm.register('avatar', {
                      onChange: handleAvatarChange,
                    })}
                    className='hidden'
                  />

                  {profileForm.watch('avatar')?.[0]?.name ? (
                    <p className='mt-2 text-xs text-emerald-600 text-center font-medium truncate px-2'>
                      {profileForm.watch('avatar')?.[0]?.name}
                    </p>
                  ) : (
                    <p className='mt-2 text-xs text-slate-400 text-center'>
                      Max file size: 20MB
                    </p>
                  )}
                </div>
              </div>

              <button
                type='submit'
                className='mt-6 w-full bg-emerald-600 text-white px-6 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-semibold shadow-sm'
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>

        <div className='lg:col-span-9'>
          <div className='bg-white rounded-lg p-6 shadow-sm border border-slate-200'>
            <h3 className='text-base font-bold text-slate-800 mb-4'>
              Personal Information
            </h3>

            <form
              onSubmit={personalInfoForm.handleSubmit(onPersonalInfoSubmit)}
            >
              {/* FirstName */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-xs font-medium text-slate-700 mb-2'>
                    First Name
                  </label>
                  <input
                    type='text'
                    {...personalInfoForm.register('FirstName', {
                      required: 'First name is required',
                    })}
                    className={`w-100 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                      personalInfoForm.formState.errors.FirstName
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-slate-200 focus:ring-emerald-500'
                    }`}
                  />
                  {personalInfoForm.formState.errors.FirstName && (
                    <p className='text-xs text-red-600 mt-1'>
                      {personalInfoForm.formState.errors.FirstName.message}
                    </p>
                  )}
                </div>
                {/* LastName */}
                <div>
                  <label className='block text-xs font-medium text-slate-700 mb-2'>
                    Last Name
                  </label>
                  <input
                    type='text'
                    {...personalInfoForm.register('LastName', {
                      required: 'Last name is required',
                    })}
                    className={`w-100 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                      personalInfoForm.formState.errors.LastName
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-slate-200 focus:ring-emerald-500'
                    }`}
                  />
                  {personalInfoForm.formState.errors.LastName && (
                    <p className='text-xs text-red-600 mt-1'>
                      {personalInfoForm.formState.errors.LastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className='grid grid-cols-1 my-4 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-xs font-medium text-slate-700 mb-2'>
                    Email
                  </label>
                  <input
                    type='email'
                    {...personalInfoForm.register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className={`w-100 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                      personalInfoForm.formState.errors.email
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-slate-200 focus:ring-emerald-500'
                    }`}
                  />
                  {personalInfoForm.formState.errors.email && (
                    <p className='text-xs text-red-600 mt-1'>
                      {personalInfoForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className='text-base font-bold text-slate-800 mb-4'>
                  Address
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-xs font-medium text-slate-700 mb-2'>
                      Address
                    </label>
                    <input
                      type='text'
                      {...personalInfoForm.register('address', {
                        required: 'Address is required',
                      })}
                      className={`w-100 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                        personalInfoForm.formState.errors.address
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-slate-200 focus:ring-emerald-500'
                      }`}
                    />
                    {personalInfoForm.formState.errors.address && (
                      <p className='text-xs text-red-600 mt-1'>
                        {personalInfoForm.formState.errors.address.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className='block text-xs font-medium text-slate-700 mb-2'>
                      City
                    </label>
                    <input
                      type='text'
                      {...personalInfoForm.register('city', {
                        required: 'City is required',
                      })}
                      className={`w-100 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                        personalInfoForm.formState.errors.city
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-slate-200 focus:ring-emerald-500'
                      }`}
                    />
                    {personalInfoForm.formState.errors.city && (
                      <p className='text-xs text-red-600 mt-1'>
                        {personalInfoForm.formState.errors.city.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className='block text-xs font-medium text-slate-700 mb-2'>
                      Post Code / Zip Code
                    </label>
                    <input
                      type='text'
                      {...personalInfoForm.register('postCode', {
                        required: 'Post code is required',
                      })}
                      className={`w-100 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                        personalInfoForm.formState.errors.postCode
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-slate-200 focus:ring-emerald-500'
                      }`}
                    />
                    {personalInfoForm.formState.errors.postCode && (
                      <p className='text-xs text-red-600 mt-1'>
                        {personalInfoForm.formState.errors.postCode.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className='block text-xs font-medium text-slate-700 mb-2'>
                      Country
                    </label>
                    <select
                      {...personalInfoForm.register('country', {
                        validate: (value) =>
                          value !== 'Select' || 'Please select a country',
                      })}
                      className={`w-100 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 text-slate-600 ${
                        personalInfoForm.formState.errors.country
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-slate-200 focus:ring-emerald-500'
                      }`}
                    >
                      {countries.map((country) => (
                        <option key={country.value} value={country.value}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                    {personalInfoForm.formState.errors.country && (
                      <p className='text-xs text-red-600 mt-1'>
                        {personalInfoForm.formState.errors.country.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <button
                type='submit'
                className='mt-4 bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-semibold'
              >
                Save
              </button>
            </form>
          </div>
          {/* Personal Information */}
          <div className='bg-white rounded-lg p-6 my-4 shadow-sm border border-slate-200'>
            <form
              onSubmit={securityForm.handleSubmit(onSecuritySubmit)}
              className='space-y-4'
            >
              {/* Change Password Update */}
              <div className='mt-4'>
                <h3 className='text-base font-bold text-slate-800 mb-4'>
                  Change Password
                </h3>

                <div>
                  <label className='block text-xs font-medium text-slate-700 mb-2'>
                    Old Password
                  </label>
                  <input
                    type='password'
                    {...securityForm.register('oldPassword', {
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
                    })}
                    className={`w-100 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                      securityForm.formState.errors.oldPassword
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-slate-200 focus:ring-emerald-500'
                    }`}
                  />
                  {securityForm.formState.errors.oldPassword && (
                    <p className='text-xs text-red-600 mt-1'>
                      {securityForm.formState.errors.oldPassword.message}
                    </p>
                  )}
                </div>
                <div className='mt-4'>
                  <label className='block text-xs font-medium text-slate-700 mb-2'>
                    New Password
                  </label>
                  <input
                    type='password'
                    {...securityForm.register('newPassword', {
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
                    })}
                    className={`w-100 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                      securityForm.formState.errors.newPassword
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-slate-200 focus:ring-emerald-500'
                    }`}
                  />
                  {securityForm.formState.errors.newPassword && (
                    <p className='text-xs text-red-600 mt-1'>
                      {securityForm.formState.errors.newPassword.message}
                    </p>
                  )}
                </div>
              </div>
              <button
                type='submit'
                className='mt-4 bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-semibold'
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
