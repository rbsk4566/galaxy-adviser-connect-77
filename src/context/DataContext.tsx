
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types
export type Adviser = {
  id: number;
  name: string;
  phone: string;
  email: string;
  joiningDate: string;
  region: string;
  status: 'active' | 'inactive';
  initials: string;
};

export type Policy = {
  id: string;
  policyNumber: string;
  customerName: string;
  adviserId: number;
  adviserName: string;
  policyType: string;
  sumInsured: number;
  premium: number;
  status: 'active' | 'expired';
  startDate: string;
  endDate: string;
};

type DataContextType = {
  advisers: Adviser[];
  policies: Policy[];
  addAdviser: (adviser: Omit<Adviser, 'id' | 'initials'>) => void;
  updateAdviser: (adviser: Adviser) => void;
  deleteAdviser: (id: number) => void;
  addPolicy: (policy: Omit<Policy, 'id'>) => void;
  updatePolicy: (policy: Policy) => void;
  deletePolicy: (id: string) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [advisers, setAdvisers] = useState<Adviser[]>([]);
  const [policies, setPolicies] = useState<Policy[]>([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedAdvisers = localStorage.getItem('advisers');
    const storedPolicies = localStorage.getItem('policies');

    if (storedAdvisers) {
      setAdvisers(JSON.parse(storedAdvisers));
    } else {
      // Sample advisers data for first launch
      setAdvisers([
        { 
          id: 1, 
          name: 'Rajesh Kumar', 
          email: 'rajesh.kumar@example.com', 
          phone: '+91 9876543210', 
          status: 'active',
          region: 'North',
          joiningDate: '2024-01-15',
          initials: 'RK'
        },
        { 
          id: 2, 
          name: 'Priya Singh', 
          email: 'priya.singh@example.com', 
          phone: '+91 9876543211', 
          status: 'active',
          region: 'South',
          joiningDate: '2024-01-20',
          initials: 'PS'
        },
        { 
          id: 3, 
          name: 'Amit Patel', 
          email: 'amit.patel@example.com', 
          phone: '+91 9876543212', 
          status: 'active',
          region: 'West',
          joiningDate: '2024-02-01',
          initials: 'AP'
        },
        { 
          id: 4, 
          name: 'Sneha Reddy', 
          email: 'sneha.reddy@example.com', 
          phone: '+91 9876543213', 
          status: 'inactive',
          region: 'South',
          joiningDate: '2023-11-10',
          initials: 'SR'
        },
        { 
          id: 5, 
          name: 'Vikram Mehta', 
          email: 'vikram.mehta@example.com', 
          phone: '+91 9876543214', 
          status: 'active',
          region: 'East',
          joiningDate: '2023-12-05',
          initials: 'VM'
        },
      ]);
    }

    if (storedPolicies) {
      setPolicies(JSON.parse(storedPolicies));
    } else {
      // Sample policies data for first launch
      setPolicies([
        { 
          id: 'POL-2024-001',
          policyNumber: 'POL-2024-001',
          customerName: 'Arun Sharma',
          adviserId: 1,
          adviserName: 'Rajesh Kumar',
          policyType: 'Health',
          sumInsured: 500000,
          premium: 12000,
          status: 'active',
          startDate: '2024-01-15',
          endDate: '2025-01-14',
        },
        { 
          id: 'POL-2024-002',
          policyNumber: 'POL-2024-002',
          customerName: 'Meena Patel',
          adviserId: 3,
          adviserName: 'Amit Patel',
          policyType: 'Life',
          sumInsured: 1000000,
          premium: 25000,
          status: 'active',
          startDate: '2024-01-20',
          endDate: '2025-01-19',
        },
        { 
          id: 'POL-2024-003',
          policyNumber: 'POL-2024-003',
          customerName: 'Suresh Gupta',
          adviserId: 2,
          adviserName: 'Priya Singh',
          policyType: 'Motor',
          sumInsured: 300000,
          premium: 8500,
          status: 'active',
          startDate: '2024-02-01',
          endDate: '2025-01-31',
        },
        { 
          id: 'POL-2024-004',
          policyNumber: 'POL-2024-004',
          customerName: 'Kavita Reddy',
          adviserId: 2,
          adviserName: 'Priya Singh',
          policyType: 'Travel',
          sumInsured: 100000,
          premium: 3500,
          status: 'expired',
          startDate: '2024-02-10',
          endDate: '2024-03-10',
        },
      ]);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('advisers', JSON.stringify(advisers));
  }, [advisers]);

  useEffect(() => {
    localStorage.setItem('policies', JSON.stringify(policies));
  }, [policies]);

  // Helper function to generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const addAdviser = (adviser: Omit<Adviser, 'id' | 'initials'>) => {
    const newAdviser = {
      ...adviser,
      id: advisers.length > 0 ? Math.max(...advisers.map(a => a.id)) + 1 : 1,
      initials: getInitials(adviser.name)
    };
    setAdvisers([...advisers, newAdviser]);
  };

  const updateAdviser = (updatedAdviser: Adviser) => {
    setAdvisers(advisers.map(adviser => 
      adviser.id === updatedAdviser.id ? {...updatedAdviser, initials: getInitials(updatedAdviser.name)} : adviser
    ));

    // Update adviser name in policies
    if (updatedAdviser.name) {
      setPolicies(policies.map(policy => 
        policy.adviserId === updatedAdviser.id ? {...policy, adviserName: updatedAdviser.name} : policy
      ));
    }
  };

  const deleteAdviser = (id: number) => {
    setAdvisers(advisers.filter(adviser => adviser.id !== id));
  };

  const addPolicy = (policy: Omit<Policy, 'id'>) => {
    // Generate a new policy ID with the current year and a sequential number
    const currentYear = new Date().getFullYear();
    const policyCount = policies.filter(p => p.id.includes(`POL-${currentYear}`)).length;
    const newId = `POL-${currentYear}-${String(policyCount + 1).padStart(3, '0')}`;
    
    setPolicies([...policies, { ...policy, id: newId }]);
  };

  const updatePolicy = (updatedPolicy: Policy) => {
    setPolicies(policies.map(policy => 
      policy.id === updatedPolicy.id ? updatedPolicy : policy
    ));
  };

  const deletePolicy = (id: string) => {
    setPolicies(policies.filter(policy => policy.id !== id));
  };

  return (
    <DataContext.Provider value={{ 
      advisers, 
      policies, 
      addAdviser, 
      updateAdviser, 
      deleteAdviser,
      addPolicy,
      updatePolicy,
      deletePolicy
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
