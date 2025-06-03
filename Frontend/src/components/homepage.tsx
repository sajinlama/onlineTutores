import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Award, ChevronRight, Menu, X, Star, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, LogIn } from 'lucide-react';

interface Subject {
  id: number;
  name: string;
  icon: string;
  description: string;
}

interface Testimonial {
  id: number;
  name: string;
  grade: string;
  message: string;
  avatar: string;
  rating: number;
}

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const subjects: Subject[] = [
    {
      id: 1,
      name: 'Mathematics',
      icon: '📐',
      description: 'From basic arithmetic to advanced calculus'
    },
    {
      id: 2,
      name: 'English',
      icon: '📚',
      description: 'Literature, grammar, and creative writing'
    },
    {
      id: 3,
      name: 'History',
      icon: '🏛️',
      description: 'World history and historical analysis'
    },
    {
      id: 4,
      name: 'Science',
      icon: '🔬',
      description: 'Physics, chemistry, and biology'
    },
    {
      id: 5,
      name: 'Computer Science',
      icon: '💻',
      description: 'Programming and digital literacy'
    },
    {
      id: 6,
      name: 'Languages',
      icon: '🌍',
      description: 'Spanish, French, and more'
    }
  ];

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sahil Bhagat',
      grade: 'Grade 10',
      message: 'EduMentor helped me improve my math grades from C to A+! The tutors are amazing and always available when I need help.',
      avatar: '👩‍🎓',
      rating: 5
    },
    {
      id: 2,
      name: 'Sourov Verma',
      grade: 'Grade 12',
      message: 'The personalized approach really works. My English essay writing skills have improved dramatically thanks to my tutor.',
      avatar: '👨‍🎓',
      rating: 5
    },
    {
      id: 3,
      name: 'Roshni Sharma',
      grade: 'Grade 9',
      message: 'I love the interactive tests and instant feedback. Learning has never been this fun and engaging!',
      avatar: '👩‍💻',
      rating: 4
    }
  ];

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleStartLearning = () => {
    navigate('/register');
  };

  const handleNewsletterSubmit = () => {
    if (email) {
      alert(`Thank you for subscribing with email: ${email}`);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/95 backdrop-blur-xl border-b border-gray-800' : 'bg-transparent'
      }`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center group cursor-pointer">
              <BookOpen className="h-8 w-8 text-white mr-3 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-2xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                EduMentor
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-400 hover:text-white transition-all duration-300 font-medium relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#subjects" className="text-gray-400 hover:text-white transition-all duration-300 font-medium relative group">
                Subjects
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#about" className="text-gray-400 hover:text-white transition-all duration-300 font-medium relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-all duration-300 font-medium relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <button 
                onClick={handleLogin}
                className="px-6 py-2 text-white border border-gray-600 rounded-full hover:border-white hover:bg-white hover:text-black transition-all duration-300 font-medium"
              >
                Login
              </button>
              <button 
                onClick={handleRegister}
                className="px-6 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
              >
                Register
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-gray-800">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#home" className="block px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition-all duration-300">
                  Home
                </a>
                <a href="#subjects" className="block px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition-all duration-300">
                  Subjects
                </a>
                <a href="#about" className="block px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition-all duration-300">
                  About
                </a>
                <a href="#contact" className="block px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition-all duration-300">
                  Contact
                </a>
                <div className="flex space-x-3 px-4 py-3">
                  <button 
                    onClick={handleLogin}
                    className="flex-1 px-4 py-2 text-white border border-gray-600 rounded-full hover:border-white hover:bg-white hover:text-black transition-all duration-300"
                  >
                    Login
                  </button>
                  <button 
                    onClick={handleRegister}
                    className="flex-1 px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-300"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-transparent to-gray-900/20"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Learn, Grow, and{' '}
              <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent animate-pulse">
                Excel
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
              Unlock your potential with personalized online tutoring. Join thousands of students who have transformed their academic journey with EduMentor.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={handleStartLearning}
                className="px-10 py-4 bg-white text-black text-lg font-semibold rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-2xl group"
              >
                Start Learning
                <ChevronRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button className="px-10 py-4 border-2 border-gray-600 text-white text-lg font-semibold rounded-full hover:border-white hover:bg-white hover:text-black transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl hover:shadow-3xl hover:border-gray-600 transition-all duration-500 transform hover:-translate-y-2">
                <Users className="h-16 w-16 text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-4xl font-bold text-white mb-3">10,000+</h3>
                <p className="text-gray-400 text-lg">Active Students</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl hover:shadow-3xl hover:border-gray-600 transition-all duration-500 transform hover:-translate-y-2">
                <BookOpen className="h-16 w-16 text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-4xl font-bold text-white mb-3">500+</h3>
                <p className="text-gray-400 text-lg">Expert Tutors</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl hover:shadow-3xl hover:border-gray-600 transition-all duration-500 transform hover:-translate-y-2">
                <Award className="h-16 w-16 text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-4xl font-bold text-white mb-3">95%</h3>
                <p className="text-gray-400 text-lg">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section id="subjects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Popular Subjects
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Explore our comprehensive range of subjects taught by expert tutors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:border-gray-600 overflow-hidden group"
              >
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 text-white">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{subject.icon}</div>
                  <h3 className="text-2xl font-bold">{subject.name}</h3>
                </div>
                <div className="p-8">
                  <p className="text-gray-400 mb-6 text-lg">{subject.description}</p>
                  <button className="text-white font-semibold hover:text-gray-300 transition-colors duration-300 flex items-center group">
                    Learn More
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Real stories from students who have transformed their academic journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-2xl hover:shadow-3xl hover:border-gray-600 transition-all duration-500 p-8 transform hover:scale-105"
              >
                <div className="flex items-center mb-6">
                  <div className="text-5xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">{testimonial.name}</h3>
                    <p className="text-gray-400">{testimonial.grade}</p>
                  </div>
                </div>
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-white fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 italic text-lg leading-relaxed">"{testimonial.message}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <BookOpen className="h-10 w-10 text-white mr-3" />
                <span className="text-3xl font-bold">EduMentor</span>
              </div>
              <p className="text-gray-400 mb-8 max-w-md text-lg leading-relaxed">
                Empowering students worldwide with personalized online tutoring and comprehensive learning resources.
              </p>
              <div className="flex space-x-6">
                <Facebook className="h-7 w-7 text-gray-400 hover:text-white cursor-pointer transition-all duration-300 hover:scale-110" />
                <Twitter className="h-7 w-7 text-gray-400 hover:text-white cursor-pointer transition-all duration-300 hover:scale-110" />
                <Instagram className="h-7 w-7 text-gray-400 hover:text-white cursor-pointer transition-all duration-300 hover:scale-110" />
                <Linkedin className="h-7 w-7 text-gray-400 hover:text-white cursor-pointer transition-all duration-300 hover:scale-110" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-6 text-xl">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#home" className="text-gray-400 hover:text-white transition-colors duration-300 text-lg">Home</a></li>
                <li><a href="#subjects" className="text-gray-400 hover:text-white transition-colors duration-300 text-lg">Subjects</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors duration-300 text-lg">About</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors duration-300 text-lg">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-lg">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-semibold mb-6 text-xl">Stay Updated</h3>
              <p className="text-gray-400 mb-6 text-lg">Subscribe to our newsletter for the latest updates.</p>
              <div className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-500 rounded-full focus:outline-none focus:border-white transition-all duration-300"
                />
                <button
                  onClick={handleNewsletterSubmit}
                  className="w-full px-4 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-300 font-semibold"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-12 text-center">
            <p className="text-gray-400 text-lg">
              © 2025 EduMentor. All rights reserved. Made with ❤️ for students worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;