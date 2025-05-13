
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { format } from 'date-fns';

// Sample policies data
const policiesData = [
  { 
    id: 'POL-2024-001',
    customerName: 'Arun Sharma',
    adviserId: 1,
    adviserName: 'Rajesh Kumar',
    policyType: 'Health',
    premium: 12000,
    status: 'active',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2025-01-14'),
  },
  { 
    id: 'POL-2024-002',
    customerName: 'Meena Patel',
    adviserId: 3,
    adviserName: 'Amit Patel',
    policyType: 'Life',
    premium: 25000,
    status: 'active',
    startDate: new Date('2024-01-20'),
    endDate: new Date('2025-01-19'),
  },
  { 
    id: 'POL-2024-003',
    customerName: 'Suresh Gupta',
    adviserId: 2,
    adviserName: 'Priya Singh',
    policyType: 'Motor',
    premium: 8500,
    status: 'active',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2025-01-31'),
  },
  { 
    id: 'POL-2024-004',
    customerName: 'Kavita Reddy',
    adviserId: 2,
    adviserName: 'Priya Singh',
    policyType: 'Travel',
    premium: 3500,
    status: 'expired',
    startDate: new Date('2024-02-10'),
    endDate: new Date('2024-03-10'),
  },
  { 
    id: 'POL-2024-005',
    customerName: 'Rahul Verma',
    adviserId: 1,
    adviserName: 'Rajesh Kumar',
    policyType: 'Health',
    premium: 15000,
    status: 'active',
    startDate: new Date('2024-02-15'),
    endDate: new Date('2025-02-14'),
  },
  { 
    id: 'POL-2024-006',
    customerName: 'Neha Joshi',
    adviserId: 5,
    adviserName: 'Vikram Mehta',
    policyType: 'Life',
    premium: 32000,
    status: 'active',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2025-02-28'),
  },
  { 
    id: 'POL-2024-007',
    customerName: 'Sanjay Malhotra',
    adviserId: 3,
    adviserName: 'Amit Patel',
    policyType: 'Motor',
    premium: 9800,
    status: 'active',
    startDate: new Date('2024-03-10'),
    endDate: new Date('2025-03-09'),
  },
];

const policyTypeCounts = [
  { type: 'Health', count: 156 },
  { type: 'Life', count: 98 },
  { type: 'Motor', count: 112 },
  { type: 'Travel', count: 42 },
  { type: 'Property', count: 28 },
];

const Policies = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filter, setFilter] = React.useState('all');
  
  const filteredPolicies = policiesData.filter(policy => {
    const matchesSearch = 
      policy.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      policy.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.adviserName.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (filter === 'all') return matchesSearch;
    return matchesSearch && policy.status === filter;
  });

  return (
    <Layout title="Policies Management">
      <div className="space-y-6">
        {/* Policy type summary */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {policyTypeCounts.map(item => (
            <Card key={item.type} className="shadow-sm">
              <CardContent className="p-4 text-center">
                <h3 className="font-medium">{item.type}</h3>
                <p className="text-2xl font-bold mt-1">{item.count}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Policy search and filters */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Policy Database</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search policies..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-4">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
                <Button>Export</Button>
              </div>
            </div>
            
            {/* Policies table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 font-medium">Policy ID</th>
                    <th className="text-left py-2 px-4 font-medium">Customer</th>
                    <th className="text-left py-2 px-4 font-medium">Adviser</th>
                    <th className="text-left py-2 px-4 font-medium">Type</th>
                    <th className="text-left py-2 px-4 font-medium">Premium</th>
                    <th className="text-left py-2 px-4 font-medium">Validity</th>
                    <th className="text-left py-2 px-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPolicies.map((policy) => (
                    <tr key={policy.id} className="border-b hover:bg-muted/50 cursor-pointer">
                      <td className="py-2 px-4">{policy.id}</td>
                      <td className="py-2 px-4">{policy.customerName}</td>
                      <td className="py-2 px-4">{policy.adviserName}</td>
                      <td className="py-2 px-4">{policy.policyType}</td>
                      <td className="py-2 px-4">₹{policy.premium.toLocaleString()}</td>
                      <td className="py-2 px-4">
                        {format(policy.startDate, 'dd/MM/yyyy')} - {format(policy.endDate, 'dd/MM/yyyy')}
                      </td>
                      <td className="py-2 px-4">
                        <Badge variant={policy.status === 'active' ? 'default' : 'secondary'}>
                          {policy.status === 'active' ? 'Active' : 'Expired'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredPolicies.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No policies match your search.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Policies;
