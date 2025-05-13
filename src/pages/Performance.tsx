
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, LineChart, Line } from 'recharts';

// Sample performance data
const monthlyData = [
  { name: 'Jan', policies: 42, revenue: 1200000, target: 50 },
  { name: 'Feb', policies: 38, revenue: 1100000, target: 50 },
  { name: 'Mar', policies: 45, revenue: 1300000, target: 50 },
  { name: 'Apr', policies: 40, revenue: 1150000, target: 50 },
  { name: 'May', policies: 53, revenue: 1500000, target: 50 },
  { name: 'Jun', policies: 48, revenue: 1400000, target: 50 },
];

const quarterlyData = [
  { name: 'Q1', policies: 125, revenue: 3600000, target: 150 },
  { name: 'Q2', policies: 141, revenue: 4050000, target: 150 },
  { name: 'Q3', policies: 132, revenue: 3800000, target: 150 },
  { name: 'Q4', policies: 156, revenue: 4500000, target: 150 },
];

const regionPerformance = [
  { region: 'North', policies: 124, achievement: 82 },
  { region: 'South', policies: 156, achievement: 95 },
  { region: 'East', policies: 98, achievement: 76 },
  { region: 'West', policies: 118, achievement: 84 },
];

const Performance = () => {
  const [timeRange, setTimeRange] = React.useState('monthly');
  const [year, setYear] = React.useState('2024');

  const currentData = timeRange === 'monthly' ? monthlyData : quarterlyData;

  return (
    <Layout title="Performance Analytics">
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <Tabs defaultValue="policies" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="policies">Policies</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
            </TabsList>
            <TabsContent value="policies" className="pt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Policies Performance</CardTitle>
                  <div className="flex items-center gap-2">
                    <Select value={timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Time Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={year} onValueChange={setYear}>
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={currentData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="policies" name="Policies Sold" fill="#0047AB" />
                        <Bar yAxisId="right" dataKey="target" name="Target" fill="#D4AF37" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="revenue" className="pt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Revenue Performance</CardTitle>
                  <div className="flex items-center gap-2">
                    <Select value={timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Time Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={year} onValueChange={setYear}>
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={currentData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`₹${(value).toLocaleString()}`, 'Revenue']}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" name="Revenue (₹)" stroke="#0047AB" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Regional Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Regional Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {regionPerformance.map((region) => (
                  <div key={region.region} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{region.region} Region</span>
                      <span className="text-muted-foreground">{region.policies} Policies</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={region.achievement} className="flex-1" />
                      <span className="text-sm font-medium w-10 text-right">
                        {region.achievement}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Achievement Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Achievement Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-muted/50">
                  <CardContent className="p-4 text-center">
                    <h3 className="text-muted-foreground text-sm mb-1">Total Policies</h3>
                    <p className="text-2xl font-bold">554</p>
                    <p className="text-xs text-muted-foreground mt-1">Target: 600</p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/50">
                  <CardContent className="p-4 text-center">
                    <h3 className="text-muted-foreground text-sm mb-1">Achievement</h3>
                    <p className="text-2xl font-bold">92%</p>
                    <p className="text-xs text-emerald-600 mt-1">+5% from last year</p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/50">
                  <CardContent className="p-4 text-center">
                    <h3 className="text-muted-foreground text-sm mb-1">Revenue</h3>
                    <p className="text-2xl font-bold">₹15.9M</p>
                    <p className="text-xs text-emerald-600 mt-1">+12% from last year</p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/50">
                  <CardContent className="p-4 text-center">
                    <h3 className="text-muted-foreground text-sm mb-1">Active Advisers</h3>
                    <p className="text-2xl font-bold">38</p>
                    <p className="text-xs text-emerald-600 mt-1">+4 from last year</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Performance;
