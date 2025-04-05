export const MOCK_ISSUES = [
    {
      id: '1',
      title: 'Audio equipment failure',
      description: 'Main stage left speaker not working properly',
      location: 'Main Stage',
      severity: 'critical',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      status: 'pending',
      reportedBy: 'John Smith',
      category: 'Technical',
      notificationsSent: [
        {
          id: '101',
          type: 'sms',
          recipient: '+1234567890',
          message: 'CRITICAL: Audio equipment failure at Main Stage',
          timestamp: new Date(Date.now() - 1000 * 60 * 4.5),
          status: 'delivered',
          issueId: '1',
        },
        {
          id: '102',
          type: 'push',
          recipient: 'Technical Team',
          message: 'CRITICAL: Audio equipment failure at Main Stage',
          timestamp: new Date(Date.now() - 1000 * 60 * 4.5),
          status: 'delivered',
          issueId: '1',
        },
      ],
    },
    {
      id: '2',
      title: 'Queue too long',
      description: 'Entrance B has a queue of 100+ people waiting',
      location: 'Entrance B',
      severity: 'high',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      status: 'in-progress',
      assignedTo: 'Sarah Johnson',
      reportedBy: 'Mike Wilson',
      category: 'Crowd Management',
      notificationsSent: [
        {
          id: '103',
          type: 'push',
          recipient: 'Security Team',
          message: 'HIGH: Long queue at Entrance B',
          timestamp: new Date(Date.now() - 1000 * 60 * 14.5),
          status: 'delivered',
          issueId: '2',
        },
      ],
    },
    {
      id: '3',
      title: 'VIP guest arrived',
      description: 'Media personality needs escort to VIP area',
      location: 'Entrance A',
      severity: 'medium',
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      status: 'pending',
      reportedBy: 'Lisa Chen',
      category: 'VIP',
      notificationsSent: [],
    },
    {
      id: '4',
      title: 'Merchandise stock low',
      description: 'T-shirts in size M and L are almost sold out',
      location: 'Merchandise Booth 2',
      severity: 'low',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      status: 'pending',
      reportedBy: 'Daniel Brown',
      category: 'Inventory',
      notificationsSent: [],
    },
    {
      id: '5',
      title: 'Medical assistance needed',
      description: 'Attendee feeling dizzy near food court',
      location: 'Food Court',
      severity: 'high',
      timestamp: new Date(Date.now() - 1000 * 60 * 7),
      status: 'in-progress',
      assignedTo: 'Dr. Maria Gonzalez',
      reportedBy: 'Security Staff',
      category: 'Medical',
      notificationsSent: [
        {
          id: '104',
          type: 'sms',
          recipient: '+1987654321',
          message: 'HIGH: Medical assistance needed at Food Court',
          timestamp: new Date(Date.now() - 1000 * 60 * 6.5),
          status: 'delivered',
          issueId: '5',
        },
      ],
    },
  ];
  
  export const MOCK_STAFF = [
    {
      id: '101',
      name: 'Sarah Johnson',
      role: 'Security Lead',
      phone: '+1234567890',
      email: 'sarah@example.com',
      isAvailable: true,
    },
    {
      id: '102',
      name: 'Tony Stark',
      role: 'Technical Director',
      phone: '+1987654321',
      email: 'tony@example.com',
      isAvailable: false,
    },
    {
      id: '103',
      name: 'Dr. Maria Gonzalez',
      role: 'Medical Lead',
      phone: '+1122334455',
      email: 'maria@example.com',
      isAvailable: true,
    },
    {
      id: '104',
      name: 'Alex Wong',
      role: 'Event Coordinator',
      phone: '+1555667788',
      email: 'alex@example.com',
      isAvailable: true,
    },
  ];
  
  // Helper function to get severity level style class
  export const getSeverityClass = (severity) => {
    switch (severity) {
      case 'critical': return 'issue-card-critical';
      case 'high': return 'issue-card-high';
      case 'medium': return 'issue-card-medium';
      case 'low': return 'issue-card-low';
      default: return 'issue-card-low';
    }
  };
  
  // Helper function to get severity level color
  export const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-700';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-green-600';
    }
  };
  