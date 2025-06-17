
import { useState } from "react";
import VotingHeader from "@/components/VotingHeader";
import PositionCard from "@/components/PositionCard";
import VoteSummary from "@/components/VoteSummary";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
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
    
    toast({
      title: "Vote Recorded",
      description: "Your selection has been saved.",
    });
  };

  const handleSubmitVotes = () => {
    if (Object.keys(votes).length === 0) {
      toast({
        title: "No Votes Selected",
        description: "Please select at least one candidate before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    setShowSummary(true);
    toast({
      title: "Votes Submitted Successfully!",
      description: `You have cast ${Object.keys(votes).length} vote(s).`,
    });
  };

  const completedVotes = Object.keys(votes).length;
  const totalPositions = positions.length;

  if (showSummary) {
    return <VoteSummary votes={votes} positions={positions} onReset={() => { setShowSummary(false); setVotes({}); }} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <VotingHeader completedVotes={completedVotes} totalPositions={totalPositions} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {positions.map((position) => (
            <PositionCard
              key={position.id}
              position={position}
              selectedCandidate={votes[position.id]}
              onVote={handleVote}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 mr-2" />
              <span className="text-lg font-semibold">
                {completedVotes} of {totalPositions} positions completed
              </span>
            </div>
            
            <Button 
              onClick={handleSubmitVotes}
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Submit My Votes
            </Button>
            
            {completedVotes < totalPositions && (
              <p className="text-sm text-gray-600 mt-2">
                You can submit partial votes or complete all positions
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
