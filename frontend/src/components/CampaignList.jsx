import React from 'react';
import '../styles/CampaignList.css';

const CampaignList = ({ campaigns = [] }) => {
  return (
    <div className="campaign-list">
      <h2>Past Campaigns</h2>
      {campaigns.length === 0 ? <p>No campaigns found.</p> : (
        <ul>
          {campaigns.map((c, i) => (
            <li key={i}>
              <strong>{c.name}</strong> - Sent: {c.sent} | Failed: {c.failed} | Audience: {c.audienceSize}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CampaignList;