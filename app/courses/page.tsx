'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, BookOpen, Users } from 'lucide-react';
import BaserowAPI, { Course } from '@/lib/baserow';
import CourseCard from '@/components/CourseCard';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await BaserowAPI.getPublishedCourses();
        setCourses(coursesData);
        setFilteredCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    let filtered = courses;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(course => course.difficulty_level === selectedDifficulty);
    }

    setFilteredCourses(filtered);
  }, [courses, searchTerm, selectedCategory, selectedDifficulty]);

  const categories = Array.from(new Set(courses.map(course => course.category).filter(Boolean)));
  const difficulties = Array.from(new Set(courses.map(course => course.difficulty_level).filter(Boolean)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="hero-section py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-4">📚 Course Catalog</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Explore our comprehensive peer support specialist training courses
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white py-8 sticky top-16 z-40 shadow-sm">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Levels</option>
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600">
              {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section-padding">
        <div className="container">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-48 bg-gray-300 rounded-t-xl"></div>
                  <div className="card-content">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-6 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="h-10 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
              <p className="text-gray-500">
                Try adjusting your search terms or filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Course Features
            </h2>
            <p className="text-lg text-gray-600">
              What makes our courses special
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '💰',
                title: 'Affordable Pricing',
                description: 'Competitive pricing with payment plans available'
              },
              {
                icon: '⏱️',
                title: 'Self-Paced Learning',
                description: 'Learn at your own pace with flexible schedules'
              },
              {
                icon: '🎥',
                title: 'High-Quality Content',
                description: 'Video content and interactive materials'
              },
              {
                icon: '🏅',
                title: 'Industry Recognition',
                description: 'Certificates recognized by industry professionals'
              },
              {
                icon: '👥',
                title: 'Community Support',
                description: 'Access to peer support community and forums'
              },
              {
                icon: '📱',
                title: 'Mobile Friendly',
                description: 'Learn anywhere with our responsive platform'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-gray-50 rounded-xl"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}