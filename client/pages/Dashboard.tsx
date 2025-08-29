import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Edit,
  Trash2,
  Loader2,
  AlertCircle,
  Plus,
  Video,
  Save,
  X,
  Calendar,
  Award,
  Upload
} from 'lucide-react';

const Dashboard = () => {
  // Sample data for analytics
  const revenueData = {
    2022: {
      quarter: [
        { period: 'Q1', value: 15200 },
        { period: 'Q2', value: 16800 },
        { period: 'Q3', value: 17200 },
        { period: 'Q4', value: 18300 }
      ],
      month: [
        { period: 'Jan', value: 4800 },
        { period: 'Feb', value: 5100 },
        { period: 'Mar', value: 5300 },
        { period: 'Apr', value: 5400 },
        { period: 'May', value: 5600 },
        { period: 'Jun', value: 5800 },
        { period: 'Jul', value: 5700 },
        { period: 'Aug', value: 5800 },
        { period: 'Sep', value: 5700 },
        { period: 'Oct', value: 6000 },
        { period: 'Nov', value: 6100 },
        { period: 'Dec', value: 6200 }
      ]
    },
    2023: {
      quarter: [
        { period: 'Q1', value: 18200 },
        { period: 'Q2', value: 22500 },
        { period: 'Q3', value: 24800 },
        { period: 'Q4', value: 23700 }
      ],
      month: [
        { period: 'Jan', value: 5800 },
        { period: 'Feb', value: 6100 },
        { period: 'Mar', value: 6300 },
        { period: 'Apr', value: 7200 },
        { period: 'May', value: 7500 },
        { period: 'Jun', value: 7800 },
        { period: 'Jul', value: 8100 },
        { period: 'Aug', value: 8300 },
        { period: 'Sep', value: 8400 },
        { period: 'Oct', value: 7800 },
        { period: 'Nov', value: 7900 },
        { period: 'Dec', value: 8000 }
      ]
    },
    2024: {
      quarter: [
        { period: 'Q1', value: 28900 },
        { period: 'Q2', value: 32100 },
        { period: 'Q3', value: 34200 },
        { period: 'Q4', value: 29300 }
      ],
      month: [
        { period: 'Jan', value: 8900 },
        { period: 'Feb', value: 9800 },
        { period: 'Mar', value: 10200 },
        { period: 'Apr', value: 10800 },
        { period: 'May', value: 10500 },
        { period: 'Jun', value: 10800 },
        { period: 'Jul', value: 11400 },
        { period: 'Aug', value: 11200 },
        { period: 'Sep', value: 11600 },
        { period: 'Oct', value: 10100 },
        { period: 'Nov', value: 9800 },
        { period: 'Dec', value: 9400 }
      ]
    }
  };

  const activeStudentsData = {
    2022: {
      quarter: [
        { period: 'Q1', value: 520 },
        { period: 'Q2', value: 580 },
        { period: 'Q3', value: 620 },
        { period: 'Q4', value: 675 }
      ],
      month: [
        { period: 'Jan', value: 480 },
        { period: 'Feb', value: 495 },
        { period: 'Mar', value: 520 },
        { period: 'Apr', value: 540 },
        { period: 'May', value: 560 },
        { period: 'Jun', value: 580 },
        { period: 'Jul', value: 600 },
        { period: 'Aug', value: 610 },
        { period: 'Sep', value: 620 },
        { period: 'Oct', value: 640 },
        { period: 'Nov', value: 660 },
        { period: 'Dec', value: 675 }
      ]
    },
    2023: {
      quarter: [
        { period: 'Q1', value: 720 },
        { period: 'Q2', value: 785 },
        { period: 'Q3', value: 850 },
        { period: 'Q4', value: 892 }
      ],
      month: [
        { period: 'Jan', value: 685 },
        { period: 'Feb', value: 705 },
        { period: 'Mar', value: 720 },
        { period: 'Apr', value: 750 },
        { period: 'May', value: 770 },
        { period: 'Jun', value: 785 },
        { period: 'Jul', value: 820 },
        { period: 'Aug', value: 835 },
        { period: 'Sep', value: 850 },
        { period: 'Oct', value: 870 },
        { period: 'Nov', value: 880 },
        { period: 'Dec', value: 892 }
      ]
    },
    2024: {
      quarter: [
        { period: 'Q1', value: 950 },
        { period: 'Q2', value: 1080 },
        { period: 'Q3', value: 1180 },
        { period: 'Q4', value: 1247 }
      ],
      month: [
        { period: 'Jan', value: 950 },
        { period: 'Feb', value: 975 },
        { period: 'Mar', value: 995 },
        { period: 'Apr', value: 1020 },
        { period: 'May', value: 1045 },
        { period: 'Jun', value: 1080 },
        { period: 'Jul', value: 1125 },
        { period: 'Aug', value: 1150 },
        { period: 'Sep', value: 1180 },
        { period: 'Oct', value: 1205 },
        { period: 'Nov', value: 1225 },
        { period: 'Dec', value: 1247 }
      ]
    }
  };

  // Initial courses data
  const initialCourses = [
    {
      _id: '1',
      title: 'React Fundamentals',
      description: 'Learn the basics of React development with hands-on projects and real-world examples',
      category: '1',
      instructor: 'John Doe',
      students: 245,
      rating: 4.8,
      status: 'active',
      videos: [
        { id: 1, title: 'Introduction to React', duration: '15:30', description: 'Overview of React framework' },
        { id: 2, title: 'Components and JSX', duration: '22:45', description: 'Understanding React components' }
      ]
    },
    {
      _id: '2',
      title: 'Python for Data Science',
      description: 'Complete guide to data analysis and machine learning with Python',
      category: '2',
      instructor: 'Dr. Sarah Wilson',
      students: 189,
      rating: 4.9,
      status: 'active',
      videos: [
        { id: 3, title: 'Python Basics', duration: '18:20', description: 'Getting started with Python' },
        { id: 4, title: 'Data Manipulation', duration: '25:15', description: 'Working with pandas and numpy' }
      ]
    },
    {
      _id: '3',
      title: 'UI/UX Design Principles',
      description: 'Master modern design principles and create beautiful interfaces',
      category: '3',
      instructor: 'Mike Chen',
      students: 156,
      rating: 4.7,
      status: 'draft',
      videos: []
    }
  ];

  const categories = [
    { _id: '1', name: 'Programming' },
    { _id: '2', name: 'Data Science' },
    { _id: '3', name: 'Design' },
    { _id: '4', name: 'Business' },
    { _id: '5', name: 'Marketing' }
  ];

  const availableYears = [2022, 2023, 2024];

  // State management
  const [courses, setCourses] = useState(initialCourses);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Analytics state
  const [revenueYear, setRevenueYear] = useState(2024);
  const [revenuePeriod, setRevenuePeriod] = useState('month');
  const [studentsYear, setStudentsYear] = useState(2024);
  const [studentsPeriod, setStudentsPeriod] = useState('month');

  // Dialog states
  const [isAddCourseDialogOpen, setIsAddCourseDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isUploadVideoDialogOpen, setIsUploadVideoDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState('');

  // Form states
  const [newCourseForm, setNewCourseForm] = useState({
    title: '',
    description: '',
    instructor: '',
    category: ''
  });

  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    category: '',
    videos: []
  });

  const [uploadVideos, setUploadVideos] = useState([{
    title: '',
    description: '',
    duration: '',
    file: null,
    uploadProgress: 0,
    url: ''
  }]);

  // Stats calculation
  const stats = [
    {
      title: "Total Courses",
      value: courses.length.toString(),
      change: "+12%",
      changeType: "increase",
      icon: BookOpen,
      color: "bg-blue-500"
    },
    {
      title: "Active Students",
      value: courses.reduce((sum, course) => sum + course.students, 0).toLocaleString(),
      change: "+8%",
      changeType: "increase",
      icon: Users,
      color: "bg-green-500"
    },
    {
      title: "Revenue",
      value: "$124,500",
      change: "+15%",
      changeType: "increase",
      icon: TrendingUp,
      color: "bg-green-600"
    }
  ];

  // Top courses data
  const topCoursesData = courses
    .sort((a, b) => b.students - a.students)
    .slice(0, 5)
    .map((course, index) => ({
      ...course,
      rank: index + 1,
      growth: Math.floor(Math.random() * 20) - 5 // Mock growth data
    }));

  // Helper functions
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category?.name || 'Uncategorized';
  };

  // Course operations
  const handleAddCourse = async () => {
    if (!newCourseForm.title.trim()) return;
    
    try {
      setSubmitting(true);
      setError('');
      
      const newCourse = {
        _id: Date.now().toString(),
        ...newCourseForm,
        students: 0,
        rating: 0,
        status: 'draft',
        videos: []
      };

      setCourses(prev => [...prev, newCourse]);
      setNewCourseForm({
        title: '',
        description: '',
        instructor: '',
        category: ''
      });
      setIsAddCourseDialogOpen(false);
      
    } catch (error) {
      console.error('Error adding course:', error);
      setError('Failed to add course. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const openEditDialog = (course) => {
    setEditingCourse(course);
    setEditFormData({
      title: course.title || '',
      description: course.description || '',
      category: course.category || '',
      videos: course.videos || []
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveCourse = async () => {
    if (!editingCourse) return;
    
    try {
      setSubmitting(true);
      setError('');
      
      setCourses(prev => 
        prev.map(course => 
          course._id === editingCourse._id 
            ? { ...course, ...editFormData }
            : course
        )
      );
      
      setIsEditDialogOpen(false);
      setEditingCourse(null);
      
    } catch (error) {
      console.error('Error updating course:', error);
      setError('Failed to update course. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      setError('');
      setCourses(prev => prev.filter(course => course._id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
      setError('Failed to delete course. Please try again.');
    }
  };

  // Video upload functions
  const handleVideoFileChange = (file, index) => {
    if (!file) return;
    
    const updated = [...uploadVideos];
    updated[index].file = file;
    updated[index].uploadProgress = 0;
    setUploadVideos(updated);
    
    // Simulate upload
    const interval = setInterval(() => {
      updated[index].uploadProgress += 10;
      if (updated[index].uploadProgress >= 100) {
        updated[index].uploadProgress = 100;
        updated[index].url = URL.createObjectURL(file);
        clearInterval(interval);
      }
      setUploadVideos([...updated]);
    }, 200);
  };

  const addUploadVideo = () => {
    setUploadVideos([...uploadVideos, {
      title: '',
      description: '',
      duration: '',
      file: null,
      uploadProgress: 0,
      url: ''
    }]);
  };

  const removeUploadVideo = (index) => {
    if (uploadVideos.length > 1) {
      setUploadVideos(uploadVideos.filter((_, i) => i !== index));
    }
  };

  const handleUploadVideosToCourse = () => {
    if (!selectedCourseId) return;
    
    const validVideos = uploadVideos.filter(v => v.url && v.title);
    const newVideos = validVideos.map((v, i) => ({
      id: Date.now() + i,
      title: v.title,
      description: v.description,
      duration: v.duration,
      url: v.url
    }));

    setCourses(prev => prev.map(course => {
      if (course._id === selectedCourseId) {
        return {
          ...course,
          videos: [...course.videos, ...newVideos]
        };
      }
      return course;
    }));

    setIsUploadVideoDialogOpen(false);
    setSelectedCourseId('');
    setUploadVideos([{
      title: '',
      description: '',
      duration: '',
      file: null,
      uploadProgress: 0,
      url: ''
    }]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your platform overview.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsAddCourseDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </Button>
          <Button variant="outline" onClick={() => setIsUploadVideoDialogOpen(true)}>
            <Video className="w-4 h-4 mr-2" />
            Upload Videos
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <div className="flex-1 text-red-800">{error}</div>
          <Button variant="outline" size="sm" onClick={() => setError('')}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.changeType === "increase" ? (
                    <ArrowUpRight className="w-3 h-3 mr-1 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 mr-1 text-red-500" />
                  )}
                  <span className={stat.changeType === "increase" ? "text-green-500" : "text-red-500"}>
                    {stat.change}
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Track revenue performance over time</CardDescription>
              </div>
              <div className="flex gap-2">
                <Select value={revenueYear.toString()} onValueChange={(value) => setRevenueYear(parseInt(value))}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableYears.map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={revenuePeriod} onValueChange={(value) => setRevenuePeriod(value)}>
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
                <LineChart data={revenueData[revenueYear]?.[revenuePeriod] || []}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="period" className="text-muted-foreground" fontSize={12} />
                  <YAxis 
                    className="text-muted-foreground" 
                    fontSize={12} 
                    tickFormatter={(value) => `${value.toLocaleString()}`} 
                  />
                  <Tooltip
                    formatter={(value) => [`${value.toLocaleString()}`, 'Revenue']}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
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

        {/* Active Students Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Active Students</CardTitle>
                <CardDescription>Monitor student engagement trends</CardDescription>
              </div>
              <div className="flex gap-2">
                <Select value={studentsYear.toString()} onValueChange={(value) => setStudentsYear(parseInt(value))}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableYears.map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={studentsPeriod} onValueChange={(value) => setStudentsPeriod(value)}>
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
                <LineChart data={activeStudentsData[studentsYear]?.[studentsPeriod] || []}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="period" className="text-muted-foreground" fontSize={12} />
                  <YAxis 
                    className="text-muted-foreground" 
                    fontSize={12} 
                    tickFormatter={(value) => value.toLocaleString()} 
                  />
                  <Tooltip
                    formatter={(value) => [value.toLocaleString(), 'Active Students']}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--accent-foreground))"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--accent-foreground))', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: 'hsl(var(--accent-foreground))', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Management and Top Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Management */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Courses</CardTitle>
              <CardDescription>Manage and edit your course content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-muted-foreground">No courses found. Create your first course!</p>
                    <Button 
                      className="mt-4"
                      onClick={() => setIsAddCourseDialogOpen(true)}
                    >
                      Add Course
                    </Button>
                  </div>
                ) : (
                  courses.map((course) => (
                    <div key={course._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">{course.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary">{getCategoryName(course.category)}</Badge>
                          <Badge variant={course.status === 'active' ? 'default' : 'outline'}>
                            {course.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {course.videos?.length || 0} lessons • {course.students} students
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => openEditDialog(course)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Course</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{course.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteCourse(course._id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Courses */}
        <Card>
          <CardHeader>
            <CardTitle>Top Courses</CardTitle>
            <CardDescription>Most enrolled courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCoursesData.map((course) => (
                <div key={course._id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                      {course.rank}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{course.title}</p>
                      <p className="text-xs text-muted-foreground">{course.students} enrollments</p>
                    </div>
                  </div>
                  <div className={`text-xs ${course.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {course.growth >= 0 ? '+' : ''}{course.growth}%
                  </div>
                </div>
              ))}
              {topCoursesData.length === 0 && (
                <p className="text-muted-foreground text-sm">No enrollment data available</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Course Dialog */}
      <Dialog open={isAddCourseDialogOpen} onOpenChange={setIsAddCourseDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
            <DialogDescription>Create a new course for your platform</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="course-title">Course Title</Label>
                <Input
                  id="course-title"
                  value={newCourseForm.title}
                  onChange={e => setNewCourseForm({ ...newCourseForm, title: e.target.value })}
                  placeholder="Enter course title"
                  disabled={submitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course-instructor">Instructor</Label>
                <Input
                  id="course-instructor"
                  value={newCourseForm.instructor}
                  onChange={e => setNewCourseForm({ ...newCourseForm, instructor: e.target.value })}
                  placeholder="Enter instructor name"
                  disabled={submitting}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="course-description">Description</Label>
              <Textarea
                id="course-description"
                value={newCourseForm.description}
                onChange={e => setNewCourseForm({ ...newCourseForm, description: e.target.value })}
                placeholder="Course description"
                rows={3}
                disabled={submitting}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="course-category">Category</Label>
              <Select 
                value={newCourseForm.category} 
                onValueChange={(value) => setNewCourseForm({ ...newCourseForm, category: value })}
                disabled={submitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsAddCourseDialogOpen(false)} disabled={submitting}>
                Cancel
              </Button>
              <Button onClick={handleAddCourse} disabled={!newCourseForm.title.trim() || submitting}>
                {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Create Course
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Course Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>Update course information and content</DialogDescription>
          </DialogHeader>
          {editingCourse && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Course Title</Label>
                  <Input
                    id="edit-title"
                    value={editFormData.title}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    disabled={submitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select 
                    value={editFormData.category} 
                    onValueChange={(value) => setEditFormData({ ...editFormData, category: value })}
                    disabled={submitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  rows={3}
                  disabled={submitting}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Course Videos</Label>
                  <Button 
                    type="button" 
                    size="sm" 
                    onClick={() => {
                      const newVideo = {
                        id: Date.now(),
                        title: '',
                        description: '',
                        duration: '',
                        url: ''
                      };
                      setEditFormData({
                        ...editFormData,
                        videos: [...editFormData.videos, newVideo]
                      });
                    }}
                    disabled={submitting}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Video
                  </Button>
                </div>

                {editFormData.videos.length === 0 ? (
                  <div className="text-center py-8 border border-dashed border-gray-200 rounded-lg">
                    <Video className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">No videos added yet</p>
                  </div>
                ) : (
                  editFormData.videos.map((video, index) => (
                    <div key={video.id} className="p-4 border rounded-lg space-y-3 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Video {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditFormData({
                              ...editFormData,
                              videos: editFormData.videos.filter(v => v.id !== video.id)
                            });
                          }}
                          disabled={submitting}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label>Video Title</Label>
                          <Input
                            value={video.title}
                            onChange={(e) => {
                              const updatedVideos = editFormData.videos.map(v =>
                                v.id === video.id ? { ...v, title: e.target.value } : v
                              );
                              setEditFormData({ ...editFormData, videos: updatedVideos });
                            }}
                            placeholder="Video title"
                            disabled={submitting}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Duration</Label>
                          <Input
                            value={video.duration}
                            onChange={(e) => {
                              const updatedVideos = editFormData.videos.map(v =>
                                v.id === video.id ? { ...v, duration: e.target.value } : v
                              );
                              setEditFormData({ ...editFormData, videos: updatedVideos });
                            }}
                            placeholder="e.g. 25:30"
                            disabled={submitting}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Video Description</Label>
                        <Textarea
                          value={video.description}
                          onChange={(e) => {
                            const updatedVideos = editFormData.videos.map(v =>
                              v.id === video.id ? { ...v, description: e.target.value } : v
                            );
                            setEditFormData({ ...editFormData, videos: updatedVideos });
                          }}
                          placeholder="Video description"
                          rows={2}
                          disabled={submitting}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={submitting}>
                  Cancel
                </Button>
                <Button onClick={handleSaveCourse} disabled={!editFormData.title.trim() || submitting}>
                  {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Upload Videos Dialog */}
      <Dialog open={isUploadVideoDialogOpen} onOpenChange={setIsUploadVideoDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Upload Videos to Course</DialogTitle>
            <DialogDescription>Select a course and upload video content</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="select-course">Select Course</Label>
              <Select value={selectedCourseId} onValueChange={setSelectedCourseId} disabled={submitting}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map(course => (
                    <SelectItem key={course._id} value={course._id}>{course.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {uploadVideos.map((video, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Video {index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeUploadVideo(index)}
                    disabled={uploadVideos.length === 1 || submitting}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Video Title</Label>
                    <Input
                      value={video.title}
                      onChange={(e) => {
                        const updated = [...uploadVideos];
                        updated[index].title = e.target.value;
                        setUploadVideos(updated);
                      }}
                      placeholder="Video title"
                      disabled={submitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input
                      value={video.duration}
                      onChange={(e) => {
                        const updated = [...uploadVideos];
                        updated[index].duration = e.target.value;
                        setUploadVideos(updated);
                      }}
                      placeholder="e.g. 25:30"
                      disabled={submitting}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Video Description</Label>
                  <Textarea
                    value={video.description}
                    onChange={(e) => {
                      const updated = [...uploadVideos];
                      updated[index].description = e.target.value;
                      setUploadVideos(updated);
                    }}
                    placeholder="Video description"
                    rows={2}
                    disabled={submitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Upload Video File</Label>
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={e => {
                      const file = e.target.files[0];
                      if (file) {
                        handleVideoFileChange(file, index);
                      }
                    }}
                    disabled={submitting}
                  />
                  {video.uploadProgress > 0 && video.uploadProgress < 100 && (
                    <div className="space-y-1">
                      <Progress value={video.uploadProgress} className="w-full" />
                      <div className="text-xs text-blue-600">Uploading: {video.uploadProgress}%</div>
                    </div>
                  )}
                  {video.url && (
                    <div className="text-xs text-green-600 font-medium">✓ Uploaded successfully!</div>
                  )}
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addUploadVideo}
              disabled={submitting}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Another Video
            </Button>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsUploadVideoDialogOpen(false)} disabled={submitting}>
                Cancel
              </Button>
              <Button 
                onClick={handleUploadVideosToCourse}
                disabled={!selectedCourseId || !uploadVideos.some(v => v.url && v.title) || submitting}
              >
                {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                <Upload className="w-4 h-4 mr-2" />
                Upload Videos
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;