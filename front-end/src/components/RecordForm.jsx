import React, { useState } from "react";
import "../styles/components.css";

const RecordForm = ({ onSubmit, isEditing = false }) => {
  const [formData, setFormData] = useState({
    domain: "",
    type: "A",
    value: "",
    ttl: 3600,
    priority: 10,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "ttl" || name === "priority" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      setFormData({
        domain: "",
        type: "A",
        value: "",
        ttl: 3600,
        priority: 10,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="record-form">
      <h2>{isEditing ? "Update DNS Record" : "Create DNS Record"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="domain">Domain Name</label>
            <input
              type="text"
              id="domain"
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              placeholder="example.com"
              disabled={loading || isEditing}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Record Type</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              disabled={loading || isEditing}
              required
            >
              <option value="A">A</option>
              <option value="AAAA">AAAA</option>
              <option value="CNAME">CNAME</option>
              <option value="MX">MX</option>
              <option value="TXT">TXT</option>
              <option value="NS">NS</option>
              <option value="SOA">SOA</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="value">Value</label>
          <input
            type="text"
            id="value"
            name="value"
            value={formData.value}
            onChange={handleChange}
            placeholder="192.168.1.1"
            disabled={loading}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="ttl">TTL (seconds)</label>
            <input
              type="number"
              id="ttl"
              name="ttl"
              value={formData.ttl}
              onChange={handleChange}
              min="60"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <input
              type="number"
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              min="0"
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : isEditing ? "Update Record" : "Create Record"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecordForm;
