
import React from 'react';
import { UserIcon } from './icons/UserIcon';
import { LinkIcon } from './icons/LinkIcon';

interface UserCardProps {
  username: string;
}

export const UserCard: React.FC<UserCardProps> = ({ username }) => {
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
      <a
        href={`https://instagram.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 text-gray-400 hover:text-purple-400 transition-colors"
        title={`مشاهده پروفایل ${username} در اینستاگرام`}
      >
        <LinkIcon className="w-5 h-5" />
      </a>
    </div>
  );
};
