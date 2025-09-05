'use client';

import Link from 'next/link';
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary-600 text-white p-2 rounded-lg">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Safe Peer Portal</h3>
                <p className="text-gray-400 text-sm">Professional LMS</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Empowering individuals through evidence-based peer support education. 
              Our comprehensive training programs help develop skilled peer support specialists.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span className="text-sm">support@safepeerportal.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span className="text-sm">(555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/certificates" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Certificates
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/quiz-management" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Quiz Management
                </Link>
              </li>
              <li>
                <Link href="/progress" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Progress Tracking
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Safe Peer Portal. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Contact Us
              </a>
            </div>
          </div>
          
          {/* Powered by */}
          <div className="text-center mt-6 pt-6 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              🚀 Powered by <span className="text-primary-400 font-semibold">Baserow</span> & 
              <span className="text-primary-400 font-semibold"> Vercel</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}