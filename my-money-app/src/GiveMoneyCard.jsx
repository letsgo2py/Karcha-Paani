import React from 'react'

function GiveMoneyCard({ Amt, GiveTo, Date, Interest, Period, Reason }) {
  return (
    <div className='take-money-card give-money-card'>
      <p>💸 Take Rs.{Amt} from {GiveTo}</p>
      {Date && <p>📅 You took on {Date.slice(0, 10)}</p>}
      {Interest && <p>📈 Interest: {Interest}%, {Period}</p>}
      {Reason && <p>🤔 Reason: "{Reason}"</p>}
    </div>
  )
}

export default GiveMoneyCard