import React from 'react';
import '../App.css';

function Comparison() {
  const amenities = [
    { name: 'Flight Summary', icon: '✈️' },
    { name: 'Power Outlet', icon: '🔌' },
    { name: 'Meals', icon: '🍽️' },
    { name: 'Beverages', icon: '☕' },
    { name: 'Cancellation', icon: '❌' },
    { name: 'Infotainment', icon: '📺' },
    { name: 'Check-in Bag', icon: '🛄' },
    { name: 'Seatings', icon: '💺' },
    { name: 'Pricing', icon: '💵' },
  ];

  const values = [
    'Available', 'Available', 'Included', 'Included', 'Free', 'Available', '1 Bag', 'Standard', '$500'
  ];

  const flightSummary = {
    icon: '✈️',
    takeoff: '10:00 AM',
    landing: '2:00 PM',
    stops: '1 Stop',
    duration: '4h 00m'
  };

  const startLocation = "New Delhi, India";
  const endLocation = "Barcelona, Spain";
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="App">
      <div className="blue-back">
        <div className="header">
          <h1>Compare your flights</h1>
        </div>
        <div className="selection">
          <div className="route-display">
            {/* {`${startLocation} → ${endLocation} | Departure ${currentDate}`} */}
            New Delhi, India → Barcelona, Spain | Departure Nov 18
          </div>
        </div>
      </div>
      <div className="lineonly"></div>
      <div className="main-content">
        <div className="grid-container">
          <div className="amenities">
            {amenities.map((amenity, index) => (
              <div key={index} className="amenity-item">
                <span className="icon">{amenity.icon}</span>
                <span className="name">{amenity.name}</span>
              </div>
            ))}
          </div>
          <div className="values">
            <div className="flight-summary">
              <span className="icon">{flightSummary.icon}</span>
              <span>{flightSummary.takeoff} - {flightSummary.landing}</span>
              <span>{flightSummary.stops} | {flightSummary.duration}</span>
            </div>
            {values.slice(1).map((value, index) => (
              <div key={index} className="value-item">
                {value}
              </div>
            ))}
            <div className="view-all">
              <button className="view-all-button">View All Options</button>
            </div>
          </div>
          <div className="values">
            <div className="flight-summary">
              <span className="icon">{flightSummary.icon}</span>
              <span>{flightSummary.takeoff} - {flightSummary.landing}</span>
              <span>{flightSummary.stops} | {flightSummary.duration}</span>
            </div>
            {values.slice(1).map((value, index) => (
              <div key={index} className="value-item">
                {value}
              </div>
            ))}
            <div className="view-all">
              <button className="view-all-button">View All Options</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comparison;
