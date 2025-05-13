
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Sample advisers data
const advisersData = [
  { 
    id: 1, 
    name: 'Rajesh Kumar', 
    email: 'rajesh.kumar@example.com', 
    phone: '+91 9876543210', 
    status: 'active',
    region: 'North',
    policiesCount: 24,
    targetAchievement: 80,
    initials: 'RK'
  },
  { 
    id: 2, 
    name: 'Priya Singh', 
    email: 'priya.singh@example.com', 
    phone: '+91 9876543211', 
    status: 'active',
    region: 'South',
    policiesCount: 22,
    targetAchievement: 88,
    initials: 'PS'
  },
  { 
    id: 3, 
    name: 'Amit Patel', 
    email: 'amit.patel@example.com', 
    phone: '+91 9876543212', 
    status: 'active',
    region: 'West',
    policiesCount: 19,
    targetAchievement: 95,
    initials: 'AP'
  },
  { 
    id: 4, 
    name: 'Sneha Reddy', 
    email: 'sneha.reddy@example.com', 
    phone: '+91 9876543213', 
    status: 'inactive',
    region: 'South',
    policiesCount: 16,
    targetAchievement: 64,
    initials: 'SR'
  },
  { 
    id: 5, 
    name: 'Vikram Mehta', 
    email: 'vikram.mehta@example.com', 
    phone: '+91 9876543214', 
    status: 'active',
    region: 'East',
    policiesCount: 14,
    targetAchievement: 70,
    initials: 'VM'
  },
];

const Advisers = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const navigate = useNavigate();
  
  const filteredAdvisers = advisersData.filter(adviser => 
    adviser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    adviser.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    adviser.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title="Advisers Directory">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search advisers..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button>Add New Adviser</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAdvisers.map((adviser) => (
            <Card 
              key={adviser.id} 
              className={`shadow-sm hover:shadow-md transition-shadow cursor-pointer animate-enter ${
                adviser.status === 'inactive' ? 'opacity-70' : ''
              }`}
              onClick={() => navigate(`/adviser/${adviser.id}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 border-2 border-galaxy-blue">
                    <AvatarFallback className="bg-galaxy-blue text-white">
                      {adviser.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{adviser.name}</h3>
                        <p className="text-sm text-muted-foreground">{adviser.region} Region</p>
                      </div>
                      <Badge variant={adviser.status === 'active' ? 'default' : 'secondary'}>
                        {adviser.status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center text-sm">
                        <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                        <span>{adviser.phone}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                        <span>{adviser.email}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex justify-between text-sm">
                        <span>Policies: {adviser.policiesCount}</span>
                        <span>Target: {adviser.targetAchievement}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Advisers;
