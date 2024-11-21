import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlug, faUtensils,faCoffee } from '@fortawesome/free-solid-svg-icons';
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Comparison  from "./Comparison";
import Papa from "papaparse";
import "../styles/flight.css"; // Optional: For component-specific styles

const Flight = () => {
  const navigate = useNavigate();
  const [flightData, setFlightData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [compareList, setCompareList] = useState([]);

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
  const handleCompareClick = () => {
    if (compareList.length >= 2) {
      // Navigate to the comparison page
      // Replace `/comparison` with the actual route for the comparison page in your app
      const comparisonData = {
        flights: compareList,
      };
      console.log("Navigating to comparison page with data:", comparisonData);
  
      // If you're using React Router:
      // useNavigate can be used for programmatic navigation
      navigate("/comparison", { state: comparisonData });
    } else {
      alert("Please add at least two flights to compare.");
    }
  };

  const handleAddToCompare = (flight) => {
    if (compareList.length < 2) {
      if (!compareList.includes(flight)) {
        setCompareList([...compareList, flight]);
      }
    } else {
      alert('You can only compare two flights at a time.');
    }
  };
  // const handleCompareClick = () => {
  //   // Static navigation, no need to pass data
  //   // navigate("/comparison");
  //   <Comparison/>
  // };

  // Remove a flight from the compare list
  const handleRemoveFromCompare = (flight) => {
    setCompareList(compareList.filter((item) => item !== flight));
  };


  return (
    <div>
      {/* <div className="navBar">
        <div className="pacifico-regular navTitle">Flights</div>
      </div> */}
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
        {/* <div className="add-to-compare">
            Compare
            <span className="icon">+</span>
          </div> */}
          <div
                className="add-to-compare"
                onClick={() => handleAddToCompare(flight)}
                style={{ cursor: 'pointer', color: compareList.includes(flight) ? 'green' : 'white' }}
              >
                {compareList.includes(flight) ? 'Added' : 'Add to Compare'}
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
  <div className="compare-container">
        <h3>Compare Flights</h3>
        {compareList.length === 0 ? (
          <p>No flights added to compare.</p>
        ) : (
          <div className="compare-list">
            {compareList.map((flight, index) => (
              <div className="compare-item" key={index}>
                <div>
                  <strong>{flight.NAME}</strong> ({flight.SRC} → {flight.DEST})
                </div>
                {/* <div>Duration: {flight.DURATION}</div>
                <div>Stops: {flight.STOPS}</div>
                <div>Price: ₹{flight.PRICE}</div> */}
                <button onClick={() => handleRemoveFromCompare(flight)}>Remove</button>
              </div>
            ))}
          </div>
        )}
        <button
  className="compare-button"
  onClick={handleCompareClick} // Removed the extra parentheses
  disabled={compareList.length < 2} // Disable if less than 2 items
>
  Compare
</button>
      </div>
</div>
</div>

  );
};

export default Flight;
