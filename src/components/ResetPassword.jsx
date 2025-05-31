import React, { useState } from 'react'
import Input from './Input'
import Button from './Button'
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Logo from './Logo'
function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');
  const { register, handleSubmit, formState: { errors }, watch } = useForm({ mode: "onChange" });
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const resetHandle = (data) => {
    if (!userId || !secret) {
      return;
    }
    authService.resetPassword({ ...data, userId, secret }).then(res => {
      if (res) {
        setResetMessage("Password has been reset successfully");
        setTimeout(() => {
          setResetMessage("");
          navigate('/login');
        }, 1000);
      }
    }).catch((err) => {
      console.log(err);

    })
  }
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
        <h2 className="text-center text-2xl font-bold">Reset Your Password</h2>

        {/* Form */}
        <form onSubmit={handleSubmit(resetHandle)} className="mt-6 space-y-5">
          {/* Password */}
          <div className="relative">
            <Input
              label="Password:"
              required={true}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              {...register("password", {
                required: true,
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must be at least 8 characters long, include a letter, a number, and a special character",
                },
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <div
              className="absolute right-3 top-[38px] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Input
              label="Confirm Password:"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter your new password again"
              {...register("confirmPassword", {
                required: true,
              })}
            />
            <div
              className="absolute right-3 top-[38px] cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p className="text-red-500 text-sm">Passwords do not match</p>
            )}
          </div>

          {/* Message */}
          {resetMessage && (
            <p className="text-green-600 text-center text-sm">{resetMessage}</p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            disabled={!confirmPassword || password !== confirmPassword}
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>

  )
}

export default ResetPassword