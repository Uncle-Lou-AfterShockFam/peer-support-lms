'use client';

import Link from 'next/link';
import { Clock, Star, Users, DollarSign, TrendingUp } from 'lucide-react';
import { Course } from '@/lib/baserow';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category?.toLowerCase()) {
      case 'peer support fundamentals':
        return 'bg-blue-100 text-blue-800';
      case 'mental health first aid':
        return 'bg-purple-100 text-purple-800';
      case 'communication skills':
        return 'bg-green-100 text-green-800';
      case 'crisis intervention':
        return 'bg-red-100 text-red-800';
      case 'ethics & boundaries':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="card group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Course Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary-400 to-primary-600 rounded-t-xl overflow-hidden">
        {course.thumbnail_url ? (
          <img
            src={course.thumbnail_url}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-80" />
              <p className="text-sm opacity-80">Course Image</p>
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        {course.category && (
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(course.category)}`}>
              {course.category}
            </span>
          </div>
        )}
        
        {/* Price Badge */}
        {course.price && (
          <div className="absolute top-4 right-4">
            <span className="bg-white text-primary-700 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              ${course.price}
            </span>
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="card-content">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description || course.long_description?.substring(0, 120) + '...' || 'No description available'}
        </p>

        {/* Course Metadata */}
        <div className="flex flex-wrap gap-2 mb-4">
          {course.difficulty_level && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty_level)}`}>
              📊 {course.difficulty_level}
            </span>
          )}
          
          {course.duration_hours && (
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {course.duration_hours}h
            </span>
          )}
        </div>

        {/* Instructor */}
        {course.instructor_name && (
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {course.instructor_photo ? (
                <img
                  src={course.instructor_photo}
                  alt={course.instructor_name}
                  className="w-8 h-8 rounded-full mr-2"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-2">
                  <Users className="h-4 w-4 text-primary-600" />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-900">{course.instructor_name}</p>
              </div>
            </div>
          </div>
        )}

        {/* Rating */}
        {course.rating && (
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < course.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600 ml-2">({course.rating}/5)</span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <Link
          href={`/courses/${course.id}`}
          className="w-full btn-primary text-center block py-3 group-hover:bg-primary-700 transition-colors duration-200"
        >
          🎓 Enroll Now
        </Link>
      </div>
    </div>
  );
}