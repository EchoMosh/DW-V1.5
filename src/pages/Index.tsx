import { AuthContainer } from "@/components/auth-container"
import { Glass } from "@/components/ui/Glass"
import { AuroraBackground } from "@/components/ui/aurora-background"

const Index = () => {
  return (
    <AuroraBackground className="bg-background text-foreground">
      <div className="min-h-screen flex">
        {/* Left Column - Aurora Background (replaces cover image) */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <img 
                src="/dreamwell-fullwidth-logo.png" 
                alt="Dreamwell" 
                className="h-16 mx-auto"
              />
              <p className="text-xl text-white/90 leading-relaxed max-w-md">
                The ultimate influencer marketing platform that connects brands with creators and drives authentic engagement
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Login Form */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center p-8">
          <Glass variant="card" className="w-full max-w-md p-8">
            {/* Mobile title (hidden on desktop) */}
            <div className="lg:hidden text-center space-y-4 mb-8">
              <img 
                src="/dreamwell-logo.png" 
                alt="Dreamwell" 
                className="h-12 mx-auto"
              />
              <p className="text-muted-foreground">
                Influencer marketing made simple
              </p>
            </div>
            
            <AuthContainer />
          </Glass>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default Index;
