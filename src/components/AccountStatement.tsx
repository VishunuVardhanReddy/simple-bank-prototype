import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, ArrowUpRight, ArrowDownLeft, ArrowRightLeft } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

interface AccountStatementProps {
  user: User;
}

const AccountStatement: React.FC<AccountStatementProps> = ({ user }) => {
  const [filter, setFilter] = useState<'all' | 'deposit' | 'withdrawal' | 'transfer'>('all');

  const filteredTransactions = user.transactions.filter(transaction => {
    if (filter === 'all') return true;
    if (filter === 'transfer') return transaction.type === 'transfer_in' || transaction.type === 'transfer_out';
    return transaction.type === filter;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowUpRight className="w-4 h-4 text-green-600" />;
      case 'withdrawal':
        return <ArrowDownLeft className="w-4 h-4 text-red-600" />;
      case 'transfer_in':
      case 'transfer_out':
        return <ArrowRightLeft className="w-4 h-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'deposit':
      case 'transfer_in':
        return 'text-green-600';
      case 'withdrawal':
      case 'transfer_out':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTransactionBadgeColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'bg-green-100 text-green-800';
      case 'withdrawal':
        return 'bg-red-100 text-red-800';
      case 'transfer_in':
      case 'transfer_out':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const downloadStatement = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(18);
    doc.setTextColor(80, 80, 80);
    doc.text('SecureBank - Account Statement', 20, 20);
    
    // Account details
    doc.setFontSize(12);
    doc.text(`Account Number: ${user.accountNumber}`, 20, 35);
    doc.text(`Account Holder: ${user.fullName}`, 20, 45);
    doc.text(`Statement Date: ${new Date().toLocaleDateString('en-IN')}`, 20, 55);
    doc.text(`Current Balance: ${formatCurrency(user.balance)}`, 20, 65);
    
    // Line separator
    doc.line(20, 75, 190, 75);
    
    // Table data
    const tableData = filteredTransactions.map(transaction => [
      transaction.date,
      transaction.description,
      transaction.type === 'deposit' || transaction.type === 'transfer_in' ? 'Credit' : 'Debit',
      transaction.type === 'deposit' || transaction.type === 'transfer_in' 
        ? formatCurrency(transaction.amount) 
        : '-',
      transaction.type === 'withdrawal' || transaction.type === 'transfer_out' 
        ? formatCurrency(transaction.amount) 
        : '-',
      formatCurrency(transaction.balance)
    ]);
    
    // Table
    (doc as any).autoTable({
      head: [['Date', 'Description', 'Type', 'Credit', 'Debit', 'Balance']],
      body: tableData,
      startY: 85,
      styles: {
        fontSize: 10,
        cellPadding: 3
      },
      headStyles: {
        fillColor: [59, 130, 246],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250]
      },
      columnStyles: {
        3: { halign: 'right' }, // Credit column
        4: { halign: 'right' }, // Debit column
        5: { halign: 'right' }  // Balance column
      }
    });
    
    // Save the PDF
    doc.save(`account_statement_${user.accountNumber}.pdf`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Account Statement</CardTitle>
              <CardDescription>
                Account #{user.accountNumber} - {user.fullName}
              </CardDescription>
            </div>
            <Button onClick={downloadStatement} variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-gray-500">Current Balance</p>
                <p className="text-lg font-semibold text-green-600">{formatCurrency(user.balance)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Total Transactions</p>
                <p className="text-lg font-semibold">{user.transactions.length}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Total Deposits</p>
                <p className="text-lg font-semibold text-green-600">
                  {formatCurrency(
                    user.transactions
                      .filter(t => t.type === 'deposit' || t.type === 'transfer_in')
                      .reduce((sum, t) => sum + t.amount, 0)
                  )}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Total Withdrawals</p>
                <p className="text-lg font-semibold text-red-600">
                  {formatCurrency(
                    user.transactions
                      .filter(t => t.type === 'withdrawal' || t.type === 'transfer_out')
                      .reduce((sum, t) => sum + t.amount, 0)
                  )}
                </p>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {['all', 'deposit', 'withdrawal', 'transfer'].map((filterType) => (
                <Button
                  key={filterType}
                  variant={filter === filterType ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(filterType as any)}
                  className="capitalize"
                >
                  {filterType === 'all' ? 'All Transactions' : filterType}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            {filteredTransactions.length} transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No transactions found</p>
              </div>
            ) : (
              filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 rounded-full">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-medium">{transaction.description}</p>
                        <Badge className={`text-xs ${getTransactionBadgeColor(transaction.type)}`}>
                          {transaction.type.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                      {(transaction.fromAccount || transaction.toAccount) && (
                        <p className="text-xs text-gray-400">
                          {transaction.fromAccount && `From: ${transaction.fromAccount}`}
                          {transaction.toAccount && `To: ${transaction.toAccount}`}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                      {(transaction.type === 'deposit' || transaction.type === 'transfer_in') ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Balance: {formatCurrency(transaction.balance)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountStatement;
