
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send } from 'lucide-react';
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

interface FundTransferProps {
  user: User;
  onUpdateUser: (user: User) => void;
  allUsers: User[];
}

const FundTransfer: React.FC<FundTransferProps> = ({ user, onUpdateUser, allUsers }) => {
  const [recipientAccount, setRecipientAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const otherUsers = allUsers.filter(u => u.accountNumber !== user.accountNumber);

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const transferAmount = parseFloat(amount);
    
    if (!transferAmount || transferAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (!recipientAccount) {
      toast.error('Please select a recipient');
      return;
    }

    if (transferAmount > user.balance) {
      toast.error('Insufficient funds');
      return;
    }

    const recipient = allUsers.find(u => u.accountNumber === recipientAccount);
    if (!recipient) {
      toast.error('Recipient account not found');
      return;
    }

    // Create transactions
    const senderTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'transfer_out',
      amount: transferAmount,
      date: new Date().toLocaleString(),
      description: description || `Transfer to ${recipient.fullName}`,
      balance: user.balance - transferAmount,
      toAccount: recipientAccount
    };

    const recipientTransaction: Transaction = {
      id: (Date.now() + 1).toString(),
      type: 'transfer_in',
      amount: transferAmount,
      date: new Date().toLocaleString(),
      description: description || `Transfer from ${user.fullName}`,
      balance: recipient.balance + transferAmount,
      fromAccount: user.accountNumber
    };

    // Update sender
    const updatedSender = {
      ...user,
      balance: user.balance - transferAmount,
      transactions: [senderTransaction, ...user.transactions]
    };

    // Update recipient
    const updatedRecipient = {
      ...recipient,
      balance: recipient.balance + transferAmount,
      transactions: [recipientTransaction, ...recipient.transactions]
    };

    // Update both users in the system
    onUpdateUser(updatedSender);
    
    // Update the recipient in allUsers array
    const updatedAllUsers = allUsers.map(u => 
      u.accountNumber === recipientAccount ? updatedRecipient : u
    );
    
    // Store updated users in localStorage
    localStorage.setItem('bankingUsers', JSON.stringify(updatedAllUsers));

    // Reset form
    setRecipientAccount('');
    setAmount('');
    setDescription('');
    
    toast.success(`Successfully transferred ₹${transferAmount.toFixed(2)} to ${recipient.fullName}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Send className="w-5 h-5 text-blue-600" />
            <span>Transfer Funds</span>
          </CardTitle>
          <CardDescription>
            Send money to another account. Available balance: {formatCurrency(user.balance)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTransfer} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient Account</Label>
              <Select value={recipientAccount} onValueChange={setRecipientAccount}>
                <SelectTrigger>
                  <SelectValue placeholder="Select recipient account" />
                </SelectTrigger>
                <SelectContent>
                  {otherUsers.map((otherUser) => (
                    <SelectItem key={otherUser.accountNumber} value={otherUser.accountNumber}>
                      <div className="flex flex-col">
                        <span className="font-medium">{otherUser.fullName}</span>
                        <span className="text-sm text-gray-500">Account: {otherUser.accountNumber}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {otherUsers.length === 0 && (
                <p className="text-sm text-gray-500">No other accounts available for transfer</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount to Transfer</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                max={user.balance}
                step="0.01"
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                type="text"
                placeholder="Enter transfer description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={50}
              />
            </div>

            {recipientAccount && amount && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-2">Transfer Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>From:</span>
                      <span>{user.fullName} ({user.accountNumber})</span>
                    </div>
                    <div className="flex justify-between">
                      <span>To:</span>
                      <span>
                        {otherUsers.find(u => u.accountNumber === recipientAccount)?.fullName} ({recipientAccount})
                      </span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Amount:</span>
                      <span>{formatCurrency(parseFloat(amount) || 0)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Remaining Balance:</span>
                      <span>{formatCurrency(user.balance - (parseFloat(amount) || 0))}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!recipientAccount || !amount || parseFloat(amount) > user.balance || otherUsers.length === 0}
            >
              Transfer {amount && `₹${parseFloat(amount).toFixed(2)}`}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FundTransfer;
