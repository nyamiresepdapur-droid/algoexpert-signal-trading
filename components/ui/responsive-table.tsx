import { Card } from './card';

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: any, item: T) => React.ReactNode;
  className?: string;
  mobileLabel?: string;
}

interface ResponsiveTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

export function ResponsiveTable<T>({
  data,
  columns,
  keyExtractor,
  onRowClick,
  emptyMessage = 'No data available',
}: ResponsiveTableProps<T>) {
  if (data.length === 0) {
    return (
      <Card className="bg-slate-900/50 border-slate-800 p-12 text-center">
        <p className="text-gray-400">{emptyMessage}</p>
      </Card>
    );
  }

  return (
    <>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`text-left py-3 px-4 text-sm font-semibold text-gray-400 ${
                    column.className || ''
                  }`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={keyExtractor(item)}
                onClick={() => onRowClick?.(item)}
                className={`border-b border-slate-800/50 ${
                  onRowClick ? 'cursor-pointer hover:bg-slate-800/30' : ''
                }`}
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className={`py-4 px-4 text-sm text-gray-300 ${column.className || ''}`}
                  >
                    {column.render
                      ? column.render(item[column.key], item)
                      : String(item[column.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-3">
        {data.map((item) => (
          <Card
            key={keyExtractor(item)}
            onClick={() => onRowClick?.(item)}
            className={`bg-slate-900/50 border-slate-800 p-4 ${
              onRowClick ? 'cursor-pointer hover:bg-slate-800/30' : ''
            }`}
          >
            {columns.map((column) => (
              <div
                key={String(column.key)}
                className="flex justify-between items-center py-2 border-b border-slate-800/50 last:border-0"
              >
                <span className="text-sm text-gray-400">
                  {column.mobileLabel || column.label}
                </span>
                <span className={`text-sm font-medium text-gray-100 ${column.className || ''}`}>
                  {column.render
                    ? column.render(item[column.key], item)
                    : String(item[column.key])}
                </span>
              </div>
            ))}
          </Card>
        ))}
      </div>
    </>
  );
}
