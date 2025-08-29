import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  BookOpen, 
  Edit, 
  Calendar, 
  Award, 
  Plus, 
  Trash2, 
  Save, 
  Video,
  FileText,
  Loader2,
  AlertCircle,
  Search,
  Users,
  Star,
  Clock,
  DollarSign,
  MoreHorizontal,
  Upload,
  Play,
  X
} from 'lucide-react';

const CourseManagement = () => {
  // Categories for courses
  const categories = [
    { _id: '1', name: 'Programming' },
    { _id: '2', name: 'Design' },
    { _id: '3', name: 'Business' },
    { _id: '4', name: 'Marketing' },
    { _id: '5', name: 'Data Science' },
    { _id: '6', name: 'AI/ML' }
  ];

  // Sample courses data
  const initialCourses = [
    {
      _id: '1',
      title: 'React Fundamentals',
      description: 'Learn the basics of React development with hands-on projects',
      category: '1',
      price: 199,
      duration: '8 weeks',
      instructors: ['John Doe', 'Jane Smith'],
      students: 245,
      rating: 4.8,
      status: 'active',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      createdAt: '2024-01-15',
      videos: [
        { id: 1, number: 1, title: 'Introduction to React', duration: '15:30', description: 'Overview of React framework', url: 'mock-url', order: 1 },
        { id: 2, number: 2, title: 'Components and JSX', duration: '22:45', description: 'Understanding React components', url: 'mock-url', order: 2 }
      ]
    },
    {
      _id: '2',
      title: 'UI/UX Design Principles',
      description: 'Master modern design principles and create beautiful interfaces',
      category: '2',
      price: 149,
      duration: '6 weeks',
      instructors: ['Sarah Wilson'],
      students: 189,
      rating: 4.6,
      status: 'active',
      thumbnail: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=400',
      createdAt: '2024-01-20',
      videos: []
    },
    {
      _id: '3',
      title: 'Python for Data Science',
      description: 'Complete guide to data analysis and machine learning with Python',
      category: '5',
      price: 249,
      duration: '12 weeks',
      instructors: ['Dr. Mike Chen'],
      students: 156,
      rating: 4.9,
      status: 'draft',
      thumbnail: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400',
      createdAt: '2024-02-01',
      videos: [
        { id: 3, number: 1, title: 'Python Basics', duration: '18:20', description: 'Getting started with Python', url: 'mock-url', order: 1 }
      ]
    }
  ];

  // State management
  const [courses, setCourses] = useState(initialCourses);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Dialog states
  const [isAddCourseDialogOpen, setIsAddCourseDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isUploadVideoDialogOpen, setIsUploadVideoDialogOpen] = useState(false);
  const [isCourseInfoDialogOpen, setIsCourseInfoDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [selectedCourseForInfo, setSelectedCourseForInfo] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState('');

  // Form states
  const [newCourseForm, setNewCourseForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    duration: '',
    instructors: [''],
    status: 'draft',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400'
  });

  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    duration: '',
    instructors: [''],
    status: 'draft',
    thumbnail: '',
    videos: []
  });

  const [lessons, setLessons] = useState([{
    number: 1,
    title: '',
    duration: '',
    description: '',
    url: '',
    uploadProgress: 0
  }]);

  const fileInputRef = useRef(null);

  // Helper functions
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category?.name || 'Uncategorized';
  };

  const getCourseName = (courseId) => {
    return courses.find(c => c._id === courseId)?.title || 'Unknown Course';
  };

  // Filter courses
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructors.some(i => i.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Course operations
  const handleAddCourse = async () => {
    if (!newCourseForm.title.trim()) return;
    
    try {
      setSubmitting(true);
      setError('');
      
      const newCourse = {
        _id: Date.now().toString(),
        ...newCourseForm,
        price: Number(newCourseForm.price) || 0,
        instructors: newCourseForm.instructors.filter(i => i.trim() !== ''),
        students: 0,
        rating: 0,
        createdAt: new Date().toISOString().split('T')[0],
        videos: []
      };

      setCourses(prev => [...prev, newCourse]);
      setNewCourseForm({
        title: '',
        description: '',
        category: '',
        price: '',
        duration: '',
        instructors: [''],
        status: 'draft',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400'
      });
      setIsAddCourseDialogOpen(false);
      
    } catch (error) {
      console.error('Error adding course:', error);
      setError('Failed to add course. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      setError('');
      setCourses(prev => prev.filter(c => c._id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
      setError('Failed to delete course. Please try again.');
    }
  };

  const startEditingCourse = (course) => {
    setEditingCourse(course);
    setEditFormData({
      title: course.title || '',
      description: course.description || '',
      category: course.category || '',
      price: course.price?.toString() || '',
      duration: course.duration || '',
      instructors: course.instructors || [''],
      status: course.status || 'draft',
      thumbnail: course.thumbnail || '',
      videos: course.videos || []
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveCourse = async () => {
    if (!editingCourse) return;
    
    try {
      setSubmitting(true);
      setError('');
      
      const updatedCourse = {
        ...editingCourse,
        title: editFormData.title,
        description: editFormData.description,
        category: editFormData.category,
        price: Number(editFormData.price) || 0,
        duration: editFormData.duration,
        instructors: editFormData.instructors.filter(i => i.trim() !== ''),
        status: editFormData.status,
        thumbnail: editFormData.thumbnail,
        videos: editFormData.videos
      };

      setCourses(prev => prev.map(c =>
        c._id === editingCourse._id ? updatedCourse : c
      ));
      
      setIsEditDialogOpen(false);
      setEditingCourse(null);
      
    } catch (error) {
      console.error('Error updating course:', error);
      setError('Failed to update course. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const showCourseInfo = (course) => {
    setSelectedCourseForInfo(course);
    setIsCourseInfoDialogOpen(true);
  };

  // Lesson management
  const addLesson = () => {
    const nextLessonNumber = Math.max(...lessons.map(l => l.number), 0) + 1;
    setLessons([...lessons, { 
      number: nextLessonNumber,
      title: '', 
      duration: '', 
      description: '', 
      url: '', 
      uploadProgress: 0 
    }]);
  };

  const removeLesson = (index) => {
    if (lessons.length > 1) {
      setLessons(lessons.filter((_, i) => i !== index));
    }
  };

  const handleLessonVideoFileChange = (file, index) => {
    const updated = [...lessons];
    updated[index].uploadProgress = 50;
    setLessons(updated);

    setTimeout(() => {
      updated[index].uploadProgress = 100;
      updated[index].url = URL.createObjectURL(file);
      setLessons([...updated]);
    }, 2000);
  };

  const handleAddLessonsToCourse = async () => {
    if (!selectedCourseId) return;
    
    try {
      setSubmitting(true);
      setError('');
      
      const course = courses.find(c => c._id === selectedCourseId);
      if (!course) return;

      const validLessons = lessons.filter(l => l.url && l.title);
      const lessonsWithIds = validLessons.map((l, index) => ({ 
        ...l, 
        id: Date.now() + Math.random() ,
        order: (course.videos?.length || 0) + index + 1 // 👈 ترتيب الفيديو

      }));

      const updatedVideos = [...(course.videos || []), ...lessonsWithIds];
      const updatedCourse = { ...course, videos: updatedVideos };
      setCourses(prev =>
        prev.map(c =>
          c._id === selectedCourseId ? { ...c, ...updatedCourse } : c
        )
      );
      
      
      
      setLessons([{ number: 1, title: '', duration: '', description: '', url: '', uploadProgress: 0 }]);
      setSelectedCourseId('');
      setIsUploadVideoDialogOpen(false);
      
    } catch (error) {
      console.error('Error adding lessons:', error);
      setError('Failed to add lessons. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Instructor management
  const addInstructor = (formType = 'new') => {
    if (formType === 'new') {
      setNewCourseForm({
        ...newCourseForm,
        instructors: [...newCourseForm.instructors, '']
      });
    } else {
      setEditFormData({
        ...editFormData,
        instructors: [...editFormData.instructors, '']
      });
    }
  };

  const removeInstructor = (index, formType = 'new') => {
    if (formType === 'new') {
      if (newCourseForm.instructors.length > 1) {
        setNewCourseForm({
          ...newCourseForm,
          instructors: newCourseForm.instructors.filter((_, i) => i !== index)
        });
      }
    } else {
      if (editFormData.instructors.length > 1) {
        setEditFormData({
          ...editFormData,
          instructors: editFormData.instructors.filter((_, i) => i !== index)
        });
      }
    }
  };

  const handleFileUpload = (event, formType = 'new') => {
    const file = event.target.files?.[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      if (formType === 'new') {
        setNewCourseForm({ ...newCourseForm, thumbnail: fakeUrl });
      } else {
        setEditFormData({ ...editFormData, thumbnail: fakeUrl });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
              <p className="text-gray-600">Manage courses, content, and educational materials</p>
            </div>
            <div className="text-sm text-gray-500">
              {courses.length} courses total
            </div>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <div className="flex-1 text-red-800">{error}</div>
            <Button variant="outline" size="sm" onClick={() => setError('')}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-24 flex-col hover:bg-blue-50 hover:border-blue-200 transition-all"
                onClick={() => setIsAddCourseDialogOpen(true)}
                disabled={submitting}
              >
                <BookOpen className="w-8 h-8 mb-2 text-blue-600" />
                <span className="font-medium">Add Course</span>
                <span className="text-xs text-gray-500">Create new course</span>
              </Button>

              <Button
                variant="outline"
                className="h-24 flex-col hover:bg-green-50 hover:border-green-200 transition-all"
                onClick={() => setIsUploadVideoDialogOpen(true)}
                disabled={courses.length === 0}
              >
                <Video className="w-8 h-8 mb-2 text-green-600" />
                <span className="font-medium">Add Lessons</span>
                <span className="text-xs text-gray-500">Upload video content</span>
              </Button>

              <Button
                variant="outline"
                className="h-24 flex-col hover:bg-purple-50 hover:border-purple-200 transition-all opacity-50 cursor-not-allowed"
                disabled
              >
                <Calendar className="w-8 h-8 mb-2 text-purple-300" />
                <span className="font-medium text-purple-300">Schedule Event</span>
                <span className="text-xs text-gray-400">Coming soon</span>
              </Button>

              <Button
                variant="outline"
                className="h-24 flex-col hover:bg-yellow-50 hover:border-yellow-200 transition-all opacity-50 cursor-not-allowed"
                disabled
              >
                <Award className="w-8 h-8 mb-2 text-yellow-300" />
                <span className="font-medium text-yellow-300">Issue Certificate</span>
                <span className="text-xs text-gray-400">Coming soon</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filters & Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search courses or instructors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Courses Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Your Courses ({filteredCourses.length})</CardTitle>
            <CardDescription>Manage and edit existing courses</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 mb-4">
                  {courses.length === 0 ? 'No courses found. Create your first course!' : 'No courses match your current filters.'}
                </p>
                {courses.length === 0 && (
                  <Button onClick={() => setIsAddCourseDialogOpen(true)}>
                    Add Your First Course
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <Card key={course._id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-200 relative">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="bg-white/90 hover:bg-white">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => startEditingCourse(course)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Course
                            </DropdownMenuItem>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete Course
                                </DropdownMenuItem>
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
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      {course.videos?.length > 0 && (
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
                          <Play className="w-3 h-3 mr-1" />
                          {course.videos.length} lessons
                        </div>
                      )}
                    </div>
                    
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                          <CardDescription className="mt-1">
                            By {course.instructors?.join(', ') || 'N/A'}
                          </CardDescription>
                        </div>
                        <Badge variant={course.status === "active" ? "default" : course.status === "draft" ? "secondary" : "outline"}>
                          {course.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                        {course.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center text-gray-500">
                              <Users className="w-3 h-3 mr-1" />
                              {course.students}
                            </div>
                            <div className="flex items-center text-gray-500">
                              <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />
                              {course.rating || "New"}
                            </div>
                            <div className="flex items-center text-gray-500">
                              <Clock className="w-3 h-3 mr-1" />
                              {course.duration}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center text-sm font-medium">
                            <DollarSign className="w-3 h-3 mr-1" />
                            {course.price || 'Free'}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {getCategoryName(course.category)}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                    
                    <div className="p-4 pt-0 flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => showCourseInfo(course)}
                      >
                        <FileText className="w-4 h-4 mr-1" />
                        View Info
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEditingCourse(course)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
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
            {/* Course Image Upload */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Course Cover Image</Label>
              <div className="flex items-center space-x-4">
                <div className="w-32 h-20 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                  <img 
                    src={newCourseForm.thumbnail} 
                    alt="Course cover" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'new')}
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended size: 1920x1080px
                  </p>
                </div>
              </div>
            </div>

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
              <Label>Instructors</Label>
              {newCourseForm.instructors.map((instructor, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={instructor}
                    onChange={(e) => {
                      const newInstructors = [...newCourseForm.instructors];
                      newInstructors[index] = e.target.value;
                      setNewCourseForm({ ...newCourseForm, instructors: newInstructors });
                    }}
                    placeholder={`Instructor ${index + 1}`}
                  />
                  {newCourseForm.instructors.length > 1 && (
                    <Button 
                      type="button" 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => removeInstructor(index, 'new')}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                  {index === newCourseForm.instructors.length - 1 && (
                    <Button 
                      type="button" 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => addInstructor('new')}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="course-price">Price ($)</Label>
                <Input
                  id="course-price"
                  type="number"
                  value={newCourseForm.price}
                  onChange={e => setNewCourseForm({ ...newCourseForm, price: e.target.value })}
                  placeholder="0"
                  disabled={submitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course-duration">Duration</Label>
                <Input
                  id="course-duration"
                  value={newCourseForm.duration}
                  onChange={e => setNewCourseForm({ ...newCourseForm, duration: e.target.value })}
                  placeholder="e.g. 8 weeks"
                  disabled={submitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course-status">Status</Label>
                <Select 
                  value={newCourseForm.status} 
                  onValueChange={(value) => setNewCourseForm({ ...newCourseForm, status: value })}
                  disabled={submitting}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
              {/* Course Image Upload */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Course Cover Image</Label>
                <div className="flex items-center space-x-4">
                  <div className="w-32 h-20 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                    <img 
                      src={editFormData.thumbnail} 
                      alt="Course cover" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Change Image
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'edit')}
                      className="hidden"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Recommended size: 1920x1080px
                    </p>
                  </div>
                </div>
              </div>

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

              <div className="space-y-2">
                <Label>Instructors</Label>
                {editFormData.instructors.map((instructor, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={instructor}
                      onChange={(e) => {
                        const newInstructors = [...editFormData.instructors];
                        newInstructors[index] = e.target.value;
                        setEditFormData({ ...editFormData, instructors: newInstructors });
                      }}
                      placeholder={`Instructor ${index + 1}`}
                    />
                    {editFormData.instructors.length > 1 && (
                      <Button 
                        type="button" 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => removeInstructor(index, 'edit')}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                    {index === editFormData.instructors.length - 1 && (
                      <Button 
                        type="button" 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => addInstructor('edit')}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Price ($)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={editFormData.price}
                    onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                    placeholder="0"
                    disabled={submitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-duration">Duration</Label>
                  <Input
                    id="edit-duration"
                    value={editFormData.duration}
                    onChange={(e) => setEditFormData({ ...editFormData, duration: e.target.value })}
                    placeholder="e.g. 8 weeks"
                    disabled={submitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select 
                    value={editFormData.status} 
                    onValueChange={(value) => setEditFormData({ ...editFormData, status: value })}
                    disabled={submitting}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                        number: editFormData.videos.length + 1,
                        title: '',
                        duration: '',
                        description: '',
                        url: '',
                        uploadProgress: 0,
                        order: editFormData.videos.length + 1
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
                        <h4 className="font-medium">Video {video.number || index + 1}</h4>
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
                      <div className="space-y-2">
                        <Label>Video URL</Label>
                        <Input
                          value={video.url}
                          onChange={(e) => {
                            const updatedVideos = editFormData.videos.map(v =>
                              v.id === video.id ? { ...v, url: e.target.value } : v
                            );
                            setEditFormData({ ...editFormData, videos: updatedVideos });
                          }}
                          placeholder="https://example.com/video"
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

      {/* Upload Lessons Dialog */}
      <Dialog open={isUploadVideoDialogOpen} onOpenChange={setIsUploadVideoDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Lessons to Course</DialogTitle>
            <DialogDescription>Select a course and add lesson content</DialogDescription>
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

            {lessons.map((lesson, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Lesson {lesson.number}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLesson(index)}
                    disabled={lessons.length === 1 || submitting}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Lesson Title</Label>
                    <Input
                      value={lesson.title}
                      onChange={(e) => {
                        const updated = [...lessons];
                        updated[index].title = e.target.value;
                        setLessons(updated);
                      }}
                      placeholder="Lesson title"
                      disabled={submitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input
                      value={lesson.duration}
                      onChange={(e) => {
                        const updated = [...lessons];
                        updated[index].duration = e.target.value;
                        setLessons(updated);
                      }}
                      placeholder="e.g. 25:30"
                      disabled={submitting}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Lesson Description</Label>
                  <Textarea
                    value={lesson.description}
                    onChange={(e) => {
                      const updated = [...lessons];
                      updated[index].description = e.target.value;
                      setLessons(updated);
                    }}
                    placeholder="Lesson description"
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
                        handleLessonVideoFileChange(file, index);
                      }
                    }}
                    disabled={submitting}
                  />
                  {lesson.uploadProgress > 0 && lesson.uploadProgress < 100 && (
                    <div className="space-y-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${lesson.uploadProgress}%` }}></div>
                      </div>
                      <div className="text-xs text-blue-600">Uploading: {lesson.uploadProgress}%</div>
                    </div>
                  )}
                  {lesson.url && (
                    <div className="text-xs text-green-600 font-medium">✓ Uploaded successfully!</div>
                  )}
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addLesson}
              disabled={submitting}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Another Lesson
            </Button>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsUploadVideoDialogOpen(false)} disabled={submitting}>
                Cancel
              </Button>
              <Button 
                onClick={handleAddLessonsToCourse}
                disabled={!selectedCourseId || !lessons.some(l => l.url && l.title) || submitting}
              >
                {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Add Lessons
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Course Info Dialog */}
      <Dialog open={isCourseInfoDialogOpen} onOpenChange={setIsCourseInfoDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Course Information</DialogTitle>
            <DialogDescription>View course content and details</DialogDescription>
          </DialogHeader>
          {selectedCourseForInfo && (
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <img 
                  src={selectedCourseForInfo.thumbnail} 
                  alt={selectedCourseForInfo.title}
                  className="w-32 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{selectedCourseForInfo.title}</h3>
                  <p className="text-gray-600 mt-1">{selectedCourseForInfo.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <Badge variant="secondary">{getCategoryName(selectedCourseForInfo.category)}</Badge>
                    <Badge variant={selectedCourseForInfo.status === "active" ? "default" : "secondary"}>
                      {selectedCourseForInfo.status}
                    </Badge>
                    <span>By {selectedCourseForInfo.instructors?.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedCourseForInfo.students}</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">${selectedCourseForInfo.price}</div>
                  <div className="text-sm text-gray-600">Price</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{selectedCourseForInfo.duration}</div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{selectedCourseForInfo.rating || 'New'}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Course Content</h4>
                {selectedCourseForInfo.videos && selectedCourseForInfo.videos.length > 0 ? (
                  <div className="space-y-3">
                    {selectedCourseForInfo.videos.map((lesson, index) => (
                      <div key={lesson.id} className="flex items-start space-x-3 p-3 border rounded-lg bg-gray-50">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                          {lesson.number || index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-gray-900">{lesson.title}</h5>
                          <p className="text-sm text-gray-600 mt-1">{lesson.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            {lesson.duration && (
                              <div className="flex items-center space-x-1">
                                <Video className="w-3 h-3" />
                                <span>{lesson.duration}</span>
                              </div>
                            )}
                            {lesson.url && (
                              <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>Video available</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Video className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>No lessons added yet</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button variant="outline" onClick={() => setIsCourseInfoDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseManagement;