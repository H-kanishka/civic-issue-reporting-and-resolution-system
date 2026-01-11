
// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import {
// //   Card,
// //   CardContent,
// //   CardHeader,
// //   CardTitle,
// //   CardDescription,
// // } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Textarea } from "@/components/ui/textarea";
// // import { Badge } from "@/components/ui/badge";
// // import { Progress } from "@/components/ui/progress";

// // const API_URL = "http://localhost:5000/api/complaints"; // 🔹 backend base URL

// // const MyComplaints = () => {
// //   const navigate = useNavigate();
// //   const [complaints, setComplaints] = useState<any[]>([]);
// //   const [editingId, setEditingId] = useState<string | null>(null);
// //   const [editForm, setEditForm] = useState<any>({});
// //   const [filter, setFilter] = useState<string>("All");

// //   // ✅ Fetch complaints from MongoDB
// //   useEffect(() => {
// //     const fetchComplaints = async () => {
// //       try {
// //         const res = await axios.get(API_URL);
// //         setComplaints(res.data.data || []); // your backend sends { success, data }
// //       } catch (error) {
// //         console.error("Error fetching complaints:", error);
// //       }
// //     };
// //     fetchComplaints();
// //   }, []);

// //   // ✅ Delete complaint
// //   const handleDelete = async (id: string) => {
// //     try {
// //       await axios.delete(`${API_URL}/${id}`);
// //       setComplaints((prev) => prev.filter((c) => c._id !== id));
// //     } catch (error) {
// //       console.error("Error deleting complaint:", error);
// //     }
// //   };

// //   // ✅ Start editing
// //   const handleEdit = (complaint: any) => {
// //     setEditingId(complaint._id);
// //     setEditForm({ ...complaint });
// //   };

// //   // ✅ Save edited complaint
// //   const handleSave = async () => {
// //     try {
// //       const res = await axios.put(`${API_URL}/${editingId}`, editForm);
// //       setComplaints((prev) =>
// //         prev.map((c) => (c._id === editingId ? res.data.data : c))
// //       );
// //       setEditingId(null);
// //     } catch (error) {
// //       console.error("Error updating complaint:", error);
// //     }
// //   };

// //   // ✅ Stats
// //   const stats = {
// //     total: complaints.length,
// //     resolved: complaints.filter((c) => c.status === "resolved").length,
// //     inProgress: complaints.filter((c) => c.status === "in progress").length,
// //     submitted: complaints.filter((c) => c.status === "submitted").length,
// //     assigned: complaints.filter((c) => c.status === "assigned").length,
// //   };

// //   const getProgressValue = (status: string) => {
// //     const steps = ["submitted", "assigned", "in progress", "resolved"];
// //     const stepIndex = steps.indexOf(status?.toLowerCase());
// //     if (stepIndex === -1) return 0;
// //     return ((stepIndex + 1) / steps.length) * 100;
// //   };

// //   // ✅ Filtered complaints
// //   const filteredComplaints =
// //     filter === "All"
// //       ? complaints
// //       : complaints.filter(
// //           (c) => c.status.toLowerCase() === filter.toLowerCase()
// //         );

// //   return (
// //     <div className="container mx-auto p-4">
// //       {/* Back Button */}
// //       <Button
// //         variant="outline"
// //         className="mb-4"
// //         onClick={() => navigate("/dashboard")}
// //       >
// //         ← Back to Dashboard
// //       </Button>

// //       <h2 className="text-xl font-bold mb-4 text-center sm:text-left">
// //         My Complaints
// //       </h2>

// //       {/* Stats Bar */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-4">
// //         <Card className="text-center">
// //           <CardContent className="py-4">
// //             <p className="text-2xl font-bold text-orange-500">{stats.total}</p>
// //             <p className="text-sm text-muted-foreground">Total</p>
// //           </CardContent>
// //         </Card>
// //         <Card className="text-center">
// //           <CardContent className="py-4">
// //             <p className="text-2xl font-bold text-blue-600">{stats.submitted}</p>
// //             <p className="text-sm text-muted-foreground">Submitted</p>
// //           </CardContent>
// //         </Card>
// //         <Card className="text-center">
// //           <CardContent className="py-4">
// //             <p className="text-2xl font-bold text-purple-600">{stats.assigned}</p>
// //             <p className="text-sm text-muted-foreground">Assigned</p>
// //           </CardContent>
// //         </Card>
// //         <Card className="text-center">
// //           <CardContent className="py-4">
// //             <p className="text-2xl font-bold text-yellow-500">
// //               {stats.inProgress}
// //             </p>
// //             <p className="text-sm text-muted-foreground">In Progress</p>
// //           </CardContent>
// //         </Card>
// //         <Card className="text-center">
// //           <CardContent className="py-4">
// //             <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
// //             <p className="text-sm text-muted-foreground">Resolved</p>
// //           </CardContent>
// //         </Card>
// //       </div>

// //       {/* Filter Bar */}
// //       <div className="flex flex-wrap gap-2 mb-4">
// //         {["All", "Submitted", "Assigned", "In Progress", "Resolved"].map(
// //           (f) => (
// //             <Button
// //               key={f}
// //               size="sm"
// //               variant={filter === f ? "default" : "outline"}
// //               onClick={() => setFilter(f)}
// //             >
// //               {f}
// //             </Button>
// //           )
// //         )}
// //       </div>

// //       {/* Complaints List */}
// //       {filteredComplaints.length === 0 ? (
// //         <p className="text-muted-foreground text-center">
// //           No complaints found.
// //         </p>
// //       ) : (
// //         <div className="space-y-4">
// //           {filteredComplaints.map((complaint) => (
// //             <Card key={complaint._id} className="bg-blue-50">
// //               {editingId === complaint._id ? (
// //                 <CardContent className="space-y-2">
// //                   <Input
// //                     value={editForm.category}
// //                     onChange={(e) =>
// //                       setEditForm((prev: any) => ({
// //                         ...prev,
// //                         category: e.target.value,
// //                       }))
// //                     }
// //                   />
// //                   <Input
// //                     value={editForm.priority}
// //                     onChange={(e) =>
// //                       setEditForm((prev: any) => ({
// //                         ...prev,
// //                         priority: e.target.value,
// //                       }))
// //                     }
// //                   />
// //                   <Input
// //                     value={editForm.location}
// //                     onChange={(e) =>
// //                       setEditForm((prev: any) => ({
// //                         ...prev,
// //                         location: e.target.value,
// //                       }))
// //                     }
// //                   />
// //                   <Textarea
// //                     value={editForm.description}
// //                     onChange={(e) =>
// //                       setEditForm((prev: any) => ({
// //                         ...prev,
// //                         description: e.target.value,
// //                       }))
// //                     }
// //                   />
// //                   <div className="flex flex-col sm:flex-row gap-2 mt-2">
// //                     <Button size="sm" onClick={handleSave}>
// //                       Save
// //                     </Button>
// //                     <Button
// //                       size="sm"
// //                       variant="secondary"
// //                       onClick={() => setEditingId(null)}
// //                     >
// //                       Cancel
// //                     </Button>
// //                   </div>
// //                 </CardContent>
// //               ) : (
// //                 <>
// //                   <CardHeader>
// //                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
// //                       <div className="flex-1">
// //                         <CardTitle className="text-base sm:text-lg">
// //                           {complaint.category}
// //                         </CardTitle>
// //                         <div className="flex flex-wrap gap-2 mt-1">
// //                           <Badge
// //                             variant="outline"
// //                             className={`${
// //                               complaint.status === "resolved"
// //                                 ? "bg-green-100 text-green-700"
// //                                 : complaint.status === "in progress"
// //                                 ? "bg-yellow-100 text-yellow-700"
// //                                 : complaint.status === "assigned"
// //                                 ? "bg-purple-100 text-purple-700"
// //                                 : "bg-blue-100 text-blue-700"
// //                             }`}
// //                           >
// //                             {complaint.status}
// //                           </Badge>
// //                           <Badge
// //                             variant="outline"
// //                             className={`${
// //                               complaint.priority === "high"
// //                                 ? "bg-red-100 text-red-700"
// //                                 : complaint.priority === "medium"
// //                                 ? "bg-blue-100 text-blue-700"
// //                                 : "bg-gray-100 text-gray-700"
// //                             }`}
// //                           >
// //                             {complaint.priority}
// //                           </Badge>
// //                         </div>

// //                         {/* Dynamic Progress */}
// //                         <div className="mt-2">
// //                           <Progress value={getProgressValue(complaint.status)} />
// //                         </div>
// //                       </div>
// //                     </div>
// //                     <CardDescription className="mt-2 text-sm sm:text-base">
// //                       Location: {complaint.location}
// //                       <br />
// //                       Assigned to: {complaint.assignedTo || "Not Assigned"}
// //                       <br />
// //                       Submitted:{" "}
// //                       {new Date(complaint.createdAt).toLocaleDateString()}
// //                     </CardDescription>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <p className="mt-2 text-sm text-muted-foreground">
// //                       {complaint.description}
// //                     </p>
// //                     <div className="flex flex-col sm:flex-row gap-2 mt-4">
// //                       <Button size="sm" onClick={() => handleEdit(complaint)}>
// //                         Edit
// //                       </Button>
// //                       <Button
// //                         size="sm"
// //                         variant="destructive"
// //                         onClick={() => handleDelete(complaint._id)}
// //                       >
// //                         Delete
// //                       </Button>
// //                     </div>
// //                   </CardContent>
// //                 </>
// //               )}
// //             </Card>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default MyComplaints;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";

// const API_URL = "http://localhost:5000/api/complaints"; // ✅ backend API

// const MyComplaints = () => {
//   const navigate = useNavigate();
//   const [complaints, setComplaints] = useState<any[]>([]);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [editForm, setEditForm] = useState<any>({});
//   const [filter, setFilter] = useState<string>("All");

//   // ✅ Fetch complaints from backend
//   useEffect(() => {
//     fetch(API_URL)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) setComplaints(data.data);
//       });
//   }, []);

//   // ✅ Delete from MongoDB
//   const handleDelete = async (id: string) => {
//     await fetch(`${API_URL}/${id}`, { method: "DELETE" });
//     setComplaints(complaints.filter((c) => c._id !== id));
//   };

//   // ✅ Edit complaint
//   const handleEdit = (complaint: any) => {
//     setEditingId(complaint._id);
//     setEditForm({ ...complaint });
//   };

//   // ✅ Save changes to MongoDB
//   const handleSave = async () => {
//     const res = await fetch(`${API_URL}/${editingId}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(editForm),
//     });
//     const data = await res.json();
//     if (data.success) {
//       setComplaints(
//         complaints.map((c) => (c._id === editingId ? data.data : c))
//       );
//       setEditingId(null);
//     }
//   };

//   const stats = {
//     total: complaints.length,
//     resolved: complaints.filter((c) => c.status === "resolved").length,
//     inProgress: complaints.filter((c) => c.status === "in progress").length,
//     submitted: complaints.filter((c) => c.status === "submitted").length,
//     assigned: complaints.filter((c) => c.status === "assigned").length,
//   };

//   const getProgressValue = (status: string) => {
//     const steps = ["submitted", "assigned", "in progress", "resolved"];
//     const stepIndex = steps.indexOf(status.toLowerCase());
//     if (stepIndex === -1) return 0;
//     return ((stepIndex + 1) / steps.length) * 100;
//   };

//   const filteredComplaints =
//     filter === "All"
//       ? complaints
//       : complaints.filter((c) => c.status.toLowerCase() === filter.toLowerCase());

//   return (
//     <div className="container mx-auto p-4">
//       <Button
//         variant="outline"
//         className="mb-4"
//         onClick={() => navigate("/dashboard")}
//       >
//         ← Back to Dashboard
//       </Button>

//       <h2 className="text-xl font-bold mb-4 text-center sm:text-left">
//         My Complaints
//       </h2>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-4">
//         <Card className="text-center">
//           <CardContent className="py-4">
//             <p className="text-2xl font-bold text-orange-500">{stats.total}</p>
//             <p className="text-sm text-muted-foreground">Total</p>
//           </CardContent>
//         </Card>
//         <Card className="text-center">
//           <CardContent className="py-4">
//             <p className="text-2xl font-bold text-blue-600">{stats.submitted}</p>
//             <p className="text-sm text-muted-foreground">Submitted</p>
//           </CardContent>
//         </Card>
//         <Card className="text-center">
//           <CardContent className="py-4">
//             <p className="text-2xl font-bold text-purple-600">{stats.assigned}</p>
//             <p className="text-sm text-muted-foreground">Assigned</p>
//           </CardContent>
//         </Card>
//         <Card className="text-center">
//           <CardContent className="py-4">
//             <p className="text-2xl font-bold text-yellow-500">{stats.inProgress}</p>
//             <p className="text-sm text-muted-foreground">In Progress</p>
//           </CardContent>
//         </Card>
//         <Card className="text-center">
//           <CardContent className="py-4">
//             <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
//             <p className="text-sm text-muted-foreground">Resolved</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Filter */}
//       <div className="flex flex-wrap gap-2 mb-4">
//         {["All", "Submitted", "Assigned", "In Progress", "Resolved"].map((f) => (
//           <Button
//             key={f}
//             size="sm"
//             variant={filter === f ? "default" : "outline"}
//             onClick={() => setFilter(f)}
//           >
//             {f}
//           </Button>
//         ))}
//       </div>

//       {/* Complaints List */}
//       {filteredComplaints.length === 0 ? (
//         <p className="text-muted-foreground text-center">No complaints found.</p>
//       ) : (
//         <div className="space-y-4">
//           {filteredComplaints.map((complaint) => (
//             <Card key={complaint._id} className="bg-blue-50">
//               {editingId === complaint._id ? (
//                 <CardContent className="space-y-2">
//                   <Input
//                     value={editForm.category}
//                     onChange={(e) =>
//                       setEditForm((prev: any) => ({
//                         ...prev,
//                         category: e.target.value,
//                       }))
//                     }
//                   />
//                   <Input
//                     value={editForm.priority}
//                     onChange={(e) =>
//                       setEditForm((prev: any) => ({
//                         ...prev,
//                         priority: e.target.value,
//                       }))
//                     }
//                   />
//                   <Input
//                     value={editForm.location}
//                     onChange={(e) =>
//                       setEditForm((prev: any) => ({
//                         ...prev,
//                         location: e.target.value,
//                       }))
//                     }
//                   />
//                   <Textarea
//                     value={editForm.description}
//                     onChange={(e) =>
//                       setEditForm((prev: any) => ({
//                         ...prev,
//                         description: e.target.value,
//                       }))
//                     }
//                   />
//                   <div className="flex flex-col sm:flex-row gap-2 mt-2">
//                     <Button size="sm" onClick={handleSave}>
//                       Save
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="secondary"
//                       onClick={() => setEditingId(null)}
//                     >
//                       Cancel
//                     </Button>
//                   </div>
//                 </CardContent>
//               ) : (
//                 <>
//                   <CardHeader>
//                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
//                       <div className="flex-1">
//                         <CardTitle className="text-base sm:text-lg">
//                           {complaint.category}
//                         </CardTitle>
//                         <div className="flex flex-wrap gap-2 mt-1">
//                           <Badge
//                             variant="outline"
//                             className={`${
//                               complaint.status === "resolved"
//                                 ? "bg-green-100 text-green-700"
//                                 : complaint.status === "in progress"
//                                 ? "bg-yellow-100 text-yellow-700"
//                                 : complaint.status === "assigned"
//                                 ? "bg-purple-100 text-purple-700"
//                                 : "bg-blue-100 text-blue-700"
//                             }`}
//                           >
//                             {complaint.status}
//                           </Badge>
//                           <Badge
//                             variant="outline"
//                             className={`${
//                               complaint.priority === "high"
//                                 ? "bg-red-100 text-red-700"
//                                 : complaint.priority === "medium"
//                                 ? "bg-blue-100 text-blue-700"
//                                 : "bg-gray-100 text-gray-700"
//                             }`}
//                           >
//                             {complaint.priority}
//                           </Badge>
//                         </div>
//                         <div className="mt-2">
//                           <Progress value={getProgressValue(complaint.status)} />
//                         </div>
//                       </div>
//                     </div>
//                     <CardDescription className="mt-2 text-sm sm:text-base">
//                       Location: {complaint.location}
//                       <br />
//                       Assigned to: {complaint.assignedTo || "Not Assigned"}
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="mt-2 text-sm text-muted-foreground">
//                       {complaint.description}
//                     </p>
//                     <div className="flex flex-col sm:flex-row gap-2 mt-4">
//                       <Button size="sm" onClick={() => handleEdit(complaint)}>
//                         Edit
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="destructive"
//                         onClick={() => handleDelete(complaint._id)}
//                       >
//                         Delete
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </>
//               )}
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyComplaints;

// import React, { useEffect, useState } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { MapPin } from "lucide-react";
// import axios from "axios";

// interface Complaint {
//   _id?: string;
//   title: string;
//   category: string;
//   priority: string;
//   status: string;
//   location: any; // GeoJSON or string
//   createdAt?: string;
//   photo?: string | null;
//   submittedDate?: string;
// }

// const getStatusColor = (status: string) => {
//   switch (status) {
//     case "submitted":
//       return "bg-warning text-warning-foreground";
//     case "in-progress":
//       return "bg-primary text-primary-foreground";
//     case "resolved":
//       return "bg-success text-success-foreground";
//     default:
//       return "bg-muted text-muted-foreground";
//   }
// };

// const getPriorityColor = (priority: string) => {
//   switch (priority) {
//     case "high":
//       return "bg-danger text-danger-foreground";
//     case "medium":
//       return "bg-warning text-warning-foreground";
//     case "low":
//       return "bg-success text-success-foreground";
//     default:
//       return "bg-muted text-muted-foreground";
//   }
// };

// const parseLocation = (location: any) => {
//   // Handles both string and GeoJSON
//   if (!location) return "Not specified";
//   if (typeof location === "string") return location;
//   if (location.type === "Point" && Array.isArray(location.coordinates)) {
//     const [lng, lat] = location.coordinates;
//     return `GPS: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
//   }
//   return "Unknown";
// };

// const MyComplaints = () => {
//   const [complaints, setComplaints] = useState<Complaint[]>([]);

//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/complaints"); // Backend API
//         setComplaints(res.data.data);
//       } catch (error) {
//         console.error("Failed to fetch complaints from server, using local storage", error);
//         const localComplaints = JSON.parse(localStorage.getItem("complaints") || "[]");
//         setComplaints(localComplaints);
//       }
//     };

//     fetchComplaints();
//   }, []);

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold">My Complaints</h1>

//       {complaints.length === 0 && <p className="text-muted-foreground">No complaints found.</p>}

//       {complaints.map((complaint, idx) => (
//         <Card key={complaint._id || idx} className="border-card-border shadow-sm hover:bg-background-accent transition-smooth">
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <div>
//                 <CardTitle className="text-sm font-medium text-foreground">{complaint.title}</CardTitle>
//                 <CardDescription className="text-xs text-muted-foreground">{complaint.category}</CardDescription>
//               </div>
//               <Badge className={`text-xs ${getStatusColor(complaint.status)}`}>{complaint.status.replace("-", " ")}</Badge>
//             </div>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             <div className="flex items-center gap-2 text-xs text-muted-foreground">
//               <MapPin className="h-3 w-3" />
//               <span>{parseLocation(complaint.location)}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-xs text-muted-foreground">Priority: <Badge className={`text-xs ${getPriorityColor(complaint.priority)}`}>{complaint.priority}</Badge></span>
//               <span className="text-xs text-muted-foreground">{complaint.submittedDate || new Date(complaint.createdAt || "").toLocaleDateString()}</span>
//             </div>
//             {complaint.photo && <img src={complaint.photo} alt="Complaint" className="max-h-40 rounded-lg mt-2" />}
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default MyComplaints;


import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Trash2, ArrowLeft } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Complaint {
  _id?: string;
  title: string;
  category: string;
  priority: string;
  status: string;
  location: any; // GeoJSON or string
  createdAt?: string;
  photo?: string | null;
  submittedDate?: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "submitted":
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

const parseLocation = (location: any) => {
  if (!location) return "Not specified";
  if (typeof location === "string") return location;
  if (location.type === "Point" && Array.isArray(location.coordinates)) {
    const [lng, lat] = location.coordinates;
    return `GPS: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  }
  return "Unknown";
};

const MyComplaints = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/complaints");
        setComplaints(res.data.data);
      } catch (error) {
        console.error("Failed to fetch complaints from server, using local storage", error);
        const localComplaints = JSON.parse(localStorage.getItem("complaints") || "[]");
        setComplaints(localComplaints);
      }
    };
    fetchComplaints();
  }, []);

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await axios.delete(`http://localhost:5000/api/complaints/${id}`);
      setComplaints((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Failed to delete complaint", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* ✅ Back button */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">My Complaints</h1>
      </div>

      {complaints.length === 0 && <p className="text-muted-foreground">No complaints found.</p>}

      {complaints.map((complaint, idx) => (
        <Card
          key={complaint._id || idx}
          className="border-card-border shadow-sm hover:bg-background-accent transition-smooth"
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-medium text-foreground">
                  {complaint.title}
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  {complaint.category}
                </CardDescription>
              </div>
              <Badge className={`text-xs ${getStatusColor(complaint.status)}`}>
                {complaint.status.replace("-", " ")}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{parseLocation(complaint.location)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Priority:{" "}
                <Badge className={`text-xs ${getPriorityColor(complaint.priority)}`}>
                  {complaint.priority}
                </Badge>
              </span>
              <span className="text-xs text-muted-foreground">
                {complaint.submittedDate ||
                  new Date(complaint.createdAt || "").toLocaleDateString()}
              </span>
            </div>
            {complaint.photo && (
              <img src={complaint.photo} alt="Complaint" className="max-h-40 rounded-lg mt-2" />
            )}

            {/* ✅ Delete button */}
            <div className="flex justify-end pt-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(complaint._id)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MyComplaints;
