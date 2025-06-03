import React, { useState } from 'react';
import '../styles/RuleBuilder.css';

const RuleBuilder = ({ onRuleChange }) => {
  const [rules, setRules] = useState([{ field: 'spend', operator: '>', value: 10000 }]);

  const handleChange = (index, key, value) => {
    const updated = [...rules];
    updated[index][key] = value;
    setRules(updated);
    onRuleChange(updated);
  };

  return (
    <div className="rule-builder">
      <h3>Build Your Segment</h3>
      {rules.map((rule, idx) => (
        <div key={idx} className="rule-row">
          <select value={rule.field} onChange={e => handleChange(idx, 'field', e.target.value)}>
            <option value="spend">Spend</option>
            <option value="visits">Visits</option>
            <option value="inactiveDays">Inactive Days</option>
          </select>
          <select value={rule.operator} onChange={e => handleChange(idx, 'operator', e.target.value)}>
            <option value=">">&gt;</option>
            <option value="<">&lt;</option>
            <option value="=">=</option>
          </select>
          <input
            type="number"
            value={rule.value}
            onChange={e => handleChange(idx, 'value', e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default RuleBuilder;
