
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone, 
  RefreshCw,
  Users,
  Wifi,
  WifiOff
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PollingStation {
  id: string;
  name: string;
  location: string;
  status: "operational" | "warning" | "offline";
  votesRecorded: number;
  expectedVoters: number;
  lastUpdate: string;
  issues?: string;
}

const SituationRoom = () => {
  const navigate = useNavigate();
  const [refreshing, setRefreshing] = useState(false);
  const [pollingStations] = useState<PollingStation[]>([
    {
      id: "PS001",
      name: "Central Community Center",
      location: "Downtown District",
      status: "operational",
      votesRecorded: 342,
      expectedVoters: 450,
      lastUpdate: "2 minutes ago"
    },
    {
      id: "PS002", 
      name: "Westside Elementary",
      location: "West District",
      status: "warning",
      votesRecorded: 156,
      expectedVoters: 380,
      lastUpdate: "15 minutes ago",
      issues: "Slow network connectivity"
    },
    {
      id: "PS003",
      name: "North High School",
      location: "North District", 
      status: "operational",
      votesRecorded: 289,
      expectedVoters: 520,
      lastUpdate: "1 minute ago"
    },
    {
      id: "PS004",
      name: "South Recreation Center",
      location: "South District",
      status: "offline",
      votesRecorded: 98,
      expectedVoters: 290,
      lastUpdate: "45 minutes ago",
      issues: "Equipment malfunction reported"
    }
  ]);

  const [alerts] = useState([
    {
      id: 1,
      type: "warning",
      message: "Polling Station PS002 experiencing slow connectivity",
      timestamp: "10:15 AM"
    },
    {
      id: 2,
      type: "critical",
      message: "Polling Station PS004 offline - technical team dispatched",
      timestamp: "9:45 AM"
    },
    {
      id: 3,
      type: "info",
      message: "Peak voting hours approaching - monitor capacity",
      timestamp: "9:30 AM"
    }
  ]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const userType = localStorage.getItem("userType");
    
    if (!isAuthenticated || userType !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case "offline":
        return <WifiOff className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "offline":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const operationalStations = pollingStations.filter(ps => ps.status === "operational").length;
  const warningStations = pollingStations.filter(ps => ps.status === "warning").length;
  const offlineStations = pollingStations.filter(ps => ps.status === "offline").length;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="bg-red-600 w-3 h-3 rounded-full mr-3 animate-pulse"></div>
              <h1 className="text-xl font-bold">ELECTION SITUATION ROOM</h1>
              <Badge className="ml-4 bg-green-600">LIVE</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleRefresh} 
                variant="outline" 
                size="sm"
                disabled={refreshing}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button 
                onClick={() => navigate("/admin")} 
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gray-800 border-gray-700 p-4">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div className="ml-3">
                <p className="text-sm text-gray-400">Operational</p>
                <p className="text-2xl font-bold text-white">{operationalStations}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700 p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
              <div className="ml-3">
                <p className="text-sm text-gray-400">Warning</p>
                <p className="text-2xl font-bold text-white">{warningStations}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700 p-4">
            <div className="flex items-center">
              <WifiOff className="h-8 w-8 text-red-500" />
              <div className="ml-3">
                <p className="text-sm text-gray-400">Offline</p>
                <p className="text-2xl font-bold text-white">{offlineStations}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700 p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <div className="ml-3">
                <p className="text-sm text-gray-400">Total Votes</p>
                <p className="text-2xl font-bold text-white">
                  {pollingStations.reduce((sum, ps) => sum + ps.votesRecorded, 0)}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Polling Stations Status */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Polling Stations Status</h3>
                <div className="space-y-4">
                  {pollingStations.map((station) => (
                    <div key={station.id} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          {getStatusIcon(station.status)}
                          <h4 className="ml-3 font-medium text-white">{station.name}</h4>
                        </div>
                        <Badge className={getStatusColor(station.status)}>
                          {station.status.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Location:</p>
                          <p className="text-white">{station.location}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Votes Recorded:</p>
                          <p className="text-white">{station.votesRecorded} / {station.expectedVoters}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Last Update:</p>
                          <p className="text-white">{station.lastUpdate}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Turnout:</p>
                          <p className="text-white">{Math.round((station.votesRecorded / station.expectedVoters) * 100)}%</p>
                        </div>
                      </div>
                      
                      {station.issues && (
                        <div className="mt-3 p-2 bg-yellow-900 rounded border border-yellow-600">
                          <p className="text-yellow-200 text-sm">{station.issues}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Real-time Alerts */}
          <div>
            <Card className="bg-gray-800 border-gray-700">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Real-time Alerts</h3>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <Alert key={alert.id} className={`border ${
                      alert.type === 'critical' ? 'border-red-600 bg-red-900/20' :
                      alert.type === 'warning' ? 'border-yellow-600 bg-yellow-900/20' :
                      'border-blue-600 bg-blue-900/20'
                    }`}>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        <div className="flex justify-between items-start">
                          <span className="text-gray-200">{alert.message}</span>
                          <span className="text-xs text-gray-400 ml-2">{alert.timestamp}</span>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>

                <div className="mt-6">
                  <h4 className="text-md font-medium text-white mb-3">Emergency Contacts</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-300">
                      <Phone className="h-4 w-4 mr-2" />
                      Technical Support: (555) 123-4567
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Phone className="h-4 w-4 mr-2" />
                      Election Supervisor: (555) 765-4321
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Phone className="h-4 w-4 mr-2" />
                      Security Team: (555) 999-0000
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SituationRoom;
