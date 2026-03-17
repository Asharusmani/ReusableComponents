import clsx from 'clsx'
import PropTypes from 'prop-types'

const sizes = {
  xs: 'w-3 h-3',
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
}

const colors = {
  blue:  'border-blue-600',
  gray:  'border-gray-500',
  white: 'border-white',
  green: 'border-green-600',
  red:   'border-red-600',
}

export default function Loader({
  type = 'spinner',
  size = 'md',
  color = 'blue',
  fullScreen = false,
  overlay = false,
  text = '',
  className = '',
}) {
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      {type === 'spinner' && (
        <div className={clsx(
          'rounded-full border-4 border-gray-200 border-t-current animate-spin',
          sizes[size],
          colors[color],
          className
        )} />
      )}

      {type === 'dots' && (
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={clsx(
                'rounded-full bg-blue-600 animate-bounce',
                size === 'sm' ? 'w-1.5 h-1.5' : size === 'lg' ? 'w-3 h-3' : 'w-2 h-2'
              )}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      )}

      {type === 'pulse' && (
        <div className={clsx(
          'rounded-full bg-blue-600 animate-pulse',
          sizes[size]
        )} />
      )}

      {type === 'bar' && (
        <div className="w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full animate-[loading_1.5s_ease-in-out_infinite]"
            style={{ width: '40%', animation: 'loading 1.5s ease-in-out infinite' }}
          />
        </div>
      )}

      {text && (
        <p className={clsx(
          'text-gray-500 font-medium',
          size === 'sm' ? 'text-xs' : 'text-sm'
        )}>
          {text}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        {spinner}
      </div>
    )
  }

  if (overlay) {
    return (
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-inherit">
        {spinner}
      </div>
    )
  }

  return spinner
}

Loader.propTypes = {
  type:       PropTypes.oneOf(['spinner','dots','pulse','bar']),
  size:       PropTypes.oneOf(['xs','sm','md','lg','xl']),
  color:      PropTypes.oneOf(['blue','gray','white','green','red']),
  fullScreen: PropTypes.bool,
  overlay:    PropTypes.bool,
  text:       PropTypes.string,
  className:  PropTypes.string,
}