import { Hero } from "@/components/Hero";
import { SuggestionBar } from "@/components/SuggestionBar";

/**
 * Draper AI page
 * Shows ONLY the Draper AI hero + search bar.
 * Sidebar persists via AppLayout.
 */
const DraperAI = () => {
  return (
    <div className="w-full flex flex-col items-center gap-8 py-12 mt-[15vh] md:mt-[18vh]">
      <Hero />
      <SuggestionBar />
    </div>
  );
};

export default DraperAI;
