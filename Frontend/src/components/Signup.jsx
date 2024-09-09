import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Login from './Login'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
function Signup() {
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/'
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    }
    await axios
      .post('https://bookstoreapp-q8qu.onrender.com/user/signup', userInfo)
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          toast.success('Signup Successfully')
          navigate(from, { replace: true })
        }
        localStorage.setItem('Users', JSON.stringify(res.data.user))
      })
      .catch((err) => {
        if (err.response) {
          console.log(err)
          toast.error('Error: ' + err.response.data.message)
        }
      })
  }

  return (
    <>
      <div className="bg-gray-800 bg-opacity-70 z-50 flex flex-col h-screen items-center justify-center">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </Link>
            <h3 className="mb-2 text-lg text-center">
              To access Premium section of Books
            </h3>
            <hr />
            <h1 className="mt-4 font-bold text-2xl text-center text-pink-600">
              Signup
            </h1>
            <div className="mt-4 space-y-4 md:space-y-6">
              <div>
                <span className="mb-2 text-lg font-medium">Name</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  className="px-2 py-2 border outline-none rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full"
                  {...register('fullname', { required: true })}
                />
                <br />
                {errors.fullname && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Email */}
              <div>
                <span className="mb-2 text-lg font-medium">Email</span>
                <br />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-2 py-2 border outline-none rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full"
                  {...register('email', { required: true })}
                />
                <br />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Password */}
              <div>
                <span className="mb-2 text-lg font-medium">Password</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your password"
                  className="px-2 py-2 border outline-none rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full"
                  {...register('password', { required: true })}
                />
                <br />
                {errors.password && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
            </div>
            {/* Button */}
            <div className="flex justify-around mt-4">
              <button
                onClick={navigate('/')}
                className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200"
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup
