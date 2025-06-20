import React, { useState, useEffect } from 'react'


import GiveMoneyForm from './GiveMoneyForm';
import GiveMoneyCard from './GiveMoneyCard';

function GiveMoney({ userId, refreshData, refreshFlag}) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',   // Required
    giveTo: '', // Required
    date: '',
    interest: '',
    interestPeriod: '',
    reason: ''
  });

  const [AllData, setAllData] = useState(null)
    
  useEffect(() => {
    fetch('http://localhost:3000/user/fetch-givemoney', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId }),
      credentials: 'include'  // send the cookie
    })
    .then(async res => {
      const data = await res.json();
      setAllData(data.records); 
    })
    .catch(err => console.error('Error:', err));
  }, [userId, refreshFlag])

  const handleAddGiveMoney = () => {
    setShowForm(true);
  }

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className='record-list-div'>
      <p className='take-heading' onClick={handleAddGiveMoney}>
        GiveMoney <span className='take-plus'>+</span>
      </p>
      {showForm && (
        <div className="overlayForm">
          <GiveMoneyForm onClose={handleCloseForm} formData={formData} setFormData={setFormData} userId={userId} refreshData={refreshData}/>
        </div>
      )}
      {AllData && 
        AllData.map((data) => (
          <GiveMoneyCard key={data._id} Amt={data.amount} GiveTo={data.giveTo} Date={data.date} Interest={data.interest} Period={data.interestPeriod} Reason={data.reason}/>
      ))}
    </div>
  )
}

export default GiveMoney