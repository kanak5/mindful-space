import React, { useState, useEffect } from 'react';
import { Activity, Wind, Brain, BookOpen, User, Menu, Play, Pause, SkipBack, SkipForward, X } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('stress');
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [breathingPhase, setBreathingPhase] = useState<'in' | 'out'>('in');
  const [breathingProgress, setBreathingProgress] = useState(0);

  // Mock data for usage statistics
  const weeklyStats = {
    relief: [2.5, 1.8, 3.2, 2.1, 1.5, 2.8, 3.5],
    breathing: [1.8, 2.2, 1.5, 2.8, 3.1, 2.5, 2.0]
  };

  const quickReliefAudios = [
    { id: 1, title: 'Ocean Waves', duration: '5:30' },
    { id: 2, title: 'Rain Sounds', duration: '6:15' },
    { id: 3, title: 'Forest Ambience', duration: '4:45' },
    { id: 4, title: 'Gentle Stream', duration: '5:00' },
    { id: 5, title: 'Wind Chimes', duration: '4:30' },
    { id: 6, title: 'Bird Songs', duration: '5:15' }
  ];

  const breathingAudios = [
    { id: 1, title: '4-7-8 Breathing', duration: '8:00' },
    { id: 2, title: 'Box Breathing', duration: '10:00' },
    { id: 3, title: 'Deep Breathing', duration: '7:30' },
    { id: 4, title: 'Calm Breath', duration: '6:45' },
    { id: 5, title: 'Energy Breath', duration: '5:30' },
    { id: 6, title: 'Sleep Breath', duration: '9:15' }
  ];

  const practicalWays = [
    { title: 'Physical Activity', description: 'Regular exercise reduces stress hormones' },
    { title: 'Deep Breathing & Meditation', description: 'Calms mind and body' },
    { title: 'Time Management & Prioritization', description: 'Reduce overwhelm' },
    { title: 'Healthy Diet', description: 'Nourish your body and mind' },
    { title: 'Engage in Hobbies', description: 'Find joy in activities' },
    { title: 'Laughing', description: 'Natural stress reliever' },
    { title: 'Journaling', description: 'Express thoughts and emotions' },
    { title: 'Nature Walks', description: 'Connect with nature' },
    { title: 'Limiting Social Media', description: 'Reduce digital stress' },
    { title: 'Therapeutic Techniques', description: 'Professional guidance' }
  ];

  // Breathing exercise timer
  useEffect(() => {
    if (activeSection === 'breathing') {
      const interval = setInterval(() => {
        setBreathingProgress((prev) => {
          if (prev >= 100) {
            setBreathingPhase(p => p === 'in' ? 'out' : 'in');
            return 0;
          }
          return prev + (100 / 40); // 4 seconds = 40 steps (100ms interval)
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [activeSection, breathingPhase]);

  const leftTabs = [
    { id: 'app', label: 'App' },
    { id: 'stress', label: 'Stress & Anxiety' },
    { id: 'sleep', label: 'Sleep' },
    { id: 'meditation', label: 'Meditation' },
  ];

  const rightTabs = [
    { id: 'journaling', label: 'Journaling' },
    { id: 'articles', label: 'Articles', icon: <BookOpen size={18} /> },
    { id: 'profile', label: 'Profile', icon: <User size={18} /> }
  ];

  const articleCategories = [
    { name: 'Sleep', image: 'https://images.unsplash.com/photo-1511295742362-92c96b1cf484?auto=format&fit=crop&w=200&q=80' },
    { name: 'Meditation', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=200&q=80' },
    { name: 'Stress', image: 'https://images.unsplash.com/photo-1474418397713-7ede21d49118?auto=format&fit=crop&w=200&q=80' },
    { name: 'Gratitude', image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=200&q=80' }
  ];

  const profileOptions = [
    'Account Details',
    'Change Password',
    'Your Stats',
    'Language',
    'Logout'
  ];

  const renderUsageGraph = (data: number[]) => (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="h-48 flex items-end space-x-4">
        {data.map((hours, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-teal-500 rounded-t-lg transition-all duration-300"
              style={{ height: `${(hours / 4) * 100}%` }}
            />
            <span className="text-sm text-gray-600 mt-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 border-t pt-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>0h</span>
          <span>4h</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-green-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm fixed w-full z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="hidden md:flex items-center space-x-8">
              {leftTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-teal-600 
                    ${activeTab === tab.id 
                      ? 'text-teal-600 border-b-2 border-teal-600' 
                      : 'text-gray-600'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {rightTabs.map(tab => (
                <div key={tab.id} className="relative group">
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-teal-600 
                      flex items-center space-x-2
                      ${activeTab === tab.id 
                        ? 'text-teal-600 border-b-2 border-teal-600' 
                        : 'text-gray-600'}`}
                  >
                    <span>{tab.label}</span>
                    {tab.icon}
                  </button>

                  {/* Articles Dropdown */}
                  {tab.id === 'articles' && (
                    <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 
                      absolute right-0 mt-2 w-[600px] bg-white rounded-xl shadow-lg 
                      transition-all duration-200 p-6">
                      <div className="flex">
                        <div className="w-1/3 pr-6 border-r">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Explore Articles</h3>
                          <p className="text-gray-600">Discover insights and techniques for better mental well-being.</p>
                        </div>
                        <div className="w-2/3 pl-6">
                          <div className="grid grid-cols-2 gap-4">
                            {articleCategories.map((category, index) => (
                              <button key={index} className="group/item transition-all duration-200 hover:scale-105">
                                <div className="relative rounded-lg overflow-hidden">
                                  <img 
                                    src={category.image} 
                                    alt={category.name}
                                    className="w-full h-32 object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/20 group-hover/item:bg-black/10 transition-all duration-200" />
                                </div>
                                <p className="mt-2 text-sm font-medium text-gray-700">{category.name}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Profile Dropdown */}
                  {tab.id === 'profile' && (
                    <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 
                      absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg 
                      transition-all duration-200">
                      {profileOptions.map((option, index) => (
                        <button
                          key={index}
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 
                            transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button className="md:hidden text-gray-600">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Stress & Anxiety <span className="text-teal-600">Free.</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              Take control of your mental well-being with our scientifically proven techniques for stress and anxiety management.
            </p>
            <button className="bg-gradient-to-r from-teal-600 to-teal-500 text-white px-8 py-3 rounded-full 
              font-medium transform transition-all duration-200 hover:scale-105 hover:shadow-lg">
              Explore Now
            </button>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80"
              alt="Peaceful meditation"
              className="rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white/80 backdrop-blur-sm py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-teal-600 mb-12">
            Remove Your Stress
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {/* Quick Relief Section */}
            <div className="relative group">
              <button
                onClick={() => setActiveSection(activeSection === 'quick-relief' ? null : 'quick-relief')}
                className="w-full bg-gradient-to-br from-teal-500 to-rose-500 text-white p-6 rounded-xl shadow-lg
                  transform transition-all duration-200 hover:scale-105 hover:shadow-xl
                  flex flex-col items-center space-y-3"
              >
                <Activity size={32} />
                <span className="font-medium">Quick Relief</span>
              </button>

              {/* Quick Relief Hover Box */}
              <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 
                absolute left-1/2 -translate-x-1/2 mt-4 w-[400px] bg-white rounded-xl shadow-lg 
                transition-all duration-200 p-6 z-20">
                <div className="flex space-x-6">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Stress Relief</h3>
                    <p className="text-gray-600">Instant calm through soothing sounds and guided relaxation.</p>
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?auto=format&fit=crop&w=200&q=80"
                    alt="Quick relief"
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Breathing Section */}
            <div className="relative group">
              <button
                onClick={() => setActiveSection(activeSection === 'breathing' ? null : 'breathing')}
                className="w-full bg-gradient-to-br from-teal-500 to-rose-500 text-white p-6 rounded-xl shadow-lg
                  transform transition-all duration-200 hover:scale-105 hover:shadow-xl
                  flex flex-col items-center space-y-3"
              >
                <Wind size={32} />
                <span className="font-medium">Breathing</span>
              </button>

              {/* Breathing Hover Box */}
              <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 
                absolute left-1/2 -translate-x-1/2 mt-4 w-[400px] bg-white rounded-xl shadow-lg 
                transition-all duration-200 p-6 z-20">
                <div className="flex space-x-6">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Breathing Exercises</h3>
                    <p className="text-gray-600">Master your breath to reduce stress and anxiety.</p>
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=200&q=80"
                    alt="Breathing"
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Practical Ways Section */}
            <div className="relative group">
              <button
                onClick={() => setActiveSection(activeSection === 'practical' ? null : 'practical')}
                className="w-full bg-gradient-to-br from-teal-500 to-rose-500 text-white p-6 rounded-xl shadow-lg
                  transform transition-all duration-200 hover:scale-105 hover:shadow-xl
                  flex flex-col items-center space-y-3"
              >
                <Brain size={32} />
                <span className="font-medium">Practical Ways</span>
              </button>

              {/* Practical Ways Hover Box */}
              <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 
                absolute left-1/2 -translate-x-1/2 mt-4 w-[400px] bg-white rounded-xl shadow-lg 
                transition-all duration-200 p-6 z-20">
                <div className="flex space-x-6">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Practical Stress Relief</h3>
                    <p className="text-gray-600">Simple, effective techniques for daily stress management.</p>
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=200&q=80"
                    alt="Practical ways"
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Relief Content */}
          {activeSection === 'quick-relief' && (
            <div className="mt-16 max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {quickReliefAudios.map((audio) => (
                  <button
                    key={audio.id}
                    onClick={() => {
                      setCurrentAudio(`quick-relief-${audio.id}`);
                      setIsPlaying(true);
                    }}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow
                      flex flex-col items-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center">
                      {currentAudio === `quick-relief-${audio.id}` && isPlaying ? (
                        <Pause size={24} className="text-pink-600" />
                      ) : (
                        <Play size={24} className="text-pink-600" />
                      )}
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium text-gray-900">{audio.title}</h3>
                      <p className="text-sm text-gray-500">{audio.duration}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Time Spent Hearing Relief Music</h3>
                {renderUsageGraph(weeklyStats.relief)}
              </div>
            </div>
          )}

          {/* Breathing Content */}
          {activeSection === 'breathing' && (
            <div className="mt-16 max-w-5xl mx-auto">
              {/* Breathing Clock */}
              <div className="mb-12 flex justify-center">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 rounded-full border-4 border-teal-200" />
                  <div 
                    className="absolute inset-0 rounded-full border-4 border-teal-500 transition-all duration-100"
                    style={{
                      clipPath: `polygon(50% 50%, 50% 0, ${50 + 50 * Math.cos((breathingProgress / 100) * 2 * Math.PI - Math.PI/2)}% ${50 + 50 * Math.sin((breathingProgress / 100) * 2 * Math.PI - Math.PI/2)}%, 50% 50%)`
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-medium text-teal-600">
                      {breathingPhase === 'in' ? 'Breathe In' : 'Breathe Out'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {breathingAudios.map((audio) => (
                  <button
                    key={audio.id}
                    onClick={() => {
                      setCurrentAudio(`breathing-${audio.id}`);
                      setIsPlaying(true);
                    }}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow
                      flex flex-col items-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center">
                      {currentAudio === `breathing-${audio.id}` && isPlaying ? (
                        <Pause size={24} className="text-teal-600" />
                      ) : (
                        <Play size={24} className="text-teal-600" />
                      )}
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium text-gray-900">{audio.title}</h3>
                      <p className="text-sm text-gray-500">{audio.duration}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Time Spent on Guided Breathing</h3>
                {renderUsageGraph(weeklyStats.breathing)}
              </div>
            </div>
          )}

          {/* Practical Ways Content */}
          {activeSection === 'practical' && (
            <div className="mt-16 max-w-5xl mx-auto">
              <div className="space-y-4">
                {practicalWays.map((way, index) => (
                  <button
                    key={index}
                    className="w-full bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow
                      flex items-center space-x-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-medium">{index + 1}</span>
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-medium text-gray-900">{way.title}</h3>
                      <p className="text-sm text-gray-500">{way.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-12">
                <img 
                  src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1500&q=80"
                  alt="Peaceful nature"
                  className="w-full h-[20vh] object-cover rounded-2xl"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Audio Player Bar */}
      {currentAudio && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setIsPlaying(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                <X size={24} />
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <SkipBack size={24} />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center
                  hover:bg-teal-700 transition-colors"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <SkipForward size={24} />
              </button>
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full w-1/3 bg-teal-600 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-b from-transparent to-white/80 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>© 2024 Mindfulness App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;