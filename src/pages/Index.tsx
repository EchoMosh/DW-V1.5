import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Glass } from "@/components/ui/Glass"

const Index = () => {
  return (
    <div className="h-dvh flex items-center justify-center bg-gradient-radial bg-noise overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      
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
    </div>
  );
};

export default Index;
