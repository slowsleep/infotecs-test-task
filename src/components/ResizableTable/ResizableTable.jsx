const ResizableTable = ({className, columns, data, displayDataColumns, isLoading, error}) => {

  return (
    <table className={"resizable-table " + (className || "")}>
      <thead>
        <tr>
          {columns.map((column, index) => {
            return (
              <th key={index}>
                <div className="resizable-content">
                  {column}
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {isLoading && <tr><td colSpan={columns.length}>Loading...</td></tr>}
        {error && <tr><td colSpan={columns.length}>Error: {error.message}</td></tr>}
        {!isLoading && !error && data.map((item, index) => {
            return (
                <tr key={index}>
                {displayDataColumns.map((col, colIndex) => {
                    return (
                    <td key={colIndex}>
                        {col.split('.').reduce((obj, key) => obj && obj[key], item)}
                    </td>
                    );
                })}
                </tr>
            );
        })}
      </tbody>
    </table>
  );
};

export default ResizableTable;
