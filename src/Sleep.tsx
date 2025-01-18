import React, { useState, useEffect } from 'react';
import {
  Moon,
  Brain,
  HeartPulse,
  Book,
  Newspaper,
  User,
  Play,
  Pause,
  Volume2,
  BookOpen,
  Cloud,
  Settings,
  KeyRound,
  BarChart2,
  Globe,
  LogOut,
  Timer,
  SkipBack,
  SkipForward,
  X,
  Clock
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for charts
const sleepData = [
  { day: 'Mon', hours: 7 },
  { day: 'Tue', hours: 8 },
  { day: 'Wed', hours: 6 },
  { day: 'Thu', hours: 7.5 },
  { day: 'Fri', hours: 8 },
  { day: 'Sat', hours: 9 },
  { day: 'Sun', hours: 7.5 }
];

const audioFiles = {
  sleepStories: [
    { id: 1, title: 'Peaceful Forest', duration: '15:00' },
    { id: 2, title: 'Ocean Waves', duration: '20:00' },
    { id: 3, title: 'Mountain Stream', duration: '18:00' },
    { id: 4, title: 'Gentle Rain', duration: '25:00' },
    { id: 5, title: 'Night Crickets', duration: '22:00' },
    { id: 6, title: 'Desert Wind', duration: '17:00' }
  ],
  nsdr: [
    { id: 1, title: 'Basic NSDR', duration: '10:00' },
    { id: 2, title: 'Extended NSDR', duration: '20:00' },
    { id: 3, title: 'Morning NSDR', duration: '15:00' },
    { id: 4, title: 'Evening NSDR', duration: '25:00' }
  ],
  soundscapes: [
    { id: 1, title: 'Rainforest', duration: '30:00' },
    { id: 2, title: 'Beach Waves', duration: '45:00' },
    { id: 3, title: 'White Noise', duration: '60:00' },
    { id: 4, title: 'City Rain', duration: '40:00' },
    { id: 5, title: 'Wind Chimes', duration: '35:00' },
    { id: 6, title: 'Creek Flow', duration: '50:00' }
  ]
};

const nsdrVideos = [
  {
    id: 1,
    title: 'Introduction to NSDR',
    thumbnail: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=200',
    url: 'https://youtube.com/watch?v=example1'
  },
  {
    id: 2,
    title: 'NSDR for Beginners',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=200',
    url: 'https://youtube.com/watch?v=example2'
  },
  {
    id: 3,
    title: 'Advanced NSDR Techniques',
    thumbnail: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&q=80&w=200',
    url: 'https://youtube.com/watch?v=example3'
  },
  {
    id: 4,
    title: 'NSDR Science Explained',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=200',
    url: 'https://youtube.com/watch?v=example4'
  }
];

function App() {
  const [currentView, setCurrentView] = useState('main');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [sleepTimer, setSleepTimer] = useState({ isRunning: false, startTime: null, duration: 0 });

  const startSleepTimer = () => {
    setSleepTimer({
      isRunning: true,
      startTime: new Date(),
      duration: 0
    });
  };

  const stopSleepTimer = () => {
    if (sleepTimer.startTime) {
      const endTime = new Date();
      const duration = (endTime - sleepTimer.startTime) / (1000 * 60 * 60); // Convert to hours
      setSleepTimer({
        isRunning: false,
        startTime: null,
        duration: duration
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm fixed w-full z-50 border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <a href="#" className="flex items-center space-x-2 text-purple-600 font-semibold">
                <Moon className="h-6 w-6" />
                <span>App</span>
              </a>
              <div className="hidden md:flex items-center space-x-8">
                <NavItem icon={<Moon />} text="Sleep" active />
                <NavItem icon={<Brain />} text="Meditation" />
                <NavItem icon={<HeartPulse />} text="Stress & Anxiety" />
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <ArticlesDropdown />
              <NavItem icon={<Book />} text="Journal" />
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">
              Good Sleep Benefits
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Discover the science behind a good night's sleep and how it can transform your life.
              Our expert-curated content helps you achieve the rest you deserve.
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-3 rounded-full font-semibold transform transition hover:scale-105 hover:shadow-lg">
              Explore Now
            </button>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1541480601022-2308c0f02487?auto=format&fit=crop&q=80&w=800"
              alt="Peaceful sleep"
              className="rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      {currentView === 'main' && (
        <section className="py-16 px-4 bg-white/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">
              The Easiest Way to Sleep
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <FeatureCard
                icon={<BookOpen className="w-8 h-8" />}
                title="Sleep Stories"
                description="Drift off to calming bedtime stories"
                onClick={() => setCurrentView('sleepStories')}
                hoverContent={{
                  text: "Sleep stories help you relax and drift off naturally. They use calming narratives and soothing voices to help quiet your mind.",
                  image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&q=80&w=300"
                }}
              />
              <FeatureCard
                icon={<Brain className="w-8 h-8" />}
                title="NSDR"
                description="Non-Sleep Deep Rest techniques"
                onClick={() => setCurrentView('nsdr')}
                hoverContent={{
                  text: "Non-Sleep Deep Rest (NSDR) is a powerful technique that helps you achieve deep relaxation while maintaining consciousness.",
                  image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=300"
                }}
              />
              <FeatureCard
                icon={<Cloud className="w-8 h-8" />}
                title="Soundscapes"
                description="Ambient sounds for better sleep"
                onClick={() => setCurrentView('soundscapes')}
                hoverContent={{
                  text: "Immerse yourself in carefully crafted ambient soundscapes designed to create the perfect environment for sleep.",
                  image: "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&q=80&w=300"
                }}
              />
              <FeatureCard
                icon={<Clock className="w-8 h-8" />}
                title="Sleep Tracking"
                description="Monitor your sleep patterns"
                onClick={() => setCurrentView('sleepTracking')}
                hoverContent={{
                  text: "Track your sleep patterns to understand and improve your sleep quality. Get insights into your sleep duration and consistency.",
                  image: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=300"
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Sleep Stories View */}
      {currentView === 'sleepStories' && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => setCurrentView('main')}
              className="mb-8 text-purple-600 hover:text-purple-700 flex items-center space-x-2"
            >
              <SkipBack className="w-4 h-4" />
              <span>Back</span>
            </button>
            <h2 className="text-3xl font-bold text-purple-900 mb-8">Sleep Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {audioFiles.sleepStories.map((audio) => (
                <AudioCard
                  key={audio.id}
                  title={audio.title}
                  duration={audio.duration}
                  onClick={() => {
                    setCurrentAudio(audio);
                    setShowPlayer(true);
                    setIsPlaying(true);
                  }}
                />
              ))}
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-semibold text-purple-900 mb-6">
                Sleep Stories Usage Stats
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sleepData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* NSDR View */}
      {currentView === 'nsdr' && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => setCurrentView('main')}
              className="mb-8 text-purple-600 hover:text-purple-700 flex items-center space-x-2"
            >
              <SkipBack className="w-4 h-4" />
              <span>Back</span>
            </button>
            <h2 className="text-3xl font-bold text-purple-900 mb-8">NSDR Sessions</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
              {audioFiles.nsdr.map((audio) => (
                <AudioCard
                  key={audio.id}
                  title={audio.title}
                  duration={audio.duration}
                  onClick={() => {
                    setCurrentAudio(audio);
                    setShowPlayer(true);
                    setIsPlaying(true);
                  }}
                />
              ))}
            </div>
            <h3 className="text-2xl font-semibold text-purple-900 mb-6">
              Recommended Videos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {nsdrVideos.map((video) => (
                <VideoCard key={video.id} {...video} />
              ))}
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-semibold text-purple-900 mb-6">
                NSDR Usage Stats
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sleepData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Soundscapes View */}
      {currentView === 'soundscapes' && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => setCurrentView('main')}
              className="mb-8 text-purple-600 hover:text-purple-700 flex items-center space-x-2"
            >
              <SkipBack className="w-4 h-4" />
              <span>Back</span>
            </button>
            <h2 className="text-3xl font-bold text-purple-900 mb-8">Soundscapes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {audioFiles.soundscapes.map((audio) => (
                <AudioCard
                  key={audio.id}
                  title={audio.title}
                  duration={audio.duration}
                  onClick={() => {
                    setCurrentAudio(audio);
                    setShowPlayer(true);
                    setIsPlaying(true);
                  }}
                />
              ))}
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-semibold text-purple-900 mb-6">
                Soundscapes Usage Stats
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sleepData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sleep Tracking View */}
      {currentView === 'sleepTracking' && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => setCurrentView('main')}
              className="mb-8 text-purple-600 hover:text-purple-700 flex items-center space-x-2"
            >
              <SkipBack className="w-4 h-4" />
              <span>Back</span>
            </button>
            <h2 className="text-3xl font-bold text-purple-900 mb-8">Sleep Tracking</h2>
            <div className="bg-white rounded-2xl p-8 shadow-xl mb-8">
              <div className="flex items-center justify-center space-x-8">
                <button
                  onClick={startSleepTimer}
                  disabled={sleepTimer.isRunning}
                  className={`px-8 py-4 rounded-lg font-semibold ${
                    sleepTimer.isRunning
                      ? 'bg-gray-200 text-gray-500'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  Start Sleep Timer
                </button>
                <button
                  onClick={stopSleepTimer}
                  disabled={!sleepTimer.isRunning}
                  className={`px-8 py-4 rounded-lg font-semibold ${
                    !sleepTimer.isRunning
                      ? 'bg-gray-200 text-gray-500'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  Stop Sleep Timer
                </button>
              </div>
              {sleepTimer.duration > 0 && (
                <p className="text-center mt-4 text-lg text-gray-700">
                  Last sleep duration: {sleepTimer.duration.toFixed(2)} hours
                </p>
              )}
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-semibold text-purple-900 mb-6">
                Sleep Stats Per Day
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sleepData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Audio Player */}
      {showPlayer && currentAudio && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-purple-100">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                <div className="text-gray-800">
                  <p className="font-medium">{currentAudio.title}</p>
                  <p className="text-sm text-gray-500">{currentAudio.duration}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className="p-2 text-gray-600 hover:text-purple-600"
                  onClick={() => {
                    setShowPlayer(false);
                    setCurrentAudio(null);
                    setIsPlaying(false);
                  }}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NavItem({ icon, text, active = false }) {
  return (
    <a
      href="#"
      className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all hover:bg-purple-50 ${
        active ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'
      }`}
    >
      {icon}
      <span>{text}</span>
    </a>
  );
}

function ArticlesDropdown() {
  return (
    <div className="relative group">
      <a href="#" className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50">
        <Newspaper className="h-5 w-5" />
        <span>Articles</span>
      </a>
      <div className="absolute right-0 top-full mt-2 w-[800px] bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Explore Articles</h3>
            <p className="text-gray-600 max-w-xs">Discover insights and tips for better sleep and wellness.</p>
          </div>
          <div className="ml-8 grid grid-cols-2 gap-6">
            <ArticleCard
              image="https://images.unsplash.com/photo-1541480601022-2308c0f02487?auto=format&fit=crop&q=80&w=300"
              title="Sleep"
              href="#sleep-articles"
            />
            <ArticleCard
              image="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=300"
              title="Meditation"
              href="#meditation-articles"
            />
            <ArticleCard
              image="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=300"
              title="Stress"
              href="#stress-articles"
            />
            <ArticleCard
              image="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=300"
              title="Gratitude"
              href="#gratitude-articles"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ArticleCard({ image, title, href }) {
  return (
    <a href={href} className="block group">
      <div className="aspect-video rounded-lg overflow-hidden mb-2">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <p className="text-lg font-medium text-gray-900 group-hover:text-purple-600">
        {title}
      </p>
    </a>
  );
}

function ProfileDropdown() {
  return (
    <div className="relative group">
      <a href="#" className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50">
        <User className="h-5 w-5" />
        <span>Profile</span>
      </a>
      <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
        <div className="py-2">
          <ProfileMenuItem icon={<Settings />} text="Account Details" href="#account" />
          <ProfileMenuItem icon={<KeyRound />} text="Change Password" href="#password" />
          <ProfileMenuItem icon={<BarChart2 />} text="Your Stats" href="#stats" />
          <ProfileMenuItem icon={<Globe />} text="Language" href="#language" />
          <ProfileMenuItem icon={<LogOut />} text="Logout" href="#logout" />
        </div>
      </div>
    </div>
  );
}

function ProfileMenuItem({ icon, text, href }) {
  return (
    <a
      href={href}
      className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
    >
      {React.cloneElement(icon, { className: "h-5 w-5" })}
      <span>{text}</span>
    </a>
  );
}

function FeatureCard({ icon, title, description, onClick, hoverContent }) {
  return (
    <div className="relative group">
      <div
        onClick={onClick}
        className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 cursor-pointer"
      >
        <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-6">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-purple-900 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      {hoverContent && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
          <div className="p-6 flex items-start space-x-6">
            <p className="text-gray-600 flex-1">{hoverContent.text}</p>
            <img
              src={hoverContent.image}
              alt={title}
              className="w-32 h-32 rounded-lg object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function AudioCard({ title, duration, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
          <Play className="w-6 h-6" />
        </div>
        <span className="text-sm text-gray-500">{duration}</span>
      </div>
      <h4 className="text-lg font-medium text-gray-900">{title}</h4>
    </div>
  );
}

function VideoCard({ title, thumbnail, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="aspect-video rounded-lg overflow-hidden mb-4">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <h4 className="text-lg font-medium text-gray-900 hover:text-purple-600 transition-colors">
        {title}
      </h4>
    </a>
  );
}

export default App;