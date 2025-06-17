
import { Vote } from "lucide-react";

interface VotingHeaderProps {
  completedVotes: number;
  totalPositions: number;
}

const VotingHeader = ({ completedVotes, totalPositions }: VotingHeaderProps) => {
  const progressPercentage = (completedVotes / totalPositions) * 100;

  return (
    <div className="bg-white shadow-lg border-b-4 border-blue-600">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Vote className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">General Election 2024</h1>
              <p className="text-gray-600">Cast your vote for each position</p>
            </div>
          </div>
          
          <div className="hidden md:block text-right">
            <div className="text-2xl font-bold text-blue-600">
              {completedVotes}/{totalPositions}
            </div>
            <p className="text-sm text-gray-600">Positions Voted</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Voting Progress</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingHeader;
