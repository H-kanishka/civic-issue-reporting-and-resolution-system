import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
} from "lucide-react";

// Mock analytics data
const mockAnalytics = {
  overview: {
    totalComplaints: 1247,
    resolvedComplaints: 892,
    pendingComplaints: 246,
    inProgressComplaints: 109,
    avgResolutionTime: 4.2,
    citizenSatisfaction: 87,
  },
  trends: {
    thisMonth: { total: 156, resolved: 89, pending: 42, inProgress: 25 },
    lastMonth: { total: 142, resolved: 95, pending: 28, inProgress: 19 },
    growth: { total: 9.9, resolved: -6.3, pending: 50.0, inProgress: 31.6 },
  },
  byCategory: [
    { category: "Sanitation", complaints: 387, resolved: 298, percentage: 77 },
    { category: "Roads", complaints: 298, resolved: 201, percentage: 67 },
    { category: "Electricity", complaints: 245, resolved: 178, percentage: 73 },
    { category: "Water", complaints: 189, resolved: 145, percentage: 77 },
    { category: "Parks", complaints: 128, resolved: 70, percentage: 55 },
  ],
  byPriority: [
    { priority: "High", count: 89, resolved: 45, color: "bg-danger" },
    { priority: "Medium", count: 156, resolved: 98, color: "bg-warning" },
    { priority: "Low", count: 201, resolved: 178, color: "bg-success" },
  ],
  departments: [
    { name: "Sanitation", efficiency: 85, avgTime: 3.2, complaints: 387 },
    { name: "Electricity", efficiency: 78, avgTime: 4.8, complaints: 245 },
    { name: "Water Supply", efficiency: 82, avgTime: 3.9, complaints: 189 },
    { name: "Roads", efficiency: 72, avgTime: 5.5, complaints: 298 },
    { name: "Parks", efficiency: 65, avgTime: 6.2, complaints: 128 },
  ],
  monthlyData: [
    { month: "Jan", complaints: 145, resolved: 98 },
    { month: "Feb", complaints: 132, resolved: 87 },
    { month: "Mar", complaints: 156, resolved: 112 },
    { month: "Apr", complaints: 189, resolved: 134 },
    { month: "May", complaints: 167, resolved: 123 },
    { month: "Jun", complaints: 142, resolved: 89 },
  ],
};

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState("month");
  const [selectedMetric, setSelectedMetric] = useState("all");

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 80) return "text-success";
    if (efficiency >= 60) return "text-warning";
    return "text-danger";
  };

  const getTrendIcon = (growth: number) => {
    return growth > 0 ? 
      <TrendingUp className="w-4 h-4 text-success" /> : 
      <TrendingDown className="w-4 h-4 text-danger" />;
  };

  const exportReport = (format: string) => {
    // Mock export functionality
    console.log(`Exporting report in ${format} format`);
    // In real app, this would generate and download the report
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics & Reports</h1>
          <p className="text-muted-foreground">Comprehensive complaint analysis and insights</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline"
            onClick={() => exportReport('pdf')}
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-card-border shadow-sm hover:shadow-saffron transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Complaints
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {mockAnalytics.overview.totalComplaints.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {getTrendIcon(mockAnalytics.trends.growth.total)}
              <span>{Math.abs(mockAnalytics.trends.growth.total)}% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm hover:shadow-saffron transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Resolution Rate
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {Math.round((mockAnalytics.overview.resolvedComplaints / mockAnalytics.overview.totalComplaints) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {mockAnalytics.overview.resolvedComplaints} of {mockAnalytics.overview.totalComplaints} resolved
            </p>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm hover:shadow-saffron transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Resolution Time
            </CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {mockAnalytics.overview.avgResolutionTime} days
            </div>
            <p className="text-xs text-muted-foreground">
              Across all departments
            </p>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm hover:shadow-saffron transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Satisfaction Score
            </CardTitle>
            <Users className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {mockAnalytics.overview.citizenSatisfaction}%
            </div>
            <p className="text-xs text-muted-foreground">
              Citizen satisfaction rate
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <Card className="border-card-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Complaints by Category</CardTitle>
            <CardDescription>Distribution across different civic areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalytics.byCategory.map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{item.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">
                        {item.resolved}/{item.complaints}
                      </span>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          item.percentage >= 75 ? 'text-success' :
                          item.percentage >= 50 ? 'text-warning' : 'text-danger'
                        }`}
                      >
                        {item.percentage}%
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        item.percentage >= 75 ? 'bg-success' :
                        item.percentage >= 50 ? 'bg-warning' : 'bg-danger'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Priority Distribution */}
        <Card className="border-card-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Priority Distribution</CardTitle>
            <CardDescription>Complaints by priority level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockAnalytics.byPriority.map((item) => (
                <div key={item.priority} className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{item.priority} Priority</span>
                      <span className="text-sm text-muted-foreground">
                        {item.resolved}/{item.count}
                      </span>
                    </div>
                    <div className="text-2xl font-bold">
                      {item.count}
                      <span className="text-sm font-normal text-muted-foreground ml-2">
                        ({Math.round((item.resolved / item.count) * 100)}% resolved)
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance */}
      <Card className="border-card-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Department Performance</CardTitle>
          <CardDescription>Efficiency metrics across all departments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-card-border text-left">
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Department</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Total Complaints</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Efficiency</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Avg Resolution Time</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="space-y-4">
                {mockAnalytics.departments.map((dept, index) => (
                  <tr key={dept.name} className="border-b border-card-border/50">
                    <td className="py-4 font-medium text-foreground">{dept.name}</td>
                    <td className="py-4 text-muted-foreground">{dept.complaints}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              dept.efficiency >= 80 ? 'bg-success' :
                              dept.efficiency >= 60 ? 'bg-warning' : 'bg-danger'
                            }`}
                            style={{ width: `${dept.efficiency}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${getEfficiencyColor(dept.efficiency)}`}>
                          {dept.efficiency}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-muted-foreground">{dept.avgTime} days</td>
                    <td className="py-4">
                      <Badge 
                        variant="secondary"
                        className={`${
                          dept.efficiency >= 80 ? 'bg-success/10 text-success' :
                          dept.efficiency >= 60 ? 'bg-warning/10 text-warning' : 'bg-danger/10 text-danger'
                        }`}
                      >
                        {dept.efficiency >= 80 ? 'Excellent' :
                         dept.efficiency >= 60 ? 'Good' : 'Needs Improvement'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trends */}
      <Card className="border-card-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Monthly Trends</CardTitle>
          <CardDescription>Complaint volume and resolution trends over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span>Complaints Received</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span>Complaints Resolved</span>
              </div>
            </div>
            
            {/* Mock Chart */}
            <div className="h-64 bg-background-accent rounded-lg p-4 flex items-end justify-around gap-2">
              {mockAnalytics.monthlyData.map((data, index) => (
                <div key={data.month} className="flex flex-col items-center gap-2">
                  <div className="flex items-end gap-1">
                    <div 
                      className="bg-primary rounded-t w-6 min-h-[20px]"
                      style={{ height: `${(data.complaints / 200) * 150}px` }}
                    />
                    <div 
                      className="bg-success rounded-t w-6 min-h-[20px]"
                      style={{ height: `${(data.resolved / 200) * 150}px` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="border-card-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Export Reports</CardTitle>
          <CardDescription>Download detailed analytics reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={() => exportReport('pdf')}
            >
              <Download className="w-5 h-5" />
              <span>PDF Report</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={() => exportReport('excel')}
            >
              <FileText className="w-5 h-5" />
              <span>Excel Data</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col gap-2"
              onClick={() => exportReport('csv')}
            >
              <BarChart3 className="w-5 h-5" />
              <span>CSV Export</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;