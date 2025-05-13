
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart as BarChartIcon, Users, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useNavigate } from 'react-router-dom';

// Sample data for demo purposes
const performanceData = [
  { name: 'Jan', value: 65 },
  { name: 'Feb', value: 72 },
  { name: 'Mar', value: 68 },
  { name: 'Apr', value: 84 },
  { name: 'May', value: 90 },
  { name: 'Jun', value: 85 },
];

const topAdvisers = [
  { id: 1, name: 'Rajesh Kumar', policies: 24, target: 30 },
  { id: 2, name: 'Priya Singh', policies: 22, target: 25 },
  { id: 3, name: 'Amit Patel', policies: 19, target: 20 },
];

const Index = () => {
  const navigate = useNavigate();
  
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
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground mt-1">12 new this quarter</p>
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
              <div className="text-2xl font-bold">318</div>
              <p className="text-xs text-muted-foreground mt-1">↑ 24 from last month</p>
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
              <div className="text-2xl font-bold">78%</div>
              <Progress value={78} className="mt-2" />
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
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Index;
