import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { dnsService } from "../services/api";
import RecordForm from "../components/RecordForm";
import RecordList from "../components/RecordList";
import "../styles/dashboard.css";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterDomain, setFilterDomain] = useState("");
  const [filterType, setFilterType] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  fetchRecords();
}, [filterDomain, filterType]);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await dnsService.getRecords(filterDomain, filterType);
      setRecords(response.data.records || []);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch records");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRecord = async (formData) => {
    try {
      setError("");
      await dnsService.createRecord(
        formData.domain,
        formData.type,
        formData.value,
        formData.ttl,
        formData.priority
      );
      setSuccess("DNS record created successfully!");
      setShowForm(false);
      fetchRecords();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create record");
    }
  };

  const handleUpdateRecord = async (id, formData) => {
    try {
      setError("");
      await dnsService.updateRecord(id, {
        value: formData.value,
        ttl: formData.ttl,
        priority: formData.priority,
      });
      setSuccess("DNS record updated successfully!");
      setEditingId(null);
      setShowForm(false);
      fetchRecords();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update record");
    }
  };

  const handleDeleteRecord = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      setError("");
      await dnsService.deleteRecord(id);
      setSuccess("DNS record deleted successfully!");
      fetchRecords();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete record");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🌐 DNS Management System</h1>
          <div className="header-user">
            <span className="user-name">{user?.name}</span>
            <button onClick={handleLogout} className="btn btn-logout">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Alerts */}
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {/* Controls */}
        <div className="controls-section">
          <div className="filters">
            <input
              type="text"
              placeholder="Filter by domain..."
              value={filterDomain}
              onChange={(e) => setFilterDomain(e.target.value)}
              className="filter-input"
            />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="">All Types</option>
              <option value="A">A</option>
              <option value="AAAA">AAAA</option>
              <option value="CNAME">CNAME</option>
              <option value="MX">MX</option>
              <option value="TXT">TXT</option>
              <option value="NS">NS</option>
              <option value="SOA">SOA</option>
            </select>
          </div>

          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
            }}
            className="btn btn-primary"
          >
            {showForm ? "Cancel" : "+ Add DNS Record"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <RecordForm
            onSubmit={(data) => {
              if (editingId) {
                handleUpdateRecord(editingId, data);
              } else {
                handleCreateRecord(data);
              }
            }}
            isEditing={!!editingId}
          />
        )}

        {/* Records List */}
        {loading ? (
          <div className="loading">Loading DNS records...</div>
        ) : records.length === 0 ? (
          <div className="empty-state">
            <p>No DNS records found</p>
            <button onClick={() => setShowForm(true)} className="btn btn-primary">
              Create your first record
            </button>
          </div>
        ) : (
          <RecordList
            records={records}
            onEdit={(record) => {
              setEditingId(record._id);
              setShowForm(true);
            }}
            onDelete={handleDeleteRecord}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
