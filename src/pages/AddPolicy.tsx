
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useData } from '@/context/DataContext';
import { toast } from '@/components/ui/use-toast';

const policyTypes = ["Health", "Life", "Motor", "Travel", "Property", "Family", "Senior Citizen"];

const AddPolicy = () => {
  const navigate = useNavigate();
  const { addPolicy, advisers } = useData();
  
  const [formData, setFormData] = React.useState({
    policyNumber: `POL-${new Date().getFullYear()}-`,
    customerName: '',
    adviserId: 0,
    adviserName: '',
    policyType: '',
    sumInsured: 0,
    premium: 0,
    status: 'active' as 'active' | 'expired',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: Number(value)
    });
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleAdviserChange = (value: string) => {
    const selectedAdviser = advisers.find(a => a.id === Number(value));
    if (selectedAdviser) {
      setFormData({
        ...formData,
        adviserId: selectedAdviser.id,
        adviserName: selectedAdviser.name
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.policyNumber || !formData.customerName || !formData.adviserId || !formData.policyType) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (formData.premium <= 0 || formData.sumInsured <= 0) {
      toast({
        title: "Validation Error",
        description: "Premium and Sum Insured must be greater than 0.",
        variant: "destructive"
      });
      return;
    }
    
    // Add policy
    addPolicy(formData);
    
    toast({
      title: "Policy Added",
      description: `Policy for ${formData.customerName} has been added successfully.`
    });
    
    // Navigate back to policies list
    navigate('/policies');
  };

  return (
    <Layout title="Add New Policy">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Add New Policy</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="policyNumber">Policy Number *</Label>
                  <Input 
                    id="policyNumber"
                    name="policyNumber"
                    value={formData.policyNumber}
                    onChange={handleInputChange}
                    placeholder="Enter policy number"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name *</Label>
                  <Input 
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    placeholder="Enter customer name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="adviserId">Adviser *</Label>
                  <Select
                    onValueChange={handleAdviserChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select adviser" />
                    </SelectTrigger>
                    <SelectContent>
                      {advisers.filter(a => a.status === 'active').map(adviser => (
                        <SelectItem key={adviser.id} value={String(adviser.id)}>
                          {adviser.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="policyType">Policy Type *</Label>
                  <Select
                    onValueChange={(value) => handleSelectChange('policyType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select policy type" />
                    </SelectTrigger>
                    <SelectContent>
                      {policyTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sumInsured">Sum Insured (₹) *</Label>
                  <Input 
                    id="sumInsured"
                    name="sumInsured"
                    type="number"
                    min="0"
                    value={formData.sumInsured || ''}
                    onChange={handleNumberInputChange}
                    placeholder="Enter sum insured"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="premium">Premium Amount (₹) *</Label>
                  <Input 
                    id="premium"
                    name="premium"
                    type="number"
                    min="0"
                    value={formData.premium || ''}
                    onChange={handleNumberInputChange}
                    placeholder="Enter premium amount"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input 
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input 
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => navigate('/policies')}>
                Cancel
              </Button>
              <Button type="submit">Save Policy</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default AddPolicy;
