
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  party: string;
  image: string;
  experience: string;
}

interface CandidateCardProps {
  candidate: Candidate;
  isSelected: boolean;
  onSelect: () => void;
}

const CandidateCard = ({ candidate, isSelected, onSelect }: CandidateCardProps) => {
  const getPartyColor = (party: string) => {
    switch (party.toLowerCase()) {
      case 'democratic party':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'republican party':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'green party':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'independent':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className={`p-4 transition-all duration-200 cursor-pointer hover:shadow-md ${
      isSelected 
        ? 'ring-2 ring-blue-500 bg-blue-50 shadow-lg transform scale-105' 
        : 'hover:shadow-lg hover:transform hover:scale-102'
    }`}>
      <div className="text-center">
        <div className="relative mb-4">
          <img
            src={candidate.image}
            alt={candidate.name}
            className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
          />
          {isSelected && (
            <div className="absolute -top-1 -right-1">
              <CheckCircle className="h-6 w-6 text-green-600 bg-white rounded-full" />
            </div>
          )}
        </div>
        
        <h3 className="font-bold text-lg text-gray-900 mb-1">{candidate.name}</h3>
        
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mb-3 ${getPartyColor(candidate.party)}`}>
          {candidate.party}
        </div>
        
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{candidate.experience}</p>
        
        <Button
          onClick={onSelect}
          variant={isSelected ? "default" : "outline"}
          size="sm"
          className={`w-full transition-all duration-200 ${
            isSelected 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'hover:bg-blue-50 hover:border-blue-300'
          }`}
        >
          {isSelected ? 'Selected' : 'Vote for ' + candidate.name.split(' ')[0]}
        </Button>
      </div>
    </Card>
  );
};

export default CandidateCard;
