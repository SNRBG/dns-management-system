import React from "react";
import "../styles/components.css";

const RecordList = ({ records, onEdit, onDelete }) => {
  const getDNSTypeColor = (type) => {
    const colors = {
      A: "#3498db",
      AAAA: "#9b59b6",
      CNAME: "#e74c3c",
      MX: "#f39c12",
      TXT: "#1abc9c",
      NS: "#2ecc71",
      SOA: "#34495e",
    };
    return colors[type] || "#95a5a6";
  };

  const getDNSTypeIcon = (type) => {
    const icons = {
      A: "🔤",
      AAAA: "🔤",
      CNAME: "🔗",
      MX: "📧",
      TXT: "📝",
      NS: "🌐",
      SOA: "🏛️",
    };
    return icons[type] || "📋";
  };

  return (
    <div className="records-container">
      <div className="records-grid">
        {records.map((record) => (
          <div key={record._id} className="record-card">
            <div className="record-header">
              <div className="record-type-badge" style={{ backgroundColor: getDNSTypeColor(record.type) }}>
                {getDNSTypeIcon(record.type)} {record.type}
              </div>
              <div className="record-actions">
                <button
                  onClick={() => onEdit(record)}
                  className="btn btn-sm btn-edit"
                  title="Edit record"
                >
                  ✏️
                </button>
                <button
                  onClick={() => onDelete(record._id)}
                  className="btn btn-sm btn-delete"
                  title="Delete record"
                >
                  🗑️
                </button>
              </div>
            </div>

            <div className="record-body">
              <div className="record-field">
                <span className="label">Domain:</span>
                <span className="value">{record.domain}</span>
              </div>

              <div className="record-field">
                <span className="label">Value:</span>
                <span className="value monospace">{record.value}</span>
              </div>

              <div className="record-field">
                <span className="label">TTL:</span>
                <span className="value">{record.ttl} seconds</span>
              </div>

              {record.priority !== undefined && (
                <div className="record-field">
                  <span className="label">Priority:</span>
                  <span className="value">{record.priority}</span>
                </div>
              )}

              <div className="record-field">
                <span className="label">Created:</span>
                <span className="value">
                  {new Date(record.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecordList;
