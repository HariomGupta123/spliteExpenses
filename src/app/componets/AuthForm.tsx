"use client"
import React, { useCallback, useState } from 'react'
import Input from './Input'
import { FieldValues, useForm } from 'react-hook-form'
import Button from './Button/Button'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import AuthSocialButton from './Button/AuthSocialButton'
type Variant= "LOGIN" | "REGISTER"
const AuthForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: { email: "", name: "", password: "" }
  });
  
  const [isLoading, setLoading] = useState(false);
  const [variant,setVariant]=useState<Variant>('LOGIN')
  const toggleVariant = useCallback(() => {
    if (variant == "LOGIN") {
      setVariant('REGISTER')
    } else {
      setVariant('LOGIN')
    }
  }, [variant]);
  const submit = () => {
    setLoading(true)
  }
  return (
    <div className='pt-5 sm:mx-auto ms:w-full ms:max-w-md w-[400px]'>
      <div className='bg-white px-4  py-8 shadow sm:rounded-lg sm:px-10'>
        <form className='space-y-6' onSubmit={handleSubmit(submit)}>
          {variant == "REGISTER" && <Input id='name' label='Name' disabled={isLoading} register={register} errors={errors} />
}
          <Input id='email' label='Enter Email' disabled={isLoading} register={register} errors={errors} />
          <Input id='password' label='Enter Password' disabled={isLoading} register={register} errors={errors} />
                 <Button type={'submit'} disabled={isLoading} >

                  {variant=="LOGIN" ?"log in" :"register"}
                 </Button>
        </form>

      </div>
      <div className='mt-6'>
        <div className='relative'>
          <div
            className='absolute
                        inset-0
                        flex
                         items-center
                        '>
            <div
              className='w-full
                            border-t
                            border-gray-300'/>


          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='bg-white px-2 text-gray-500'>
              Or continue with
            </span>
          </div>


        </div>
        <div className='mt-6 flex gap-2'>
          <AuthSocialButton
            icon={BsGithub}
            onClick={() => ";om"}
          />
          <AuthSocialButton
            icon={BsGoogle}
            onClick={() => "hari"}
          />



        </div>


      </div>
      <div
        onClick={toggleVariant}
        className='underline cursor-pointer'>
        {variant == 'LOGIN' ? 'Create an account' : 'Login'}

      </div>

    </div>
  )
}

export default AuthForm