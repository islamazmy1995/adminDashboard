import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import {
  Search,
  Users,
  Globe,
  BookOpen,
  TrendingUp,
  Eye,
  MessageCircle,
  Award,
  Send,
  X,
  Plus,
  Edit2,
  Phone,
  Mail,
  MapPin,
  Loader2,
  AlertCircle,
  CheckCircle,
  Trash2
} from 'lucide-react';

interface Student {
  id: number;
  name: string;
  email: string;
  whatsappNumber: string;
  country: string;
  state: string;
  courseCategory: string;
  numberOfCoursesEnrolled: number;
  coursesEnrolled: string[];
  aftersaleRecommendationCourse: string;
  recommendationSent?: boolean;
  dateEnrolled?: string;
  status?: 'active' | 'inactive' | 'pending';
  avatar?: string;
}

interface NewStudent {
  name: string;
  email: string;
  whatsappNumber: string;
  country: string;
  state: string;
  courseCategory: string;
  coursesEnrolled: string[];
  aftersaleRecommendationCourse: string;
}

const categories = ["Programming", "Data Science", "AI/ML", "Design", "Business", "Marketing"];

const defaultNewStudent: NewStudent = {
  name: '',
  email: '',
  whatsappNumber: '',
  country: '',
  state: '',
  courseCategory: '',
  coursesEnrolled: [],
  aftersaleRecommendationCourse: ''
};

// Initial students data
const initialStudentsData: Student[] = [
  {
    id: 1,
    name: "Emma Davis",
    email: "emma.davis@example.com",
    whatsappNumber: "+1-555-0101",
    country: "USA",
    state: "California",
    courseCategory: "Programming",
    numberOfCoursesEnrolled: 3,
    coursesEnrolled: ["React Development", "JavaScript Fundamentals", "UI/UX Design"],
    aftersaleRecommendationCourse: "Advanced React Patterns",
    recommendationSent: false,
    status: "active",
    dateEnrolled: "2024-01-15",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: 2,
    name: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",
    whatsappNumber: "+20-100-123-4567",
    country: "Egypt",
    state: "Cairo",
    courseCategory: "Data Science",
    numberOfCoursesEnrolled: 2,
    coursesEnrolled: ["Python for Data Science", "Machine Learning Basics"],
    aftersaleRecommendationCourse: "Deep Learning Fundamentals",
    recommendationSent: true,
    status: "active",
    dateEnrolled: "2024-01-20",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    email: "maria.rodriguez@example.com",
    whatsappNumber: "+34-600-123-456",
    country: "Spain",
    state: "Madrid",
    courseCategory: "Marketing",
    numberOfCoursesEnrolled: 1,
    coursesEnrolled: ["Digital Marketing"],
    aftersaleRecommendationCourse: "Social Media Strategy",
    recommendationSent: false,
    status: "active",
    dateEnrolled: "2024-02-01",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    id: 4,
    name: "Liu Wei",
    email: "liu.wei@example.com",
    whatsappNumber: "+86-138-0013-8000",
    country: "China",
    state: "Beijing",
    courseCategory: "AI/ML",
    numberOfCoursesEnrolled: 4,
    coursesEnrolled: ["AI/ML Fundamentals", "Python Programming", "Data Visualization", "Statistics"],
    aftersaleRecommendationCourse: "Computer Vision",
    recommendationSent: true,
    status: "active",
    dateEnrolled: "2024-01-25",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg"
  },
  {
    id: 5,
    name: "John Smith",
    email: "john.smith@example.com",
    whatsappNumber: "+1-555-0102",
    country: "USA",
    state: "New York",
    courseCategory: "Business",
    numberOfCoursesEnrolled: 2,
    coursesEnrolled: ["Business Analytics", "Project Management"],
    aftersaleRecommendationCourse: "Leadership Skills",
    recommendationSent: false,
    status: "active",
    dateEnrolled: "2024-02-10",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg"
  },
  {
    id: 6,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    whatsappNumber: "+44-7700-900123",
    country: "UK",
    state: "London",
    courseCategory: "Design",
    numberOfCoursesEnrolled: 3,
    coursesEnrolled: ["Web Design", "Graphic Design", "Photography"],
    aftersaleRecommendationCourse: "Brand Identity Design",
    recommendationSent: true,
    status: "active",
    dateEnrolled: "2024-01-30",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg"
  }
];

// Analytics data
const enrollmentTrends = {
  2022: {
    quarter: [
      { period: 'Q1', students: 120 },
      { period: 'Q2', students: 145 },
      { period: 'Q3', students: 167 },
      { period: 'Q4', students: 189 }
    ],
    month: [
      { period: 'Jan', students: 35 },
      { period: 'Feb', students: 42 },
      { period: 'Mar', students: 43 },
      { period: 'Apr', students: 48 },
      { period: 'May', students: 49 },
      { period: 'Jun', students: 48 },
      { period: 'Jul', students: 52 },
      { period: 'Aug', students: 55 },
      { period: 'Sep', students: 60 },
      { period: 'Oct', students: 58 },
      { period: 'Nov', students: 65 },
      { period: 'Dec', students: 66 }
    ]
  },
  2023: {
    quarter: [
      { period: 'Q1', students: 195 },
      { period: 'Q2', students: 225 },
      { period: 'Q3', students: 267 },
      { period: 'Q4', students: 289 }
    ],
    month: [
      { period: 'Jan', students: 62 },
      { period: 'Feb', students: 65 },
      { period: 'Mar', students: 68 },
      { period: 'Apr', students: 72 },
      { period: 'May', students: 75 },
      { period: 'Jun', students: 78 },
      { period: 'Jul', students: 82 },
      { period: 'Aug', students: 88 },
      { period: 'Sep', students: 97 },
      { period: 'Oct', students: 92 },
      { period: 'Nov', students: 98 },
      { period: 'Dec', students: 99 }
    ]
  },
  2024: {
    quarter: [
      { period: 'Q1', students: 310 },
      { period: 'Q2', students: 345 },
      { period: 'Q3', students: 378 },
      { period: 'Q4', students: 395 }
    ],
    month: [
      { period: 'Jan', students: 95 },
      { period: 'Feb', students: 102 },
      { period: 'Mar', students: 113 },
      { period: 'Apr', students: 111 },
      { period: 'May', students: 115 },
      { period: 'Jun', students: 119 },
      { period: 'Jul', students: 122 },
      { period: 'Aug', students: 125 },
      { period: 'Sep', students: 131 },
      { period: 'Oct', students: 128 },
      { period: 'Nov', students: 133 },
      { period: 'Dec', students: 134 }
    ]
  }
};

const availableYears = [2022, 2023, 2024];

export default function Students() {
  const [students, setStudents] = useState<Student[]>(initialStudentsData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [enrollmentYear, setEnrollmentYear] = useState(2024);
  const [enrollmentPeriod, setEnrollmentPeriod] = useState<'quarter' | 'month'>('month');
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [newStudent, setNewStudent] = useState<NewStudent>(defaultNewStudent);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Get unique countries for filter
  const countries = Array.from(new Set(students.map(s => s.country))).sort();

  // Filter students
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || 
                           student.courseCategory === categoryFilter ||
                           student.coursesEnrolled.some(course => 
                             course.toLowerCase().includes(categoryFilter.toLowerCase())
                           );

    const matchesCountry = countryFilter === "all" || student.country === countryFilter;
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesCountry && matchesStatus;
  });

  // Calculate statistics
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'active').length;
  const topCountry = countries.length > 0 ? countries.reduce((a, b) =>
    students.filter(s => s.country === a).length > students.filter(s => s.country === b).length ? a : b
  ) : 'N/A';

  // Calculate course enrollment data
  const courseEnrollmentData = categories.map(category => ({
    category,
    count: students.filter(student => 
      student.courseCategory === category ||
      student.coursesEnrolled.some(course => 
        course.toLowerCase().includes(category.toLowerCase())
      )
    ).length
  }));

  // Country distribution
  const countryDistribution = countries.map(country => {
    const studentCount = students.filter(s => s.country === country).length;
    return {
      name: country,
      value: studentCount,
      students: studentCount,
      flag: getCountryFlag(country)
    };
  }).sort((a, b) => b.students - a.students);

  function getCountryFlag(country: string): string {
    const flags: { [key: string]: string } = {
      'USA': '🇺🇸',
      'Egypt': '🇪🇬',
      'Spain': '🇪🇸',
      'China': '🇨🇳',
      'UK': '🇬🇧',
      'India': '🇮🇳',
      'Brazil': '🇧🇷',
      'Saudi Arabia': '🇸🇦',
      'France': '🇫🇷',
      'Germany': '🇩🇪',
      'Canada': '🇨🇦'
    };
    return flags[country] || '🌍';
  }

  // Student operations
  const toggleRecommendation = async (studentId: number) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    try {
      const updatedStudent = {
        ...student,
        recommendationSent: !student.recommendationSent
      };

      setStudents(prev => prev.map(s =>
        s.id === studentId ? updatedStudent : s
      ));
      
      setSuccessMessage(`Recommendation ${updatedStudent.recommendationSent ? 'sent' : 'cancelled'} for ${student.name}`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError('Failed to update recommendation status');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleAddStudent = async () => {
    if (!newStudent.name || !newStudent.email || !newStudent.whatsappNumber) {
      setError('Please fill in all required fields');
      setTimeout(() => setError(null), 3000);
      return;
    }

    try {
      setSubmitting(true);
      const studentToAdd: Student = {
        ...newStudent,
        id: Date.now(),
        numberOfCoursesEnrolled: newStudent.coursesEnrolled.length,
        recommendationSent: false,
        dateEnrolled: new Date().toISOString().split('T')[0],
        status: 'active',
        avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${Math.floor(Math.random() * 10) + 1}.jpg`
      };

      setStudents(prev => [...prev, studentToAdd]);
      setNewStudent(defaultNewStudent);
      setIsAddModalOpen(false);
      setSuccessMessage(`Successfully added student: ${newStudent.name}`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError('Failed to add student. Please try again.');
      setTimeout(() => setError(null), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditStudent = async () => {
    if (!editingStudent) return;

    try {
      setSubmitting(true);
      const updatedStudent = {
        ...editingStudent,
        numberOfCoursesEnrolled: editingStudent.coursesEnrolled.length
      };

      setStudents(prev => prev.map(s =>
        s.id === editingStudent.id ? updatedStudent : s
      ));
      setEditingStudent(null);
      setIsEditModalOpen(false);
      setSuccessMessage(`Successfully updated student: ${updatedStudent.name}`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError('Failed to update student. Please try again.');
      setTimeout(() => setError(null), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteStudent = async (studentId: number) => {
    try {
      const student = students.find(s => s.id === studentId);
      setStudents(prev => prev.filter(s => s.id !== studentId));
      setSuccessMessage(`Successfully deleted student: ${student?.name}`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError('Failed to delete student. Please try again.');
      setTimeout(() => setError(null), 3000);
    }
  };

  const openEditModal = (student: Student) => {
    setEditingStudent({ ...student });
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Success/Error Messages */}
      {successMessage && (
        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          <CheckCircle className="w-4 h-4" />
          <span>{successMessage}</span>
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
          <Button variant="ghost" size="sm" onClick={() => setError(null)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive student analytics and management</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="text-sm">
            {totalStudents} Total Students
          </Badge>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                  Enter the student's information below.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                    placeholder="Student name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                    placeholder="student@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                  <Input
                    id="whatsapp"
                    value={newStudent.whatsappNumber}
                    onChange={(e) => setNewStudent({...newStudent, whatsappNumber: e.target.value})}
                    placeholder="+1-555-0123"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={newStudent.country}
                      onChange={(e) => setNewStudent({...newStudent, country: e.target.value})}
                      placeholder="USA"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={newStudent.state}
                      onChange={(e) => setNewStudent({...newStudent, state: e.target.value})}
                      placeholder="California"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="category">Course Category</Label>
                  <Select value={newStudent.courseCategory} onValueChange={(value) => setNewStudent({...newStudent, courseCategory: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="courses">Enrolled Courses</Label>
                  <Textarea
                    id="courses"
                    value={newStudent.coursesEnrolled.join(', ')}
                    onChange={(e) => setNewStudent({...newStudent, coursesEnrolled: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})}
                    placeholder="React Development, JavaScript Fundamentals"
                  />
                </div>
                <div>
                  <Label htmlFor="recommendation">Recommended Course</Label>
                  <Input
                    id="recommendation"
                    value={newStudent.aftersaleRecommendationCourse}
                    onChange={(e) => setNewStudent({...newStudent, aftersaleRecommendationCourse: e.target.value})}
                    placeholder="Advanced React Patterns"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                <Button onClick={handleAddStudent} disabled={submitting}>
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Add Student
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeStudents}</div>
            <p className="text-xs text-muted-foreground">{((activeStudents / totalStudents) * 100).toFixed(1)}% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Country</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              {getCountryFlag(topCountry)} {topCountry}
            </div>
            <p className="text-xs text-muted-foreground">{students.filter(s => s.country === topCountry).length} students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Global Reach</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countries.length}</div>
            <p className="text-xs text-muted-foreground">Countries with students</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enrollment Trends */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Student Enrollment Trends</CardTitle>
                <CardDescription>Track enrollment performance over time</CardDescription>
              </div>
              <div className="flex gap-2">
                <Select value={enrollmentYear.toString()} onValueChange={(value) => setEnrollmentYear(parseInt(value))}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableYears.map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={enrollmentPeriod} onValueChange={(value: 'quarter' | 'month') => setEnrollmentPeriod(value)}>
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quarter">Quarter</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={enrollmentTrends[enrollmentYear]?.[enrollmentPeriod] || []}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="period"
                    className="text-muted-foreground"
                    fontSize={12}
                  />
                  <YAxis className="text-muted-foreground" fontSize={12} />
                  <Tooltip
                    formatter={(value: number) => [value.toLocaleString(), 'Students']}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="students"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Country Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Student Distribution</CardTitle>
            <CardDescription>Global student map</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 overflow-y-auto">
              <div className="space-y-3">
                {countryDistribution.map((country, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{country.flag}</span>
                      <div>
                        <p className="font-medium">{country.name}</p>
                        <p className="text-sm text-muted-foreground">{country.students} student{country.students !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${Math.max(...countryDistribution.map(c => c.students)) > 0 ? (country.students / Math.max(...countryDistribution.map(c => c.students))) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground mt-1 block">{totalStudents > 0 ? ((country.students / totalStudents) * 100).toFixed(1) : 0}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Category Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Course Category Popularity</CardTitle>
          <CardDescription>Number of enrollments by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courseEnrollmentData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="category" className="text-muted-foreground" fontSize={12} />
                <YAxis className="text-muted-foreground" fontSize={12} />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search & Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search students by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Course Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Students Data</CardTitle>
              <CardDescription>
                Showing {filteredStudents.length} of {totalStudents} students
              </CardDescription>
            </div>
            <Button variant="outline" onClick={() => setLoading(true)}>
              <TrendingUp className="w-4 h-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-center">Courses</TableHead>
                  <TableHead>Enrolled Courses</TableHead>
                  <TableHead>Recommended Course</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar || `https://randomuser.me/api/portraits/women/1.jpg`}
                          alt={student.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {student.email}
                          </div>
                          <Badge 
                            variant={student.status === 'active' ? 'default' : student.status === 'pending' ? 'secondary' : 'destructive'}
                            className="text-xs mt-1"
                          >
                            {student.status}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3 text-green-600" />
                        <span className="text-sm">{student.whatsappNumber}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <div>
                          <div className="font-medium flex items-center gap-1">
                            {getCountryFlag(student.country)} {student.country}
                          </div>
                          <div className="text-sm text-muted-foreground">{student.state}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{student.courseCategory}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{student.numberOfCoursesEnrolled}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 max-w-xs">
                        {student.coursesEnrolled.slice(0, 3).map((course, index) => (
                          <Badge key={index} variant="outline" className="text-xs mr-1 mb-1">
                            {course}
                          </Badge>
                        ))}
                        {student.coursesEnrolled.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{student.coursesEnrolled.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Award className="w-3 h-3 text-yellow-600" />
                        <span className="text-sm max-w-32 truncate">{student.aftersaleRecommendationCourse}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center gap-2 justify-center">
                        <TooltipProvider>
                          <UITooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => openEditModal(student)}>
                                <Edit2 className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit Student</p>
                            </TooltipContent>
                          </UITooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <UITooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant={student.recommendationSent ? "outline" : "default"}
                                size="sm"
                                onClick={() => toggleRecommendation(student.id)}
                                className={student.recommendationSent ? "text-muted-foreground" : ""}
                              >
                                {student.recommendationSent ? (
                                  <><CheckCircle className="w-3 h-3 mr-1" />Sent</>
                                ) : (
                                  <><Send className="w-3 h-3 mr-1" />Send</>
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{student.recommendationSent ? 'Recommendation Sent' : 'Send Recommendation'}</p>
                            </TooltipContent>
                          </UITooltip>
                        </TooltipProvider>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Student</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {student.name}? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteStudent(student.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredStudents.length === 0 && !loading && (
            <div className="text-center py-16">
              <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No students found</h3>
              <p className="text-muted-foreground">
                {students.length === 0 ? 'No students data available.' : 'Try adjusting your search filters.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Student Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogDescription>
              Update the student's information below.
            </DialogDescription>
          </DialogHeader>
          {editingStudent && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Name *</Label>
                <Input
                  id="edit-name"
                  value={editingStudent.name}
                  onChange={(e) => setEditingStudent({...editingStudent, name: e.target.value})}
                  placeholder="Student name"
                />
              </div>
              <div>
                <Label htmlFor="edit-email">Email *</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editingStudent.email}
                  onChange={(e) => setEditingStudent({...editingStudent, email: e.target.value})}
                  placeholder="student@example.com"
                />
              </div>
              <div>
                <Label htmlFor="edit-whatsapp">WhatsApp Number *</Label>
                <Input
                  id="edit-whatsapp"
                  value={editingStudent.whatsappNumber}
                  onChange={(e) => setEditingStudent({...editingStudent, whatsappNumber: e.target.value})}
                  placeholder="+1-555-0123"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-country">Country</Label>
                  <Input
                    id="edit-country"
                    value={editingStudent.country}
                    onChange={(e) => setEditingStudent({...editingStudent, country: e.target.value})}
                    placeholder="USA"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-state">State</Label>
                  <Input
                    id="edit-state"
                    value={editingStudent.state}
                    onChange={(e) => setEditingStudent({...editingStudent, state: e.target.value})}
                    placeholder="California"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-category">Course Category</Label>
                <Select 
                  value={editingStudent.courseCategory} 
                  onValueChange={(value) => setEditingStudent({...editingStudent, courseCategory: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select 
                  value={editingStudent.status || 'active'} 
                  onValueChange={(value: 'active' | 'inactive' | 'pending') => setEditingStudent({...editingStudent, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-courses">Enrolled Courses</Label>
                <Textarea
                  id="edit-courses"
                  value={editingStudent.coursesEnrolled.join(', ')}
                  onChange={(e) => setEditingStudent({
                    ...editingStudent, 
                    coursesEnrolled: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  placeholder="React Development, JavaScript Fundamentals"
                  className="min-h-[80px]"
                />
              </div>
              <div>
                <Label htmlFor="edit-recommendation">Recommended Course</Label>
                <Input
                  id="edit-recommendation"
                  value={editingStudent.aftersaleRecommendationCourse}
                  onChange={(e) => setEditingStudent({...editingStudent, aftersaleRecommendationCourse: e.target.value})}
                  placeholder="Advanced React Patterns"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-recommendation-sent"
                  checked={editingStudent.recommendationSent || false}
                  onChange={(e) => setEditingStudent({...editingStudent, recommendationSent: e.target.checked})}
                  className="rounded"
                />
                <Label htmlFor="edit-recommendation-sent">Recommendation Sent</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button onClick={handleEditStudent} disabled={submitting}>
              {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Update Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}