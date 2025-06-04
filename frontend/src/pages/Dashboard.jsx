import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllSegments } from '../api/segmentApi'; 

import useAuth from '../hooks/useAuth';
import SegmentBuilder from '../components/SegmentBuilder';
import CampaignList from '../components/CampaignList';
import CampaignForm from '../components/CampaignForm'; 
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user, handleLogout } = useAuth();

  const [stats, setStats] = useState({
    totalCampaigns: 0,
    totalAudience: 0,
    successRate: 0,
    failRate: 0,
    totalSegments: 0,
  });

  const [campaigns, setCampaigns] = useState([]);  
  const [showForm, setShowForm] = useState(false); 
 

const fetchStats = async () => {
  try {
    const res = await axios.get(`/api/campaigns/stats/${user.sub}`);
    const segments = await getAllSegments(user.sub);

    setStats({
      totalCampaigns: res.data.totalCampaigns,
      totalAudience: res.data.totalAudience,
      successRate: res.data.successRate,
      failRate: res.data.failRate,
      totalSegments: segments.length,
    });

    //  Save fetched campaigns
    setCampaigns(res.data.campaigns);
  } catch (err) {
    console.error('Failed to fetch campaign stats', err);
  }
};


  const fetchCampaigns = async () => {
    try {
      const res = await axios.get(`/api/campaigns/${user.sub}`);
      setCampaigns(res.data);
    } catch (err) {
      console.error('Failed to fetch campaigns', err);
    }
  };

  useEffect(() => {
    if (user?.sub) {
      fetchStats();
      fetchCampaigns();
    }
  }, [user]);

  const [aiInsights, setAiInsights] = useState('');
  const [loadingInsights, setLoadingInsights] = useState(false);

  const fetchAIInsights = async () => {
    try {
      setLoadingInsights(true);
      const res = await axios.post('/api/insights/generate', { userId: user.sub });
      setAiInsights(res.data.insights);
    } catch (err) {
      console.error('Failed to fetch AI insights', err);
      setAiInsights('No insights available.');
    } finally {
      setLoadingInsights(false);
    }
  };

  useEffect(() => {
    if (user) fetchAIInsights();
  }, [user]);

  const handleCampaignCreated = async () => {
    await fetchStats();      // Update dashboard numbers
    await fetchCampaigns();  // Update campaign list
    await fetchAIInsights(); // Refresh insights
    setShowForm(false);      // Hide form
  };

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <div className="user-info">
          <h1>Welcome, {user?.name}</h1>
          <p>{user?.email}</p>
        </div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>

      <section className="stats-overview">
        <div className="stat-card">
          <h3>Total Campaigns</h3>
          <p>{stats.totalCampaigns}</p>
        </div>
        <div className="stat-card">
          <h3>Segments Created</h3>
          <p>{stats.totalSegments}</p>
        </div>
        <div className="stat-card">
          <h3>Audience Reached</h3>
          <p>{stats.totalAudience}</p>
        </div>
        <div className="stat-card">
          <h3>Success / Fail %</h3>
          <p>{stats.successRate}% / {stats.failRate}%</p>
        </div>
      </section>

      <section className="segment-builder-section">
        <h2>Segment Builder</h2>
        <SegmentBuilder onSegmentChange={fetchStats} />
      </section>

      <section className="campaigns-section">
        <div className="campaigns-header">
          <h2>Past Campaigns</h2>
          <button className="new-campaign-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ New Campaign'}
          </button>
        </div>

        {showForm && (
          <CampaignForm onCampaignCreated={handleCampaignCreated} />
        )}

        <CampaignList campaigns={campaigns} />
      </section>

      <section className="ai-insight-section">
        <div className="ai-insight-header">
          <h2>Smart AI Insights</h2>
          <button className="refresh-ai-btn" onClick={fetchAIInsights}>🔄 Refresh</button>
        </div>
        {loadingInsights ? (
          <p>Generating insights...</p>
        ) : (
          <div className="ai-box">
            {aiInsights
              ? aiInsights.split('\n').map((line, i) => (
                  <p key={i}>• {line.trim()}</p>
                ))
              : <p>No insights available.</p>}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
