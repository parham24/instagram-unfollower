
import React, { useState, useEffect, useCallback } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ResultsDashboard } from './components/ResultsDashboard';
import { InstagramDataEntry, AnalysisResults } from './types';
import { RefreshIcon } from './components/icons/RefreshIcon';

const App: React.FC = () => {
  const [followers, setFollowers] = useState<string[] | null>(null);
  const [following, setFollowing] = useState<string[] | null>(null);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const parseInstagramFile = async (file: File): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          if (event.target?.result) {
            const json: InstagramDataEntry[] | { relationships_following: InstagramDataEntry[] } = JSON.parse(event.target.result as string);
            
            let dataList: InstagramDataEntry[];

            if (Array.isArray(json)) {
              dataList = json;
            } else if (json.relationships_following) {
              dataList = json.relationships_following;
            } else {
              throw new Error("ساختار فایل JSON نامعتبر است.");
            }
            
            const usernames = dataList.flatMap(entry => 
              entry.string_list_data.map(item => item.value)
            );
            resolve(usernames);
          } else {
            reject(new Error("فایل خالی است."));
          }
        } catch (e) {
          reject(new Error("خطا در تجزیه فایل JSON. لطفاً از صحت فایل اطمینان حاصل کنید."));
        }
      };
      reader.onerror = () => reject(new Error("خطا در خواندن فایل."));
      reader.readAsText(file);
    });
  };

  const handleFileChange = async (file: File, type: 'followers' | 'following') => {
    setIsLoading(true);
    setError(null);
    try {
      const usernames = await parseInstagramFile(file);
      if (type === 'followers') {
        setFollowers(usernames);
      } else {
        setFollowing(usernames);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeData = useCallback(() => {
    if (!followers || !following) return;

    setIsLoading(true);
    const followersSet = new Set(followers);
    const followingSet = new Set(following);

    const doNotFollowBack = following.filter(user => !followersSet.has(user));
    const fans = followers.filter(user => !followingSet.has(user));
    const mutual = followers.filter(user => followingSet.has(user));

    let unfollowers: string[] = [];
    try {
      const previousFollowersRaw = localStorage.getItem('previousFollowers');
      if (previousFollowersRaw) {
        const previousFollowers: string[] = JSON.parse(previousFollowersRaw);
        unfollowers = previousFollowers.filter(user => !followersSet.has(user));
      }
      localStorage.setItem('previousFollowers', JSON.stringify(followers));
    } catch (e) {
      console.error("Failed to process unfollowers from localStorage", e);
    }
    
    setResults({ doNotFollowBack, fans, mutual, unfollowers });
    setIsLoading(false);
  }, [followers, following]);

  useEffect(() => {
    if (followers && following) {
      analyzeData();
    }
  }, [followers, following, analyzeData]);

  const resetApp = () => {
    setFollowers(null);
    setFollowing(null);
    setResults(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-5xl flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          آنفالویاب آفلاین اینستاگرام
        </h1>
        {(followers || following) && (
           <button
            onClick={resetApp}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200"
            title="شروع مجدد"
          >
            <RefreshIcon className="w-5 h-5" />
            <span className="hidden sm:inline">شروع مجدد</span>
          </button>
        )}
      </header>
      
      <main className="w-full max-w-5xl flex-grow">
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative text-center" role="alert">
            <strong className="font-bold">خطا: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {!results && !isLoading && (
          <WelcomeScreen
            onFileChange={handleFileChange}
            followersLoaded={!!followers}
            followingLoaded={!!following}
          />
        )}
        
        {results && !isLoading && <ResultsDashboard results={results} />}
      </main>

      <footer className="w-full max-w-5xl text-center mt-8 text-gray-500 text-sm">
          <p>این یک ابزار آفلاین است و به حساب اینستاگرام شما متصل نمی‌شود. تمام داده‌ها به صورت محلی در مرورگر شما پردازش می‌شوند.</p>
      </footer>
    </div>
  );
};

export default App;
