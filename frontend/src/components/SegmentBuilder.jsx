import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import {
  createSegment,
  previewSegment,
  getAllSegments,
  updateSegment,
  deleteSegment
} from '../api/segmentApi';
import '../styles/SegmentBuilder.css';

const SegmentBuilder = ({ onSegmentChange }) => { // ✅ Accept prop
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [rules, setRules] = useState({ age: '', gender: '', location: '', interest: '' });
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const getSegments = async () => {
    try {
      setLoading(true);
      const res = await getAllSegments(user.sub);
      setSegments(res);
    } catch (err) {
      console.error('Error fetching segments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) getSegments();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const segmentData = { name, rules, userId: user.sub };

      let result;
      if (editingId) {
        result = await updateSegment(editingId, segmentData);
        setSegments(segments.map(s => (s._id === editingId ? result : s)));
        setEditingId(null);
      } else {
        result = await createSegment(segmentData);
        setSegments([...segments, result]);
      }

      // ✅ Trigger stat refresh
      if (onSegmentChange) onSegmentChange();

      setName('');
      setRules({ age: '', gender: '', location: '', interest: '' });
    } catch (err) {
      console.error('Error saving segment:', err);
    }
  };

  const handleEdit = (segment) => {
    setName(segment.name);
    setRules(segment.rules);
    setEditingId(segment._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteSegment(id);
      setSegments(segments.filter(s => s._id !== id));

      // ✅ Trigger stat refresh
      if (onSegmentChange) onSegmentChange();
    } catch (err) {
      console.error('Error deleting segment:', err);
    }
  };

  return (
    <div className="segment-builder">
      <h2>{editingId ? 'Edit Segment' : 'Create Segment'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Segment Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Age Group (e.g., 18-25)"
          value={rules.age}
          onChange={(e) => setRules({ ...rules, age: e.target.value })}
        />
        <input
          type="text"
          placeholder="Gender"
          value={rules.gender}
          onChange={(e) => setRules({ ...rules, gender: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={rules.location}
          onChange={(e) => setRules({ ...rules, location: e.target.value })}
        />
        <input
          type="text"
          placeholder="Interest"
          value={rules.interest}
          onChange={(e) => setRules({ ...rules, interest: e.target.value })}
        />
        <button type="submit">{editingId ? 'Update Segment' : 'Save Segment'}</button>
      </form>

      <hr />

      <h3>Saved Segments</h3>
      {loading ? (
        <p>Loading...</p>
      ) : segments.length === 0 ? (
        <p>No segments found.</p>
      ) : (
        <ul>
          {segments.map((seg) => (
            <li key={seg._id}>
              <strong>{seg.name}</strong> - Age: {seg.rules.age}, Gender: {seg.rules.gender}, Location: {seg.rules.location}, Interest: {seg.rules.interest}
              <div>
                <button onClick={() => handleEdit(seg)}>Edit</button>
                <button onClick={() => handleDelete(seg._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SegmentBuilder;
