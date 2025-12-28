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
  const route = useRouter()
  const session = useSession()

  useEffect(() => {
    if (session?.status === 'authenticated') {
      route.push('/')
    }
  }, [session?.status, route])

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" }
  })

  const [isLoading, setLoading] = useState(false)
  const [variant, setVariant] = useState<Variant>('LOGIN')

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant('REGISTER')
    } else {
      setVariant('LOGIN')
    }
  }, [variant])

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true)

    if (variant === "REGISTER") {
      axios.post('/api/register', data)
        .then(() => {
          toast.success('Registration successful!')
          return signIn("credentials", { ...data, redirect: false })
        })
        .then((callback) => {
          if (callback?.error) {
            toast.error('Registration failed! Please try again.')
          }
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.message || 'Something went wrong during registration.'
          toast.error(errorMessage)
          console.error('Registration error:', error)
        })
        .finally(() => {
          setLoading(false)
        })
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then(async (callback) => {
          if (callback?.error) {
            toast.error('Invalid credentials')
          } else {
            toast.success('Logged in successfully!')
            await getSession()
            route.push('/users/dashboard')
          }
        })
        .catch((error) => {
          console.error('Login error:', error)
        })
        .finally(() => setLoading(false))
    }

    console.log("Data submitted:", data)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold text-slate-900">
          {variant === "LOGIN" ? "Welcome back" : "Create your account"}
        </h2>
        <p className="text-sm text-slate-500">
          {variant === "LOGIN"
            ? "Pick up where you left off and split expenses effortlessly."
            : "Join ShareKharch to track shared bills with friends in seconds."}
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {variant === "REGISTER" && (
          <Input
            id="name"
            label="Full name"
            placeholder="Alex Johnson"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        )}
        <Input
          id="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Use at least 8 characters.</span>
          <button
            type="button"
            className="text-slate-600 transition hover:text-slate-900"
          >
            Forgot password?
          </button>
        </div>
        <Button type="submit" disabled={isLoading}>
          {variant === "LOGIN" ? "Log in" : "Create account"}
        </Button>
      </form>

      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-wide">
            <span className="bg-white px-2 text-slate-400">Or continue with</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <AuthSocialButton icon={BsGithub} onClick={() => ";om"} />
          <AuthSocialButton icon={BsGoogle} onClick={() => "hari"} />
        </div>
      </div>

      <button
        type="button"
        onClick={toggleVariant}
        className="w-full text-center text-sm font-medium text-slate-600 transition hover:text-slate-900"
      >
        {variant === "LOGIN"
          ? "New to ShareKharch? Create an account"
          : "Already have an account? Log in"}
      </button>
    </div>
  )
}

export default AuthForm
