// Baserow API integration for the LMS
import axios from 'axios';

const BASEROW_API_URL = process.env.BASEROW_API_URL || 'http://localhost/api';
const BASEROW_TOKEN = process.env.BASEROW_TOKEN || '';

// Table IDs from your Baserow setup
export const TABLE_IDS = {
  users: 2224,
  courses: 2225,
  quizzes: 2226,
  enrollments: 2227,
  quiz_attempts: 2228,
  quiz_questions: 2237,
  question_choices: 2238,
  course_lessons: 2239,
  user_progress: 2240
} as const;

// Create axios instance with base configuration
const baserowApi = axios.create({
  baseURL: BASEROW_API_URL,
  headers: {
    'Authorization': `Token ${BASEROW_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// Types for our data structures
export interface Course {
  id: number;
  title: string;
  description: string;
  long_description?: string;
  thumbnail_url?: string;
  difficulty_level?: string;
  category?: string;
  duration_hours?: number;
  price?: number;
  rating?: number;
  instructor_name?: string;
  instructor_bio?: string;
  instructor_photo?: string;
  prerequisites?: string;
  learning_objectives?: string;
  course_outline?: string;
  enrollment_limit?: number;
  is_published?: boolean;
  created_date?: string;
  last_updated?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
  profile_picture?: string;
  bio?: string;
  phone_number?: string;
  enrollment_date?: string;
  is_active?: boolean;
}

export interface Enrollment {
  id: number;
  user: number[];
  course: number[];
  enrollment_date?: string;
  progress_percentage?: number;
  status?: string;
  final_grade?: number;
  completion_date?: string;
  certificate_issued?: boolean;
}

export interface Quiz {
  id: number;
  course: number[];
  title: string;
  description?: string;
  time_limit?: number;
  total_points?: number;
  passing_score?: number;
  is_active?: boolean;
}

export interface QuizQuestion {
  id: number;
  quiz: number[];
  question_text: string;
  question_type: string;
  points: number;
  question_order: number;
  explanation?: string;
  is_active: boolean;
}

export interface QuestionChoice {
  id: number;
  question: number[];
  choice_text: string;
  is_correct: boolean;
  choice_order: number;
  explanation?: string;
}

export interface CourseLesson {
  id: number;
  course: number[];
  lesson_title: string;
  lesson_content: string;
  lesson_type: string;
  lesson_order: number;
  video_url?: string;
  duration_minutes?: number;
  is_required: boolean;
}

// API functions
export class BaserowAPI {
  // Courses
  static async getCourses(): Promise<Course[]> {
    try {
      const response = await baserowApi.get(`/database/rows/table/${TABLE_IDS.courses}/?user_field_names=true`);
      return response.data.results || [];
    } catch (error) {
      console.error('Error fetching courses:', error);
      return [];
    }
  }

  static async getCourse(id: number): Promise<Course | null> {
    try {
      const response = await baserowApi.get(`/database/rows/table/${TABLE_IDS.courses}/${id}/?user_field_names=true`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course:', error);
      return null;
    }
  }

  static async getPublishedCourses(): Promise<Course[]> {
    try {
      const courses = await this.getCourses();
      return courses.filter(course => course.is_published);
    } catch (error) {
      console.error('Error fetching published courses:', error);
      return [];
    }
  }

  // Users
  static async getUsers(): Promise<User[]> {
    try {
      const response = await baserowApi.get(`/database/rows/table/${TABLE_IDS.users}/?user_field_names=true`);
      return response.data.results || [];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  static async getUser(id: number): Promise<User | null> {
    try {
      const response = await baserowApi.get(`/database/rows/table/${TABLE_IDS.users}/${id}/?user_field_names=true`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  // Enrollments
  static async getEnrollments(): Promise<Enrollment[]> {
    try {
      const response = await baserowApi.get(`/database/rows/table/${TABLE_IDS.enrollments}/?user_field_names=true`);
      return response.data.results || [];
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      return [];
    }
  }

  static async getUserEnrollments(userId: number): Promise<Enrollment[]> {
    try {
      const enrollments = await this.getEnrollments();
      return enrollments.filter(enrollment => enrollment.user.includes(userId));
    } catch (error) {
      console.error('Error fetching user enrollments:', error);
      return [];
    }
  }

  static async createEnrollment(enrollment: Partial<Enrollment>): Promise<Enrollment | null> {
    try {
      const response = await baserowApi.post(`/database/rows/table/${TABLE_IDS.enrollments}/?user_field_names=true`, enrollment);
      return response.data;
    } catch (error) {
      console.error('Error creating enrollment:', error);
      return null;
    }
  }

  // Quizzes
  static async getQuizzes(): Promise<Quiz[]> {
    try {
      const response = await baserowApi.get(`/database/rows/table/${TABLE_IDS.quizzes}/?user_field_names=true`);
      return response.data.results || [];
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      return [];
    }
  }

  static async getCourseQuizzes(courseId: number): Promise<Quiz[]> {
    try {
      const quizzes = await this.getQuizzes();
      return quizzes.filter(quiz => quiz.course.includes(courseId));
    } catch (error) {
      console.error('Error fetching course quizzes:', error);
      return [];
    }
  }

  // Quiz Questions
  static async getQuizQuestions(): Promise<QuizQuestion[]> {
    try {
      const response = await baserowApi.get(`/database/rows/table/${TABLE_IDS.quiz_questions}/?user_field_names=true`);
      return response.data.results || [];
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
      return [];
    }
  }

  static async getQuestionsByQuiz(quizId: number): Promise<QuizQuestion[]> {
    try {
      const questions = await this.getQuizQuestions();
      return questions.filter(question => question.quiz.includes(quizId)).sort((a, b) => a.question_order - b.question_order);
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
      return [];
    }
  }

  static async createQuizQuestion(question: Partial<QuizQuestion>): Promise<QuizQuestion | null> {
    try {
      const response = await baserowApi.post(`/database/rows/table/${TABLE_IDS.quiz_questions}/?user_field_names=true`, question);
      return response.data;
    } catch (error) {
      console.error('Error creating quiz question:', error);
      return null;
    }
  }

  // Question Choices
  static async getQuestionChoices(): Promise<QuestionChoice[]> {
    try {
      const response = await baserowApi.get(`/database/rows/table/${TABLE_IDS.question_choices}/?user_field_names=true`);
      return response.data.results || [];
    } catch (error) {
      console.error('Error fetching question choices:', error);
      return [];
    }
  }

  static async getChoicesByQuestion(questionId: number): Promise<QuestionChoice[]> {
    try {
      const choices = await this.getQuestionChoices();
      return choices.filter(choice => choice.question.includes(questionId)).sort((a, b) => a.choice_order - b.choice_order);
    } catch (error) {
      console.error('Error fetching question choices:', error);
      return [];
    }
  }

  static async createQuestionChoice(choice: Partial<QuestionChoice>): Promise<QuestionChoice | null> {
    try {
      const response = await baserowApi.post(`/database/rows/table/${TABLE_IDS.question_choices}/?user_field_names=true`, choice);
      return response.data;
    } catch (error) {
      console.error('Error creating question choice:', error);
      return null;
    }
  }

  // Course Lessons
  static async getCourseLessons(): Promise<CourseLesson[]> {
    try {
      const response = await baserowApi.get(`/database/rows/table/${TABLE_IDS.course_lessons}/?user_field_names=true`);
      return response.data.results || [];
    } catch (error) {
      console.error('Error fetching course lessons:', error);
      return [];
    }
  }

  static async getLessonsByCourse(courseId: number): Promise<CourseLesson[]> {
    try {
      const lessons = await this.getCourseLessons();
      return lessons.filter(lesson => lesson.course.includes(courseId)).sort((a, b) => a.lesson_order - b.lesson_order);
    } catch (error) {
      console.error('Error fetching course lessons:', error);
      return [];
    }
  }

  // Statistics and Analytics
  static async getCourseStats() {
    try {
      const courses = await this.getPublishedCourses();
      const enrollments = await this.getEnrollments();
      const users = await this.getUsers();
      
      const activeEnrollments = enrollments.filter(e => e.status === 'Active').length;
      const completedEnrollments = enrollments.filter(e => e.status === 'Completed').length;
      const totalStudents = users.filter(u => u.role === 'Student').length;
      
      return {
        totalCourses: courses.length,
        activeEnrollments,
        completedEnrollments,
        totalStudents,
        completionRate: enrollments.length > 0 ? (completedEnrollments / enrollments.length * 100).toFixed(1) : '0'
      };
    } catch (error) {
      console.error('Error fetching course stats:', error);
      return {
        totalCourses: 0,
        activeEnrollments: 0,
        completedEnrollments: 0,
        totalStudents: 0,
        completionRate: '0'
      };
    }
  }
}

export default BaserowAPI;