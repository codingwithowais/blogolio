import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Logo from './Logo'
import Input from './Input'
import Button from './Button'
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import {showMessage} from '../store/messageSlice'

function Signup() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ mode: 'onChange' });
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const name = watch("name");
  const email = watch("email");
  async function create(data) {
    setError("");
    // if (password !== confirmPassword) {
    //     alert("Passwords do not match");
    //     return;
    // }


    try {
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.currUser();
        if (userData) {
          dispatch(login(userData));
          dispatch(showMessage({type: "success" , text: "New account created successfully"}));
          navigate('/');
        }else{
          dispatch(showMessage({type: "error" , text: "Oops! Some error creating new account"}));
        }
      }
    } catch (error) {
      setError(error.message);
    }
  }
  return (


    // Responsive Design

    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-lg bg-gray-100 rounded-xl p-8 sm:p-10 border border-black/10">
        {/* Logo */}
        <div className="w-full flex justify-center mb-4 px-2 sm:px-0">
          <div className="max-w-[140px] w-full">
            <Logo width="50px" fontSize="1rem" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-center text-2xl font-bold">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Sign In
          </Link>
        </p>

        {/* Error */}
        {error && <p className="text-red-600 mt-6 text-center">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit(create)} className="mt-6 space-y-5">
          {/* Name */}
          <Input
            label="Full Name:"
            placeholder="Enter your full name"
            {...register("name", { required: true })}
          />

          {/* Email */}
          <Input
            label="Email:"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be valid",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm -mt-4">{errors.email.message}</p>
          )}

          {/* Password */}
          <div className="relative">
            <Input
              label="Password:"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
              {...register("password", {
                required: true,
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Minimum 8 characters, with letter, number & special character",
                },
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters",
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
              <p className="text-red-500 text-sm -mt-4">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Input
              label="Confirm Password:"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter password"
              {...register("confirmPassword", { required: true })}
            />
            <div
              className="absolute right-3 top-[38px] cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
            {confirmPassword &&
              password !== confirmPassword && (
                <p className="text-red-500 text-sm -mt-4">Passwords do not match</p>
              )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            disabled={
              !confirmPassword ||
              !email ||
              !name ||
              confirmPassword !== password
            }
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>

  )
}

export default Signup