import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  Phone,
  Mail,
  Camera,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Download,
  Bell,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Mock complaint data (in real app, fetch by ID)
const mockComplaintData = {
  id: "CMP001",
  title: "Broken streetlight on MG Road",
  description: "The streetlight near bus stop 15 has been broken for 3 days, creating safety issues for pedestrians at night. The light pole appears to be damaged and wires are exposed, which could be dangerous.",
  category: "Electricity",
  priority: "high",
  status: "pending",
  department: "Electricity Board",
  assignedTo: null,
  location: "MG Road, Sector 15, Near Bus Stop 15",
  coordinates: { lat: 28.5355, lng: 77.3910 },
  citizenName: "Priya Sharma",
  citizenPhone: "+91 9876543210",
  citizenEmail: "priya.sharma@gmail.com",
  submittedAt: "2024-01-07T10:30:00Z",
  imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&h=400&fit=crop",
  updates: [
    {
      id: 1,
      status: "submitted",
      message: "Complaint submitted by citizen",
      timestamp: "2024-01-07T10:30:00Z",
      updatedBy: "System",
    },
    {
      id: 2,
      status: "acknowledged",
      message: "Complaint acknowledged by Electricity Board",
      timestamp: "2024-01-07T11:15:00Z",
      updatedBy: "Rajesh Kumar",
    },
  ],
};

// Helper to slugify
const getToSlug = (str: string) => str.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const ComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [complaint, setComplaint] = useState(mockComplaintData);
  const [newStatus, setNewStatus] = useState(complaint.status);
  const [assignedTo, setAssignedTo] = useState(complaint.assignedTo || "");
  const [updateNote, setUpdateNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [departmentsData, setDepartmentsData] = useState<any[]>([]);
  const [staffMembers, setStaffMembers] = useState<any[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('adminUser');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    const savedDepts = localStorage.getItem('departments');
    let depts: any[] = [];
    if (savedDepts) { try { depts = JSON.parse(savedDepts); } catch {} }
    setDepartmentsData(depts);
    const dept = depts.find((d) =>
      (d.name && complaint.department && d.name.toLowerCase().includes(complaint.department.toLowerCase())) ||
      (savedUser && (d.slug || getToSlug(d.name)) === JSON.parse(savedUser).department)
    );
    setStaffMembers(dept?.staff || []);
  }, []);

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

  const handleUpdateComplaint = async () => {
    setLoading(true);
    
    // Mock API call
    setTimeout(() => {
      const updatedComplaint = {
        ...complaint,
        status: newStatus,
        assignedTo: assignedTo,
        updates: [
          ...complaint.updates,
          {
            id: complaint.updates.length + 1,
            status: newStatus,
            message: updateNote || `Status updated to ${newStatus}`,
            timestamp: new Date().toISOString(),
            updatedBy: "Admin User",
          },
        ],
      };
      
      setComplaint(updatedComplaint);
      setUpdateNote("");
      setLoading(false);
      
      toast({
        title: "Complaint Updated",
        description: `Status changed to ${newStatus}${assignedTo ? ` and assigned to ${assignedTo}` : ''}`,
      });
    }, 1000);
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

  const openInMaps = () => {
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
      
      // Try Google Maps first, fallback to generic maps if needed
      const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}&z=16`;
      window.open(googleMapsUrl, '_blank');
      
      toast({
        title: "Opening Maps",
        description: "Location opened in Google Maps",
      });
    } catch (error) {
      toast({
        title: "Error Opening Maps",
        description: "Failed to open location in maps",
        variant: "destructive",
      });
    }
  };

  const exportToPDF = async () => {
    try {
      toast({
        title: "Generating PDF",
        description: "Please wait while we prepare your PDF...",
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      let yPos = 20;

      // Header
      pdf.setFontSize(20);
      pdf.setFont(undefined, 'bold');
      pdf.text('CIVIC COMPLAINT REPORT', pageWidth / 2, yPos, { align: 'center' });
      
      yPos += 15;
      pdf.setFontSize(12);
      pdf.setFont(undefined, 'normal');
      pdf.text(`Generated on: ${new Date().toLocaleDateString('en-IN')}`, pageWidth / 2, yPos, { align: 'center' });
      
      yPos += 20;
      
      // Complaint Details Section
      pdf.setFontSize(16);
      pdf.setFont(undefined, 'bold');
      pdf.text('COMPLAINT DETAILS', 20, yPos);
      yPos += 10;
      
      // Draw a line
      pdf.line(20, yPos, pageWidth - 20, yPos);
      yPos += 10;
      
      pdf.setFontSize(11);
      pdf.setFont(undefined, 'normal');
      
      // Basic Information
      const details = [
        ['Complaint ID:', complaint.id],
        ['Title:', complaint.title],
        ['Category:', complaint.category],
        ['Priority:', complaint.priority.toUpperCase()],
        ['Status:', complaint.status.replace('-', ' ').toUpperCase()],
        ['Department:', complaint.department],
        ['Assigned To:', complaint.assignedTo || 'Not Assigned'],
        ['Location:', complaint.location],
        ['Submitted Date:', formatDate(complaint.submittedAt)],
      ];
      
      details.forEach(([label, value]) => {
        pdf.setFont(undefined, 'bold');
        pdf.text(label, 20, yPos);
        pdf.setFont(undefined, 'normal');
        
        // Handle long text wrapping
        const textLines = pdf.splitTextToSize(value, pageWidth - 80);
        pdf.text(textLines, 80, yPos);
        yPos += textLines.length * 6;
      });
      
      yPos += 10;
      
      // Description Section
      pdf.setFontSize(14);
      pdf.setFont(undefined, 'bold');
      pdf.text('DESCRIPTION', 20, yPos);
      yPos += 8;
      
      pdf.setFontSize(11);
      pdf.setFont(undefined, 'normal');
      const descriptionLines = pdf.splitTextToSize(complaint.description, pageWidth - 40);
      pdf.text(descriptionLines, 20, yPos);
      yPos += descriptionLines.length * 6 + 10;
      
      // Citizen Information Section
      pdf.setFontSize(14);
      pdf.setFont(undefined, 'bold');
      pdf.text('CITIZEN INFORMATION', 20, yPos);
      yPos += 8;
      
      pdf.setFontSize(11);
      pdf.setFont(undefined, 'normal');
      const citizenDetails = [
        ['Name:', complaint.citizenName],
        ['Phone:', complaint.citizenPhone],
        ['Email:', complaint.citizenEmail],
      ];
      
      citizenDetails.forEach(([label, value]) => {
        pdf.setFont(undefined, 'bold');
        pdf.text(label, 20, yPos);
        pdf.setFont(undefined, 'normal');
        pdf.text(value, 60, yPos);
        yPos += 6;
      });
      
      yPos += 10;
      
      // Status Timeline Section
      if (complaint.updates && complaint.updates.length > 0) {
        pdf.setFontSize(14);
        pdf.setFont(undefined, 'bold');
        pdf.text('STATUS TIMELINE', 20, yPos);
        yPos += 8;
        
        pdf.setFontSize(10);
        complaint.updates.forEach((update, index) => {
          if (yPos > 250) {
            pdf.addPage();
            yPos = 20;
          }
          
          pdf.setFont(undefined, 'bold');
          pdf.text(`${index + 1}. ${update.status.replace('-', ' ').toUpperCase()}`, 25, yPos);
          yPos += 5;
          
          pdf.setFont(undefined, 'normal');
          pdf.text(`Date: ${formatDate(update.timestamp)}`, 30, yPos);
          yPos += 5;
          
          pdf.text(`Updated by: ${update.updatedBy}`, 30, yPos);
          yPos += 5;
          
          const messageLines = pdf.splitTextToSize(`Message: ${update.message}`, pageWidth - 60);
          pdf.text(messageLines, 30, yPos);
          yPos += messageLines.length * 4 + 8;
        });
      }
      
      // Footer
      const pageCount = pdf.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setFont(undefined, 'normal');
        pdf.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pdf.internal.pageSize.getHeight() - 10, { align: 'center' });
        pdf.text('Generated by Civic Complaint Management System', pageWidth / 2, pdf.internal.pageSize.getHeight() - 6, { align: 'center' });
      }
      
      pdf.save(`complaint-${complaint.id}-report.pdf`);

      toast({
        title: "PDF Generated Successfully",
        description: `Complete report for complaint ${complaint.id} has been downloaded`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to generate PDF report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const sendNotification = async () => {
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
        const notification = new Notification(`Complaint ${complaint.id} Update`, {
          body: `Status: ${complaint.status.replace('-', ' ')} | ${complaint.title}`,
          icon: "/favicon.ico",
          badge: "/favicon.ico",
          tag: `complaint-${complaint.id}`,
          requireInteraction: false,
        });

        // Auto close after 5 seconds
        setTimeout(() => notification.close(), 5000);

        toast({
          title: "Notification Sent",
          description: "Browser notification sent successfully",
        });
      } else if (Notification.permission === "default") {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const notification = new Notification(`Complaint ${complaint.id} Update`, {
            body: `Status: ${complaint.status.replace('-', ' ')} | ${complaint.title}`,
            icon: "/favicon.ico",
            badge: "/favicon.ico",
            tag: `complaint-${complaint.id}`,
          });

          setTimeout(() => notification.close(), 5000);

          toast({
            title: "Notification Sent",
            description: "Browser notification sent successfully",
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
        description: "Failed to send notification. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/admin/complaints')}
          className="hover:bg-background-accent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Complaints
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">Complaint Details</h1>
          <p className="text-muted-foreground">ID: {complaint.id}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={openInMaps} variant="outline">
            <ExternalLink className="w-4 h-4 mr-2" />
            Open in Maps
          </Button>
          <Button onClick={exportToPDF} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button onClick={sendNotification} variant="outline">
            <Bell className="w-4 h-4 mr-2" />
            Notify
          </Button>
        </div>
      </div>

      <div id="complaint-detail" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Complaint Overview */}
          <Card className="border-card-border shadow-sm">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl">{complaint.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {complaint.category}
                    </Badge>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getPriorityColor(complaint.priority)}`}
                    >
                      {complaint.priority} priority
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getStatusColor(complaint.status)}`}
                    >
                      {complaint.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Description</h4>
                <p className="text-foreground leading-relaxed">{complaint.description}</p>
              </div>
              
              {complaint.imageUrl && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Photo Evidence</h4>
                  <div className="relative rounded-lg overflow-hidden border border-card-border">
                    <img 
                      src={complaint.imageUrl} 
                      alt="Complaint evidence"
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-black/50 text-white">
                        <Camera className="w-3 h-3 mr-1" />
                        Evidence Photo
                      </Badge>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-card-border">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Location</p>
                    <p className="text-sm text-muted-foreground">{complaint.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Submitted</p>
                    <p className="text-sm text-muted-foreground">{formatDate(complaint.submittedAt)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Updates Timeline */}
          <Card className="border-card-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Status Timeline</CardTitle>
              <CardDescription>Track the progress of this complaint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complaint.updates.map((update, index) => (
                  <div key={update.id} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        update.status === 'resolved' ? 'bg-success' :
                        update.status === 'in-progress' ? 'bg-primary' :
                        'bg-warning'
                      }`}>
                        {update.status === 'resolved' ? 
                          <CheckCircle className="w-4 h-4 text-white" /> :
                          update.status === 'in-progress' ? 
                          <Clock className="w-4 h-4 text-white" /> :
                          <AlertTriangle className="w-4 h-4 text-white" />
                        }
                      </div>
                      {index < complaint.updates.length - 1 && (
                        <div className="w-px h-8 bg-border mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm text-foreground capitalize">
                          {update.status.replace('-', ' ')}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(update.timestamp)}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">{update.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Updated by: {update.updatedBy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Citizen Information */}
          <Card className="border-card-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Citizen Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/10">
                    {complaint.citizenName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">{complaint.citizenName}</p>
                  <p className="text-sm text-muted-foreground">Complainant</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium">{complaint.citizenPhone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">{complaint.citizenEmail}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Update Complaint */}
          <Card className="border-card-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Update Complaint</CardTitle>
              <CardDescription>Change status and assign to staff</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Assign to Staff</label>
                <Select value={assignedTo} onValueChange={setAssignedTo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select staff member" />
                  </SelectTrigger>
                  <SelectContent>
                    {staffMembers.map((staff) => (
                      <SelectItem key={staff.id} value={staff.name}>
                        {staff.name}{staff.role ? ` - ${staff.role}` : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Update Note</label>
                <Textarea
                  placeholder="Add a note about this update..."
                  value={updateNote}
                  onChange={(e) => setUpdateNote(e.target.value)}
                  rows={3}
                />
              </div>

              <Button 
                onClick={handleUpdateComplaint} 
                disabled={loading}
                className="w-full bg-gradient-saffron hover:bg-saffron-dark"
              >
                {loading ? "Updating..." : "Update Complaint"}
              </Button>
            </CardContent>
          </Card>

          {/* Department Info */}
          <Card className="border-card-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Department</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Responsible Department</p>
                  <p className="font-medium text-foreground">{complaint.department}</p>
                </div>
                {complaint.assignedTo && (
                  <div>
                    <p className="text-sm text-muted-foreground">Assigned To</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-primary/10">
                          {complaint.assignedTo.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{complaint.assignedTo}</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;