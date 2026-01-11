// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { StatusBadge } from '@/components/ui/status-badge';
// import { PriorityBadge } from '@/components/ui/priority-badge';
// import { useToast } from '@/hooks/use-toast';
// import { 
//   ArrowLeft, 
//   MapPin,
//   Filter,
//   Calendar,
//   User,
//   Eye,
//   Navigation,
//   AlertTriangle
// } from 'lucide-react';

// const NearbyIssues = () => {
//   const [showFilter, setShowFilter] = useState(false);
//   const [selectedFilter, setSelectedFilter] = useState('all');
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   // Mock data for nearby issues
//   const nearbyIssues = [
//     {
//       id: 101,
//       title: "Water Leak on Oak Street",
//       category: "Water & Sewage",
//       status: "in-progress" as const,
//       priority: "high" as const,
//       location: "456 Oak Street",
//       distance: "0.3 miles",
//       submittedDate: "2024-01-24",
//       reportedBy: "Anonymous",
//       description: "Large water leak causing street flooding"
//     },
//     {
//       id: 102,
//       title: "Graffiti in Central Park",
//       category: "Parks & Recreation",
//       status: "assigned" as const,
//       priority: "medium" as const,
//       location: "Central Park Playground",
//       distance: "0.5 miles",
//       submittedDate: "2024-01-23",
//       reportedBy: "Sarah M.",
//       description: "Vandalism on playground equipment"
//     },
//     {
//       id: 103,
//       title: "Noise Complaint - Construction",
//       category: "Noise Pollution",
//       status: "submitted" as const,
//       priority: "low" as const,
//       location: "789 Pine Avenue",
//       distance: "0.7 miles",
//       submittedDate: "2024-01-25",
//       reportedBy: "Mike R.",
//       description: "Early morning construction noise"
//     },
//     {
//       id: 104,
//       title: "Broken Traffic Light",
//       category: "Public Safety",
//       status: "resolved" as const,
//       priority: "critical" as const,
//       location: "Main St & 1st Ave",
//       distance: "0.8 miles",
//       submittedDate: "2024-01-20",
//       reportedBy: "City Watch",
//       description: "Traffic light not functioning properly"
//     },
//     {
//       id: 105,
//       title: "Overflowing Trash Bin",
//       category: "Waste Management",
//       status: "in-progress" as const,
//       priority: "medium" as const,
//       location: "Bus Stop on Maple Street",
//       distance: "1.2 miles",
//       submittedDate: "2024-01-22",
//       reportedBy: "Transit Authority",
//       description: "Public trash bin needs emptying"
//     }
//   ];

//   const handleViewIssue = (issueId: number) => {
//     navigate(`/complaint/${issueId}`);
//   };

//   const handleGetDirections = (location: string) => {
//     // Open in maps app or web
//     const encodedLocation = encodeURIComponent(location);
//     window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, '_blank');
//     toast({
//       title: "Opening directions",
//       description: "Redirecting to maps application",
//     });
//   };

//   const handleReportSimilar = (category: string) => {
//     navigate('/report-issue', { state: { preSelectedCategory: category } });
//   };

//   const handleChangeLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           toast({
//             title: "Location updated!",
//             description: `Now showing issues near ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
//           });
//         },
//         (error) => {
//           console.error('Error getting location:', error);
//           toast({
//             title: "Location access denied",
//             description: "Please enable location services.",
//             variant: "destructive",
//           });
//         }
//       );
//     } else {
//       toast({
//         title: "GPS not supported",
//         description: "Your device doesn't support GPS location.",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleFilterClick = () => {
//     setShowFilter(!showFilter);
//   };

//   const filteredIssues = nearbyIssues.filter(issue => {
//     if (selectedFilter === 'all') return true;
//     return issue.status === selectedFilter;
//   });

//   return (
//     <div className="min-h-screen bg-background pb-20">
//       {/* Header */}
//       <div className="bg-white border-b civic-shadow-soft p-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <Link to="/dashboard">
//               <Button variant="ghost" size="sm">
//                 <ArrowLeft className="h-4 w-4" />
//               </Button>
//             </Link>
//             <div>
//               <h1 className="text-xl font-bold">Nearby Issues</h1>
//               <p className="text-sm text-muted-foreground">Issues reported in your area</p>
//             </div>
//           </div>
//           <Button variant="outline" size="sm" onClick={handleFilterClick}>
//             <Filter className="h-4 w-4 mr-2" />
//             Filter
//           </Button>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-6">
//         {/* Location Info */}
//         <Card className="civic-card-gradient civic-shadow-soft border-0 mb-6">
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
//                   <MapPin className="h-6 w-6 text-primary" />
//                 </div>
//                 <div>
//                   <h3 className="font-medium">Your Location</h3>
//                   <p className="text-sm text-muted-foreground">123 Main Street, Downtown</p>
//                 </div>
//               </div>
//               <Button variant="outline" size="sm" onClick={handleChangeLocation}>
//                 Change Location
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Map Placeholder */}
//         <Card className="civic-card-gradient civic-shadow-soft border-0 mb-6">
//           <CardHeader>
//             <CardTitle>Issues Map</CardTitle>
//             <CardDescription>Visual representation of nearby issues</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
//               <div className="text-center text-muted-foreground">
//                 <MapPin className="h-12 w-12 mx-auto mb-4" />
//                 <p className="text-lg font-medium">Interactive Map</p>
//                 <p className="text-sm">Map integration would show issue locations here</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Filter Options */}
//         {showFilter && (
//           <Card className="civic-card-gradient civic-shadow-soft border-0 mb-6">
//             <CardHeader>
//               <CardTitle>Filter Issues</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex flex-wrap gap-2">
//                 {['all', 'submitted', 'assigned', 'in-progress', 'resolved'].map((filter) => (
//                   <Button
//                     key={filter}
//                     variant={selectedFilter === filter ? 'default' : 'outline'}
//                     size="sm"
//                     onClick={() => setSelectedFilter(filter)}
//                     className="capitalize"
//                   >
//                     {filter === 'all' ? 'All Issues' : filter.replace('-', ' ')}
//                   </Button>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {/* Issues List */}
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <h2 className="text-lg font-semibold">Recent Reports ({filteredIssues.length})</h2>
//             <div className="text-sm text-muted-foreground">
//               Sorted by distance
//             </div>
//           </div>

//           {filteredIssues.map((issue) => (
//             <Card key={issue.id} className="civic-card-gradient civic-shadow-soft border-0">
//               <CardHeader>
//                 <div className="flex items-start justify-between">
//                   <div className="space-y-2">
//                     <CardTitle className="text-lg">{issue.title}</CardTitle>
//                     <div className="flex items-center space-x-2">
//                       <StatusBadge status={issue.status} />
//                       <PriorityBadge priority={issue.priority} />
//                     </div>
//                   </div>
//                   <div className="text-right space-y-1">
//                     <div className="text-sm font-medium text-primary">{issue.distance}</div>
//                     <Button 
//                       variant="outline" 
//                       size="sm"
//                       onClick={() => handleViewIssue(issue.id)}
//                     >
//                       <Eye className="h-4 w-4 mr-2" />
//                       View
//                     </Button>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//                   <div className="flex items-center space-x-2">
//                     <MapPin className="h-4 w-4 text-muted-foreground" />
//                     <span className="text-muted-foreground">Location:</span>
//                     <span className="font-medium">{issue.location}</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Calendar className="h-4 w-4 text-muted-foreground" />
//                     <span className="text-muted-foreground">Reported:</span>
//                     <span className="font-medium">{issue.submittedDate}</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <User className="h-4 w-4 text-muted-foreground" />
//                     <span className="text-muted-foreground">By:</span>
//                     <span className="font-medium">{issue.reportedBy}</span>
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <div className="flex items-center space-x-2 text-sm">
//                     <span className="text-muted-foreground">Category:</span>
//                     <span className="font-medium">{issue.category}</span>
//                   </div>
//                   <p className="text-muted-foreground text-sm">{issue.description}</p>
//                 </div>
//                 <div className="flex items-center justify-between pt-2">
//                   <Button 
//                     variant="outline" 
//                     size="sm"
//                     onClick={() => handleGetDirections(issue.location)}
//                   >
//                     <Navigation className="h-4 w-4 mr-2" />
//                     Get Directions
//                   </Button>
//                   <Button 
//                     variant="ghost" 
//                     size="sm" 
//                     className="text-primary"
//                     onClick={() => handleReportSimilar(issue.category)}
//                   >
//                     <AlertTriangle className="h-4 w-4 mr-2" />
//                     Report Similar Issue
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Community Stats */}
//         <Card className="civic-card-gradient civic-shadow-soft border-0 mt-8">
//           <CardHeader>
//             <CardTitle>Community Activity</CardTitle>
//             <CardDescription>Recent civic engagement in your area</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
//               <div className="space-y-2">
//                 <div className="text-2xl font-bold text-primary">24</div>
//                 <div className="text-sm text-muted-foreground">Issues This Week</div>
//               </div>
//               <div className="space-y-2">
//                 <div className="text-2xl font-bold text-success">18</div>
//                 <div className="text-sm text-muted-foreground">Resolved</div>
//               </div>
//               <div className="space-y-2">
//                 <div className="text-2xl font-bold text-warning">6</div>
//                 <div className="text-sm text-muted-foreground">In Progress</div>
//               </div>
//               <div className="space-y-2">
//                 <div className="text-2xl font-bold text-blue-600">4.2</div>
//                 <div className="text-sm text-muted-foreground">Avg Response Time (days)</div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default NearbyIssues;
 

// import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { StatusBadge } from '@/components/ui/status-badge';
// import { PriorityBadge } from '@/components/ui/priority-badge';
// import { ArrowLeft, Eye } from 'lucide-react';

// // Leaflet imports
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import "leaflet/dist/leaflet.css"; // ✅ Import Leaflet CSS

// const NearbyIssues = () => {
//   const navigate = useNavigate();

//   // Example issues data (replace with API later)
//   const issues = [
//     {
//       id: 1,
//       title: "Pothole",
//       description: 'Big pothole near school',
//       lat: 12.9716,
//       lng: 77.5946,
//       status: 'in-progress',
//       priority: 'high'
//     },
//     {
//       id: 2,
//       title: 'Streetlight Out',
//       description: 'Not working',
//       lat: 12.975,
//       lng: 77.592,
//       status: 'assigned',
//       priority: 'medium'
//     }
//   ];

//   return (
//     <div className="p-4 space-y-4">
//       <div className="flex items-center gap-2">
//         <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
//           <ArrowLeft className="h-5 w-5" />
//         </Button>
//         <h1 className="text-xl font-bold">Nearby Issues</h1>
//       </div>

//       {/* Map Section */}
//       <div className="h-96 rounded-lg overflow-hidden shadow">
//         <MapContainer center={[12.9716, 77.5946]} zoom={13} style={{ height: '100%', width: '100%' }}>
//           <TileLayer
//             attribution='&copy; OpenStreetMap contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           {issues.map((issue) => (
//             <Marker key={issue.id} position={[issue.lat, issue.lng]}>
//               <Popup>
//                 <strong>{issue.title}</strong>
//                 <br />
//                 {issue.description}
//               </Popup>
//             </Marker>
//           ))}
//         </MapContainer>
//       </div>

//       {/* Issues List Section */}
//       <div className="space-y-2">
//         {issues.map((issue) => (
//           <Card key={issue.id}>
//             <CardHeader>
//               <CardTitle className="flex justify-between">
//                 {issue.title}
//                 <StatusBadge status={issue.status as "in-progress" | "completed" | "pending"} />
//               </CardTitle>
//               <CardDescription>{issue.description}</CardDescription>
//             </CardHeader>
//             <CardContent className="flex justify-between items-center">
//               <PriorityBadge priority={issue.priority} />
//               <Button size="sm" onClick={() => navigate(`/issues/${issue.id}`)}>
//                 <Eye className="h-4 w-4 mr-1" /> View
//               </Button>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NearbyIssues;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { PriorityBadge } from "@/components/ui/priority-badge";
import { ArrowLeft, Eye } from "lucide-react";

// Leaflet imports
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const API_BASE = "http://localhost:5000"; // ✅ update if your backend is on a different host/port

// Define type for issue
interface Issue {
  id: number;
  title: string;
  description: string;
  lat: number;
  lng: number;
  status: "submitted" | "assigned" | "in-progress" | "resolved" | "completed" | "pending"; // ✅ extended
  priority: "low" | "medium" | "high" | "critical";
}

const NearbyIssues = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch nearby issues
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `${API_BASE}/api/complaints/nearby?lat=${latitude}&lng=${longitude}&radius=2000`
          );
          const data = await res.json();

          // ✅ FIX: use data.data, not data
          setIssues(data.data || []);
        } catch (err) {
          console.error("Failed to fetch nearby issues", err);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Loading nearby issues...</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Nearby Issues</h1>
      </div>

      {/* Map Section */}
      <div className="h-96 rounded-lg overflow-hidden shadow">
        <MapContainer
          center={
            issues.length > 0
              ? [issues[0].lat, issues[0].lng]
              : [12.9716, 77.5946] // fallback to Bangalore coords
          }
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {issues.map((issue) => (
            <Marker key={issue.id} position={[issue.lat, issue.lng]}>
              <Popup>
                <strong>{issue.title}</strong>
                <br />
                {issue.description}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Issues List Section */}
      <div className="space-y-2">
        {issues.map((issue) => (
          <Card key={issue.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {issue.title}
                <StatusBadge
                  status={issue.status as "in-progress" | "completed" | "pending" | "assigned" | "submitted" | "resolved"}
                />
              </CardTitle>
              <CardDescription>{issue.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <PriorityBadge priority={issue.priority} />
              <Button size="sm" onClick={() => navigate(`/issues/${issue.id}`)}>
                <Eye className="h-4 w-4 mr-1" /> View
              </Button>
            </CardContent>
          </Card>
        ))}

        {issues.length === 0 && (
          <p className="text-center text-muted-foreground">No nearby issues found.</p>
        )}
      </div>
    </div>
  );
};

export default NearbyIssues;
