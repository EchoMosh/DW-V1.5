import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Glass } from "@/components/ui/Glass"
import { AuroraBackground } from "@/components/ui/aurora-background"

const Index = () => {
  return (
    <AuroraBackground className="bg-background text-foreground">
      
      <Glass variant="card" className="p-12 max-w-lg mx-4">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-foreground tracking-tight">
              Elevatr
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              AI-powered business enhancement platform
            </p>
          </div>
          
          <Link to="/launchpad">
            <Button className="bg-gradient-electric hover:shadow-glow text-white font-medium px-10 py-4 rounded-xl text-lg transition-all duration-normal hover:scale-105">
              Go to Launchpad
            </Button>
          </Link>
        </div>
      </Glass>
    </AuroraBackground>
  );
};

export default Index;
