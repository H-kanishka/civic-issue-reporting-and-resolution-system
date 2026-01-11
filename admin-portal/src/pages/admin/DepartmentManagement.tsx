import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Mail,
  Phone,
  Building,
  UserPlus,
  Search,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock departments data
const mockDepartments = [
  {
    id: "1",
    name: "Sanitation Department",
    code: "SAN",
    head: "Rajesh Kumar",
    headEmail: "rajesh.kumar@sanitation.gov.in",
    headPhone: "+91 9876543210",
    staffCount: 15,
    activeComplaints: 42,
    resolvedComplaints: 128,
    staff: [
      { id: "s1", name: "Amit Singh", role: "Senior Supervisor", email: "amit.singh@sanitation.gov.in", phone: "+91 9876543211" },
      { id: "s2", name: "Priya Sharma", role: "Field Officer", email: "priya.sharma@sanitation.gov.in", phone: "+91 9876543212" },
      { id: "s3", name: "Suresh Yadav", role: "Technical Assistant", email: "suresh.yadav@sanitation.gov.in", phone: "+91 9876543213" },
    ]
  },
  {
    id: "2",
    name: "Roads & Infrastructure",
    code: "RDS",
    head: "Sanjay Patel",
    headEmail: "sanjay.patel@roads.gov.in",
    headPhone: "+91 9876543220",
    staffCount: 12,
    activeComplaints: 38,
    resolvedComplaints: 95,
    staff: [
      { id: "s4", name: "Vikash Kumar", role: "Site Engineer", email: "vikash.kumar@roads.gov.in", phone: "+91 9876543221" },
      { id: "s5", name: "Deepak Gupta", role: "Quality Inspector", email: "deepak.gupta@roads.gov.in", phone: "+91 9876543222" },
    ]
  },
  {
    id: "3",
    name: "Electricity Board",
    code: "ELE",
    head: "Meera Joshi",
    headEmail: "meera.joshi@electricity.gov.in",
    headPhone: "+91 9876543230",
    staffCount: 18,
    activeComplaints: 32,
    resolvedComplaints: 156,
    staff: [
      { id: "s6", name: "Arjun Reddy", role: "Electrical Engineer", email: "arjun.reddy@electricity.gov.in", phone: "+91 9876543231" },
      { id: "s7", name: "Kavita Verma", role: "Lineman", email: "kavita.verma@electricity.gov.in", phone: "+91 9876543232" },
    ]
  },
  {
    id: "4",
    name: "Water Supply",
    code: "WTR",
    head: "Anand Tripathi",
    headEmail: "anand.tripathi@water.gov.in",
    headPhone: "+91 9876543240",
    staffCount: 10,
    activeComplaints: 25,
    resolvedComplaints: 89,
    staff: [
      { id: "s8", name: "Ravi Sharma", role: "Pump Operator", email: "ravi.sharma@water.gov.in", phone: "+91 9876543241" },
    ]
  },
  {
    id: "5",
    name: "Parks & Recreation",
    code: "PRK",
    head: "Sunita Agarwal",
    headEmail: "sunita.agarwal@parks.gov.in",
    headPhone: "+91 9876543250",
    staffCount: 8,
    activeComplaints: 16,
    resolvedComplaints: 67,
    staff: [
      { id: "s9", name: "Manoj Singh", role: "Gardener", email: "manoj.singh@parks.gov.in", phone: "+91 9876543251" },
    ]
  },
];

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState(mockDepartments);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDeptOpen, setIsAddDeptOpen] = useState(false);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [newDept, setNewDept] = useState({ name: "", code: "", head: "", headEmail: "", headPhone: "" });
  const [newStaff, setNewStaff] = useState({ name: "", role: "", email: "", phone: "", departmentId: "" });
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<any>(null);

  const toSlug = (str: string) =>
    str.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  useEffect(() => {
    const savedUser = localStorage.getItem('adminUser');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));

    const saved = localStorage.getItem('departments');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setDepartments(parsed);
      } catch {}
    } else {
      setDepartments(mockDepartments.map((d) => ({ ...d, slug: toSlug(d.name) })));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('departments', JSON.stringify(departments));
  }, [departments]);

  const filteredDepartments = departments.filter((dept: any) =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.head.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDepartment = () => {
    if (!newDept.name || !newDept.code || !newDept.head) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const department = {
      id: String(departments.length + 1),
      ...newDept,
      slug: toSlug(newDept.name),
      staffCount: 0,
      activeComplaints: 0,
      resolvedComplaints: 0,
      staff: [],
    };

    setDepartments([...departments, department]);
    setNewDept({ name: "", code: "", head: "", headEmail: "", headPhone: "" });
    setIsAddDeptOpen(false);
    
    toast({
      title: "Department Added",
      description: `${department.name} has been successfully added`,
    });
  };

  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.role || !newStaff.departmentId) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setDepartments(departments.map(dept => {
      if (dept.id === newStaff.departmentId) {
        return {
          ...dept,
          staff: [...dept.staff, { id: `s${Date.now()}`, ...newStaff }],
          staffCount: dept.staffCount + 1,
        };
      }
      return dept;
    }));

    setNewStaff({ name: "", role: "", email: "", phone: "", departmentId: "" });
    setIsAddStaffOpen(false);

    toast({
      title: "Staff Added",
      description: `${newStaff.name} has been added to the department`,
    });
  };

  const handleDeleteDepartment = (deptId: string) => {
    setDepartments(departments.filter(dept => dept.id !== deptId));
    toast({
      title: "Department Deleted",
      description: "Department has been successfully removed",
    });
  };

  const getPerformanceColor = (resolved: number, active: number) => {
    const total = resolved + active;
    if (total === 0) return "bg-muted";
    const percentage = (resolved / total) * 100;
    if (percentage >= 75) return "bg-success";
    if (percentage >= 50) return "bg-warning";
    return "bg-danger";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Department Management</h1>
          <p className="text-muted-foreground">Manage departments and staff assignments</p>
        </div>
        <div className="flex gap-2">
            <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Staff
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Staff Member</DialogTitle>
                  <DialogDescription>Add a new staff member to a department</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Select value={newStaff.departmentId} onValueChange={(value) => setNewStaff({...newStaff, departmentId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input 
                      value={newStaff.name} 
                      onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                      placeholder="Enter staff name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input 
                      value={newStaff.role} 
                      onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                      placeholder="Enter role/position"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input 
                      type="email"
                      value={newStaff.email} 
                      onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input 
                      value={newStaff.phone} 
                      onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <Button onClick={handleAddStaff} className="w-full bg-gradient-saffron hover:bg-saffron-dark">
                    Add Staff Member
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isAddDeptOpen} onOpenChange={setIsAddDeptOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-saffron hover:bg-saffron-dark">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Department
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Department</DialogTitle>
                  <DialogDescription>Create a new government department</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Department Name</Label>
                    <Input 
                      value={newDept.name} 
                      onChange={(e) => setNewDept({...newDept, name: e.target.value})}
                      placeholder="e.g., Traffic Management"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Department Code</Label>
                    <Input 
                      value={newDept.code} 
                      onChange={(e) => setNewDept({...newDept, code: e.target.value.toUpperCase()})}
                      placeholder="e.g., TRF"
                      maxLength={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Department Head</Label>
                    <Input 
                      value={newDept.head} 
                      onChange={(e) => setNewDept({...newDept, head: e.target.value})}
                      placeholder="Enter head name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Head Email</Label>
                    <Input 
                      type="email"
                      value={newDept.headEmail} 
                      onChange={(e) => setNewDept({...newDept, headEmail: e.target.value})}
                      placeholder="head@department.gov.in"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Head Phone</Label>
                    <Input 
                      value={newDept.headPhone} 
                      onChange={(e) => setNewDept({...newDept, headPhone: e.target.value})}
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <Button onClick={handleAddDepartment} className="w-full bg-gradient-saffron hover:bg-saffron-dark">
                    Create Department
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
        </div>
      </div>

      {/* Search */}
      <Card className="border-card-border shadow-sm">
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search departments or heads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((department) => (
          <Card key={department.id} className="border-card-border shadow-sm hover:shadow-saffron transition-smooth">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-saffron text-white rounded-lg p-2">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{department.name}</CardTitle>
                    <CardDescription>Code: {department.code}</CardDescription>
                  </div>
                </div>
                <Badge 
                  variant="secondary" 
                  className={`${getPerformanceColor(department.resolvedComplaints, department.activeComplaints)} text-white`}
                >
                  {Math.round((department.resolvedComplaints / (department.resolvedComplaints + department.activeComplaints)) * 100) || 0}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Department Head */}
              <div className="flex items-center gap-3 p-3 bg-background-accent rounded-lg">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/10">
                    {department.head.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">{department.head}</p>
                  <p className="text-xs text-muted-foreground">Department Head</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xl font-bold text-foreground">{department.staffCount}</p>
                  <p className="text-xs text-muted-foreground">Staff</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-warning">{department.activeComplaints}</p>
                  <p className="text-xs text-muted-foreground">Active</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-success">{department.resolvedComplaints}</p>
                  <p className="text-xs text-muted-foreground">Resolved</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">{department.headEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{department.headPhone}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedDepartment(department)}
                >
                  <Users className="w-4 h-4 mr-1" />
                  View Staff
                </Button>
                <Button size="sm" variant="ghost">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-danger hover:text-danger"
                  onClick={() => handleDeleteDepartment(department.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Staff Details Modal */}
      <Dialog open={!!selectedDepartment} onOpenChange={() => setSelectedDepartment(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedDepartment?.name} - Staff Directory</DialogTitle>
            <DialogDescription>
              Manage staff members in {selectedDepartment?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedDepartment && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedDepartment.staff.map((staff: any) => (
                      <TableRow key={staff.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-xs bg-primary/10">
                                {staff.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{staff.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{staff.role}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{staff.email}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{staff.phone}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-danger hover:text-danger">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {selectedDepartment.staff.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No staff members assigned to this department yet.</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DepartmentManagement;