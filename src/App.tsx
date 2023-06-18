import React, { useState } from 'react';
import './style.css';

const DonationTracker = () => {
  const [donations, setDonations] = useState([]);
  const [newDonation, setNewDonation] = useState({ person: '', amount: '' });
  const [donorList, setDonorList] = useState([]);
  const [newDonor, setNewDonor] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewDonation((prevDonation) => ({
      ...prevDonation,
      [name]: value,
    }));
  };

  const handleAddDonation = () => {
    if (newDonation.person.trim() !== '' && newDonation.amount.trim() !== '') {
      setDonations([...donations, { ...newDonation, amount: parseFloat(newDonation.amount) }]);
      setNewDonation({ person: newDonation.person, amount: '' });
      if (!donorList.includes(newDonation.person)) {
        setDonorList([...donorList, newDonation.person]);
      }
    }
  };

  const handlePersonSelection = (selectedPerson) => {
    setNewDonation((prevDonation) => ({
      ...prevDonation,
      person: selectedPerson,
    }));
  };

  const handleNewDonorInputChange = (event) => {
    setNewDonor(event.target.value);
  };

  const handleAddNewDonor = () => {
    if (newDonor.trim() !== '') {
      setDonorList([...donorList, newDonor]);
      setNewDonation((prevDonation) => ({
        ...prevDonation,
        person: newDonor,
      }));
      setNewDonor('');
    }
  };

  const getTotalDonations = () => {
    return donations.reduce((total, donation) => total + donation.amount, 0);
  };

  const getDonationAmountByPerson = (person) => {
    const personDonations = donations.filter((donation) => donation.person === person);
    return personDonations.reduce((total, donation) => total + donation.amount, 0);
  };

  return (
    <div>
      <h2>Church Donation Tracker</h2>
      <div>
        <select
          name="person"
          value={newDonation.person}
          onChange={handleInputChange}
          placeholder="Select or enter donor's name"
        >
          <option value="">Select donor</option>
          {donorList.map((donor, index) => (
            <option key={index} value={donor}>
              {donor}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="amount"
          value={newDonation.amount}
          onChange={handleInputChange}
          placeholder="Enter donation amount"
        />
        <button onClick={handleAddDonation}>Add Donation</button>
      </div>
      <div>
        <h3>Total Donations:</h3>
        <p>${getTotalDonations()}</p>
      </div>
      <div>
        <h3>Previous Donors:</h3>
        <ul>
          {donorList.map((donor, index) => (
            <li
              key={index}
              onClick={() => handlePersonSelection(donor)}
              className={newDonation.person === donor ? 'selected' : ''}
            >
              {donor} - ${getDonationAmountByPerson(donor)}
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newDonor}
          onChange={handleNewDonorInputChange}
          placeholder="Add a new donor"
        />
        <button onClick={handleAddNewDonor}>Add Donor</button>
      </div>
    </div>
  );
};

export default DonationTracker;
