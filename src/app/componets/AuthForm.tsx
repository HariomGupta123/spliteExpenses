"use client"
import React, { useCallback, useEffect, useState } from 'react'
import Input from './Input/Input'
import axios from 'axios'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Button from './Button/Button'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import AuthSocialButton from './Button/AuthSocialButton'
import { getSession, signIn, useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
type Variant = "LOGIN" | "REGISTER"
const AuthForm = () => {
  const route=useRouter()
  const session=useSession()
  useEffect(() => {
    if (session?.status === 'authenticated') {
      route.push('/')
    }
  }, [session?.status, route]);
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" }
  });

  const [isLoading, setLoading] = useState(false);
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const toggleVariant = useCallback(() => {
    if (variant == "LOGIN") {
      setVariant('REGISTER')
    } else {
      setVariant('LOGIN')
    }
  }, [variant]);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    if (variant === "REGISTER") {
      // Handle registration first
      axios.post('/api/register', data)
        .then(() => {
          toast.success('Registration successful!');
          // Proceed to signIn after successful registration
          return signIn("credentials", { ...data, redirect: false });
        })
        .then((callback) => {
          if (callback?.error) {
            toast.error('Registration failed! Please try again.');
          }
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.message || 'Something went wrong during registration.';
          toast.error(errorMessage);
          console.error('Registration error:', error); // Log the full error for debugging
        })
        .finally(() => {
          setLoading(false);
        });
    }

    if (variant === 'LOGIN') {
      // Handle login
      signIn('credentials', {
        ...data,
        redirect:false,  // Ensure this is set
      })
        .then(async (callback) => {
          if (callback?.error) {
            toast.error('Invalid credentials');
          } else {
            toast.success('Logged in successfully!');
            await getSession(); // Refresh session after login
            route.push('/users/dashboard'); // Redirect manually after successful login
          }
        })
        .catch((error) => {
          console.error('Login error:', error);
        })
        // .catch((error) => {
        //   const errorMessage = error.response?.data?.message || 'Something went wrong during login.';
        //   toast.error(errorMessage);
        //   console.error('Login error:', error); // Log the full error for debugging
        // })
        .finally(() => setLoading(false));
    }

    console.log("Data submitted:", data); 
  };


  return (
    <div className="pt-5 sm:mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg">
      <div className="bg-white px-4 py-8 shadow-lg rounded-lg sm:px-6 md:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} />
          )}
          <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} />
          <Input id="password" label="Password" disabled={isLoading} register={register} errors={errors} />
          <Button type="submit" disabled={isLoading}>
            {variant === "LOGIN" ? "Log in" : "Register"}
          </Button>
        </form>
      </div>

      {/* Divider */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
          <AuthSocialButton icon={BsGithub} onClick={() => ";om"} />
          <AuthSocialButton icon={BsGoogle} onClick={() => "hari"} />
        </div>
      </div>

      {/* Toggle Register/Login */}
      <div onClick={toggleVariant} className="mt-4 text-center text-sm text-gray-600 cursor-pointer underline">
        {variant === "LOGIN" ? "Create an account" : "Login"}
      </div>
    </div>

  )
}

export default AuthForm
