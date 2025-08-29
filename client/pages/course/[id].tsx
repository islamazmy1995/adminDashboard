import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, Video, Users } from 'lucide-react';

import { coursesWithContent } from '@/lib/coursesData';

// بيانات الطلاب الثابتة مؤقتاً
const studentsData = [
  {
    id: 1,
    name: "Ali",
    email: "ali@example.com",
    avatar: "/avatars/ali.jpg",
    courses: [{ id: 1, title: "React Basics" }]
  },
  {
    id: 2,
    name: "Sara",
    email: "sara@example.com",
    avatar: "/avatars/sara.jpg",
    courses: [{ id: 2, title: "Advanced JS" }]
  },
  {
    id: 3,
    name: "Omar",
    email: "omar@example.com",
    avatar: "/avatars/omar.jpg",
    courses: [{ id: 1, title: "React Basics" }, { id: 2, title: "Advanced JS" }]
  }
];

const CoursePage = () => {
  const { id } = useParams();
  const location = useLocation();

  // استخدم الكورس من navigation state لو موجود، وإلا استخرج من بيانات ثابتة
  const course = location.state?.course || coursesWithContent.find(c => c.id.toString() === id);

  const [students, setStudents] = useState(studentsData);

  if (!course) {
    return <div className="p-8 text-center text-lg">Course not found.</div>;
  }

  // الطلاب المسجلين في هذا الكورس
  const enrolledStudents = students.filter(student => student.courses.some(c => c.id === course.id));

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      {/* معلومات الكورس */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>{course.title}</span>
            <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>{course.status}</Badge>
          </CardTitle>
          <CardDescription>{course.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div className="flex items-center"><Users className="w-4 h-4 mr-1" />{enrolledStudents.length} students</div>
            <div className="flex items-center"><Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />{course.rating}</div>
            <div className="flex items-center"><Video className="w-4 h-4 mr-1" />{course.videos.length} videos</div>
            <div>Instructor: <span className="font-medium text-foreground">{course.instructor}</span></div>
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* فيديوهات الكورس */}
      <Card>
        <CardHeader>
          <CardTitle>Course Videos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {course.videos.length === 0 && <div className="text-muted-foreground">No videos yet.</div>}
          {course.videos.map(video => (
            <div key={video.id} className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">{video.title}</div>
                <span className="text-xs text-muted-foreground">{video.duration}</span>
              </div>
              <div className="text-sm text-muted-foreground">{video.description}</div>
              {video.url && (
                <video controls className="w-full max-w-lg mt-2">
                  <source src={video.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* الطلاب المسجلين */}
      <Card>
        <CardHeader>
          <CardTitle>Enrolled Students</CardTitle>
        </CardHeader>
        <CardContent>
          {enrolledStudents.length === 0 ? (
            <div className="text-muted-foreground">No students enrolled yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {enrolledStudents.map(student => (
                <div key={student.id} className="flex items-center gap-4 p-2 border rounded-lg">
                  <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-xs text-muted-foreground">{student.email}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CoursePage;
