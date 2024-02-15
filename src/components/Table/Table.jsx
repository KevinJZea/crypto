import { useState } from 'react';
import './Table.css';

export const Table = ({ prices }) => {
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const tableRows = Object.entries(prices).slice(startIndex, endIndex);

  const totalPages = Math.ceil(Object.keys(prices).length / 10);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="Table--container">
      <table className="Table">
        <thead className="Table--heading">
          <tr>
            <th className="Table--heading-name">Name</th>
            <th>Bid</th>
            <th>Ask</th>
          </tr>
        </thead>
        <tbody>
          {tableRows.map((crypto) => (
            <tr
              className="Table--row"
              key={crypto?.[0]}
            >
              <td className="Table--currency">{crypto?.[0]}</td>
              <td>{crypto?.[1].bid}</td>
              <td>{crypto?.[1].ask}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="Table--pagination-container">
        <button
          className="Table--pagination-button"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <p className="Table--pagination-text">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </p>
        <button
          className="Table--pagination-button"
          disabled={endIndex >= Object.keys(prices).length}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
