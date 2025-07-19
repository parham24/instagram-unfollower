import React, { useState } from 'react';
import { UserIcon } from './icons/UserIcon';
import { LinkIcon } from './icons/LinkIcon';
import { CopyIcon } from './icons/CopyIcon'; // آیکون جدید را اضافه می‌کنیم

interface UserCardProps {
  username: string;
}

export const UserCard: React.FC<UserCardProps> = ({ username }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(username);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // پیام "کپی شد" بعد از ۲ ثانیه مخفی می‌شود
  };

  return (
    <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700 flex items-center justify-between gap-3 transition-all duration-200 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-900/20">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="flex-shrink-0 bg-gray-700 rounded-full p-2">
            <UserIcon className="w-5 h-5 text-gray-400" />
        </div>
        <p className="text-sm font-medium text-gray-200 truncate" title={username}>
          {username}
        </p>
      </div>
      
      <div className="flex items-center gap-3 flex-shrink-0">
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-purple-400 transition-colors"
          title={isCopied ? "کپی شد!" : "کپی کردن نام کاربری"}
        >
          {isCopied ? <span className="text-xs text-green-400">کپی شد</span> : <CopyIcon className="w-5 h-5" />}
        </button>
        <a
          href={`https://instagram.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-purple-400 transition-colors"
          title={`مشاهده پروفایل ${username} در اینستاگرام`}
        >
          <LinkIcon className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};
