import React, { useEffect } from 'react';

const ResizableTable = ({className, columns, data, displayDataColumns, isLoading, error, setIsOpenModal, setItemToModal}) => {

  useEffect(() => {
    const resizers = document.querySelectorAll('.resizer');
    let startX, startWidth, currentResizer;

    resizers.forEach((resizer) => {
      resizer.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        startWidth = resizer.parentNode.offsetWidth;
        currentResizer = resizer;
      });
    });

    document.addEventListener('mousemove', (e) => {
      if (currentResizer) {
        const delta = e.clientX - startX;
        let newWidth = startWidth + delta;

        newWidth = Math.max(50, newWidth);
        currentResizer.parentNode.style.width = `${newWidth}px`;
      }
    });

    document.addEventListener('mouseup', () => {
      currentResizer = null;
    });
  }, []);

  const showModal = (item) => () => {
    setIsOpenModal(true);
    setItemToModal(item);
    const overlay = document.querySelector('.overlay');
    if (overlay) {
      overlay.style.display = 'flex';
    }
  }

  return (
    <table className={"resizable-table " + (className || "")}>
      <thead>
        <tr>
          {columns.map((column, index) => {
            return (
              <th key={index}>
                <div className="cell-content">
                  {column}
                </div>
                <div className="resizer"></div>
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
                <tr key={index} onClick={showModal(item)} className="table-row">
                {displayDataColumns.map((col, colIndex) => {
                    return (
                    <td key={colIndex}>
                       <div className="cell-content">
                        {col.split('.').reduce((obj, key) => obj && obj[key], item)}
                       </div>
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
