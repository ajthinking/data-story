import React from 'react';
export function Repeatable({ data }: { data: any }) {
  const [rows, setRows] = React.useState(data.rows);

  return <div className="flex flex-col justify-center m-4 font-mono text-xs max-w-md">
      <div className="flex p-4">
        {data.columns.map((column: any) => {
          return (<div key={column.name} className="w-full">
            <div className="border bg-blue-500 text-white pl-1">{column.name}</div>
            {rows.map((row: any) => {
              return (<div key={row.id} className="border border-gray-200 pl-1">
                {row.values[column.name]}
              </div>);
            })}
          </div>)
        })}
        <div className="w-full">
          
        </div>                 
      </div>
    </div>;
}
  