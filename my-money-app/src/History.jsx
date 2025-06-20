import React, { useEffect, useState } from 'react'

function History({ userId }) {
  const [historyData, setHistoryData] = useState([])

  useEffect(() => {
    // Define the async function inside useEffect
    const fetchHistory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/history/${userId}`, {
          method: 'GET',
          credentials: 'include' // send cookies 
        });

        if (!response.ok) {
          throw new Error('Failed to fetch history');
        }

        const data = await response.json();
        setHistoryData(data.records);
      } catch (err) {
        console.error('Error fetching history:', err);
      }
    };

    fetchHistory();
  }, [userId]); 

  return (
    <div className='history-div'>
      <h2>History</h2>
      {/* {historyData.length === 0 ? (
        <p>No marked data found.</p>
      ) : (
        <ul>
          {historyData.map((item) => (
            <li key={item._id}>
              ₹{item.amount} - {item.category} ({item.date?.slice(0, 10)})
            </li>
          ))}
        </ul>
      )} */}
    </div>
  )
}

export default History