import clsx from 'clsx'
import PropTypes from 'prop-types'

export default function Table({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = 'Koi data nahi mila',
  striped = true,
  hoverable = true,
  stickyHeader = false,
  className = '',
}) {
  return (
    <div className={clsx(
      'w-full rounded-xl border border-gray-200 overflow-hidden',
      className
    )}>
      {/* Horizontal scroll on small screens */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left min-w-full">
          <thead className={clsx(
            'bg-gray-50 text-gray-500 text-xs uppercase tracking-wider',
            stickyHeader && 'sticky top-0 z-10'
          )}>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={clsx(
                    'px-4 py-3 font-medium whitespace-nowrap',
                    col.align === 'right'  && 'text-right',
                    col.align === 'center' && 'text-center',
                  )}
                  style={col.width ? { width: col.width } : {}}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              // Skeleton loader
              [...Array(4)].map((_, i) => (
                <tr key={i} className="bg-white">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-gray-400 text-sm"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr
                  key={row.id ?? i}
                  className={clsx(
                    'transition-colors',
                    striped && i % 2 !== 0 && 'bg-gray-50/50',
                    hoverable && 'hover:bg-blue-50/40',
                    !striped && 'bg-white',
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={clsx(
                        'px-4 py-3 text-gray-700',
                        col.align === 'right'  && 'text-right',
                        col.align === 'center' && 'text-center',
                        col.bold && 'font-medium text-gray-900',
                      )}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    key:    PropTypes.string.isRequired,
    label:  PropTypes.string.isRequired,
    render: PropTypes.func,
    align:  PropTypes.oneOf(['left','right','center']),
    width:  PropTypes.string,
    bold:   PropTypes.bool,
  })),
  data:         PropTypes.array,
  loading:      PropTypes.bool,
  emptyMessage: PropTypes.string,
  striped:      PropTypes.bool,
  hoverable:    PropTypes.bool,
  stickyHeader: PropTypes.bool,
  className:    PropTypes.string,
}