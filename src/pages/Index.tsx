
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart as BarChartIcon, Users, FileText, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext';

const Index = () => {
  const navigate = useNavigate();
  const { advisers, policies } = useData();
  const [performanceData, setPerformanceData] = React.useState<any[]>([]);
  const [topAdvisers, setTopAdvisers] = React.useState<any[]>([]);
  
  useEffect(() => {
    // Generate monthly performance data
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonth = new Date().getMonth();
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const month = (currentMonth - i + 12) % 12;
      return {
        name: monthNames[month],
        value: Math.floor(Math.random() * 30) + 60 // Random value between 60-90 for demo
      };
    }).reverse();
    
    setPerformanceData(last6Months);
    
    // Calculate top advisers
    const adviserPolicyCounts: Record<number, { id: number, name: string, policies: number, target: number }> = {};
    
    policies.forEach(policy => {
      if (!adviserPolicyCounts[policy.adviserId]) {
        const adviser = advisers.find(a => a.id === policy.adviserId);
        if (adviser) {
          adviserPolicyCounts[policy.adviserId] = {
            id: adviser.id,
            name: adviser.name,
            policies: 0,
            target: Math.floor(Math.random() * 10) + 20 // Random target between 20-30 for demo
          };
        }
      }
      
      if (adviserPolicyCounts[policy.adviserId]) {
        adviserPolicyCounts[policy.adviserId].policies += 1;
      }
    });
    
    const topAdvisersList = Object.values(adviserPolicyCounts)
      .sort((a, b) => b.policies - a.policies)
      .slice(0, 3);
    
    setTopAdvisers(topAdvisersList);
  }, [advisers, policies]);
  
  // Calculate total active policies
  const activePolicies = policies.filter(p => p.status === 'active').length;
  
  // Calculate quarterly target (for demo purposes, assuming a target of 30 policies per quarter)
  const quarterlyTarget = 30;
  const quarterlyProgress = Math.min(Math.round((activePolicies / quarterlyTarget) * 100), 100);
  
  return (
    <Layout title="Dashboard">
      <div className="grid gap-4 md:gap-6">
        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-sm animate-enter">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Advisers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{advisers.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {advisers.filter(a => a.status === 'active').length} active advisers
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-sm animate-enter" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Policies
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activePolicies}</div>
              <p className="text-xs text-muted-foreground mt-1">
                ₹{policies.reduce((sum, policy) => sum + policy.premium, 0).toLocaleString()} total premium
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-sm animate-enter" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Quarterly Target
              </CardTitle>
              <BarChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{quarterlyProgress}%</div>
              <Progress value={quarterlyProgress} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Performance chart */}
        <Card className="shadow-sm animate-enter" style={{ animationDelay: "0.3s" }}>
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0047AB" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Advisers */}
        <Card className="shadow-sm animate-enter" style={{ animationDelay: "0.4s" }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Top Performing Advisers</CardTitle>
            <button 
              onClick={() => navigate('/advisers')}
              className="text-sm text-galaxy-blue hover:underline"
            >
              View all
            </button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topAdvisers.map((adviser) => (
                <div key={adviser.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{adviser.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {adviser.policies} policies (Target: {adviser.target})
                    </p>
                  </div>
                  <Progress 
                    value={(adviser.policies / adviser.target) * 100} 
                    className="w-24" 
                  />
                </div>
              ))}
              
              {topAdvisers.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No adviser data available.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Index;
