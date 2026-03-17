import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Button from '../Button/Button'
import PropTypes from 'prop-types'

export default function SignUp({
  onSubmit,
  onSignIn,
  loading = false,
  logo,
  title = 'Create Account',
  subtitle = 'Aaj hi join karein!',
}) {
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const password = watch('password')

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
      {logo && <div className="flex justify-center mb-5">{logo}</div>}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            autoComplete="name"
            placeholder="Ali Hassan"
            className={`
              w-full border rounded-lg px-3 py-2.5 text-sm
              outline-none transition-all
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              ${errors.name
                ? 'border-red-400 bg-red-50'
                : 'border-gray-300'
              }
            `}
            {...register('name', {
              required: 'Naam zaroori hai',
              minLength: { value: 2, message: 'Naam bohot chota hai' },
            })}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">⚠ {errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={`
              w-full border rounded-lg px-3 py-2.5 text-sm
              outline-none transition-all
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              ${errors.email
                ? 'border-red-400 bg-red-50'
                : 'border-gray-300'
              }
            `}
            {...register('email', {
              required: 'Email zaroori hai',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Valid email likhein',
              },
            })}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">⚠ {errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="••••••••"
              className={`
                w-full border rounded-lg px-3 py-2.5 text-sm pr-10
                outline-none transition-all
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                ${errors.password
                  ? 'border-red-400 bg-red-50'
                  : 'border-gray-300'
                }
              `}
              {...register('password', {
                required: 'Password zaroori hai',
                minLength: { value: 6, message: 'Kam az kam 6 characters' },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">⚠ {errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            className={`
              w-full border rounded-lg px-3 py-2.5 text-sm
              outline-none transition-all
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              ${errors.confirmPassword
                ? 'border-red-400 bg-red-50'
                : 'border-gray-300'
              }
            `}
            {...register('confirmPassword', {
              required: 'Password confirm karein',
              validate: (val) =>
                val === password || 'Passwords match nahi kar rahe',
            })}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-1">
              ⚠ {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          fullWidth
          loading={loading}
          size="lg"
          className="mt-2"
        >
          Create Account
        </Button>
      </form>

      {onSignIn && (
        <p className="text-center text-sm text-gray-500 mt-5">
          Pehle se account hai?{' '}
          <button
            onClick={onSignIn}
            className="text-blue-600 font-medium hover:underline"
          >
            Sign In karein
          </button>
        </p>
      )}
    </div>
  )
}

SignUp.propTypes = {
  onSubmit:  PropTypes.func.isRequired,
  onSignIn:  PropTypes.func,
  loading:   PropTypes.bool,
  logo:      PropTypes.node,
  title:     PropTypes.string,
  subtitle:  PropTypes.string,
}