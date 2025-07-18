
import React from 'react';
import { FileUpload } from './FileUpload';

interface WelcomeScreenProps {
  onFileChange: (file: File, type: 'followers' | 'following') => void;
  followersLoaded: boolean;
  followingLoaded: boolean;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onFileChange, followersLoaded, followingLoaded }) => {
  return (
    <div className="space-y-8">
      <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-purple-400">چگونه فایل‌های خود را دریافت کنید؟</h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-300">
          <li>به پروفایل اینستاگرام خود بروید و روی منو (☰) کلیک کنید.</li>
          <li>به <span className="font-semibold text-pink-400">"Your activity"</span> (فعالیت شما) بروید.</li>
          <li>به پایین اسکرول کرده و <span className="font-semibold text-pink-400">"Download your information"</span> (دانلود اطلاعاتتان) را انتخاب کنید.</li>
          <li>روی <span className="font-semibold text-pink-400">"Request a download"</span> (درخواست دانلود) کلیک کنید.</li>
          <li>نوع اطلاعات را <span className="font-semibold text-pink-400">"Followers and following"</span> انتخاب کنید و فرمت را <span className="font-semibold text-pink-400">JSON</span> قرار دهید.</li>
          <li>پس از دریافت ایمیل از اینستاگرام، فایل ZIP را دانلود و استخراج کنید.</li>
          <li>فایل‌های <code className="bg-gray-900 px-2 py-1 rounded-md text-sm">followers_1.json</code> و <code className="bg-gray-900 px-2 py-1 rounded-md text-sm">following.json</code> را در قسمت‌های زیر بارگذاری کنید.</li>
        </ol>
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
