
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Phone, Mail, MapPin, ArrowLeft } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Sample adviser data
const adviserData = {
  id: 1,
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@example.com',
  phone: '+91 9876543210',
  address: '42, Park Street, Bangalore - 560001',
  status: 'active',
  region: 'North',
  joiningDate: 'January 12, 2022',
  manager: 'Sripal Reddy',
  targetAchievement: 80,
  initials: 'RK',
  policies: [
    { id: 'POL-2024-001', customer: 'Arun Sharma', type: 'Health', premium: 12000, date: '15 Jan 2024' },
    { id: 'POL-2024-005', customer: 'Rahul Verma', type: 'Health', premium: 15000, date: '15 Feb 2024' },
    { id: 'POL-2024-010', customer: 'Divya Mehta', type: 'Life', premium: 28000, date: '5 Mar 2024' },
    { id: 'POL-2024-015', customer: 'Vikash Singh', type: 'Motor', premium: 7500, date: '22 Mar 2024' },
  ],
  performance: [
    { month: 'Jan', policies: 6, target: 8 },
    { month: 'Feb', policies: 5, target: 8 },
    { month: 'Mar', policies: 9, target: 8 },
    { month: 'Apr', policies: 7, target: 8 },
    { month: 'May', policies: 8, target: 8 },
    { month: 'Jun', policies: 10, target: 8 },
  ]
};

const AdviserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // In a real app, we'd fetch the adviser data based on the ID
  const adviser = adviserData;
  
  return (
    <Layout title="Adviser Details">
      <div className="space-y-6">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/advisers')}
          className="mb-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Advisers
        </Button>
        
        {/* Adviser Profile Card */}
        <Card className="shadow-sm animate-enter">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 border-2 border-galaxy-blue mb-3">
                  <AvatarFallback className="bg-galaxy-blue text-white text-xl">
                    {adviser.initials}
                  </AvatarFallback>
                </Avatar>
                <Badge variant={adviser.status === 'active' ? 'default' : 'secondary'}>
                  {adviser.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">{adviser.name}</h2>
                    <p className="text-muted-foreground">{adviser.region} Region</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Edit Profile</Button>
                    <Button>Contact</Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 mt-4">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{adviser.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{adviser.email}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{adviser.address}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Joining Date</p>
                    <p className="font-medium">{adviser.joiningDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Reporting Manager</p>
                    <p className="font-medium">{adviser.manager}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Target Achievement</p>
                    <div className="flex items-center mt-1">
                      <Progress value={adviser.targetAchievement} className="h-2 flex-1 mr-2" />
                      <span className="font-medium">{adviser.targetAchievement}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Tabs for Performance and Policies */}
        <Tabs defaultValue="performance" className="animate-enter" style={{ animationDelay: "0.2s" }}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={adviser.performance}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="policies" name="Policies Sold" fill="#0047AB" />
                      <Bar dataKey="target" name="Target" fill="#D4AF37" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="text-muted-foreground text-sm mb-1">Total Policies</h3>
                  <p className="text-3xl font-bold">45</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="text-muted-foreground text-sm mb-1">This Month</h3>
                  <p className="text-3xl font-bold">10</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="text-muted-foreground text-sm mb-1">Premium Generated</h3>
                  <p className="text-3xl font-bold">₹12.5L</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="policies" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Policies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4 font-medium">Policy ID</th>
                        <th className="text-left py-2 px-4 font-medium">Customer</th>
                        <th className="text-left py-2 px-4 font-medium">Type</th>
                        <th className="text-left py-2 px-4 font-medium">Premium</th>
                        <th className="text-left py-2 px-4 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adviser.policies.map((policy) => (
                        <tr key={policy.id} className="border-b hover:bg-muted/50 cursor-pointer">
                          <td className="py-2 px-4">{policy.id}</td>
                          <td className="py-2 px-4">{policy.customer}</td>
                          <td className="py-2 px-4">{policy.type}</td>
                          <td className="py-2 px-4">₹{policy.premium.toLocaleString()}</td>
                          <td className="py-2 px-4">{policy.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdviserDetail;
