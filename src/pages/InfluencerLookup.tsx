import { Hero } from "@/components/Hero";
import { SuggestionBar } from "@/components/SuggestionBar";

const InfluencerLookup = () => {
  return (
    <div className="w-full flex flex-col items-center gap-8 py-12 mt-[15vh] md:mt-[18vh]">
      <Hero
        title="Influencer Lookup"
        subtitle="Search creators and analyze performance in seconds."
        showIcon={true}
      />
      <SuggestionBar placeholder="Search creators, handles, or topics..." />
    </div>
  );
};

export default InfluencerLookup;
