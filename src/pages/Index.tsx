import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-radial bg-noise">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Elevatr Dashboard</h1>
        <p className="text-xl text-muted-foreground mb-8">AI-powered business enhancement platform</p>
        <Link to="/launchpad">
          <Button className="bg-gradient-electric hover:opacity-90 text-white font-medium px-8 py-3 rounded-xl">
            Go to Launchpad
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
