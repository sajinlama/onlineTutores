import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, ChevronRight, Menu, X, Star, 
  ArrowUpRight, Sparkles, Sun, Moon 
} from 'lucide-react';

interface Subject {
  id: number;
  name: string;
  icon: string;
  description: string;
  colorDark: string;
  colorLight: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  grade: string;
  message: string;
  initials: string;
  rating: number;
}

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Real-time state engine for global theme configuration
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync theme state directly with the DOM document element for Tailwind CSS detection
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // The function you provided to toggle states cleanly
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const subjects: Subject[] = [
    { id: 1, name: 'Mathematics', icon: '📐', description: 'From basic arithmetic foundations to complex calculus algorithms.', colorDark: 'from-blue-500/20 to-transparent', colorLight: 'from-blue-500/5 to-transparent hover:border-blue-200' },
    { id: 2, name: 'English Literature', icon: '📚', description: 'Master contextual syntax, narrative essays, and creative execution.', colorDark: 'from-purple-500/20 to-transparent', colorLight: 'from-purple-500/5 to-transparent hover:border-purple-200' },
    { id: 3, name: 'History & Culture', icon: '🏛️', description: 'Break down global chronologies and structural historical analyses.', colorDark: 'from-amber-500/20 to-transparent', colorLight: 'from-amber-500/5 to-transparent hover:border-amber-200' },
    { id: 4, name: 'Natural Sciences', icon: '🔬', description: 'Deep dive journeys into advanced physics, modern chemistry, and biology.', colorDark: 'from-emerald-500/20 to-transparent', colorLight: 'from-emerald-500/5 to-transparent hover:border-emerald-200' },
    { id: 5, name: 'Computer Science', icon: '💻', description: 'Core functional programming rules, logic development, and digital system tools.', colorDark: 'from-pink-500/20 to-transparent', colorLight: 'from-pink-500/5 to-transparent hover:border-pink-200' },
    { id: 6, name: 'Global Languages', icon: '🌍', description: 'Fluid multi-lingual training paths covering Spanish, French, and structural dialects.', colorDark: 'from-cyan-500/20 to-transparent', colorLight: 'from-cyan-500/5 to-transparent hover:border-cyan-200' }
  ];

  const testimonials: Testimonial[] = [
    { id: 1, name: 'Sahil Bhagat', role: 'Student', grade: 'Grade 10', message: 'EduMentor transformed my anxiety into absolute confidence. My grades surged from a flat C to consecutive A+ marks within a dynamic term.', initials: 'SB', rating: 5 },
    { id: 2, name: 'Sourov Verma', role: 'Student', grade: 'Grade 12', message: 'The interactive dashboards and analytical precision of my tutor completely accelerated my university application timeline.', initials: 'SV', rating: 5 },
    { id: 3, name: 'Roshni Sharma', role: 'Student', grade: 'Grade 9', message: 'Instant modular reviews and structural test breakdowns turned studying into an engaging, gamified ritual I actually look forward to.', initials: 'RS', rating: 5 }
  ];

  // Modern High-Fidelity ThemeSwitcher component utilizing your logic
  const ThemeSwitcher = () => (
    <button 
      onClick={toggleTheme}
      className="relative p-2.5 rounded-xl border flex items-center justify-center bg-white/60 dark:bg-zinc-950/40 border-zinc-200/80 dark:border-zinc-800/80 text-zinc-700 dark:text-zinc-300 backdrop-blur-md transition-all duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700 active:scale-95 shadow-[0_1px_2px_rgba(0,0,0,0.02)] group overflow-hidden"
      aria-label="Toggle structural theme state"
    >
      <div className="relative w-4 h-4 transition-transform duration-500 group-hover:rotate-[15deg]">
        <Sun className="absolute inset-0 h-4 w-4 transform transition-all duration-500 scale-0 rotate-90 dark:scale-100 dark:rotate-0 text-amber-400" />
        <Moon className="absolute inset-0 h-4 w-4 transform transition-all duration-500 scale-100 rotate-0 dark:scale-0 dark:-rotate-90 text-indigo-500" />
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#030303] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black antialiased relative overflow-hidden transition-colors duration-300">
      
      {/* Dynamic Background Mesh Flares */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[1200px] right-1/4 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Header / Navbar */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 dark:bg-[#030303]/80 backdrop-blur-md border-b border-zinc-200/60 dark:border-zinc-900/80 py-3.5' : 'bg-transparent py-6'
      }`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo Branding */}
          <div className="flex items-center space-x-2.5 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="w-9 h-9 bg-zinc-900 dark:bg-zinc-100 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-300 shadow-sm">
              <BookOpen className="h-4 w-4 text-white dark:text-black" />
            </div>
            <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              EduMentor
            </span>
          </div>

          {/* Nav Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <a href="#subjects" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Subjects</a>
              <a href="#features" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Features</a>
              <a href="#testimonials" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Success Stories</a>
            </div>
            
            <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
            
            <div className="flex items-center space-x-3">
              <ThemeSwitcher />
              <button 
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="px-4 py-2 text-sm font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-95 shadow-sm"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile Actions block */}
          <div className="flex items-center space-x-3 md:hidden">
            <ThemeSwitcher />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Flyout */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#030303] border-b border-zinc-200 dark:border-zinc-900 px-4 py-6 space-y-4 shadow-xl">
            <div className="flex flex-col space-y-3">
              <a href="#subjects" onClick={() => setIsMenuOpen(false)} className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 text-lg py-1">Subjects</a>
              <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 text-lg py-1">Features</a>
              <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 text-lg py-1">Success Stories</a>
            </div>
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-3">
              <button onClick={() => navigate('/login')} className="w-full py-2.5 text-center text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 rounded-xl">Sign In</button>
              <button onClick={() => navigate('/register')} className="w-full py-2.5 text-center bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black font-medium rounded-xl">Get Started</button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Redefining Online Learning Architectures</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-zinc-900 dark:text-zinc-100">
            Learn with clarity.<br />
            <span className="bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-500 dark:from-zinc-100 dark:via-zinc-400 dark:to-zinc-500 bg-clip-text text-transparent">
              Excel with mastery.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Unlock deep academic capabilities through highly structured mentorship channels. Join thousands scaling across optimized pipelines built for fast comprehension.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
              onClick={() => navigate('/register')}
              className="px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black font-semibold rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-98 flex items-center justify-center group gap-2 shadow-md dark:shadow-xl shadow-zinc-900/10"
            >
              Start Learning Now
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 font-semibold rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-all flex items-center justify-center gap-2">
              Explore Demo Classroom
            </button>
          </div>
        </div>

        {/* Code Visual Feature Card */}
        <div className="lg:col-span-5 relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-blue-500/5 dark:from-purple-500/10 dark:to-blue-500/10 rounded-2xl blur-xl opacity-80" />
          <div className="relative bg-white dark:bg-[#0d0d11] border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 shadow-xl dark:shadow-2xl space-y-6 backdrop-blur-sm">
            <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800/60 pb-4">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                <div className="w-3 h-3 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                <div className="w-3 h-3 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              </div>
              <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">live_session_metrics.log</span>
            </div>
            
            <div className="space-y-4 font-mono text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex items-start gap-2.5">
                <span className="text-zinc-300 dark:text-zinc-600">01</span>
                <p><span className="text-purple-600 dark:text-purple-400 font-semibold">const</span> tutorProfile = <span className="text-blue-600 dark:text-blue-400">await</span> fetchTutor(<span className="text-emerald-600">\'expert\'</span>);</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-zinc-300 dark:text-zinc-600">02</span>
                <p><span className="text-purple-600 dark:text-purple-400 font-semibold">const</span> performanceMultiplier = <span className="text-amber-600">1.95</span>;</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-zinc-300 dark:text-zinc-600">03</span>
                <p>student.successRate *= performanceMultiplier;</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800/40 rounded-xl">
                <span className="text-xs text-zinc-400 dark:text-zinc-500 block mb-0.5">Success Rate</span>
                <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200">95%</span>
              </div>
              <div className="p-3 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800/40 rounded-xl">
                <span className="text-xs text-zinc-400 dark:text-zinc-500 block mb-0.5">Active Network</span>
                <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200">10k+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section id="subjects" className="py-24 border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-[#060608]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Core Subject Frameworks
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base">
              High-impact paths curated directly by vetted domain experts to ensure clear knowledge loops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="group relative bg-[#fafafa] dark:bg-[#0b0b0e] border border-zinc-200 dark:border-zinc-800/70 rounded-2xl p-6 hover:shadow-lg dark:hover:border-zinc-700/80 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${theme === 'dark' ? subject.colorDark : subject.colorLight} opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none`} />
                
                <div className="relative z-10 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform">
                    {subject.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                      {subject.name}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                      {subject.description}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 pt-6 mt-4 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 font-medium transition-colors cursor-pointer">
                  <span>Explore Modules</span>
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 border-t border-zinc-200 dark:border-zinc-900 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Validated by Innovators</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">Real execution metrics verified directly through student performance outcomes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div 
              key={t.id}
              className="bg-white dark:bg-[#0b0b0e] border border-zinc-200 dark:border-zinc-800/60 p-6 rounded-2xl flex flex-col justify-between space-y-6 shadow-sm relative hover:border-zinc-300 dark:hover:border-zinc-700/60 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-zinc-800 dark:text-zinc-200 fill-zinc-800 dark:fill-zinc-200" />
                  ))}
                </div>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed italic">
                  "{t.message}"
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-zinc-100 dark:border-zinc-900">
                <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center font-bold text-xs text-zinc-700 dark:text-zinc-200">
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{t.name}</h4>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">{t.role} • {t.grade}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-900 bg-[#f4f4f5] dark:bg-[#050507]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-zinc-900 dark:bg-zinc-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-white dark:text-black" />
              </div>
              <span className="text-lg font-bold text-zinc-900 dark:text-zinc-200 tracking-tight">EduMentor</span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm leading-relaxed">
              Empowering scaling cognitive learning pipelines globally with high precision 1-on-1 environments.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Platform</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><a href="#subjects" className="hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors">Curriculum Mapping</a></li>
              <li><a href="#" className="hover:text-zinc-300 transition-colors">Vetted Tutors</a></li>
              <li><a href="#" className="hover:text-zinc-300 transition-colors">System Pricing</a></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Stay Updated</h4>
            <p className="text-xs text-zinc-500">Get regular curriculum drops and performance strategies.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com" 
                className="bg-white dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-800 text-sm px-3.5 py-2 rounded-lg text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-700 flex-1"
              />
              <button 
                onClick={() => {
                  if(email) { alert(`Subscribed: ${email}`); setEmail(''); }
                }}
                className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black text-xs font-medium px-4 py-2 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-95"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-zinc-200 dark:border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-400">
          <span>&copy; {new Date().getFullYear()} EduMentor Inc. All structural rights reserved.</span>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-zinc-600 transition-colors">Privacy Paradigm</a>
            <a href="#" className="hover:text-zinc-600 transition-colors">Terms of Operations</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;