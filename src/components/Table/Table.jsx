import { useRef, useState } from 'react';
import { updatePricesMovements } from '../../utils/helpers';
import './Table.css';

export const Table = ({ prices }) => {
  const previousPrices = useRef(null);
  const previousMovements = useRef({});

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const tableRows = Object.entries(prices).slice(startIndex, endIndex);

  const totalPages = Math.ceil(Object.keys(prices).length / 10);

  const pricesMovements = previousPrices.current
    ? updatePricesMovements(
        previousPrices.current,
        prices,
        previousMovements.current
      )
    : {};
  previousPrices.current = { ...previousPrices.current, ...prices };
  previousMovements.current = {
    ...previousMovements.current,
    ...pricesMovements,
  };

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
              key={crypto[0]}
            >
              <td className="Table--currency">{crypto[0]}</td>
              <td className={`${pricesMovements[crypto[0]] ?? ''}`}>
                {crypto[1].bid}
              </td>
              <td className={`${pricesMovements[crypto[0]] ?? ''}`}>
                {crypto[1].ask}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="Table--pagination-container">
        <button
          className="Table--pagination-button"
          disabled={currentPage === 1}
          onClick={() => handlePageChange((prevPage) => prevPage - 1)}
        >
          Previous
        </button>
        <p className="Table--pagination-text">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </p>
        <button
          className="Table--pagination-button"
          disabled={endIndex >= Object.keys(prices).length}
          onClick={() => handlePageChange((prevPage) => prevPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
