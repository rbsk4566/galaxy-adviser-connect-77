
import React, { useMemo } from 'react';
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
import { useData, Adviser, Policy } from '@/context/DataContext';
import { toast } from '@/components/ui/use-toast';

const AdviserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { advisers, policies } = useData();
  
  // Find the adviser by ID
  const adviser = useMemo(() => {
    return advisers.find(a => a.id === Number(id));
  }, [advisers, id]);

  // Get policies for this adviser
  const adviserPolicies = useMemo(() => {
    return policies.filter(policy => policy.adviserId === Number(id));
  }, [policies, id]);

  // Generate performance data (last 6 months)
  const performanceData = useMemo(() => {
    if (!adviserPolicies.length) return [];
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();
    const lastSixMonths = Array(6).fill(0).map((_, i) => {
      const month = new Date(currentDate);
      month.setMonth(currentDate.getMonth() - i);
      return {
        date: month,
        month: months[month.getMonth()],
        year: month.getFullYear(),
      };
    }).reverse();
    
    return lastSixMonths.map(monthData => {
      const monthPolicies = adviserPolicies.filter(policy => {
        const policyDate = new Date(policy.startDate);
        return policyDate.getMonth() === monthData.date.getMonth() && 
               policyDate.getFullYear() === monthData.date.getFullYear();
      });
      
      return {
        month: monthData.month,
        policies: monthPolicies.length,
        target: 4, // Example target
      };
    });
  }, [adviserPolicies]);
  
  // Calculate stats
  const totalPolicies = adviserPolicies.length;
  const currentMonthPolicies = adviserPolicies.filter(policy => {
    const policyDate = new Date(policy.startDate);
    const currentDate = new Date();
    return policyDate.getMonth() === currentDate.getMonth() &&
           policyDate.getFullYear() === currentDate.getFullYear();
  }).length;
  
  const totalPremium = adviserPolicies.reduce((sum, policy) => sum + policy.premium, 0);
  const targetAchievement = totalPolicies > 0 ? Math.min(Math.round((totalPolicies / 20) * 100), 100) : 0;
  
  // If adviser not found
  if (!adviser) {
    return (
      <Layout title="Adviser Not Found">
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-medium mb-2">Adviser not found</h2>
          <p className="mb-6 text-muted-foreground">The adviser you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/advisers')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Advisers
          </Button>
        </div>
      </Layout>
    );
  }

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
                    <Button 
                      variant="outline"
                      onClick={() => {
                        navigate(`/edit-adviser/${adviser.id}`);
                        toast({
                          title: "Feature coming soon",
                          description: "The edit adviser functionality is under development.",
                        });
                      }}
                    >
                      Edit Profile
                    </Button>
                    <Button onClick={() => {
                      navigator.clipboard.writeText(adviser.email);
                      toast({
                        title: "Email copied",
                        description: "Email address copied to clipboard.",
                      });
                    }}>
                      Contact
                    </Button>
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
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Joining Date</p>
                    <p className="font-medium">{new Date(adviser.joiningDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Region Manager</p>
                    <p className="font-medium">{adviser.region} Manager</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Target Achievement</p>
                    <div className="flex items-center mt-1">
                      <Progress value={targetAchievement} className="h-2 flex-1 mr-2" />
                      <span className="font-medium">{targetAchievement}%</span>
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
                    <BarChart data={performanceData}>
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
                  <p className="text-3xl font-bold">{totalPolicies}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="text-muted-foreground text-sm mb-1">This Month</h3>
                  <p className="text-3xl font-bold">{currentMonthPolicies}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="text-muted-foreground text-sm mb-1">Premium Generated</h3>
                  <p className="text-3xl font-bold">₹{(totalPremium / 100000).toFixed(1)}L</p>
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
                {adviserPolicies.length > 0 ? (
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
                        {adviserPolicies.map((policy) => (
                          <tr key={policy.id} className="border-b hover:bg-muted/50 cursor-pointer">
                            <td className="py-2 px-4">{policy.id}</td>
                            <td className="py-2 px-4">{policy.customerName}</td>
                            <td className="py-2 px-4">{policy.policyType}</td>
                            <td className="py-2 px-4">₹{policy.premium.toLocaleString()}</td>
                            <td className="py-2 px-4">{new Date(policy.startDate).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No policies found for this adviser.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdviserDetail;
