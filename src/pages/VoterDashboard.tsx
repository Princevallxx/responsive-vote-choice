
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Vote, 
  CheckCircle, 
  Clock, 
  MapPin, 
  User,
  Calendar,
  FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const VoterDashboard = () => {
  const navigate = useNavigate();
  const [voterInfo] = useState({
    name: "John Doe",
    voterId: "VID-2024-001234",
    pollingStation: "Central Community Center",
    address: "123 Main St, Downtown District",
    hasVoted: false,
    registrationDate: "2024-01-15"
  });

  const [electionInfo] = useState({
    electionDate: "November 5, 2024",
    pollingHours: "6:00 AM - 8:00 PM",
    positions: [
      { title: "President", candidates: 3 },
      { title: "Vice President", candidates: 2 },
      { title: "U.S. Senator", candidates: 3 }
    ]
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const userType = localStorage.getItem("userType");
    
    if (!isAuthenticated || userType !== "voter") {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleStartVoting = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Vote className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Voter Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {voterInfo.name}</span>
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Voting Status */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {voterInfo.hasVoted ? (
                <CheckCircle className="h-12 w-12 text-green-600" />
              ) : (
                <Clock className="h-12 w-12 text-blue-600" />
              )}
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {voterInfo.hasVoted ? "Vote Submitted" : "Ready to Vote"}
                </h2>
                <p className="text-gray-600">
                  {voterInfo.hasVoted 
                    ? "Thank you for participating in the democratic process" 
                    : "You are eligible to vote in the upcoming election"
                  }
                </p>
              </div>
            </div>
            {!voterInfo.hasVoted && (
              <Button onClick={handleStartVoting} size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Voting
              </Button>
            )}
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Voter Information */}
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <User className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Your Information</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-medium text-gray-900">{voterInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Voter ID</p>
                <p className="font-medium text-gray-900">{voterInfo.voterId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Registration Date</p>
                <p className="font-medium text-gray-900">{voterInfo.registrationDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <Badge className="bg-green-100 text-green-800">Active Voter</Badge>
              </div>
            </div>
          </Card>

          {/* Polling Information */}
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <MapPin className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Polling Location</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Polling Station</p>
                <p className="font-medium text-gray-900">{voterInfo.pollingStation}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-medium text-gray-900">{voterInfo.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Hours</p>
                <p className="font-medium text-gray-900">{electionInfo.pollingHours}</p>
              </div>
              <Button variant="outline" size="sm" className="mt-2">
                <MapPin className="h-4 w-4 mr-1" />
                Get Directions
              </Button>
            </div>
          </Card>

          {/* Election Information */}
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Calendar className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Election Details</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Election Date</p>
                <p className="font-medium text-gray-900">{electionInfo.electionDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Positions to Vote</p>
                <div className="mt-2 space-y-1">
                  {electionInfo.positions.map((position, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-900">{position.title}</span>
                      <span className="text-gray-600">{position.candidates} candidates</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Voting Guide */}
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <FileText className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Voting Guide</h3>
            </div>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</div>
                <p>Review all candidates and positions before voting</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</div>
                <p>Select one candidate per position</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</div>
                <p>Review your selections before submitting</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</div>
                <p>Submit your ballot to complete voting</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-4 w-full">
              Download Voter Guide (PDF)
            </Button>
          </Card>
        </div>

        {/* Important Notice */}
        <Card className="p-6 mt-8 bg-blue-50 border-blue-200">
          <div className="flex items-start">
            <FileText className="h-6 w-6 text-blue-600 mr-3 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Important Voting Information</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Bring a valid photo ID to your polling station</li>
                <li>• Polls close at 8:00 PM - arrive early to avoid long lines</li>
                <li>• If you experience any issues, contact poll workers immediately</li>
                <li>• Your vote is secret and secure</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VoterDashboard;
