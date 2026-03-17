import PropTypes from 'prop-types'
import Button from '../Button/Button'

const errors = {
  404: {
    code:    '404',
    title:   'Page nahi mila',
    message: 'Aap jo page dhundh rahe hain woh exist nahi karta ya hata diya gaya hai.',
    emoji:   '🔍',
  },
  500: {
    code:    '500',
    title:   'Server Error',
    message: 'Humari taraf se kuch problem aa gayi. Thodi der baad dobara try karein.',
    emoji:   '💥',
  },
  403: {
    code:    '403',
    title:   'Access Denied',
    message: 'Aapke paas yeh page dekhne ki permission nahi hai.',
    emoji:   '🚫',
  },
  401: {
    code:    '401',
    title:   'Login Karein',
    message: 'Yeh page dekhne ke liye pehle login karna hoga.',
    emoji:   '🔐',
  },
  offline: {
    code:    '',
    title:   'No Internet',
    message: 'Internet connection check karein aur dobara try karein.',
    emoji:   '📡',
  },
}

export default function ErrorPage({
  code = 404,
  title,
  message,
  onBack,
  onRetry,
  backLabel  = '← Wapas Jao',
  retryLabel = 'Dobara Try Karein',
  className = '',
}) {
  const config = errors[code] || errors[404]

  return (
    <div className={`
      min-h-screen w-full flex items-center justify-center
      bg-gray-50 px-4 py-16
      ${className}
    `}>
      <div className="text-center max-w-md w-full">
        {/* Emoji */}
        <div className="text-7xl sm:text-8xl mb-6 select-none">
          {config.emoji}
        </div>

        {/* Error code */}
        {config.code && (
          <div className="text-7xl sm:text-9xl font-black text-gray-100 select-none mb-2 leading-none">
            {config.code}
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          {title || config.title}
        </h1>

        {/* Message */}
        <p className="text-gray-500 text-base sm:text-lg mb-8 leading-relaxed">
          {message || config.message}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {onBack && (
            <Button variant="outline" onClick={onBack} size="lg">
              {backLabel}
            </Button>
          )}
          {onRetry && (
            <Button onClick={onRetry} size="lg">
              {retryLabel}
            </Button>
          )}
          {!onBack && !onRetry && (
            <Button onClick={() => window.history.back()} size="lg">
              ← Wapas Jao
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

ErrorPage.propTypes = {
  code:       PropTypes.oneOf([404, 500, 403, 401, 'offline']),
  title:      PropTypes.string,
  message:    PropTypes.string,
  onBack:     PropTypes.func,
  onRetry:    PropTypes.func,
  backLabel:  PropTypes.string,
  retryLabel: PropTypes.string,
  className:  PropTypes.string,
}