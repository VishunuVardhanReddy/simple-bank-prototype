
import React, { useState, useEffect } from 'react';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import Dashboard from '@/components/Dashboard';
import Home from '@/components/Home';

interface User {
  accountNumber: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  balance: number;
  password: string;
  transactions: Transaction[];
}

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'transfer_in' | 'transfer_out';
  amount: number;
  date: string;
  description: string;
  balance: number;
  fromAccount?: string;
  toAccount?: string;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'register' | 'dashboard'>('home');
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Load users from localStorage on component mount
  useEffect(() => {
    const savedUsers = localStorage.getItem('bankingUsers');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  // Save users to localStorage whenever users array changes
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('bankingUsers', JSON.stringify(users));
    }
  }, [users]);

  const generateAccountNumber = (): string => {
    return Math.floor(100000000 + Math.random() * 900000000).toString();
  };

  const handleRegister = (userData: any): string => {
    const accountNumber = generateAccountNumber();
    const initialTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'deposit',
      amount: parseFloat(userData.initialDeposit),
      date: new Date().toLocaleString(),
      description: 'Initial Deposit',
      balance: parseFloat(userData.initialDeposit)
    };

    const newUser: User = {
      accountNumber,
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      balance: parseFloat(userData.initialDeposit),
      password: userData.password,
      transactions: [initialTransaction]
    };

    setUsers(prevUsers => [...prevUsers, newUser]);
    return accountNumber;
  };

  const handleLogin = (accountNumber: string, password: string): boolean => {
    const user = users.find(u => u.accountNumber === accountNumber && u.password === password);
    if (user) {
      setCurrentUser(user);
      setCurrentView('dashboard');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  const handleUpdateUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.accountNumber === updatedUser.accountNumber ? updatedUser : user
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      {currentView === 'home' && (
        <Home 
          onNavigateToLogin={() => setCurrentView('login')}
          onNavigateToRegister={() => setCurrentView('register')}
        />
      )}

      {currentView === 'login' && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">SecureBank</h1>
              <p className="text-gray-600">Your trusted banking partner</p>
            </div>
            <LoginForm 
              onLogin={handleLogin}
              onSwitchToRegister={() => setCurrentView('register')}
              onBackToHome={() => setCurrentView('home')}
            />
          </div>
        </div>
      )}

      {currentView === 'register' && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">SecureBank</h1>
              <p className="text-gray-600">Open your account today</p>
            </div>
            <RegisterForm 
              onRegister={handleRegister}
              onSwitchToLogin={() => setCurrentView('login')}
              onBackToHome={() => setCurrentView('home')}
            />
          </div>
        </div>
      )}

      {currentView === 'dashboard' && currentUser && (
        <Dashboard 
          user={currentUser}
          onLogout={handleLogout}
          onUpdateUser={handleUpdateUser}
          allUsers={users}
        />
      )}
    </div>
  );
};

export default Index;
