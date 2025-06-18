
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

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

interface DepositWithdrawProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

const DepositWithdraw: React.FC<DepositWithdrawProps> = ({ user, onUpdateUser }) => {
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'deposit',
      amount: amount,
      date: new Date().toLocaleString(),
      description: 'Cash Deposit',
      balance: user.balance + amount
    };

    const updatedUser = {
      ...user,
      balance: user.balance + amount,
      transactions: [newTransaction, ...user.transactions]
    };

    onUpdateUser(updatedUser);
    setDepositAmount('');
    toast.success(`Successfully deposited ₹${amount.toFixed(2)}`);
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (amount > user.balance) {
      toast.error('Insufficient funds');
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'withdrawal',
      amount: amount,
      date: new Date().toLocaleString(),
      description: 'Cash Withdrawal',
      balance: user.balance - amount
    };

    const updatedUser = {
      ...user,
      balance: user.balance - amount,
      transactions: [newTransaction, ...user.transactions]
    };

    onUpdateUser(updatedUser);
    setWithdrawAmount('');
    toast.success(`Successfully withdrew ₹${amount.toFixed(2)}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Tabs defaultValue="deposit" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="deposit" className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Deposit</span>
          </TabsTrigger>
          <TabsTrigger value="withdraw" className="flex items-center space-x-2">
            <Minus className="w-4 h-4" />
            <span>Withdraw</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="deposit">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-green-600" />
                <span>Deposit Funds</span>
              </CardTitle>
              <CardDescription>
                Add money to your account. Current balance: {formatCurrency(user.balance)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDeposit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="depositAmount">Amount to Deposit</Label>
                  <Input
                    id="depositAmount"
                    type="number"
                    placeholder="Enter amount"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    min="1"
                    step="0.01"
                    className="text-lg"
                  />
                </div>
                
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[50, 100, 200, 500].map((amount) => (
                    <Button
                      key={amount}
                      type="button"
                      variant="outline"
                      className="text-sm"
                      onClick={() => setDepositAmount(amount.toString())}
                    >
                      ₹{amount}
                    </Button>
                  ))}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={!depositAmount}
                >
                  Deposit {depositAmount && `₹${parseFloat(depositAmount).toFixed(2)}`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="withdraw">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Minus className="w-5 h-5 text-red-600" />
                <span>Withdraw Funds</span>
              </CardTitle>
              <CardDescription>
                Withdraw money from your account. Available balance: {formatCurrency(user.balance)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleWithdraw} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="withdrawAmount">Amount to Withdraw</Label>
                  <Input
                    id="withdrawAmount"
                    type="number"
                    placeholder="Enter amount"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    min="1"
                    max={user.balance}
                    step="0.01"
                    className="text-lg"
                  />
                </div>
                
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[50, 100, 200, 500].filter(amount => amount <= user.balance).map((amount) => (
                    <Button
                      key={amount}
                      type="button"
                      variant="outline"
                      className="text-sm"
                      onClick={() => setWithdrawAmount(amount.toString())}
                    >
                      ₹{amount}
                    </Button>
                  ))}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={!withdrawAmount || parseFloat(withdrawAmount) > user.balance}
                >
                  Withdraw {withdrawAmount && `₹${parseFloat(withdrawAmount).toFixed(2)}`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DepositWithdraw;
