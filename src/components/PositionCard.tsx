
import { Card } from "@/components/ui/card";
import CandidateCard from "./CandidateCard";

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

interface PositionCardProps {
  position: Position;
  selectedCandidate?: string;
  onVote: (positionId: string, candidateId: string) => void;
}

const PositionCard = ({ position, selectedCandidate, onVote }: PositionCardProps) => {
  return (
    <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{position.title}</h2>
        <p className="text-gray-600">{position.description}</p>
        <div className="mt-2 text-sm text-blue-600 font-medium">
          Select one candidate • {selectedCandidate ? "Vote Cast" : "No vote yet"}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {position.candidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            isSelected={selectedCandidate === candidate.id}
            onSelect={() => onVote(position.id, candidate.id)}
          />
        ))}
      </div>
    </Card>
  );
};

export default PositionCard;
