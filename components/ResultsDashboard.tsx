
import React, { useState } from 'react';
import { AnalysisResults } from '../types';
import { UserList } from './UserList';

interface ResultsDashboardProps {
  results: AnalysisResults;
}

type Tab = 'unfollowers' | 'doNotFollowBack' | 'fans' | 'mutual';

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ results }) => {
  const [activeTab, setActiveTab] = useState<Tab>('doNotFollowBack');

  const tabs: { id: Tab; label: string; data: string[], available: boolean }[] = [
    { id: 'unfollowers', label: 'آنفالوئرها', data: results.unfollowers, available: results.unfollowers.length > 0 },
    { id: 'doNotFollowBack', label: 'شما را دنبال نمی‌کنند', data: results.doNotFollowBack, available: true },
    { id: 'fans', label: 'شما دنبال نمی‌کنید (طرفداران)', data: results.fans, available: true },
    { id: 'mutual', label: 'دنبال‌کنندگان متقابل', data: results.mutual, available: true },
  ];

  const TabButton: React.FC<{tabId: Tab, label: string, count: number, available: boolean}> = ({ tabId, label, count, available }) => {
    if (!available && tabId === 'unfollowers') {
        return (
            <div className="relative text-center px-3 py-2 text-sm font-medium text-gray-500 cursor-help" title="برای مشاهده آنفالوئرها، باید یکبار دیگر با فایل جدید دنبال‌کنندگان، تحلیل را اجرا کنید.">
                {label}
                <span className="ms-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-gray-400 bg-gray-700 rounded-full">{count}</span>
            </div>
        )
    }

    return (
        <button
          onClick={() => setActiveTab(tabId)}
          className={`relative text-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
            activeTab === tabId
              ? 'bg-purple-600 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          {label}
          <span className={`ms-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none rounded-full ${activeTab === tabId ? 'bg-white text-purple-600' : 'bg-gray-700 text-gray-300'}`}>
              {count}
          </span>
        </button>
    );
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="border-b border-gray-700">
          <nav className="-mb-px flex flex-wrap gap-x-4 gap-y-2" aria-label="Tabs">
            {tabs.map(tab => (
              <TabButton key={tab.id} tabId={tab.id} label={tab.label} count={tab.data.length} available={tab.available}/>
            ))}
          </nav>
        </div>
      </div>
      <div>
        {tabs.map(tab => (
          <div key={tab.id} className={activeTab === tab.id ? 'block' : 'hidden'}>
            <UserList users={tab.data} />
          </div>
        ))}
        {activeTab === 'unfollowers' && !results.unfollowers.length && (
            <div className="text-center p-8 bg-gray-800/50 rounded-lg border border-gray-700">
                <p className="text-gray-400">
                    برای مشاهده لیست آنفالوئرها، باید حداقل دو بار تحلیل را اجرا کنید.
                    <br/>
                    بار اول داده‌های فعلی شما ذخیره می‌شود و در اجرای بعدی، با لیست جدید مقایسه خواهد شد.
                </p>
            </div>
        )}
      </div>
    </div>
  );
};
