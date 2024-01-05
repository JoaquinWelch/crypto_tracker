import React, { useState, useEffect } from 'react';
import PriceModal from './PriceModel';

function App() {
  const [apiData, setApiData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = new URL('https://api.coingecko.com/api/v3/coins/markets');
        url.searchParams.append('vs_currency', 'usd');
        url.searchParams.append('order', 'market_cap_desc');
        url.searchParams.append('per_page', '10');
        url.searchParams.append('page', '1');
        url.searchParams.append('sparkline', 'false');

        const response = await fetch(url);
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Check if search term is provided and apiData is available
    if (searchTerm && Array.isArray(apiData)) {
      const searchTermLower = searchTerm.toLowerCase();
      const selectedCryptoData = apiData.find(
        crypto =>
          crypto.id.toLowerCase() === searchTermLower ||
          crypto.symbol.toLowerCase() === searchTermLower
      );

      setSelectedCrypto(selectedCryptoData || null);

      // Show modal for Bitcoin when search term is "bitcoin"
      if (searchTermLower === 'bitcoin') {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    }
  }, [searchTerm, apiData]);

  const handleSearch = () => {
    if (Array.isArray(apiData)) {
      const searchTermLower = searchTerm.toLowerCase();
      const selectedCryptoData = apiData.find(
        crypto =>
          crypto.id.toLowerCase() === searchTermLower ||
          crypto.symbol.toLowerCase() === searchTermLower
      );

      setSelectedCrypto(selectedCryptoData || null);

      // Show modal for Bitcoin when search term is "bitcoin"
      if (searchTermLower === 'bitcoin') {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const containerStyles = {
    backgroundColor: '#000000', // Black background color
    color: '#ffffff', // White text color
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '800px',
    margin: '0 auto',
    minHeight: '100vh', // Ensures the container takes the full height of the viewport
  };

  const inputStyles = {
    backgroundColor: '#ffffff', // White background for input
    color: '#000000', // Black text color for input
    padding: '10px',
    borderRadius: '5px',
    marginRight: '10px',
  };

  const buttonStyles = {
    backgroundColor: '#ffffff', // White background for button
    color: '#000000', // Black text color for button
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const tableStyles = {
    color: '#ffffff', // White text color for table
    borderCollapse: 'collapse',
    width: '100%',
    marginTop: '20px',
  };

  const tableHeaderStyles = {
    borderBottom: '2px solid #ffffff', // White border for table header
    paddingBottom: '10px',
  };

  const tableCellStyles = {
    padding: '10px',
    textAlign: 'left',
  };

  return (
    <div style={containerStyles}>
      <h1>Cryptocurrency Data</h1>
      <div>
        <label htmlFor="cryptoInput" style={{ ...inputStyles, marginRight: '10px' }}>
          Enter Cryptocurrency Name or Symbol:
        </label>
        <input
          type="text"
          id="cryptoInput"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={inputStyles}
        />
        <button onClick={handleSearch} style={buttonStyles}>
          Search
        </button>
      </div>
      {selectedCrypto && (
        <div>
          <h2 style={{ color: '#ffffff', marginTop: '20px' }}>
            {selectedCrypto.name} ({selectedCrypto.symbol})
          </h2>
          <p style={{ color: '#ffffff' }}>Price: ${selectedCrypto.current_price}</p>
        </div>
      )}
      <table style={tableStyles}>
        <thead style={tableHeaderStyles}>
          <tr>
            <th style={tableCellStyles}>Name</th>
            <th style={tableCellStyles}>Symbol</th>
            <th style={tableCellStyles}>Price (USD)</th>
            <th style={tableCellStyles}>Market Cap (USD)</th>
            <th style={tableCellStyles}>24h % Change</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(apiData) &&
            apiData.map((crypto, index) => (
              <tr key={index}>
                <td style={tableCellStyles}>{crypto.name}</td>
                <td style={tableCellStyles}>{crypto.symbol}</td>
                <td style={tableCellStyles}>${crypto.current_price}</td>
                <td style={tableCellStyles}>${crypto.market_cap.toLocaleString()}</td>
                <td style={tableCellStyles}>{crypto.price_change_percentage_24h}%</td>
              </tr>
            ))}
        </tbody>
      </table>
      {showModal && (
        <PriceModal onClose={handleCloseModal} price={selectedCrypto?.current_price || 'N/A'} />
      )}
    </div>
  );
}

export default App;
