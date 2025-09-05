'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  Award, 
  Target,
  ArrowRight,
  Star,
  Clock,
  TrendingUp
} from 'lucide-react';
import BaserowAPI, { Course } from '@/lib/baserow';
import CourseCard from '@/components/CourseCard';
import StatsCard from '@/components/StatsCard';

export default function HomePage() {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    activeEnrollments: 0,
    completedEnrollments: 0,
    totalStudents: 0,
    completionRate: '0'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courses = await BaserowAPI.getPublishedCourses();
        const courseStats = await BaserowAPI.getCourseStats();
        
        // Get first 3 courses as featured
        setFeaturedCourses(courses.slice(0, 3));
        setStats(courseStats);
      } catch (error) {
        console.error('Error fetching home page data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const features = [
    {
      icon: Target,
      title: 'Evidence-Based Curriculum',
      description: 'Courses designed by experts following industry best practices and research'
    },
    {
      icon: Users,
      title: 'Expert Instructors',
      description: 'Learn from certified professionals with years of peer support experience'
    },
    {
      icon: BookOpen,
      title: 'Interactive Learning',
      description: 'Engaging multimedia content, quizzes, and hands-on practice exercises'
    },
    {
      icon: Award,
      title: 'Certification Track',
      description: 'Complete the full program to earn your peer support specialist certification'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              🎓 Peer Support Specialist
              <br />
              <span className="text-yellow-300">Training Portal</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Empowering individuals through evidence-based peer support education
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses" className="btn-primary text-lg px-8 py-3 bg-white text-primary-700 hover:bg-gray-100">
                🚀 Start Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              <Link href="/dashboard" className="btn-secondary text-lg px-8 py-3 border-white text-white hover:bg-white hover:bg-opacity-10">
                📊 View Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StatsCard
              icon={BookOpen}
              title="Total Courses"
              value={stats.totalCourses}
              color="blue"
            />
            <StatsCard
              icon={Users}
              title="Active Students"
              value={stats.totalStudents}
              color="green"
            />
            <StatsCard
              icon={TrendingUp}
              title="Active Enrollments"
              value={stats.activeEnrollments}
              color="purple"
            />
            <StatsCard
              icon={Award}
              title="Completion Rate"
              value={`${stats.completionRate}%`}
              color="yellow"
            />
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start your peer support journey with our most popular courses
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCourses.map((course, index) => (
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
          
          <div className="text-center mt-12">
            <Link href="/courses" className="btn-primary text-lg px-8 py-3">
              View All Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ✨ Why Choose Our Training?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional development designed by experts in peer support
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="card-content">
                  <feature.icon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of peer support specialists advancing their careers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses" className="btn-primary bg-white text-primary-700 hover:bg-gray-100">
              Browse Courses
            </Link>
            <Link href="/quiz-management" className="btn-secondary border-white text-white hover:bg-white hover:bg-opacity-10">
              Quiz Management
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}