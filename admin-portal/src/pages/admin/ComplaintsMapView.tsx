// import { useState, useEffect } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   MapPin,
//   Filter,
//   Eye,
//   Navigation,
//   Layers,
//   RotateCcw,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// // Mock complaints data with coordinates
// const mockMapComplaints = [
//   {
//     id: "CMP001",
//     title: "Broken streetlight on MG Road",
//     category: "Electricity",
//     priority: "high",
//     status: "pending",
//     location: "MG Road, Sector 15",
//     coordinates: { lat: 28.5355, lng: 77.3910 },
//     citizenName: "Priya Sharma",
//   },
//   {
//     id: "CMP002", 
//     title: "Garbage collection delay",
//     category: "Sanitation",
//     priority: "medium",
//     status: "in-progress",
//     location: "Green Park Colony",
//     coordinates: { lat: 28.5245, lng: 77.2066 },
//     citizenName: "Rahul Gupta",
//   },
//   {
//     id: "CMP003",
//     title: "Water supply disruption",
//     category: "Water",
//     priority: "high",
//     status: "resolved",
//     location: "Blue Ridge Apartments",
//     coordinates: { lat: 28.4595, lng: 77.0266 },
//     citizenName: "Meera Joshi",
//   },
//   {
//     id: "CMP004",
//     title: "Large pothole on Highway 21",
//     category: "Roads",
//     priority: "medium",
//     status: "pending",
//     location: "Highway 21, KM 15",
//     coordinates: { lat: 28.7041, lng: 77.1025 },
//     citizenName: "Vikash Kumar",
//   },
//   {
//     id: "CMP005",
//     title: "Park maintenance required",
//     category: "Parks",
//     priority: "low",
//     status: "in-progress",
//     location: "Central Park, Sector 8",
//     coordinates: { lat: 28.6129, lng: 77.2295 },
//     citizenName: "Anjali Verma",
//   },
// ];

// // Map component (mock implementation - in real app would use Google Maps/MapBox)
// const MapComponent = ({ complaints, selectedComplaint, onComplaintSelect }: any) => {
//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case "high": return "#ef4444";
//       case "medium": return "#f59e0b"; 
//       case "low": return "#10b981";
//       default: return "#6b7280";
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "resolved": return "✓";
//       case "in-progress": return "⟳";
//       default: return "!";
//     }
//   };

//   return (
//     <div className="relative w-full h-[500px] bg-gray-100 rounded-lg border border-card-border overflow-hidden">
//       {/* Mock Map Background */}
//       <div 
//         className="absolute inset-0 bg-cover bg-center"
//         style={{
//           backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
//             <svg width="800" height="500" xmlns="http://www.w3.org/2000/svg">
//               <defs>
//                 <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
//                   <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" stroke-width="1"/>
//                 </pattern>
//               </defs>
//               <rect width="100%" height="100%" fill="#f9fafb"/>
//               <rect width="100%" height="100%" fill="url(#grid)"/>
//               <path d="M100,50 Q200,100 300,50 T500,50" stroke="#d1d5db" stroke-width="3" fill="none"/>
//               <path d="M50,100 L150,150 L250,120 L350,180 L450,140" stroke="#d1d5db" stroke-width="2" fill="none"/>
//               <rect x="200" y="150" width="80" height="60" fill="#e5e7eb" rx="5"/>
//               <rect x="400" y="200" width="60" height="40" fill="#e5e7eb" rx="3"/>
//               <circle cx="150" cy="100" r="15" fill="#d1d5db"/>
//               <circle cx="350" cy="250" r="20" fill="#d1d5db"/>
//             </svg>
//           `)}')`
//         }}
//       />

//       {/* Map Controls */}
//       <div className="absolute top-4 right-4 flex flex-col gap-2">
//         <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
//           <Navigation className="w-4 h-4" />
//         </Button>
//         <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
//           <Layers className="w-4 h-4" />
//         </Button>
//         <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
//           <RotateCcw className="w-4 h-4" />
//         </Button>
//       </div>

//       {/* Complaint Markers */}
//       {complaints.map((complaint: any, index: number) => (
//         <div
//           key={complaint.id}
//           className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 ${
//             selectedComplaint?.id === complaint.id ? 'scale-125 z-20' : 'z-10'
//           }`}
//           style={{
//             left: `${20 + (index * 15) % 60}%`,
//             top: `${30 + (index * 20) % 40}%`,
//           }}
//           onClick={() => onComplaintSelect(complaint)}
//         >
//           <div 
//             className="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-sm font-bold"
//             style={{ backgroundColor: getPriorityColor(complaint.priority) }}
//           >
//             {getStatusIcon(complaint.status)}
//           </div>
          
//           {/* Tooltip */}
//           <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
//             {complaint.title}
//           </div>
//         </div>
//       ))}

//       {/* Legend */}
//       <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
//         <h4 className="text-sm font-medium mb-2">Priority Levels</h4>
//         <div className="space-y-1">
//           <div className="flex items-center gap-2 text-xs">
//             <div className="w-3 h-3 rounded-full bg-red-500"></div>
//             <span>High Priority</span>
//           </div>
//           <div className="flex items-center gap-2 text-xs">
//             <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
//             <span>Medium Priority</span>
//           </div>
//           <div className="flex items-center gap-2 text-xs">
//             <div className="w-3 h-3 rounded-full bg-green-500"></div>
//             <span>Low Priority</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ComplaintsMapView = () => {
//   const [complaints, setComplaints] = useState(mockMapComplaints);
//   const [filteredComplaints, setFilteredComplaints] = useState(mockMapComplaints);
//   const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [priorityFilter, setPriorityFilter] = useState("all");
//   const navigate = useNavigate();

//   useEffect(() => {
//     let filtered = complaints;

//     if (statusFilter !== "all") {
//       filtered = filtered.filter(complaint => complaint.status === statusFilter);
//     }

//     if (categoryFilter !== "all") {
//       filtered = filtered.filter(complaint => complaint.category === categoryFilter);
//     }

//     if (priorityFilter !== "all") {
//       filtered = filtered.filter(complaint => complaint.priority === priorityFilter);
//     }

//     setFilteredComplaints(filtered);
//   }, [statusFilter, categoryFilter, priorityFilter, complaints]);

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

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-foreground">Complaints Map View</h1>
//           <p className="text-muted-foreground">Geographic view of civic complaints</p>
//         </div>
//         <Button 
//           onClick={() => navigate('/admin/complaints')}
//           variant="outline"
//         >
//           <Eye className="w-4 h-4 mr-2" />
//           List View
//         </Button>
//       </div>

//       {/* Filters */}
//       <Card className="border-card-border shadow-sm">
//         <CardHeader>
//           <CardTitle className="text-lg">Map Filters</CardTitle>
//           <CardDescription>Filter complaints shown on the map</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             {/* Status Filter */}
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="All Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Status</SelectItem>
//                 <SelectItem value="pending">Pending</SelectItem>
//                 <SelectItem value="in-progress">In Progress</SelectItem>
//                 <SelectItem value="resolved">Resolved</SelectItem>
//               </SelectContent>
//             </Select>

//             {/* Category Filter */}
//             <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="All Categories" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Categories</SelectItem>
//                 <SelectItem value="Sanitation">Sanitation</SelectItem>
//                 <SelectItem value="Roads">Roads</SelectItem>
//                 <SelectItem value="Electricity">Electricity</SelectItem>
//                 <SelectItem value="Water">Water</SelectItem>
//                 <SelectItem value="Parks">Parks</SelectItem>
//               </SelectContent>
//             </Select>

//             {/* Priority Filter */}
//             <Select value={priorityFilter} onValueChange={setPriorityFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="All Priorities" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Priorities</SelectItem>
//                 <SelectItem value="high">High</SelectItem>
//                 <SelectItem value="medium">Medium</SelectItem>
//                 <SelectItem value="low">Low</SelectItem>
//               </SelectContent>
//             </Select>

//             {/* Clear Filters */}
//             <Button 
//               variant="outline" 
//               onClick={() => {
//                 setStatusFilter("all");
//                 setCategoryFilter("all");
//                 setPriorityFilter("all");
//                 setSelectedComplaint(null);
//               }}
//             >
//               <Filter className="w-4 h-4 mr-2" />
//               Clear Filters
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Map */}
//         <div className="lg:col-span-2">
//           <Card className="border-card-border shadow-sm">
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <CardTitle className="text-lg">Interactive Map</CardTitle>
//                   <CardDescription>
//                     Showing {filteredComplaints.length} of {complaints.length} complaints
//                   </CardDescription>
//                 </div>
//                 <Badge variant="outline" className="text-sm">
//                   Demo Map View
//                 </Badge>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <MapComponent 
//                 complaints={filteredComplaints}
//                 selectedComplaint={selectedComplaint}
//                 onComplaintSelect={setSelectedComplaint}
//               />
//             </CardContent>
//           </Card>
//         </div>

//         {/* Complaint Details Sidebar */}
//         <div className="space-y-6">
//           {selectedComplaint ? (
//             <Card className="border-card-border shadow-sm">
//               <CardHeader>
//                 <CardTitle className="text-lg">Selected Complaint</CardTitle>
//                 <CardDescription>Details for {selectedComplaint.id}</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <h4 className="font-medium text-foreground mb-2">
//                     {selectedComplaint.title}
//                   </h4>
//                   <div className="flex items-center gap-2 mb-3">
//                     <Badge variant="outline" className="text-xs">
//                       {selectedComplaint.category}
//                     </Badge>
//                     <Badge 
//                       variant="secondary" 
//                       className={`text-xs ${getPriorityColor(selectedComplaint.priority)}`}
//                     >
//                       {selectedComplaint.priority}
//                     </Badge>
//                     <Badge 
//                       variant="outline" 
//                       className={`text-xs ${getStatusColor(selectedComplaint.status)}`}
//                     >
//                       {selectedComplaint.status.replace('-', ' ')}
//                     </Badge>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <div className="flex items-center gap-2">
//                     <MapPin className="w-4 h-4 text-muted-foreground" />
//                     <span className="text-sm text-foreground">{selectedComplaint.location}</span>
//                   </div>
//                   <div className="text-sm text-muted-foreground">
//                     Reported by: {selectedComplaint.citizenName}
//                   </div>
//                 </div>

//                 <div className="flex gap-2">
//                   <Button 
//                     size="sm"
//                     onClick={() => navigate(`/admin/complaints/${selectedComplaint.id}`)}
//                     className="flex-1 bg-gradient-saffron hover:bg-saffron-dark"
//                   >
//                     <Eye className="w-4 h-4 mr-2" />
//                     View Details
//                   </Button>
//                   <Button 
//                     size="sm"
//                     variant="outline"
//                     onClick={() => {
//                       const { lat, lng } = selectedComplaint.coordinates;
//                       window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
//                     }}
//                   >
//                     <Navigation className="w-4 h-4" />
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ) : (
//             <Card className="border-card-border shadow-sm">
//               <CardContent className="text-center py-8">
//                 <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
//                 <h3 className="font-medium text-foreground mb-2">Select a Complaint</h3>
//                 <p className="text-sm text-muted-foreground">
//                   Click on a marker on the map to view complaint details
//                 </p>
//               </CardContent>
//             </Card>
//           )}

//           {/* Statistics */}
//           <Card className="border-card-border shadow-sm">
//             <CardHeader>
//               <CardTitle className="text-lg">Area Statistics</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="text-center p-3 bg-background-accent rounded-lg">
//                   <p className="text-2xl font-bold text-danger">
//                     {filteredComplaints.filter(c => c.priority === 'high').length}
//                   </p>
//                   <p className="text-sm text-muted-foreground">High Priority</p>
//                 </div>
//                 <div className="text-center p-3 bg-background-accent rounded-lg">
//                   <p className="text-2xl font-bold text-success">
//                     {filteredComplaints.filter(c => c.status === 'resolved').length}
//                   </p>
//                   <p className="text-sm text-muted-foreground">Resolved</p>
//                 </div>
//               </div>
              
//               <div className="space-y-2">
//                 <h4 className="font-medium text-sm">By Category</h4>
//                 {["Sanitation", "Roads", "Electricity", "Water", "Parks"].map(category => {
//                   const count = filteredComplaints.filter(c => c.category === category).length;
//                   return (
//                     <div key={category} className="flex items-center justify-between text-sm">
//                       <span className="text-muted-foreground">{category}</span>
//                       <span className="font-medium">{count}</span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ComplaintsMapView;

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Filter,
  Eye,
  Navigation,
  Layers,
  RotateCcw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// MapComponent: mock map with markers
const MapComponent = ({ complaints, selectedComplaint, onComplaintSelect }: any) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "#ef4444";
      case "medium":
        return "#f59e0b";
      case "low":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return "✓";
      case "in-progress":
        return "⟳";
      default:
        return "!";
    }
  };

  return (
    <div className="relative w-full h-[500px] bg-gray-100 rounded-lg border border-card-border overflow-hidden">
      {/* Mock Map Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
            <svg width="800" height="500" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" stroke-width="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="#f9fafb"/>
              <rect width="100%" height="100%" fill="url(#grid)"/>
            </svg>
          `)}')`,
        }}
      />

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
          <Navigation className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
          <Layers className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Complaint Markers */}
      {Array.isArray(complaints) &&
        complaints.map((complaint: any, index: number) => (
          <div
            key={complaint._id || index}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 ${
              selectedComplaint?._id === complaint._id ? "scale-125 z-20" : "z-10"
            }`}
            style={{
              left: `${20 + (index * 15) % 60}%`,
              top: `${30 + (index * 20) % 40}%`,
            }}
            onClick={() => onComplaintSelect(complaint)}
          >
            <div
              className="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-sm font-bold"
              style={{ backgroundColor: getPriorityColor(complaint.priority) }}
            >
              {getStatusIcon(complaint.status)}
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
              {complaint.title || "No Title"}
            </div>
          </div>
        ))}
    </div>
  );
};

const ComplaintsMapView = () => {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<any[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch complaints from backend
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/complaints");
        const complaintsArray = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.data)
          ? res.data.data
          : [];
        setComplaints(complaintsArray);
        setFilteredComplaints(complaintsArray);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch complaints from server.");
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  // Filters
  useEffect(() => {
    let filtered = complaints;
    if (statusFilter !== "all") filtered = filtered.filter((c) => c.status === statusFilter);
    if (categoryFilter !== "all") filtered = filtered.filter((c) => c.category === categoryFilter);
    if (priorityFilter !== "all") filtered = filtered.filter((c) => c.priority === priorityFilter);
    setFilteredComplaints(filtered);
  }, [statusFilter, categoryFilter, priorityFilter, complaints]);

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

  if (loading) return <p className="p-6">Loading complaints...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Complaints Map View</h1>
          <p className="text-muted-foreground">Geographic view of civic complaints</p>
        </div>
        <Button onClick={() => navigate("/admin/complaints")} variant="outline">
          <Eye className="w-4 h-4 mr-2" />
          List View
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-card-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Map Filters</CardTitle>
          <CardDescription>Filter complaints shown on the map</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                setStatusFilter("all");
                setCategoryFilter("all");
                setPriorityFilter("all");
                setSelectedComplaint(null);
              }}
            >
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card className="border-card-border shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Interactive Map</CardTitle>
                  <CardDescription>
                    Showing {filteredComplaints.length} of {complaints.length} complaints
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-sm">
                  Demo Map View
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <MapComponent
                complaints={filteredComplaints}
                selectedComplaint={selectedComplaint}
                onComplaintSelect={setSelectedComplaint}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {selectedComplaint ? (
            <Card className="border-card-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Selected Complaint</CardTitle>
                <CardDescription>Details for {selectedComplaint._id}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">{selectedComplaint.title}</h4>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">
                      {selectedComplaint.category}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${getPriorityColor(selectedComplaint.priority)}`}
                    >
                      {selectedComplaint.priority}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getStatusColor(selectedComplaint.status)}`}
                    >
                      {selectedComplaint.status?.replace("-", " ") || "pending"}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{selectedComplaint.location}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Reported by: {selectedComplaint.citizenName || "Unknown"}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => navigate(`/admin/complaints/${selectedComplaint._id}`)}
                    className="flex-1 bg-gradient-saffron hover:bg-saffron-dark"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const { lat, lng } = selectedComplaint.coordinates || {};
                      if (lat && lng)
                        window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
                    }}
                  >
                    <Navigation className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-card-border shadow-sm">
              <CardContent className="text-center py-8">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-2">Select a Complaint</h3>
                <p className="text-sm text-muted-foreground">
                  Click on a marker on the map to view complaint details
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintsMapView;
