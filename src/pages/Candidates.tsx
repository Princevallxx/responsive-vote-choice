
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Candidates = () => {
  const navigate = useNavigate();
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [showSummary, setShowSummary] = useState(false);

  const positions = [
    {
      id: "president",
      title: "President",
      description: "Chief Executive Officer of the nation",
      candidates: [
        {
          id: "pres1",
          name: "Alexandra Chen",
          party: "Democratic Party",
          image: "https://images.unsplash.com/photo-1494790108755-2616b612b830?w=150&h=150&fit=crop&crop=face",
          experience: "Former Governor, 12 years in public service"
        },
        {
          id: "pres2", 
          name: "Marcus Johnson",
          party: "Republican Party",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          experience: "Business Leader, Former Mayor"
        },
        {
          id: "pres3",
          name: "Sarah Rodriguez",
          party: "Independent",
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          experience: "Environmental Lawyer, Community Organizer"
        }
      ]
    },
    {
      id: "vicepresident",
      title: "Vice President",
      description: "Second-in-command and Senate President",
      candidates: [
        {
          id: "vp1",
          name: "David Kim",
          party: "Democratic Party",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          experience: "Senator, Former Attorney General"
        },
        {
          id: "vp2",
          name: "Jennifer Walsh",
          party: "Republican Party", 
          image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
          experience: "Congresswoman, Healthcare Advocate"
        }
      ]
    },
    {
      id: "senator",
      title: "U.S. Senator",
      description: "Representative in the Upper Chamber of Congress",
      candidates: [
        {
          id: "sen1",
          name: "Robert Thompson",
          party: "Democratic Party",
          image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
          experience: "State Senator, Education Reform Leader"
        },
        {
          id: "sen2",
          name: "Maria Garcia",
          party: "Republican Party",
          image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
          experience: "Former Judge, Constitutional Scholar"
        },
        {
          id: "sen3",
          name: "James Wilson",
          party: "Green Party",
          image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
          experience: "Environmental Scientist, Policy Expert"
        }
      ]
    }
  ];

  const handleVote = (positionId: string, candidateId: string) => {
    setVotes(prev => ({
      ...prev,
      [positionId]: candidateId
    }));
  };

  const handleSubmitVotes = () => {
    if (Object.keys(votes).length === 0) {
      alert("Please select at least one candidate before submitting.");
      return;
    }
    
    setShowSummary(true);
    alert(`Votes submitted successfully! You have cast ${Object.keys(votes).length} vote(s).`);
  };

  const getPartyBadgeClass = (party: string) => {
    switch (party.toLowerCase()) {
      case 'democratic party':
        return 'badge bg-primary';
      case 'republican party':
        return 'badge bg-danger';
      case 'green party':
        return 'badge bg-success';
      case 'independent':
        return 'badge bg-secondary';
      default:
        return 'badge bg-secondary';
    }
  };

  const completedVotes = Object.keys(votes).length;
  const totalPositions = positions.length;

  if (showSummary) {
    return (
      <div className="min-vh-100 bg-light">
        <nav className="navbar navbar-dark bg-primary">
          <div className="container">
            <span className="navbar-brand">
              <i className="bi bi-vote-fill me-2"></i>
              VoteSecure - Vote Summary
            </span>
            <button 
              className="btn btn-outline-light"
              onClick={() => navigate("/")}
            >
              Home
            </button>
          </div>
        </nav>

        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow">
                <div className="card-header bg-success text-white text-center">
                  <h3 className="mb-0">
                    <i className="bi bi-check-circle me-2"></i>
                    Vote Summary
                  </h3>
                </div>
                <div className="card-body">
                  <div className="alert alert-success">
                    <strong>Success!</strong> Your votes have been recorded securely.
                  </div>
                  
                  {positions.map((position) => {
                    const selectedCandidateId = votes[position.id];
                    const selectedCandidate = selectedCandidateId 
                      ? position.candidates.find(c => c.id === selectedCandidateId)
                      : null;
                    
                    return (
                      <div key={position.id} className="mb-4">
                        <h5 className="fw-bold">{position.title}</h5>
                        {selectedCandidate ? (
                          <div className="d-flex align-items-center">
                            <img 
                              src={selectedCandidate.image} 
                              alt={selectedCandidate.name}
                              className="rounded-circle me-3"
                              width="50"
                              height="50"
                            />
                            <div>
                              <strong>{selectedCandidate.name}</strong>
                              <br />
                              <span className={getPartyBadgeClass(selectedCandidate.party)}>
                                {selectedCandidate.party}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <p className="text-muted">No vote cast</p>
                        )}
                      </div>
                    );
                  })}

                  <div className="text-center mt-4">
                    <button 
                      className="btn btn-primary me-3"
                      onClick={() => { setShowSummary(false); setVotes({}); }}
                    >
                      Vote Again
                    </button>
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => navigate("/")}
                    >
                      Return Home
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      {/* Navigation */}
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand">
            <i className="bi bi-vote-fill me-2"></i>
            VoteSecure - Cast Your Vote
          </span>
          <div>
            <button 
              className="btn btn-outline-light me-2"
              onClick={() => navigate("/")}
            >
              Home
            </button>
            <button 
              className="btn btn-outline-light"
              onClick={() => navigate("/situation-room")}
            >
              Results
            </button>
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="bg-white border-bottom">
        <div className="container py-3">
          <div className="d-flex align-items-center">
            <span className="me-3 fw-bold">Progress:</span>
            <div className="progress flex-grow-1 me-3">
              <div 
                className="progress-bar bg-primary"
                style={{ width: `${(completedVotes / totalPositions) * 100}%` }}
              ></div>
            </div>
            <span className="text-muted">{completedVotes}/{totalPositions}</span>
          </div>
        </div>
      </div>

      {/* Voting Content */}
      <div className="container py-4">
        {positions.map((position) => (
          <div key={position.id} className="card mb-4 shadow-sm">
            <div className="card-header">
              <h4 className="mb-1">{position.title}</h4>
              <p className="mb-0 text-muted">{position.description}</p>
              <small className="text-primary">
                Select one candidate • {votes[position.id] ? "Vote Cast" : "No vote yet"}
              </small>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {position.candidates.map((candidate) => {
                  const isSelected = votes[position.id] === candidate.id;
                  return (
                    <div key={candidate.id} className="col-md-6 col-lg-4">
                      <div className={`card h-100 ${isSelected ? 'border-primary bg-light' : ''}`}>
                        <div className="card-body text-center">
                          <div className="position-relative mb-3">
                            <img
                              src={candidate.image}
                              alt={candidate.name}
                              className="rounded-circle border"
                              width="80"
                              height="80"
                            />
                            {isSelected && (
                              <i className="bi bi-check-circle-fill text-success position-absolute top-0 end-0"></i>
                            )}
                          </div>
                          
                          <h6 className="fw-bold">{candidate.name}</h6>
                          <span className={getPartyBadgeClass(candidate.party)}>
                            {candidate.party}
                          </span>
                          
                          <p className="small text-muted mt-2 mb-3">
                            {candidate.experience}
                          </p>
                          
                          <button
                            className={`btn w-100 ${isSelected ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => handleVote(position.id, candidate.id)}
                          >
                            {isSelected ? 'Selected' : `Vote for ${candidate.name.split(' ')[0]}`}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        {/* Submit Section */}
        <div className="text-center">
          <div className="card bg-primary text-white shadow">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-center mb-3">
                <i className="bi bi-check-circle me-2 fs-4"></i>
                <span className="fs-5 fw-bold">
                  {completedVotes} of {totalPositions} positions completed
                </span>
              </div>
              
              <button 
                className="btn btn-light btn-lg px-5"
                onClick={handleSubmitVotes}
              >
                Submit My Votes
              </button>
              
              {completedVotes < totalPositions && (
                <p className="small mt-2 mb-0 opacity-75">
                  You can submit partial votes or complete all positions
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Candidates;
