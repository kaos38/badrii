'use client';
import MyNav  from '@/components/MyNav';
import RotatingLogo from '@/components/RotatingLogo';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function UserLogin() {
  return (
    <div className="h-screen bg-primary">
    <MyNav/>
    <div className='flex flex-col items-center justify-center '>
      <motion.div
      transition={{ duration: 60, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
      animate={{ rotate: 360 }}
      >
      <Image
        src="/icons/kuber-new-og.svg"
        alt="Background Decoration"
        className=""
        width={250}
        height={250}
        />
    </motion.div>

    <div className="flex items-center justify-center w-9/10 md:w-3/4 md:px-4">
      <div className="max-w-md w-full bg-amber-100 rounded-2xl shadow-lg p-8 border border-green-200">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Login
        </h2>

        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 border border-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 border border-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-yellow-100 hover:text-amber-100 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-white">
          Don’t have an account? <a href="/register" className="underline">Register</a>
        </p>
      </div>
    </div>
    </div>
    </div>
  );
}
