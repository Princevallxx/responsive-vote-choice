
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 bg-light">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">
            <i className="bi bi-vote-fill me-2"></i>
            VoteSecure
          </a>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link text-white"
                  onClick={() => navigate("/candidates")}
                >
                  Vote Now
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link text-white"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container-fluid bg-primary text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Secure Digital Voting Platform
              </h1>
              <p className="lead mb-4">
                Cast your vote safely and securely in the upcoming election. 
                Your voice matters, and we ensure it's heard with complete transparency and security.
              </p>
              <div className="d-flex gap-3">
                <button 
                  className="btn btn-light btn-lg px-4"
                  onClick={() => navigate("/candidates")}
                >
                  Start Voting
                </button>
                <button 
                  className="btn btn-outline-light btn-lg px-4"
                  onClick={() => navigate("/situation-room")}
                >
                  View Results
                </button>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div className="bg-white rounded shadow-lg p-4 d-inline-block">
                <i className="bi bi-shield-check text-primary" style={{fontSize: '8rem'}}></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-5">
        <div className="row text-center mb-5">
          <div className="col">
            <h2 className="fw-bold mb-3">Why Choose VoteSecure?</h2>
            <p className="text-muted">Experience the future of democratic participation</p>
          </div>
        </div>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <i className="bi bi-lock-fill text-primary mb-3" style={{fontSize: '3rem'}}></i>
                <h5 className="card-title">Secure & Private</h5>
                <p className="card-text">
                  End-to-end encryption ensures your vote remains private and secure.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <i className="bi bi-speedometer2 text-primary mb-3" style={{fontSize: '3rem'}}></i>
                <h5 className="card-title">Fast & Efficient</h5>
                <p className="card-text">
                  Quick and easy voting process that takes just minutes to complete.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <i className="bi bi-graph-up text-primary mb-3" style={{fontSize: '3rem'}}></i>
                <h5 className="card-title">Real-time Results</h5>
                <p className="card-text">
                  View live election results and track voting progress in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-light py-5">
        <div className="container text-center">
          <h3 className="fw-bold mb-3">Ready to Make Your Voice Heard?</h3>
          <p className="text-muted mb-4">Join thousands of citizens participating in secure digital voting</p>
          <button 
            className="btn btn-primary btn-lg px-5"
            onClick={() => navigate("/candidates")}
          >
            Vote Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h6 className="fw-bold">VoteSecure</h6>
              <p className="small mb-0">Secure Election System</p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="small mb-0">&copy; 2024 VoteSecure. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
