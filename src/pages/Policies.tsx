
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, FilePlus, Trash2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useData, Policy } from '@/context/DataContext';
import { toast } from '@/components/ui/use-toast';

const Policies = () => {
  const navigate = useNavigate();
  const { policies, deletePolicy } = useData();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filter, setFilter] = React.useState('all');
  const [policyTypeFilter, setPolicyTypeFilter] = React.useState('all');
  
  const policyTypes = Array.from(new Set(policies.map(policy => policy.policyType)));
  
  // Count policies by type
  const policyTypeCounts = policyTypes.reduce((acc: Record<string, number>, type) => {
    acc[type] = policies.filter(p => p.policyType === type).length;
    return acc;
  }, {});
  
  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = 
      policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
      policy.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.adviserName.toLowerCase().includes(searchTerm.toLowerCase());
      
    const statusMatch = filter === 'all' || policy.status === filter;
    const typeMatch = policyTypeFilter === 'all' || policy.policyType === policyTypeFilter;
    
    return matchesSearch && statusMatch && typeMatch;
  });

  const handleDeletePolicy = (policy: Policy, e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm(`Are you sure you want to delete policy ${policy.policyNumber}?`)) {
      deletePolicy(policy.id);
      toast({
        title: "Policy deleted",
        description: `Policy ${policy.policyNumber} has been deleted successfully.`,
      });
    }
  };

  return (
    <Layout title="Policies Management">
      <div className="space-y-6">
        {/* Policy type summary */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {Object.entries(policyTypeCounts).map(([type, count]) => (
            <Card 
              key={type} 
              className={`shadow-sm cursor-pointer ${policyTypeFilter === type ? 'border-2 border-galaxy-blue' : ''}`}
              onClick={() => setPolicyTypeFilter(type === policyTypeFilter ? 'all' : type)}
            >
              <CardContent className="p-4 text-center">
                <h3 className="font-medium">{type}</h3>
                <p className="text-2xl font-bold mt-1">{count}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Policy search and filters */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Policy Database</CardTitle>
            <Button onClick={() => navigate('/add-policy')}>
              <FilePlus className="h-4 w-4 mr-2" />
              Add New Policy
            </Button>
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
                <Button variant="outline">Export</Button>
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
                    <th className="text-left py-2 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPolicies.map((policy) => (
                    <tr key={policy.id} className="border-b hover:bg-muted/50">
                      <td className="py-2 px-4">{policy.policyNumber}</td>
                      <td className="py-2 px-4">{policy.customerName}</td>
                      <td className="py-2 px-4">{policy.adviserName}</td>
                      <td className="py-2 px-4">{policy.policyType}</td>
                      <td className="py-2 px-4">₹{policy.premium.toLocaleString()}</td>
                      <td className="py-2 px-4">
                        {format(new Date(policy.startDate), 'dd/MM/yyyy')} - {format(new Date(policy.endDate), 'dd/MM/yyyy')}
                      </td>
                      <td className="py-2 px-4">
                        <Badge variant={policy.status === 'active' ? 'default' : 'secondary'}>
                          {policy.status === 'active' ? 'Active' : 'Expired'}
                        </Badge>
                      </td>
                      <td className="py-2 px-4">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          onClick={(e) => handleDeletePolicy(policy, e)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
