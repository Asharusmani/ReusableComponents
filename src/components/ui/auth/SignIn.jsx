import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Button from '../Button/Button'
import PropTypes from 'prop-types'

export default function SignIn({
  onSubmit,
  onForgotPassword,
  onSignUp,
  loading = false,
  logo,
  title = 'Sign In',
  subtitle = 'Welcome back!',
}) {
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
      {/* Logo */}
      {logo && <div className="flex justify-center mb-5">{logo}</div>}

      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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
                ? 'border-red-400 bg-red-50 focus:ring-red-400'
                : 'border-gray-300 bg-white'
              }
            `}
            {...register('email', {
              required: 'Email zaroori hai',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Valid email address likhein',
              },
            })}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              ⚠ {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            {onForgotPassword && (
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-xs text-blue-600 hover:underline"
              >
                Forgot password?
              </button>
            )}
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="••••••••"
              className={`
                w-full border rounded-lg px-3 py-2.5 text-sm pr-10
                outline-none transition-all
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                ${errors.password
                  ? 'border-red-400 bg-red-50 focus:ring-red-400'
                  : 'border-gray-300 bg-white'
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
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              ⚠ {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          fullWidth
          loading={loading}
          size="lg"
          className="mt-2"
        >
          Sign In
        </Button>
      </form>

      {/* Sign up link */}
      {onSignUp && (
        <p className="text-center text-sm text-gray-500 mt-5">
          Account nahi hai?{' '}
          <button
            onClick={onSignUp}
            className="text-blue-600 font-medium hover:underline"
          >
            Sign Up karein
          </button>
        </p>
      )}
    </div>
  )
}

SignIn.propTypes = {
  onSubmit:          PropTypes.func.isRequired,
  onForgotPassword:  PropTypes.func,
  onSignUp:          PropTypes.func,
  loading:           PropTypes.bool,
  logo:              PropTypes.node,
  title:             PropTypes.string,
  subtitle:          PropTypes.string,
}