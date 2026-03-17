import clsx from 'clsx'
import PropTypes from 'prop-types'

const variants = {
  primary:   'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400',
  danger:    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  outline:   'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-400',
  ghost:     'text-gray-600 hover:bg-gray-100 focus:ring-gray-400',
  success:   'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
}

const sizes = {
  xs: 'px-2.5 py-1 text-xs rounded-md',
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-4 py-2 text-sm rounded-lg',
  lg: 'px-5 py-2.5 text-base rounded-xl',
  xl: 'px-6 py-3 text-base rounded-xl',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  className = '',
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center gap-2 font-medium',
        'transition-all duration-150',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'whitespace-nowrap',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...rest}
    >
      {loading ? (
        <span className={clsx(
          'border-2 border-t-transparent rounded-full animate-spin',
          size === 'xs' || size === 'sm' ? 'w-3 h-3' : 'w-4 h-4',
          variant === 'primary' || variant === 'danger' || variant === 'success'
            ? 'border-white'
            : 'border-gray-500'
        )} />
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}
      {children}
      {!loading && rightIcon && (
        <span className="shrink-0">{rightIcon}</span>
      )}
    </button>
  )
}

Button.propTypes = {
  variant:   PropTypes.oneOf(['primary','secondary','danger','outline','ghost','success']),
  size:      PropTypes.oneOf(['xs','sm','md','lg','xl']),
  loading:   PropTypes.bool,
  disabled:  PropTypes.bool,
  fullWidth: PropTypes.bool,
  leftIcon:  PropTypes.node,
  rightIcon: PropTypes.node,
  onClick:   PropTypes.func,
  type:      PropTypes.string,
  className: PropTypes.string,
}