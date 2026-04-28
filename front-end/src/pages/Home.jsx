import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/home.css";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>🌐 DNS Management System</h1>
        <p className="tagline">Manage your DNS records with ease</p>
      </header>

      <main className="home-main">
        <section className="hero">
          <div className="hero-content">
            <h2>Welcome to DNS Management</h2>
            <p>
              A powerful and intuitive system for managing all your DNS records.
              Create, edit, and delete DNS records with just a few clicks.
            </p>
            {isAuthenticated ? (
              <button onClick={() => navigate("/dashboard")} className="btn btn-primary btn-lg">
                Go to Dashboard
              </button>
            ) : (
              <div className="cta-buttons">
                <button onClick={() => navigate("/register")} className="btn btn-primary btn-lg">
                  Get Started
                </button>
                <button onClick={() => navigate("/login")} className="btn btn-secondary btn-lg">
                  Sign In
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="features">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3>Secure</h3>
              <p>Your data is protected with JWT authentication and encrypted connections.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast</h3>
              <p>Lightning-quick DNS record operations with instant updates.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Responsive</h3>
              <p>Works perfectly on desktop, tablet, and mobile devices.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>User-Friendly</h3>
              <p>Intuitive interface that anyone can use without technical knowledge.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
