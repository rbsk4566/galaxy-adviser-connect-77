
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, Search, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData, Adviser } from '@/context/DataContext';
import { toast } from '@/components/ui/use-toast';

const Advisers = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const navigate = useNavigate();
  const { advisers, deleteAdviser } = useData();
  
  const filteredAdvisers = advisers.filter(adviser => 
    adviser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    adviser.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    adviser.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteAdviser = (adviser: Adviser, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete ${adviser.name}?`)) {
      deleteAdviser(adviser.id);
      toast({
        title: "Adviser deleted",
        description: `${adviser.name} has been deleted successfully.`,
      });
    }
  };

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
          <Button onClick={() => navigate('/add-adviser')}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add New Adviser
          </Button>
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
                    
                    <div className="mt-3 pt-3 border-t flex justify-between items-center">
                      <div className="text-sm">
                        <span>Joined: {new Date(adviser.joiningDate).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={(e) => handleDeleteAdviser(adviser, e)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredAdvisers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No advisers found. Try adjusting your search or add a new adviser.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Advisers;
