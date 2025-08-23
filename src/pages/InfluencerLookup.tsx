import { Hero } from "@/components/Hero";
import { SuggestionBar } from "@/components/SuggestionBar";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Users, TrendingUp, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

interface Influencer {
  user_id: string;
  username?: string;
  handle: string;
  fullname: string;
  picture: string;
  followers: number;
  is_verified: boolean;
  custom_name?: string;
}

interface WebhookResponse {
  data: Influencer[];
  success: boolean;
}

const InfluencerLookup = () => {
  const { user } = useAuth();
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Pagination configuration
  const cardsPerPage = 8;

  const handleSearch = async (query: string, user: User | null) => {
    console.log('🔍 Starting search for:', query);
    setHasSearched(true);
    setIsLoading(true);
    setCurrentPage(1); // Reset to first page on new search
    
    try {
      // Using "simple" request to avoid CORS preflight
      const payload = {
        user: user ? {
          id: user.id,
          email: user.email,
          user_metadata: user.user_metadata,
        } : null,
        searchQuery: query,
        timestamp: new Date().toISOString(),
      };

      console.log('📤 Sending payload:', payload);

      const response = await fetch('https://dreamwell.app.n8n.cloud/webhook/influencer-lookup', {
        method: 'POST',
        // No headers to keep it a "simple" request - avoids CORS preflight
        body: JSON.stringify(payload),
      });

      console.log('📥 Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('📊 Full webhook response:', result);
      console.log('📊 Response type:', typeof result);
      console.log('📊 Is array:', Array.isArray(result));
      
      // More robust parsing to handle different response structures
      let influencersData: Influencer[] = [];
      
      // Check if result is an array
      if (Array.isArray(result)) {
        console.log('✅ Response is an array with', result.length, 'items');
        
        // Check if first element has data property
        if (result.length > 0 && result[0].data && Array.isArray(result[0].data)) {
          influencersData = result[0].data;
          console.log('✅ Found influencers in result[0].data:', influencersData.length, 'influencers');
        } else if (result.length > 0 && result[0].user_id) {
          // Maybe the array itself contains influencers directly
          influencersData = result as Influencer[];
          console.log('✅ Result array contains influencers directly:', influencersData.length, 'influencers');
        }
      } else if (result && result.data && Array.isArray(result.data)) {
        // Maybe it's a single object with data property
        influencersData = result.data;
        console.log('✅ Found influencers in result.data:', influencersData.length, 'influencers');
      }
      
      console.log('📝 Final influencers data:', influencersData);
      console.log('📝 Setting', influencersData.length, 'influencers to state');
      
      setInfluencers(influencersData);
      
      // Log the state after setting
      setTimeout(() => {
        console.log('📝 State check - influencers in state:', influencers.length);
      }, 100);
      
    } catch (error) {
      console.error('❌ Error sending search request:', error);
      setInfluencers([]);
    } finally {
      setIsLoading(false);
      console.log('✅ Search complete, loading set to false');
    }
  };

  // Test function with mock data
  const testWithMockData = () => {
    console.log('🧪 Testing with mock data');
    const mockInfluencers: Influencer[] = [
      {
        user_id: "UCgJtPNTnFdFdNL44Dctkt6A",
        username: "TheOckShow",
        handle: "OckTV.",
        fullname: "MoeAndEthan",
        picture: "https://yt3.googleusercontent.com/ytc/AIdro_nCUmTYuUsXpk5tZPQ31OmLJR_yMkhUSZ18mT_xEso_6vk=s480-c-k-c0x00ffffff-no-rj",
        followers: 2700000,
        is_verified: false
      },
      {
        user_id: "UCQwo-Yh6mhN6iRVAfpJRgFA",
        username: "DirtStarPranks",
        custom_name: "moesargi",
        handle: "moesargi",
        fullname: "Moe Sargi",
        picture: "https://yt3.googleusercontent.com/HCrnicXt6tZJ6ezDHmqOpSUntgys5yHABBn-6e939PMmtAEMtDBQAkNmjNdhFeJv6U2nkNxILNA=s480-c-k-c0x00ffffff-no-rj",
        followers: 2840000,
        is_verified: true
      },
      {
        user_id: "UC3XTzVzaHQEd30rQbuvCtTQ",
        username: "LastWeekTonight",
        handle: "LastWeekTonight",
        fullname: "John Oliver",
        picture: "https://yt3.googleusercontent.com/ytc/AIdro_mLKuegjeyTi7e7BLz0RmT5TnkXkfKUrBi0QwSNUAs=s480-c-k-c0x00ffffff-no-rj",
        followers: 9450000,
        is_verified: true
      },
      {
        user_id: "UCBJycsmduvYEL83R_U4JriQ",
        username: "mkbhd",
        handle: "mkbhd",
        fullname: "Marques Brownlee",
        picture: "https://yt3.googleusercontent.com/lkH37D712tiyphnu0Id0D5MwwQ7IRuwgQLVD05iMXlDWO-kDHut3uI4MgIEAQ9StK0qOST7fiA=s480-c-k-c0x00ffffff-no-rj",
        followers: 18900000,
        is_verified: true
      },
      {
        user_id: "UCX6OQ3DkcsbYNE6H8uQQuVA",
        username: "MrBeast",
        handle: "MrBeast",
        fullname: "Jimmy Donaldson",
        picture: "https://yt3.googleusercontent.com/ytc/AIdro_mFBK8xViAJI_Z9Fxo0M-hU0H0rjt_JGb_xLdsKkEH7rA=s480-c-k-c0x00ffffff-no-rj",
        followers: 234000000,
        is_verified: true
      },
      {
        user_id: "UCq-Fj5jknLsUf-MWSy4_brA",
        username: "tseries",
        handle: "tseries",
        fullname: "T-Series",
        picture: "https://yt3.googleusercontent.com/DzaZaTX6gdgjjPI_vkNc2dPbI794UroI9fTAunua0fa7lukDj5NDkjfhS5-w2KXuvmNL6wV5=s480-c-k-c0x00ffffff-no-rj",
        followers: 258000000,
        is_verified: true
      },
      {
        user_id: "UCpEhnqL0y41EpW2TvWAHD7Q",
        username: "FaZeClan",
        handle: "FaZeClan",
        fullname: "FaZe Clan",
        picture: "https://yt3.googleusercontent.com/ytc/AIdro_kJKgKJGKmLTPebrAoY8ayR-MXKF0LlWBkD8fFqmA=s480-c-k-c0x00ffffff-no-rj",
        followers: 8940000,
        is_verified: true
      },
      {
        user_id: "UCYzPXprvl5Y-Sf0g4vX-m6g",
        username: "jacksepticeye",
        handle: "jacksepticeye",
        fullname: "Sean McLoughlin",
        picture: "https://yt3.googleusercontent.com/ytc/AIdro_mxbeIBipIb76UU4o2aN-4lOEbXEr1Amzxrg_R1jQ=s480-c-k-c0x00ffffff-no-rj",
        followers: 30800000,
        is_verified: true
      },
      {
        user_id: "UC-lHJZR3Gqxm24_Vd_AJ5Yw",
        username: "PewDiePie",
        handle: "PewDiePie",
        fullname: "Felix Kjellberg",
        picture: "https://yt3.googleusercontent.com/5oUY3tashyxfqsjO5SGhjT4dus8FkN9CsAHwXWISFrdPYii1FudD4ICtLfuCw6-THJsJbgoY=s480-c-k-c0x00ffffff-no-rj",
        followers: 111000000,
        is_verified: true
      },
      {
        user_id: "UCHnyfMqiRRG1u-2MsSQLbXA",
        username: "Veritasium",
        handle: "Veritasium",
        fullname: "Derek Muller",
        picture: "https://yt3.googleusercontent.com/ytc/AIdro_kZ8Zdkb0WxoP0Wg3_Y4JjLzDyoXsez5zEoKvhXGQ=s480-c-k-c0x00ffffff-no-rj",
        followers: 15200000,
        is_verified: true
      },
      {
        user_id: "UCsXVk37bltHxD1rDPwtNM8Q",
        username: "Kurzgesagt",
        handle: "Kurzgesagt",
        fullname: "In a Nutshell",
        picture: "https://yt3.googleusercontent.com/ytc/AIdro_nW5MTkjkfKjW9o0HZI6qHgIlus_Zy0m8V8NbSa8A=s480-c-k-c0x00ffffff-no-rj",
        followers: 21400000,
        is_verified: true
      }
    ];
    
    setHasSearched(true);
    setInfluencers(mockInfluencers);
    setCurrentPage(1); // Reset to first page when loading mock data
    console.log('✅ Mock data set:', mockInfluencers);
  };
  
  // Pagination calculations
  const totalPages = Math.ceil(influencers.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentInfluencers = influencers.slice(startIndex, endIndex);
  
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  // Only trigger animation when search is submitted (Enter pressed)
  const shouldShowCompactLayout = hasSearched;

  return (
    <div className="w-full flex flex-col items-center gap-8 py-12 mt-[15vh] md:mt-[18vh]">
      <Hero
        title="Influencer Lookup"
        subtitle="Search creators and analyze performance in seconds."
        showIcon={true}
        isHidden={shouldShowCompactLayout}
      />
      <SuggestionBar 
        placeholder="Search creators, handles, or topics..." 
        user={user}
        onSearch={handleSearch}
        onSearchStateChange={() => {}} // Empty function since we don't want typing to trigger animation
        isCompact={shouldShowCompactLayout}
      />
      
      {/* Test button for debugging */}
      {!hasSearched && (
        <button
          onClick={testWithMockData}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Test with Mock Data
        </button>
      )}
      
      {/* Results Section - Center Focused */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center gap-4 py-12"
          >
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/20 border-t-white"></div>
            <p className="text-white/70 text-sm">Searching influencers...</p>
          </motion.div>
        )}
        
        {!isLoading && influencers.length === 0 && hasSearched && (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-12"
          >
            <div className="text-white/50 text-lg">No influencers found</div>
            <p className="text-white/30 text-sm mt-2">Try adjusting your search terms</p>
          </motion.div>
        )}
        
        {influencers.length > 0 && !isLoading && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-7xl mx-auto px-4 -mt-72"
          >
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentInfluencers.map((influencer, index) => (
                <motion.div
                  key={influencer.user_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className="group relative"
                >
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
                    {/* Profile Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        <img
                          src={influencer.picture}
                          alt={influencer.fullname}
                          className="w-20 h-20 rounded-full object-cover border-2 border-white/20"
                        />
                        {influencer.is_verified && (
                          <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                            <CheckCircle size={16} className="text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white truncate">
                          {influencer.fullname}
                        </h3>
                        <p className="text-sm text-white/70 truncate">
                          @{influencer.handle}
                        </p>
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-white/80">
                        <Users size={16} className="text-white/60" />
                        <span className="text-sm font-medium">
                          {influencer.followers.toLocaleString()} followers
                        </span>
                      </div>
                      
                      {/* Engagement Rate (mock data) */}
                      <div className="flex items-center gap-2 text-white/80">
                        <TrendingUp size={16} className="text-white/60" />
                        <span className="text-sm">
                          {(Math.random() * 5 + 2).toFixed(1)}% engagement
                        </span>
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 w-full py-2 px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white/90 text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200"
                    >
                      View Profile
                      <ExternalLink size={14} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-2 mt-8"
              >
                {/* Previous Button */}
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg border transition-all ${
                    currentPage === 1
                      ? 'border-white/10 text-white/30 cursor-not-allowed'
                      : 'border-white/20 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>
                
                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((page, index) => (
                    <div key={index}>
                      {page === '...' ? (
                        <span className="px-3 py-2 text-white/50">...</span>
                      ) : (
                        <button
                          onClick={() => setCurrentPage(page as number)}
                          className={`px-3 py-2 rounded-lg border transition-all ${
                            currentPage === page
                              ? 'bg-white/20 border-white/30 text-white font-medium'
                              : 'border-white/20 text-white/70 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {page}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Next Button */}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg border transition-all ${
                    currentPage === totalPages
                      ? 'border-white/10 text-white/30 cursor-not-allowed'
                      : 'border-white/20 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <ChevronRight size={20} />
                </button>
              </motion.div>
            )}
            
            {/* Results Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mt-4 text-white/50 text-sm"
            >
              Showing {startIndex + 1}-{Math.min(endIndex, influencers.length)} of {influencers.length} results
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InfluencerLookup;
