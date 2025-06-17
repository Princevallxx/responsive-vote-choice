
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, RotateCcw } from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  party: string;
  image: string;
  experience: string;
}

interface Position {
  id: string;
  title: string;
  description: string;
  candidates: Candidate[];
}

interface VoteSummaryProps {
  votes: Record<string, string>;
  positions: Position[];
  onReset: () => void;
}

const VoteSummary = ({ votes, positions, onReset }: VoteSummaryProps) => {
  const getSelectedCandidate = (positionId: string) => {
    const position = positions.find(p => p.id === positionId);
    const candidateId = votes[positionId];
    return position?.candidates.find(c => c.id === candidateId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Votes Submitted!</h1>
          </div>
          <p className="text-xl text-gray-600">Thank you for participating in the democratic process</p>
        </div>

        <Card className="p-8 bg-white shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Vote Summary</h2>
          
          <div className="space-y-6">
            {Object.entries(votes).map(([positionId, candidateId]) => {
              const position = positions.find(p => p.id === positionId);
              const candidate = getSelectedCandidate(positionId);
              
              if (!position || !candidate) return null;
              
              return (
                <div key={positionId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">{position.title}</h3>
                    <p className="text-gray-600">{position.description}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <img
                      src={candidate.image}
                      alt={candidate.name}
                      className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                    />
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{candidate.name}</div>
                      <div className="text-sm text-gray-600">{candidate.party}</div>
                    </div>
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center space-y-4">
            <div className="text-lg text-gray-700">
              You cast <span className="font-bold text-blue-600">{Object.keys(votes).length}</span> vote(s) out of {positions.length} available positions.
            </div>
            
            <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
              <p className="font-medium mb-2">Important Information:</p>
              <ul className="text-left space-y-1">
                <li>• Your votes have been securely recorded</li>
                <li>• You will receive a confirmation email shortly</li>
                <li>• Results will be available after polls close</li>
                <li>• Contact election officials for any questions</li>
              </ul>
            </div>
            
            <Button
              onClick={onReset}
              variant="outline"
              size="lg"
              className="mt-6"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Start New Voting Session
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VoteSummary;
