
import React, { useState, useMemo } from 'react';
import { UserCard } from './UserCard';

interface UserListProps {
  users: string[];
}

export const UserList: React.FC<UserListProps> = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = useMemo(() => {
    if (!searchTerm) {
      return users;
    }
    return users.filter(user =>
      user.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  if (users.length === 0) {
    return (
        <div className="text-center py-10">
            <p className="text-gray-400">هیچ کاربری در این لیست یافت نشد.</p>
        </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <input
          type="text"
          placeholder={`جستجو در میان ${users.length} کاربر...`}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition"
        />
      </div>
      {filteredUsers.length > 0 ? (
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredUsers.map(user => (
            <UserCard key={user} username={user} />
            ))}
         </div>
      ) : (
        <div className="text-center py-10">
            <p className="text-gray-400">هیچ کاربری با عبارت "{searchTerm}" یافت نشد.</p>
        </div>
      )}
    </div>
  );
};
