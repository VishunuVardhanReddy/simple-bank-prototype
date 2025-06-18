
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Send, Download, Plus, LogOut, Eye, EyeOff, Home } from 'lucide-react';
import DepositWithdraw from './DepositWithdraw';
import FundTransfer from './FundTransfer';
import AccountStatement from './AccountStatement';

interface User {
  accountNumber: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  balance: number;
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

interface DashboardProps {
  user: User;
  onLogout: () => void;
  onUpdateUser: (user: User) => void;
  allUsers: User[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onUpdateUser, allUsers }) => {
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const handleQuickAction = (action: string) => {
    if (action === 'deposit') {
      setActiveTab('deposit');
    } else if (action === 'transfer') {
      setActiveTab('transfer');
    } else if (action === 'statement') {
      setActiveTab('statement');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      {/* Header with Navbar */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Banking Portal
                </h1>
                <p className="text-sm text-gray-500">Welcome back, {user.fullName}</p>
              </div>
            </div>
            
            {/* Quick Actions Navbar */}
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleQuickAction('deposit')}
                className="flex items-center space-x-2 hover:bg-green-50 hover:text-green-600 transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden md:block">Deposit</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleQuickAction('transfer')}
                className="flex items-center space-x-2 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                <Send className="w-4 h-4" />
                <span className="hidden md:block">Transfer</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleQuickAction('statement')}
                className="flex items-center space-x-2 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                <span className="hidden md:block">Statement</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onLogout}
                className="flex items-center space-x-2 border-red-200 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:block">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Account Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2 shadow-xl border-0 bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-green-700">Account Balance</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-green-600 hover:text-green-700 hover:bg-green-100"
                >
                  {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </CardTitle>
              <CardDescription className="text-green-600">Account #{user.accountNumber}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {showBalance ? formatCurrency(user.balance) : '₹ ****'}
              </div>
              <p className="text-sm text-green-500 mt-2">Available Balance</p>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-50 to-blue-50 hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-purple-700">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                onClick={() => handleQuickAction('deposit')}
                className="w-full justify-start bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-200" 
                variant="default"
              >
                <Plus className="w-4 h-4 mr-2" />
                Deposit Funds
              </Button>
              <Button 
                onClick={() => handleQuickAction('transfer')}
                className="w-full justify-start bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-200" 
                variant="default"
              >
                <Send className="w-4 h-4 mr-2" />
                Transfer Money
              </Button>
              <Button 
                onClick={() => handleQuickAction('statement')}
                className="w-full justify-start bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-200" 
                variant="default"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Statement
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="deposit" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white">Deposit/Withdraw</TabsTrigger>
            <TabsTrigger value="transfer" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">Transfer</TabsTrigger>
            <TabsTrigger value="statement" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">Statement</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader>
                  <CardTitle className="text-blue-700">Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Account Holder</p>
                      <p className="text-sm font-semibold">{user.fullName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-600">Account Number</p>
                      <p className="text-sm font-semibold">{user.accountNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-600">Email</p>
                      <p className="text-sm font-semibold">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-600">Phone</p>
                      <p className="text-sm font-semibold">{user.phone}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600">Address</p>
                    <p className="text-sm font-semibold">{user.address}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-gradient-to-br from-orange-50 to-red-50">
                <CardHeader>
                  <CardTitle className="text-orange-700">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {user.transactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className="flex justify-between items-center py-2 border-b border-orange-100 last:border-b-0">
                        <div>
                          <p className="text-sm font-medium text-gray-800">{transaction.description}</p>
                          <p className="text-xs text-gray-500">{transaction.date}</p>
                        </div>
                        <div className={`text-sm font-bold ${
                          transaction.type === 'deposit' || transaction.type === 'transfer_in' 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {transaction.type === 'deposit' || transaction.type === 'transfer_in' ? '+' : '-'}
                          {formatCurrency(transaction.amount)}
                        </div>
                      </div>
                    ))}
                    {user.transactions.length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4">No transactions yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="deposit">
            <DepositWithdraw user={user} onUpdateUser={onUpdateUser} />
          </TabsContent>

          <TabsContent value="transfer">
            <FundTransfer user={user} onUpdateUser={onUpdateUser} allUsers={allUsers} />
          </TabsContent>

          <TabsContent value="statement">
            <AccountStatement user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
