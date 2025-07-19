import React, { useState } from 'react'; // ایمپورت کردن useState
import { FileUpload } from './FileUpload';

// آیکون برای فلش کشویی
const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m6 9 6 6 6-6"/>
    </svg>
);


interface WelcomeScreenProps {
  onFileChange: (file: File, type: 'followers' | 'following') => void;
  followersLoaded: boolean;
  followingLoaded: boolean;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onFileChange, followersLoaded, followingLoaded }) => {
  // ۱. اضافه کردن State برای کنترل باز و بسته بودن راهنما
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // ۲. تابع برای تغییر وضعیت State
  const toggleGuide = () => {
    setIsGuideOpen(!isGuideOpen);
  };

  return (
    <div className="space-y-8">
      {/* ۳. ساختار هدر قابل کلیک */}
      <div className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden">
        <button
          onClick={toggleGuide}
          className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
        >
          <h2 className="text-xl font-bold text-purple-400">چگونه فایل‌های خود را دریافت کنید؟</h2>
          {/* ۴. آیکون چرخنده برای نمایش وضعیت */}
          <ChevronDownIcon className={`w-6 h-6 text-purple-400 transition-transform duration-300 ${isGuideOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {/* ۵. نمایش محتوای راهنما به صورت شرطی */}
        <div className={`transition-all duration-500 ease-in-out ${isGuideOpen ? 'max-h-screen' : 'max-h-0'}`}>
            <div className="px-6 pb-6">
                <ol className="list-decimal list-inside space-y-3 text-gray-300">
                    <li>به پروفایل اینستاگرام خود بروید و روی منو (☰) کلیک کنید.</li>
                    <li>به <span className="font-semibold text-pink-400">"Settings and privacy"</span> (تنظیمات و حریم خصوصی) بروید.</li>
                    <li>بالاترین گزینه، یعنی <span className="font-semibold text-pink-400">"Accounts Center"</span> (مرکز حساب‌ها) را انتخاب کنید.</li>
                    <li>در صفحه جدید، گزینه <span className="font-semibold text-pink-400">"Your information and permissions"</span> (اطلاعات و مجوزهای شما) را پیدا کرده و انتخاب کنید.</li>
                    <li>روی <span className="font-semibold text-pink-400">"Download your information"</span> (دانلود اطلاعاتتان) و سپس <span className="font-semibold text-pink-400">"Request a download"</span> (درخواست دانلود) کلیک کنید.</li>
                    <li>گزینه <span className="font-semibold text-pink-400">"Select types of information"</span> (انتخاب انواع اطلاعات) را انتخاب کنید.</li>
                    <li>در لیست، فقط تیک گزینه <span className="font-semibold text-pink-400">"Followers and following"</span> (فالوورها و فالووینگ‌ها) را بزنید.</li>
                    <li>فرمت فایل را حتماً روی <span className="font-semibold text-pink-400">JSON</span> قرار دهید و درخواست را ثبت کنید.</li>
                    <li>پس از دریافت ایمیل، فایل ZIP را دانلود، استخراج کرده و فایل‌های <code className="bg-gray-900 px-2 py-1 rounded-md text-sm">followers_1.json</code> و <code className="bg-gray-900 px-2 py-1 rounded-md text-sm">following.json</code> را بارگذاری کنید.</li>
                </ol>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileUpload
          title="فایل دنبال‌کنندگان (followers_1.json)"
          onFileSelect={(file) => onFileChange(file, 'followers')}
          isLoaded={followersLoaded}
          fileId="followers-file"
        />
        <FileUpload
          title="فایل دنبال‌شوندگان (following.json)"
          onFileSelect={(file) => onFileChange(file, 'following')}
          isLoaded={followingLoaded}
          fileId="following-file"
        />
      </div>
    </div>
  );
};
