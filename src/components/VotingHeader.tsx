
import { Vote, Menu, User, Settings, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface VotingHeaderProps {
  currentStep: number;
  totalSteps: number;
}

const VotingHeader = ({ currentStep, totalSteps }: VotingHeaderProps) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Title */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavigation("/")}>
            <Vote className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">VoteSecure</h1>
              <p className="text-sm text-gray-600">Secure Election System</p>
            </div>
          </div>

          {/* Progress Bar - Only show on voting page */}
          {currentStep > 0 && (
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700">
                {currentStep}/{totalSteps}
              </span>
            </div>
          )}

          {/* Navigation Menu */}
          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <Button 
                variant="ghost" 
                onClick={() => handleNavigation("/")}
                className="text-gray-700 hover:text-blue-600"
              >
                Vote
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => handleNavigation("/voter-dashboard")}
                className="text-gray-700 hover:text-blue-600"
              >
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => handleNavigation("/situation-room")}
                className="text-gray-700 hover:text-blue-600"
              >
                Results
              </Button>
            </nav>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white">
                <DropdownMenuItem onClick={() => handleNavigation("/voter-dashboard")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Voter Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation("/situation-room")}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>Election Results</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleNavigation("/admin")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Admin Panel</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleNavigation("/login")}>
                  <span>Login / Switch User</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white">
                <DropdownMenuItem onClick={() => handleNavigation("/")}>
                  <Vote className="mr-2 h-4 w-4" />
                  <span>Vote</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation("/voter-dashboard")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Voter Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation("/situation-room")}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>Election Results</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleNavigation("/admin")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Admin Panel</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation("/login")}>
                  <span>Login / Switch User</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default VotingHeader;
