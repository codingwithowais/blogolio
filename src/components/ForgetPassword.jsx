import React, { useState } from 'react'
import Container from './container/Container'
import { useForm } from 'react-hook-form'
import Input from './Input'
import { Eye, EyeOff } from 'lucide-react'
import Logo from './Logo'
import Button from './Button'
import authService from '../appwrite/auth'


function ForgetPassword() {
  const [linkMessage, setLinkMessage] = useState("");
  const forgetHandle = (data) => {
    authService.forgetPassword(data).then(res => {
      if (res) {
        setLinkMessage("Password reset link has been sent to your email");
        setTimeout(() => {
          setLinkMessage("");
        }, 1000);
      }
    })
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });
  const [showPassword, setShowPassword] = useState(false);
  return (



    // responsive design

    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-lg bg-gray-100 rounded-xl p-8 sm:p-10 border border-black/10">
        {/* Logo */}

        <div className="w-full flex justify-center mb-4 px-2 sm:px-0">
          <div className="max-w-[140px] w-full">
            <Logo width="50px" fontSize="1rem" />
          </div>
        </div>




        {/* Heading */}
        <h2 className="text-center text-2xl font-bold">Recover your Account</h2>

        {/* Form */}
        <form onSubmit={handleSubmit(forgetHandle)} className="mt-6 space-y-5">
          {/* Email Input */}
          <Input
            label="Email:"
            placeholder="Enter your registered email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm -mt-4">{errors.email.message}</p>
          )}

          {/* Reset Link Message */}
          {linkMessage && (
            <p className="text-green-600 text-center text-sm">{linkMessage}</p>
          )}

          {/* Submit */}
          <Button type="submit" className="w-full">
            Send Password Reset Link
          </Button>
        </form>
      </div>
    </div>

  )
}

export default ForgetPassword