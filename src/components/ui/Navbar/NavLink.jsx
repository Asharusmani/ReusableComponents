export default function NavLink({ href, active, onClick, children }) {
  let cls = 'text-sm px-3 py-2 rounded-lg block transition-colors '
  cls += active
    ? 'text-blue-600 font-medium bg-blue-50'
    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
  return (
    <a href={href} onClick={onClick} className={cls}>
      {children}
    </a>
  )
}