import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlug, faUtensils,faCoffee } from '@fortawesome/free-solid-svg-icons';
import { useEffect,toggleDetails,expandedRow } from "react";

import Papa from "papaparse";
import "../styles/flight.css"; // Optional: For component-specific styles

const Flight = () => {
  const [flightData, setFlightData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);

  // Path to your CSV file
  const csvFilePath = "/flightDetails.csv";

  // Fetch and parse the CSV file
  useEffect(() => {
    fetch(csvFilePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((csvText) => {
        Papa.parse(csvText, {
          complete: (result) => {
            setFlightData(result.data.slice(1)); // Skip header row
          },
          header: true, // Use CSV headers
        });
      })
      .catch((error) => {
        console.error("Error fetching the CSV file:", error);
      });
  }, [csvFilePath]);
  const toggleDetails = (index) => {
    setExpandedRow(expandedRow === index ? null : index); // Toggle between null and index
  };

  return (
    // <div className="Flight">
    //   <h1>Flight Details</h1>
      
    //   {/* File upload input */}
    //   <input type="file" accept=".csv" onChange={handleFileUpload} />

    //   {/* Display flight details in a table */}
    //   {flightData.length > 0 && (
    //     <table className="flight-table">
    //       <thead>
    //         <tr>
    //           <th>SRC</th>
    //           <th>DEST</th>
    //           <th>NAME</th>
    //           <th>PRICE</th>
    //           <th>DURATION</th>
    //           <th>STOPS</th>
    //           <th>POWER OUTLET</th>
    //           <th>SEATING</th>
    //           <th>BEVERAGE</th>
    //           <th>REFUNDABLE</th>
    //           <th>MEAL</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {flightData.map((flight, index) => (
    //           <tr key={index}>
                
    //             {/* <td>{flight.SRC || "N/A"}</td>
    //             <td>{flight.DEST || "N/A"}</td>
    //             <td>{flight.NAME || "N/A"}</td>
    //             <td>{flight.PRICE || "N/A"}</td>
    //             <td>{flight.DURATION || "N/A"}</td>
    //             <td>{flight.STOPS || "N/A"}</td>
    //             <td>{flight["POWER OUTLET"] || "N/A"}</td>
    //             <td>{flight.SEATING || "N/A"}</td>
    //             <td>{flight.BEVERAGE || "N/A"}</td>
    //             <td>{flight.REFUNDABLE || "N/A"}</td>
    //             <td>{flight.MEAL || "N/A"}</td> */}
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   )}
    // </div>
    <div className="flight-container">
  {flightData.map((flight, index) => (
    <div className="flight-row" key={index}>
      <div className="AirPlaneIcon">
        <img src="/airplane.png" alt="Airplane Icon" />

        </div>
      <div className="flight-details">
        
      <div className="firstSet">
        <div className="sourceToDest">
          <div className="detail">
            {flight.SRC || "N/A"} - {flight.DEST || "N/A"}
          </div>
        </div>

        <div className="detail">
          {flight.NAME || "N/A"}
        </div>
        <div className="add-to-compare">
            Compare
            <span className="icon">+</span>
          </div>
        </div>
        <div className="detail">
          {flight.DURATION || "N/A"}
        </div>
        <div className="detail">
          {flight.STOPS || "N/A"} Stop
        </div>
        <div className="detail">
          {flight.PRICE ? `₹${flight.PRICE}` : "N/A"}
        </div>

        <div className="dropdown-container">
        <div className="dropdown-icon" onClick={() => toggleDetails(index)}>
          <span className="icon">▼</span> {/* Down arrow icon */}
        </div>
      </div>

      {expandedRow === index && (
  <div className="expanded-details">
    <div className="detail">
        <FontAwesomeIcon icon={faPlug} /> {flight["POWER OUTLET"] || "N/A"}
        </div>
        <div className="detail">
          <strong>Seating:</strong> {flight.SEATING || "N/A"}
        </div>
        <div className="detail">
        <FontAwesomeIcon icon={faCoffee} /> {flight.BEVERAGE || "N/A"}
        </div>
        <div className="detail">
          <strong>Refundable:</strong> {flight.REFUNDABLE || "N/A"}
        </div>
        <div className="detail">
        <FontAwesomeIcon icon={faUtensils} /> {flight.MEAL || "N/A"}
        </div>
  </div>
)}
        
        
      </div>
    </div>
  ))}
</div>

  );
};

export default Flight;
