import React, { useEffect, useState } from 'react';
import { getCampaignStats } from '../services/api';
import useAuth from '../hooks/useAuth';

const CampaignStatsDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getCampaignStats(user.sub);
      setStats(data);
    };
    fetchStats();
  }, [user.sub]);

  if (!stats) return <p>Loading stats...</p>;

  return (
    <div className="dashboard">
      <h2>📊 Campaign Stats</h2>
      <ul>
        <li><strong>Total Campaigns:</strong> {stats.totalCampaigns}</li>
        <li><strong>Total Audience Targeted:</strong> {stats.totalAudience}</li>
        <li><strong>Success Rate:</strong> {stats.successRate}%</li>
        <li><strong>Failure Rate:</strong> {stats.failRate}%</li>
      </ul>
      {/* You can use charts later if you want visual graphs */}
    </div>
  );
};

export default CampaignStatsDashboard;
