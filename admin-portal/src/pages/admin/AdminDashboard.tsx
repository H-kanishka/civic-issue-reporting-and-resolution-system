// import { useState, useEffect } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import {
//   FileText,
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   TrendingUp,
//   Users,
//   MapPin,
//   Filter,
//   BarChart3,
// } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useNavigate } from "react-router-dom";

// // Mock data - in real app, this would come from API
// const mockStats = {
//   total: 156,
//   pending: 42,
//   inProgress: 38,
//   resolved: 76,
//   departments: 6,
//   avgResolutionTime: 4.2,
// };

// const mockRecentComplaints = [
//   {
//     id: "CMP001",
//     title: "Broken streetlight on MG Road",
//     category: "Electricity",
//     priority: "high",
//     status: "pending",
//     department: "Electricity Board",
//     location: "MG Road, Sector 15",
//     time: "2 hours ago",
//   },
//   {
//     id: "CMP002", 
//     title: "Garbage collection delay",
//     category: "Sanitation",
//     priority: "medium",
//     status: "in-progress",
//     department: "Sanitation Department",
//     location: "Green Park Colony",
//     time: "4 hours ago",
//   },
//   {
//     id: "CMP003",
//     title: "Water supply disruption",
//     category: "Water",
//     priority: "high",
//     status: "resolved",
//     department: "Water Supply",
//     location: "Blue Ridge Apartments",
//     time: "6 hours ago",
//   },
//   {
//     id: "CMP004",
//     title: "Pothole on Highway 21",
//     category: "Roads",
//     priority: "medium",
//     status: "pending",
//     department: "Roads & Infrastructure",
//     location: "Highway 21, KM 15",
//     time: "8 hours ago",
//   },
// ];

// const mockDepartmentStats = [
//   { name: "Sanitation", complaints: 45, resolved: 32, percentage: 71 },
//   { name: "Roads", complaints: 38, resolved: 25, percentage: 66 },
//   { name: "Electricity", complaints: 32, resolved: 19, percentage: 59 },
//   { name: "Water Supply", complaints: 25, resolved: 18, percentage: 72 },
//   { name: "Parks", complaints: 16, resolved: 12, percentage: 75 },
// ];

// const AdminDashboard = () => {
//   const [user, setUser] = useState<any>(null);
//   const [timeFilter, setTimeFilter] = useState("today");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userData = localStorage.getItem('adminUser');
//     if (userData) {
//       setUser(JSON.parse(userData));
//     }
//   }, []);

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "pending":
//         return "bg-warning text-warning-foreground";
//       case "in-progress":
//         return "bg-primary text-primary-foreground";
//       case "resolved":
//         return "bg-success text-success-foreground";
//       default:
//         return "bg-muted text-muted-foreground";
//     }
//   };

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case "high":
//         return "bg-danger text-danger-foreground";
//       case "medium":
//         return "bg-warning text-warning-foreground";
//       case "low":
//         return "bg-success text-success-foreground";
//       default:
//         return "bg-muted text-muted-foreground";
//     }
//   };

//   const recentToShow = mockRecentComplaints;

//   return (
//     <div className="p-6 space-y-6">
//       {/* Welcome Section */}
//       <div className="bg-gradient-patriot rounded-lg p-6 text-white shadow-saffron">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold mb-2">
//               Welcome back, {user?.name || 'Administrator'}!
//             </h1>
//             <p className="text-white/90">
//               Managing all departments and civic complaints
//             </p>
//           </div>
//           <div className="flex items-center gap-4">
//             <Select value={timeFilter} onValueChange={setTimeFilter}>
//               <SelectTrigger className="w-32 bg-white/10 text-white border-white/20">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="today">Today</SelectItem>
//                 <SelectItem value="week">This Week</SelectItem>
//                 <SelectItem value="month">This Month</SelectItem>
//               </SelectContent>
//             </Select>
//             <Button 
//               variant="secondary" 
//               onClick={() => navigate('/admin/complaints')}
//               className="bg-white/10 text-white border-white/20 hover:bg-white/20"
//             >
//               <Filter className="w-4 h-4 mr-2" />
//               View All
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <Card className="border-card-border shadow-sm hover:shadow-saffron transition-smooth">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">
//               Total Complaints
//             </CardTitle>
//             <FileText className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-foreground">{mockStats.total}</div>
//             <p className="text-xs text-muted-foreground">
//               <TrendingUp className="inline h-3 w-3 mr-1" />
//               +12% from last week
//             </p>
//           </CardContent>
//         </Card>

//         <Card className="border-card-border shadow-sm hover:shadow-saffron transition-smooth">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">
//               Pending
//             </CardTitle>
//             <Clock className="h-4 w-4 text-warning" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-warning">{mockStats.pending}</div>
//             <p className="text-xs text-muted-foreground">
//               Requires immediate attention
//             </p>
//           </CardContent>
//         </Card>

//         <Card className="border-card-border shadow-sm hover:shadow-saffron transition-smooth">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">
//               In Progress
//             </CardTitle>
//             <AlertCircle className="h-4 w-4 text-primary" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-primary">{mockStats.inProgress}</div>
//             <p className="text-xs text-muted-foreground">
//               Being worked on
//             </p>
//           </CardContent>
//         </Card>

//         <Card className="border-card-border shadow-sm hover:shadow-saffron transition-smooth">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">
//               Resolved
//             </CardTitle>
//             <CheckCircle className="h-4 w-4 text-success" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-success">{mockStats.resolved}</div>
//             <p className="text-xs text-muted-foreground">
//               Successfully completed
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Complaints */}
//         <Card className="border-card-border shadow-sm">
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <div>
//                 <CardTitle className="text-lg font-semibold">Recent Complaints</CardTitle>
//                 <CardDescription>Latest civic issues reported</CardDescription>
//               </div>
//               <Button 
//                 variant="outline" 
//                 size="sm"
//                 onClick={() => navigate('/admin/complaints')}
//               >
//                 View All
//               </Button>
//             </div>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {recentToShow.map((complaint) => (
//               <div
//                 key={complaint.id}
//                 className="flex items-start space-x-4 p-3 rounded-lg border border-card-border hover:bg-background-accent transition-smooth cursor-pointer"
//                 onClick={() => navigate(`/admin/complaints/${complaint.id}`)}
//               >
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center gap-2 mb-1">
//                     <p className="text-sm font-medium text-foreground truncate">
//                       {complaint.title}
//                     </p>
//                     <Badge 
//                       variant="secondary" 
//                       className={`text-xs ${getPriorityColor(complaint.priority)}`}
//                     >
//                       {complaint.priority}
//                     </Badge>
//                   </div>
//                   <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                     <MapPin className="h-3 w-3" />
//                     <span>{complaint.location}</span>
//                     <span>•</span>
//                     <span>{complaint.time}</span>
//                   </div>
//                   <div className="flex items-center justify-between mt-2">
//                     <span className="text-xs text-muted-foreground">
//                       {complaint.department}
//                     </span>
//                     <Badge 
//                       variant="outline" 
//                       className={`text-xs ${getStatusColor(complaint.status)}`}
//                     >
//                       {complaint.status.replace('-', ' ')}
//                     </Badge>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </CardContent>
//         </Card>

//         {/* Department Performance */}
//         <Card className="border-card-border shadow-sm">
//           <CardHeader>
//             <CardTitle className="text-lg font-semibold">Department Performance</CardTitle>
//             <CardDescription>Resolution rates by department</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {mockDepartmentStats.map((dept) => (
//               <div key={dept.name} className="space-y-2">
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="font-medium text-foreground">{dept.name}</span>
//                   <span className="text-muted-foreground">
//                     {dept.resolved}/{dept.complaints} ({dept.percentage}%)
//                   </span>
//                 </div>
//                 <Progress 
//                   value={dept.percentage} 
//                   className="h-2"
//                 />
//               </div>
//             ))}
//             <Button 
//               variant="outline" 
//               className="w-full mt-4"
//               onClick={() => navigate('/admin/departments')}
//             >
//               <Users className="w-4 h-4 mr-2" />
//               Manage Departments
//             </Button>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Quick Actions */}
//       <Card className="border-card-border shadow-sm">
//         <CardHeader>
//           <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
//           <CardDescription>Common administrative tasks</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <Button 
//               className="h-16 bg-gradient-saffron hover:bg-saffron-dark text-white"
//               onClick={() => navigate('/admin/complaints')}
//             >
//               <FileText className="w-5 h-5 mr-2" />
//               Review Complaints
//             </Button>
//             <Button 
//               variant="outline"
//               className="h-16 border-forest-green text-forest-green hover:bg-forest-green hover:text-white"
//               onClick={() => navigate('/admin/complaints/map')}
//             >
//               <MapPin className="w-5 h-5 mr-2" />
//               View Map
//             </Button>
//             <Button 
//               variant="outline"
//               className="h-16 border-navy-blue text-navy-blue hover:bg-navy-blue hover:text-white"
//               onClick={() => navigate('/admin/analytics')}
//             >
//               <BarChart3 className="w-5 h-5 mr-2" />
//               Analytics
//             </Button>
//             <Button 
//               variant="outline"
//               className="h-16"
//               onClick={() => navigate('/admin/departments')}
//             >
//               <Users className="w-5 h-5 mr-2" />
//               Manage Staff
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AdminDashboard;

// import { useState, useEffect } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import {
//   FileText,
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   TrendingUp,
//   Users,
//   MapPin,
//   Filter,
//   BarChart3,
// } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// interface Complaint {
//   _id: string;
//   title: string;
//   category: string;
//   priority: string;
//   status: string;
//   department?: string;
//   location: string;
//   createdAt: string;
//   assignedTo?: string;
// }

// interface DepartmentStats {
//   name: string;
//   complaints: number;
//   resolved: number;
//   percentage: number;
// }

// const AdminDashboard = () => {
//   const [user, setUser] = useState<any>(null);
//   const [timeFilter, setTimeFilter] = useState("today");
//   const [complaints, setComplaints] = useState<Complaint[]>([]);
//   const navigate = useNavigate();

//   // Fetch complaints from backend
//   useEffect(() => {
//     const userData = localStorage.getItem("adminUser");
//     if (userData) setUser(JSON.parse(userData));

//     const fetchComplaints = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/complaints");
//         setComplaints(res.data.data); // Assuming your backend returns { success: true, data: [...] }
//       } catch (err) {
//         console.error("Failed to fetch complaints:", err);
//       }
//     };

//     fetchComplaints();
//   }, []);

//   // Compute stats dynamically
//   const total = complaints.length;
//   const pending = complaints.filter(c => c.status === "submitted").length;
//   const inProgress = complaints.filter(c => c.status === "in-progress").length;
//   const resolved = complaints.filter(c => c.status === "resolved").length;

//   // Department stats
//   const departments: DepartmentStats[] = [];
//   complaints.forEach(c => {
//     if (!c.category) return;
//     let dept = departments.find(d => d.name === c.category);
//     if (!dept) {
//       departments.push({ name: c.category, complaints: 1, resolved: c.status === "resolved" ? 1 : 0, percentage: 0 });
//     } else {
//       dept.complaints += 1;
//       if (c.status === "resolved") dept.resolved += 1;
//     }
//   });
//   departments.forEach(d => {
//     d.percentage = d.complaints === 0 ? 0 : Math.round((d.resolved / d.complaints) * 100);
//   });

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "submitted":
//         return "bg-warning text-warning-foreground";
//       case "in-progress":
//         return "bg-primary text-primary-foreground";
//       case "resolved":
//         return "bg-success text-success-foreground";
//       default:
//         return "bg-muted text-muted-foreground";
//     }
//   };

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case "high":
//         return "bg-danger text-danger-foreground";
//       case "medium":
//         return "bg-warning text-warning-foreground";
//       case "low":
//         return "bg-success text-success-foreground";
//       default:
//         return "bg-muted text-muted-foreground";
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Welcome Section */}
//       <div className="bg-gradient-patriot rounded-lg p-6 text-white shadow-saffron">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold mb-2">
//               Welcome back, {user?.name || 'Administrator'}!
//             </h1>
//             <p className="text-white/90">
//               Managing all departments and civic complaints
//             </p>
//           </div>
//           <div className="flex items-center gap-4">
//             <Select value={timeFilter} onValueChange={setTimeFilter}>
//               <SelectTrigger className="w-32 bg-white/10 text-white border-white/20">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="today">Today</SelectItem>
//                 <SelectItem value="week">This Week</SelectItem>
//                 <SelectItem value="month">This Month</SelectItem>
//               </SelectContent>
//             </Select>
//             <Button 
//               variant="secondary" 
//               onClick={() => navigate('/admin/complaints')}
//               className="bg-white/10 text-white border-white/20 hover:bg-white/20"
//             >
//               <Filter className="w-4 h-4 mr-2" />
//               View All
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <Card className="border-card-border shadow-sm hover:shadow-saffron transition-smooth">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">
//               Total Complaints
//             </CardTitle>
//             <FileText className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-foreground">{total}</div>
//           </CardContent>
//         </Card>

//         <Card className="border-card-border shadow-sm hover:shadow-saffron transition-smooth">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">
//               Pending
//             </CardTitle>
//             <Clock className="h-4 w-4 text-warning" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-warning">{pending}</div>
//           </CardContent>
//         </Card>

//         <Card className="border-card-border shadow-sm hover:shadow-saffron transition-smooth">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">
//               In Progress
//             </CardTitle>
//             <AlertCircle className="h-4 w-4 text-primary" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-primary">{inProgress}</div>
//           </CardContent>
//         </Card>

//         <Card className="border-card-border shadow-sm hover:shadow-saffron transition-smooth">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">
//               Resolved
//             </CardTitle>
//             <CheckCircle className="h-4 w-4 text-success" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-success">{resolved}</div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Recent Complaints */}
//       <Card className="border-card-border shadow-sm">
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <div>
//               <CardTitle className="text-lg font-semibold">Recent Complaints</CardTitle>
//               <CardDescription>Latest civic issues reported</CardDescription>
//             </div>
//             <Button 
//               variant="outline" 
//               size="sm"
//               onClick={() => navigate('/admin/complaints')}
//             >
//               View All
//             </Button>
//           </div>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {complaints.slice(0, 5).map((complaint) => (
//             <div
//               key={complaint._id}
//               className="flex items-start space-x-4 p-3 rounded-lg border border-card-border hover:bg-background-accent transition-smooth cursor-pointer"
//               onClick={() => navigate(`/admin/complaints/${complaint._id}`)}
//             >
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center gap-2 mb-1">
//                   <p className="text-sm font-medium text-foreground truncate">
//                     {complaint.title}
//                   </p>
//                   <Badge 
//                     variant="secondary" 
//                     className={`text-xs ${getPriorityColor(complaint.priority)}`}
//                   >
//                     {complaint.priority}
//                   </Badge>
//                 </div>
//                 <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                   <MapPin className="h-3 w-3" />
//                   <span>{complaint.location}</span>
//                   <span>•</span>
//                   <span>{new Date(complaint.createdAt).toLocaleString()}</span>
//                 </div>
//                 <div className="flex items-center justify-between mt-2">
//                   <span className="text-xs text-muted-foreground">
//                     {complaint.category}
//                   </span>
//                   <Badge 
//                     variant="outline" 
//                     className={`text-xs ${getStatusColor(complaint.status)}`}
//                   >
//                     {complaint.status.replace('-', ' ')}
//                   </Badge>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* Department Performance */}
//       <Card className="border-card-border shadow-sm">
//         <CardHeader>
//           <CardTitle className="text-lg font-semibold">Department Performance</CardTitle>
//           <CardDescription>Resolution rates by department</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {departments.map((dept) => (
//             <div key={dept.name} className="space-y-2">
//               <div className="flex items-center justify-between text-sm">
//                 <span className="font-medium text-foreground">{dept.name}</span>
//                 <span className="text-muted-foreground">
//                   {dept.resolved}/{dept.complaints} ({dept.percentage}%)
//                 </span>
//               </div>
//               <Progress value={dept.percentage} className="h-2" />
//             </div>
//           ))}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AdminDashboard;

// import { useState, useEffect } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import {
//   FileText,
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   TrendingUp,
//   Users,
//   MapPin,
//   Filter,
//   BarChart3,
// } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// interface Complaint {
//   _id: string;
//   title: string;
//   category: string;
//   priority: string;
//   status: string;
//   department?: string;
//   location: string;
//   createdAt: string;
//   assignedTo?: string;
// }

// interface DepartmentStats {
//   name: string;
//   complaints: number;
//   resolved: number;
//   percentage: number;
// }

// const AdminDashboard = () => {
//   const [user, setUser] = useState<any>(null);
//   const [timeFilter, setTimeFilter] = useState("today");
//   const [complaints, setComplaints] = useState<Complaint[]>([]);
//   const navigate = useNavigate();

//   // Fetch complaints from backend
//   useEffect(() => {
//     const userData = localStorage.getItem("adminUser");
//     if (userData) setUser(JSON.parse(userData));

//     const fetchComplaints = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/complaints");
//         setComplaints(res.data.data); // Assuming your backend returns { success: true, data: [...] }
//       } catch (err) {
//         console.error("Failed to fetch complaints:", err);
//       }
//     };

//     fetchComplaints();
//   }, []);

//   // Compute stats dynamically
//   const total = complaints.length;
//   const pending = complaints.filter(c => c.status === "submitted").length;
//   const inProgress = complaints.filter(c => c.status === "in progress").length; // ✅ fixed
//   const resolved = complaints.filter(c => c.status === "resolved").length;

//   // Department stats
//   const departments: DepartmentStats[] = [];
//   complaints.forEach(c => {
//     if (!c.category) return;
//     let dept = departments.find(d => d.name === c.category);
//     if (!dept) {
//       departments.push({ name: c.category, complaints: 1, resolved: c.status === "resolved" ? 1 : 0, percentage: 0 });
//     } else {
//       dept.complaints += 1;
//       if (c.status === "resolved") dept.resolved += 1;
//     }
//   });
//   departments.forEach(d => {
//     d.percentage = d.complaints === 0 ? 0 : Math.round((d.resolved / d.complaints) * 100);
//   });

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "submitted":
//         return "bg-warning text-warning-foreground";
//       case "in progress": // ✅ fixed
//         return "bg-primary text-primary-foreground";
//       case "resolved":
//         return "bg-success text-success-foreground";
//       default:
//         return "bg-muted text-muted-foreground";
//     }
//   };

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case "high":
//         return "bg-danger text-danger-foreground";
//       case "medium":
//         return "bg-warning text-warning-foreground";
//       case "low":
//         return "bg-success text-success-foreground";
//       default:
//         return "bg-muted text-muted-foreground";
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Welcome Section */}
//       <div className="bg-gradient-patriot rounded-lg p-6 text-white shadow-saffron">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold mb-2">
//               Welcome back, {user?.name || 'Administrator'}!
//             </h1>
//             <p className="text-white/90">
//               Managing all departments and civic complaints
//             </p>
//           </div>
//           <div className="flex items-center gap-4">
//             <Select value={timeFilter} onValueChange={setTimeFilter}>
//               <SelectTrigger className="w-32 bg-white/10 text-white border-white/20">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="today">Today</SelectItem>
//                 <SelectItem value="week">This Week</SelectItem>
//                 <SelectItem value="month">This Month</SelectItem>
//               </SelectContent>
//             </Select>
//             <Button 
//               variant="secondary" 
//               onClick={() => navigate('/admin/complaints')}
//               className="bg-white/10 text-white border-white/20 hover:bg-white/20"
//             >
//               <Filter className="w-4 h-4 mr-2" />
//               View All
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <Card className="border-card-border shadow-sm hover:shadow-saffron transition-smooth">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">
//               Total Complaints
//             </CardTitle>
//             <FileText className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-foreground">{total}</div>
//           </CardContent>
//         </Card>

//         <Card className="border-card-border shadow-sm hover:shadow-saffron transition-smooth">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">
//               Pending
//             </CardTitle>
//             <Clock className="h-4 w-4 text-warning" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-warning">{pending}</div>
//           </CardContent>
//         </Card>

//         <Card className="border-card-border shadow-sm hover:shadow-saffron transition-smooth">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">
//               In Progress
//             </CardTitle>
//             <AlertCircle className="h-4 w-4 text-primary" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-primary">{inProgress}</div>
//           </CardContent>
//         </Card>

//         <Card className="border-card-border shadow-sm hover:shadow-saffron transition-smooth">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">
//               Resolved
//             </CardTitle>
//             <CheckCircle className="h-4 w-4 text-success" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-success">{resolved}</div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Recent Complaints */}
//       <Card className="border-card-border shadow-sm">
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <div>
//               <CardTitle className="text-lg font-semibold">Recent Complaints</CardTitle>
//               <CardDescription>Latest civic issues reported</CardDescription>
//             </div>
//             <Button 
//               variant="outline" 
//               size="sm"
//               onClick={() => navigate('/admin/complaints')}
//             >
//               View All
//             </Button>
//           </div>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {complaints.slice(0, 5).map((complaint) => (
//             <div
//               key={complaint._id}
//               className="flex items-start space-x-4 p-3 rounded-lg border border-card-border hover:bg-background-accent transition-smooth cursor-pointer"
//               onClick={() => navigate(`/admin/complaints/${complaint._id}`)}
//             >
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center gap-2 mb-1">
//                   <p className="text-sm font-medium text-foreground truncate">
//                     {complaint.title}
//                   </p>
//                   <Badge 
//                     variant="secondary" 
//                     className={`text-xs ${getPriorityColor(complaint.priority)}`}
//                   >
//                     {complaint.priority}
//                   </Badge>
//                 </div>
//                 <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                   <MapPin className="h-3 w-3" />
//                   <span>{complaint.location}</span>
//                   <span>•</span>
//                   <span>{new Date(complaint.createdAt).toLocaleString()}</span>
//                 </div>
//                 <div className="flex items-center justify-between mt-2">
//                   <span className="text-xs text-muted-foreground">
//                     {complaint.category}
//                   </span>
//                   <Badge 
//                     variant="outline" 
//                     className={`text-xs ${getStatusColor(complaint.status)}`}
//                   >
//                     {complaint.status}
//                   </Badge>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* Department Performance */}
//       <Card className="border-card-border shadow-sm">
//         <CardHeader>
//           <CardTitle className="text-lg font-semibold">Department Performance</CardTitle>
//           <CardDescription>Resolution rates by department</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {departments.map((dept) => (
//             <div key={dept.name} className="space-y-2">
//               <div className="flex items-center justify-between text-sm">
//                 <span className="font-medium text-foreground">{dept.name}</span>
//                 <span className="text-muted-foreground">
//                   {dept.resolved}/{dept.complaints} ({dept.percentage}%)
//                 </span>
//               </div>
//               <Progress value={dept.percentage} className="h-2" />
//             </div>
//           ))}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AdminDashboard;

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  MapPin,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Complaint {
  _id: string;
  category: string;
  priority: string;
  status: string;
  department?: string;
  location: {
    type: string;
    coordinates: [number, number];
    address?: string;
  };
  description: string;
  photo?: string;
  createdAt: string;
  assignedTo?: string;
}

interface DepartmentStats {
  name: string;
  complaints: number;
  resolved: number;
  percentage: number;
}

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [timeFilter, setTimeFilter] = useState("today");
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const navigate = useNavigate();

  // Fetch complaints from backend
  useEffect(() => {
    const userData = localStorage.getItem("adminUser");
    if (userData) setUser(JSON.parse(userData));

    const fetchComplaints = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/complaints");
        setComplaints(res.data.data);
      } catch (err) {
        console.error("Failed to fetch complaints:", err);
      }
    };

    fetchComplaints();
  }, []);

  // Stats
  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "submitted").length;
  const inProgress = complaints.filter((c) => c.status === "in-progress").length;
  const resolved = complaints.filter((c) => c.status === "resolved").length;

  // Department stats
  const departments: DepartmentStats[] = [];
  complaints.forEach((c) => {
    if (!c.category) return;
    let dept = departments.find((d) => d.name === c.category);
    if (!dept) {
      departments.push({
        name: c.category,
        complaints: 1,
        resolved: c.status === "resolved" ? 1 : 0,
        percentage: 0,
      });
    } else {
      dept.complaints += 1;
      if (c.status === "resolved") dept.resolved += 1;
    }
  });
  departments.forEach((d) => {
    d.percentage =
      d.complaints === 0 ? 0 : Math.round((d.resolved / d.complaints) * 100);
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-yellow-500 text-white";
      case "in-progress":
        return "bg-blue-500 text-white";
      case "resolved":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500 text-white";
      case "medium":
        return "bg-yellow-500 text-white";
      case "low":
        return "bg-green-500 text-white";
      case "critical":
        return "bg-purple-600 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg p-6 text-white shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {user?.name || "Administrator"}!
            </h1>
            <p className="text-white/90">
              Managing all departments and civic complaints
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-32 bg-white/10 text-white border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="secondary"
              onClick={() => navigate("/admin/complaints")}
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              <Filter className="w-4 h-4 mr-2" />
              View All
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgress}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolved}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Complaints */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Complaints</CardTitle>
          <CardDescription>Latest civic issues reported</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {complaints.slice(0, 5).map((c) => (
            <div
              key={c._id}
              className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate(`/admin/complaints/${c._id}`)}
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">{c.description}</p>
                <Badge className={`text-xs ${getPriorityColor(c.priority)}`}>
                  {c.priority}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <MapPin className="h-3 w-3" />
                <span>{c.location?.address || "No address"}</span>
                <span>•</span>
                <span>{new Date(c.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-600">{c.category}</span>
                <Badge className={`text-xs ${getStatusColor(c.status)}`}>
                  {c.status.replace("-", " ")}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Department Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
          <CardDescription>Resolution rates by department</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {departments.map((d) => (
            <div key={d.name}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span>{d.name}</span>
                <span>
                  {d.resolved}/{d.complaints} ({d.percentage}%)
                </span>
              </div>
              <Progress value={d.percentage} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;

