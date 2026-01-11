import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  Filter,
  Eye,
  Edit,
  MapPin,
  Calendar,
  User,
  Phone,
  Mail,
  ExternalLink,
  Download,
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';

// Mock complaints data
const mockComplaints = [
  {
    id: "CMP001",
    title: "Broken streetlight on MG Road",
    description: "The streetlight near bus stop 15 has been broken for 3 days, creating safety issues for pedestrians at night.",
    category: "Electricity",
    priority: "high",
    status: "pending",
    department: "Electricity Board",
    assignedTo: "Rajesh Kumar",
    location: "MG Road, Sector 15",
    coordinates: { lat: 28.5355, lng: 77.3910 },
    citizenName: "Priya Sharma",
    citizenPhone: "+91 9876543210",
    citizenEmail: "priya.sharma@gmail.com",
    submittedAt: "2024-01-07T10:30:00Z",
    imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&h=300&fit=crop",
  },
  {
    id: "CMP002", 
    title: "Garbage collection delay in Green Park",
    description: "Garbage has not been collected for the past 5 days in Green Park Colony, Block A. Bad smell and hygiene issues.",
    category: "Sanitation",
    priority: "medium",
    status: "in-progress",
    department: "Sanitation Department",
    assignedTo: "Amit Singh",
    location: "Green Park Colony, Block A",
    coordinates: { lat: 28.5245, lng: 77.2066 },
    citizenName: "Rahul Gupta",
    citizenPhone: "+91 9876543211",
    citizenEmail: "rahul.gupta@gmail.com",
    submittedAt: "2024-01-06T14:15:00Z",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd574c6cd13?w=400&h=300&fit=crop",
  },
  {
    id: "CMP003",
    title: "Water supply disruption",
    description: "No water supply for 2 days in Blue Ridge Apartments. Residents are facing severe inconvenience.",
    category: "Water",
    priority: "high",
    status: "resolved",
    department: "Water Supply",
    assignedTo: "Sanjay Patel",
    location: "Blue Ridge Apartments, Sector 22",
    coordinates: { lat: 28.4595, lng: 77.0266 },
    citizenName: "Meera Joshi", 
    citizenPhone: "+91 9876543212",
    citizenEmail: "meera.joshi@gmail.com",
    submittedAt: "2024-01-05T09:20:00Z",
    resolvedAt: "2024-01-06T16:45:00Z",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
  },
  {
    id: "CMP004",
    title: "Large pothole on Highway 21",
    description: "Deep pothole near KM 15 marker causing vehicle damage and traffic congestion during peak hours.",
    category: "Roads",
    priority: "medium",
    status: "pending",
    department: "Roads & Infrastructure",
    assignedTo: null,
    location: "Highway 21, KM 15",
    coordinates: { lat: 28.7041, lng: 77.1025 },
    citizenName: "Vikash Kumar",
    citizenPhone: "+91 9876543213",
    citizenEmail: "vikash.kumar@gmail.com",
    submittedAt: "2024-01-07T07:10:00Z",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
  },
  {
    id: "CMP005",
    title: "Park maintenance required",
    description: "Children's playground equipment in Central Park needs urgent repair. Swings and slides are broken.",
    category: "Parks",
    priority: "low",
    status: "in-progress",
    department: "Parks & Recreation",
    assignedTo: "Suresh Yadav",
    location: "Central Park, Sector 8",
    coordinates: { lat: 28.6129, lng: 77.2295 },
    citizenName: "Anjali Verma",
    citizenPhone: "+91 9876543214",
    citizenEmail: "anjali.verma@gmail.com",
    submittedAt: "2024-01-04T11:30:00Z",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
  },
];

const ComplaintsManagement = () => {
  const [complaints, setComplaints] = useState(mockComplaints);
  const [filteredComplaints, setFilteredComplaints] = useState(mockComplaints);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    let filtered = complaints;

    if (searchTerm) {
      filtered = filtered.filter(complaint =>
        complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.citizenName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(complaint => complaint.status === statusFilter);
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(complaint => complaint.category === categoryFilter);
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter(complaint => complaint.priority === priorityFilter);
    }

    setFilteredComplaints(filtered);
  }, [searchTerm, statusFilter, categoryFilter, priorityFilter, complaints]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning text-warning-foreground";
      case "in-progress":
        return "bg-primary text-primary-foreground";
      case "resolved":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-danger text-danger-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "low":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleStatusUpdate = (complaintId: string, newStatus: string) => {
    setComplaints(prev => prev.map(complaint => 
      complaint.id === complaintId 
        ? { ...complaint, status: newStatus }
        : complaint
    ));
    
    toast({
      title: "Status Updated",
      description: `Complaint ${complaintId} status changed to ${newStatus}`,
    });
  };

  const handleAssignComplaint = (complaintId: string, assignedTo: string) => {
    setComplaints(prev => prev.map(complaint => 
      complaint.id === complaintId 
        ? { ...complaint, assignedTo }
        : complaint
    ));
    
    toast({
      title: "Complaint Assigned",
      description: `Complaint ${complaintId} assigned to ${assignedTo}`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const openInMaps = (complaint: any) => {
    try {
      const { lat, lng } = complaint.coordinates;
      if (!lat || !lng) {
        toast({
          title: "Location Not Available",
          description: "GPS coordinates not found for this complaint",
          variant: "destructive",
        });
        return;
      }
      
      const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}&z=16`;
      window.open(googleMapsUrl, '_blank');
      
      toast({
        title: "Opening Maps",
        description: `Location for ${complaint.id} opened in Google Maps`,
      });
    } catch (error) {
      toast({
        title: "Error Opening Maps",
        description: "Failed to open location in maps",
        variant: "destructive",
      });
    }
  };

  const exportComplaintsToExcel = () => {
    try {
      const pdf = new jsPDF();
      pdf.setFontSize(20);
      pdf.text('Civic Complaints Report', 20, 20);
      
      pdf.setFontSize(12);
      let yPos = 40;
      
      filteredComplaints.forEach((complaint, index) => {
        if (yPos > 250) {
          pdf.addPage();
          yPos = 20;
        }
        
        pdf.text(`${index + 1}. ${complaint.id} - ${complaint.title}`, 20, yPos);
        yPos += 7;
        pdf.text(`   Category: ${complaint.category} | Priority: ${complaint.priority}`, 25, yPos);
        yPos += 7;
        pdf.text(`   Status: ${complaint.status} | Location: ${complaint.location}`, 25, yPos);
        yPos += 7;
        pdf.text(`   Citizen: ${complaint.citizenName} | Date: ${formatDate(complaint.submittedAt)}`, 25, yPos);
        yPos += 15;
      });
      
      pdf.save('complaints-report.pdf');
      
      toast({
        title: "PDF Generated",
        description: `Report with ${filteredComplaints.length} complaints exported successfully`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const sendBulkNotification = async () => {
    try {
      if (!("Notification" in window)) {
        toast({
          title: "Not Supported",
          description: "Browser notifications are not supported in this browser",
          variant: "destructive",
        });
        return;
      }

      if (Notification.permission === "granted") {
        const notification = new Notification("Complaints Update", {
          body: `${filteredComplaints.length} complaints require attention`,
          icon: "/favicon.ico",
          badge: "/favicon.ico",
          tag: "bulk-complaints-update",
          requireInteraction: false,
        });

        setTimeout(() => notification.close(), 7000);

        toast({
          title: "Bulk Notification Sent",
          description: `Notification sent for ${filteredComplaints.length} complaints`,
        });
      } else if (Notification.permission === "default") {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const notification = new Notification("Complaints Update", {
            body: `${filteredComplaints.length} complaints require attention`,
            icon: "/favicon.ico",
            badge: "/favicon.ico",
            tag: "bulk-complaints-update",
          });

          setTimeout(() => notification.close(), 7000);

          toast({
            title: "Bulk Notification Sent",
            description: `Notification sent for ${filteredComplaints.length} complaints`,
          });
        } else {
          toast({
            title: "Permission Denied",
            description: "Notification permission was denied",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Notifications Blocked",
          description: "Please enable notifications in your browser settings to receive updates",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Notification Failed",
        description: "Failed to send bulk notification. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Complaints Management</h1>
          <p className="text-muted-foreground">Manage and track civic complaints</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => navigate('/admin/complaints/map')}
            className="bg-gradient-saffron hover:bg-saffron-dark"
          >
            <MapPin className="w-4 h-4 mr-2" />
            View on Map
          </Button>
          <Button onClick={exportComplaintsToExcel} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button onClick={sendBulkNotification} variant="outline">
            <Bell className="w-4 h-4 mr-2" />
            Notify All
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-card-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search complaints..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Sanitation">Sanitation</SelectItem>
                <SelectItem value="Roads">Roads</SelectItem>
                <SelectItem value="Electricity">Electricity</SelectItem>
                <SelectItem value="Water">Water</SelectItem>
                <SelectItem value="Parks">Parks</SelectItem>
              </SelectContent>
            </Select>

            {/* Priority Filter */}
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setCategoryFilter("all");
                setPriorityFilter("all");
              }}
            >
              <Filter className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Showing {filteredComplaints.length} of {complaints.length} complaints</span>
        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-danger rounded-full"></div>
            High Priority
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            Medium Priority
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            Low Priority
          </span>
        </div>
      </div>

      {/* Complaints Table */}
      <Card className="border-card-border shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-background-accent">
                  <TableHead className="w-20">ID</TableHead>
                  <TableHead className="min-w-[200px]">Complaint</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Citizen</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-32">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComplaints.map((complaint) => (
                  <TableRow 
                    key={complaint.id} 
                    className="hover:bg-background-accent cursor-pointer"
                    onClick={() => navigate(`/admin/complaints/${complaint.id}`)}
                  >
                    <TableCell className="font-medium">{complaint.id}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{complaint.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {complaint.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {complaint.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getPriorityColor(complaint.priority)}`}
                      >
                        {complaint.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getStatusColor(complaint.status)}`}
                      >
                        {complaint.status.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {complaint.assignedTo ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs bg-primary/10">
                              {complaint.assignedTo.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{complaint.assignedTo}</span>
                        </div>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          Unassigned
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{complaint.citizenName}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          <span>{complaint.citizenPhone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="truncate max-w-32">{complaint.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(complaint.submittedAt)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/complaints/${complaint.id}`);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            openInMaps(complaint);
                          }}
                          title="Open in Maps"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplaintsManagement;