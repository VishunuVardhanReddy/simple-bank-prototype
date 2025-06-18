
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Shield, Users, TrendingUp, Star, ArrowRight, Banknote, Send, FileText } from 'lucide-react';

interface HomeProps {
  onNavigateToLogin: () => void;
  onNavigateToRegister: () => void;
}

const Home: React.FC<HomeProps> = ({ onNavigateToLogin, onNavigateToRegister }) => {
  const features = [
    {
      icon: Shield,
      title: "Secure Banking",
      description: "Advanced security with password protection and encrypted data storage"
    },
    {
      icon: CreditCard,
      title: "Account Management",
      description: "Comprehensive account management with unique account numbers and balance tracking"
    },
    {
      icon: Send,
      title: "Fund Transfer",
      description: "Easy money transfers between accounts with real-time balance updates"
    },
    {
      icon: FileText,
      title: "Account Statements",
      description: "Detailed transaction history with downloadable statements"
    },
    {
      icon: Users,
      title: "User Registration",
      description: "Simple and secure user registration process"
    },
    {
      icon: TrendingUp,
      title: "Real-time Updates",
      description: "Instant balance updates and transaction confirmations"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  SecureBank
                </h1>
                <p className="text-xs text-gray-500">Banking Information System</p>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                className="flex items-center space-x-2 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200"
                onClick={onNavigateToLogin}
              >
                <Banknote className="w-4 h-4" />
                <span className="hidden sm:block">Deposit Funds</span>
              </Button>
              <Button 
                variant="ghost" 
                className="flex items-center space-x-2 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                onClick={onNavigateToLogin}
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:block">Transfer Money</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={onNavigateToLogin}
                className="border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
              >
                Login
              </Button>
              <Button 
                onClick={onNavigateToRegister}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full px-6 py-2 mb-8">
            <Star className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Advanced Banking Prototype</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            Modern Banking
            <br />
            Information System
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Experience the future of banking with our comprehensive prototype featuring secure account management, 
            seamless transactions, and real-time fund transfers - all powered by modern web technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={onNavigateToRegister}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Open Account Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              onClick={onNavigateToLogin}
              variant="outline" 
              size="lg"
              className="border-2 border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
            >
              Access Your Account
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose SecureBank?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our banking system prototype showcases cutting-edge features designed for modern financial management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 hover:from-purple-50 hover:to-blue-50"
              >
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-200">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Description */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-purple-50 to-blue-50">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                About This Project
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                A comprehensive Banking Information System prototype
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                This Banking Information System is a sophisticated prototype developed to demonstrate the core 
                functionalities of a modern banking platform. Built with cutting-edge web technologies, it showcases 
                the essential features required for secure and efficient financial management.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-purple-700">Core Features:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>Secure user registration and authentication</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Real-time account balance management</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Deposit and withdrawal operations</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>Inter-account fund transfers</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-blue-700">Technical Highlights:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Modern React with TypeScript</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Responsive design with Tailwind CSS</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>Local data persistence</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Comprehensive error handling</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="pt-6 border-t border-purple-200">
                <p className="text-sm text-gray-600 text-center">
                  This prototype serves as a foundation for developing a complete banking system, 
                  demonstrating key functionalities while maintaining security and user experience standards.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience Modern Banking?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust SecureBank for their financial needs. 
            Open your account today and experience the future of banking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onNavigateToRegister}
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Create Account
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              onClick={onNavigateToLogin}
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 transition-all duration-200"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
