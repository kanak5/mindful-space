import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, BarChart3, BookOpen, Headphones, X, SkipForward, SkipBack, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [showTracker, setShowTracker] = useState(false);
  const [showTechniques, setShowTechniques] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState(0);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [currentClockTime, setCurrentClockTime] = useState(new Date());

  const timerRef = useRef<NodeJS.Timeout>();
  const clockRef = useRef<NodeJS.Timeout>();

  const guidedMeditations = [
    { title: "Morning Meditation", duration: "10:00" },
    { title: "Stress Relief", duration: "15:00" },
    { title: "Deep Sleep", duration: "20:00" },
    { title: "Anxiety Relief", duration: "12:00" },
    { title: "Focus Enhancement", duration: "8:00" },
    { title: "Gratitude Practice", duration: "10:00" }
  ];

  const meditationTechniques = [
    {
      title: "Mindfulness Meditation",
      description: "Focus on the present moment through breath awareness",
      image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Loving-Kindness Meditation",
      description: "Cultivate compassion and positive feelings towards others",
      image: "https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Body Scan Meditation",
      description: "Progressive relaxation through body awareness",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Transcendental Meditation",
      description: "Silent mantra meditation for deep relaxation",
      image: "https://images.unsplash.com/photo-1497561813398-8fcc7a37b567?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const articles = [
    {
      title: "The Science Behind Meditation",
      url: "https://www.healthline.com/nutrition/12-benefits-of-meditation"
    },
    {
      title: "Getting Started with Meditation",
      url: "https://www.mindful.org/how-to-meditate/"
    },
    {
      title: "Different Types of Meditation",
      url: "https://www.verywellmind.com/types-of-meditation-for-stress-relief-3144989"
    },
    {
      title: "Benefits of Daily Practice",
      url: "https://www.mayoclinic.org/tests-procedures/meditation/in-depth/meditation/art-20045858"
    }
  ];

  const weeklyStats = [
    { day: 'Mon', hours: 1.5 },
    { day: 'Tue', hours: 2.0 },
    { day: 'Wed', hours: 1.0 },
    { day: 'Thu', hours: 2.5 },
    { day: 'Fri', hours: 1.8 },
    { day: 'Sat', hours: 3.0 },
    { day: 'Sun', hours: 2.2 },
  ];

  useEffect(() => {
    if (isTimerRunning) {
      clockRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (selectedTimer > 0 && prev >= selectedTimer * 60) {
            setIsTimerRunning(false);
            clearInterval(clockRef.current);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(clockRef.current);
  }, [isTimerRunning, selectedTimer]);

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentClockTime(new Date());
    }, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 relative">
      {/* Header Section */}
      <header className="container mx-auto px-4 pt-20 pb-32 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-6xl font-bold text-teal-500 mb-6">Meditation</h1>
          <p className="text-black-600 text-lg mb-6">
            Meditation is a journey inward, a practice that allows you to find peace and clarity in the present moment. 
            Through regular meditation, you can reduce stress, improve focus, and cultivate a deeper understanding of yourself.
          </p>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] flex-1 bg-teal-300"></div>
            <p className="text-teal-600 text-lg">Find your inner peace</p>
            <div className="h-[1px] flex-1 bg-teal-300"></div>
          </div>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img 
            src="src\imaage\meditation.jpg"
            alt="Meditation"
            className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
          />
        </div>
      </header>

      {/* Interactive Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-teal-600 mb-12 text-center">Begin Your Journey</h2>
        
        {/* Feature Boxes Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Guided Meditation Section */}
          <div>
            <div className="relative group mb-8">
              <button
                onClick={() => setShowAudioPlayer(!showAudioPlayer)}
                className="w-full flex items-center gap-3 px-8 py-4 rounded-full bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Headphones className="w-6 h-6" />
                <span className="font-medium text-teal-700">Guided Meditation</span>
              </button>
              {/* Hover Card */}
              <div className="opacity-0 group-hover:opacity-100 absolute top-full left-0 mt-4 w-full bg-white p-6 rounded-xl shadow-xl transition-opacity duration-300 z-10">
                <div className="flex gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?auto=format&fit=crop&w=200&q=80"
                    alt="Guided Meditation"
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="text-left">
                    <h3 className="font-semibold text-teal-800 mb-2">Guided Meditation</h3>
                    <p className="text-teal-600 text-sm">
                      Follow along with expert-led meditation sessions designed to help you relax, 
                      focus, and find inner peace.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Meditation List */}
            {showAudioPlayer && (
              <div className="grid gap-4 bg-white p-8 rounded-2xl shadow-lg">
                {guidedMeditations.map((meditation, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentAudioIndex(index)}
                    className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
                      currentAudioIndex === index 
                        ? 'bg-indigo-100 text-indigo-700' 
                        : 'bg-teal-50 hover:bg-teal-100'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Play className="w-5 h-5" />
                      <span className="font-medium">{meditation.title}</span>
                    </div>
                    <span className="text-sm text-teal-500">{meditation.duration}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Meditation Tracker Section */}
          <div>
            <div className="relative group mb-8">
              <button
                onClick={() => setShowTracker(!showTracker)}
                className="w-full flex items-center gap-3 px-8 py-4 rounded-full bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <BarChart3 className="w-6 h-6" />
                <span className="font-medium text-teal-700">Meditation Tracker</span>
              </button>
              {/* Hover Card */}
              <div className="opacity-0 group-hover:opacity-100 absolute top-full left-0 mt-4 w-full bg-white p-6 rounded-xl shadow-xl transition-opacity duration-300 z-10">
                <div className="flex gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=200&q=80"
                    alt="Meditation Tracker"
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="text-left">
                    <h3 className="font-semibold text-teal-800 mb-2">Track Your Progress</h3>
                    <p className="text-teal-600 text-sm">
                      Monitor your meditation journey, set goals, and maintain consistency 
                      with our easy-to-use tracking tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tracker Content */}
            {showTracker && (
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="grid grid-cols-1 gap-8">
                  {/* Timer Section */}
                  <div className="flex flex-col justify-center">
                    <div className="text-6xl font-bold text-indigo-600 mb-4 text-center">
                      {formatTime(currentTime)}
                    </div>
                    <div className="flex justify-center gap-4 mb-6">
                      <button
                        onClick={() => {
                          setIsTimerRunning(!isTimerRunning);
                          setSelectedTimer(0);
                        }}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                      >
                        {isTimerRunning ? 'Pause' : 'Start'}
                      </button>
                      <button
                        onClick={() => {
                          setIsTimerRunning(false);
                          setCurrentTime(0);
                          setSelectedTimer(0);
                        }}
                        className="px-6 py-2 bg-teal-200 text-teal-700 rounded-full hover:bg-teal-300 transition-colors"
                      >
                        Reset
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {[5, 10, 15, 20].map((minutes) => (
                        <button
                          key={minutes}
                          onClick={() => {
                            setSelectedTimer(minutes);
                            setCurrentTime(0);
                            setIsTimerRunning(true);
                          }}
                          className={`p-4 rounded-xl transition-all duration-300 ${
                            selectedTimer === minutes
                              ? 'bg-indigo-100 text-indigo-700'
                              : 'bg-teal-50 hover:bg-teal-100'
                          }`}
                        >
                          <Clock className="w-6 h-6 mx-auto mb-2" />
                          <span className="block text-sm font-medium">{minutes} min</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clock Section */}
                  <div className="flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border-8 border-indigo-600 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xl font-bold text-teal-800">
                          {currentClockTime.toLocaleTimeString()}
                        </div>
                        <div className="text-xs text-teal-500">
                          {currentClockTime.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Meditation Techniques Section */}
          <div>
            <div className="relative group mb-8">
              <button
                onClick={() => setShowTechniques(!showTechniques)}
                className="w-full flex items-center gap-3 px-8 py-4 rounded-full bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <BookOpen className="w-6 h-6" />
                <span className="font-medium text-teal-700">Meditation Techniques</span>
              </button>
              {/* Hover Card */}
              <div className="opacity-0 group-hover:opacity-100 absolute top-full left-0 mt-4 w-full bg-white p-6 rounded-xl shadow-xl transition-opacity duration-300 z-10">
                <div className="flex gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=200&q=80"
                    alt="Meditation Techniques"
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="text-left">
                    <h3 className="font-semibold text-teal-800 mb-2">Learn Techniques</h3>
                    <p className="text-teal-600 text-sm">
                      Discover various meditation methods and find the perfect 
                      practice that resonates with you.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Techniques Content */}
            {showTechniques && (
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="grid gap-6 mb-8">
                  {meditationTechniques.map((technique, index) => (
                    <div 
                      key={index}
                      className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <img 
                        src={technique.image}
                        alt={technique.title}
                        className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 p-6 flex flex-col justify-end">
                        <h4 className="text-white text-xl font-semibold mb-2">{technique.title}</h4>
                        <p className="text-white/80 text-sm">{technique.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Related Articles */}
                <div className="border-t pt-6">
                  <h4 className="text-xl font-semibold text-teal-800 mb-4">Related Articles</h4>
                  <div className="grid gap-4">
                    {articles.map((article, index) => (
                      <a
                        key={index}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors"
                      >
                        <BookOpen className="w-5 h-5 text-indigo-600" />
                        <span className="text-teal-700 hover:text-indigo-600 transition-colors">
                          {article.title}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-teal-800 mb-8">Your Stats</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="hours" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Audio Player Bar */}
      {showAudioPlayer && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 z-40">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?auto=format&fit=crop&w=100&q=80"
                alt="Current Meditation"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-medium text-teal-800">
                  {guidedMeditations[currentAudioIndex].title}
                </h4>
                <p className="text-sm text-teal-500">Guided Meditation</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentAudioIndex(prev => Math.max(0, prev - 1))}
                className="p-2 hover:bg-teal-100 rounded-full"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button 
                onClick={() => setCurrentAudioIndex(prev => Math.min(guidedMeditations.length - 1, prev + 1))}
                className="p-2 hover:bg-teal-100 rounded-full"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
            <button 
              onClick={() => {
                setShowAudioPlayer(false);
                setIsPlaying(false);
              }}
              className="p-2 hover:bg-teal-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;