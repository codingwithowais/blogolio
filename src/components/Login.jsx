import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Logo from './Logo'
import Button from './Button'
import Input from './Input'
import { useForm } from 'react-hook-form'
import { login as storeLogin } from '../store/authSlice'
import authService from '../appwrite/auth'
import { EyeOff, Eye } from 'lucide-react'
import {showMessage} from '../store/messageSlice'


function Login() {
  const { error, setError } = useState("")
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' })
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function signin(data) {
    try {
      const session = await authService.logIn(data);
      if (session) {
        const userData = await authService.currUser();
        dispatch(storeLogin(userData));
        dispatch(showMessage({type: "success" , text: "Signed in successfully"}));
        navigate('/');
      }else{
        dispatch(showMessage({type: "error" , text: "Failed to sign in! Please check your credentials"}));
      }
    } catch (error) {
      setError(error.message);
    }
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
        <h2 className="text-center text-2xl font-bold">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {/* Error */}
        {error && <p className="text-red-600 mt-6 text-center">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit(signin)} className="mt-6 space-y-5">
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
                  "Email address must be a valid address",
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
              {...register("password", {
                required: true,
              })}
            />
            <div
              className="absolute right-3 top-[38px] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-sm text-center my-2">
            <span className="text-gray-600">Forgot your password? </span>
            <Link
              to="/forget-password"
              className="text-blue-600 hover:underline font-medium"
            >
              Click here to reset
            </Link>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </div>
    </div>

  )
}

export default Login