import React, { useState } from 'react';
import { Menu, X, ChevronDown, ChevronUp, Bot as Lotus, Moon, Brain, BookOpen, PenLine } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I start practicing mindfulness?",
      answer: "Start with just 5 minutes a day of focused breathing. Find a quiet space, sit comfortably, and focus on your breath. When your mind wanders, gently bring it back to your breath."
    },
    {
      question: "What are the benefits of mindfulness?",
      answer: "Regular mindfulness practice can reduce stress, improve focus, enhance emotional regulation, better sleep quality, and increase overall well-being."
    },
    {
      question: "Do I need any special equipment?",
      answer: "No special equipment is needed. All you need is a quiet space and a comfortable place to sit or lie down."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Lotus className="h-8 w-8 text-teal-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">MindfulSpace</span>
              
              {/* Left Navigation */}
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <a onClick={()=>
                  navigate('/sleep')
                } className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200">
                  <Moon className="h-4 w-4 mr-1" />Sleep
                </a>
                <a onClick={()=>
                  navigate('/meditation')
                } className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200">
                  <Lotus className="h-4 w-4 mr-1" />Meditation
                </a>
                <a onClick={()=>
                  navigate('/stress')
                } className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200">
                  <Brain className="h-4 w-4 mr-1" />Stress & Anxiety
                </a>
                
              </div>
            </div>

            {/* Right Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
            <a onClick={()=>
                  navigate('/journal')
                } className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200">
                <PenLine className="h-4 w-4 mr-1" />Journaling
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200">
                <BookOpen className="h-4 w-4 mr-1" />Articles
              </a>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200 shadow-md hover:shadow-lg" onClick={() => navigate('/login')}>
                Login / Sign Up
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <a href="#" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">Sleep</a>
              <a href="#" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">Meditation</a>
              <a href="#" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">Stress & Anxiety</a>
              <a href="#" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">Journaling</a>
              <a href="#" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">Articles</a>
            </div>
          </div>
        )}
      </nav>

      {/* Rest of the component remains exactly the same */}
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <img
            className="w-full h-[500px] object-cover opacity-60"
            src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="Meditation landscape"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900/90" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find Your <span className="text-teal-400">Inner Peace</span>
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl leading-relaxed">
            Begin your journey to mindfulness and discover a calmer, more focused you. Our guided practices help you develop awareness and live in the present moment.
          </p>
          <div className="mt-8">
            <button className="px-8 py-3 bg-teal-500 text-white rounded-full font-medium hover:bg-teal-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Start Your Journey
            </button>
          </div>
        </div>
      </div>

      {/* Mindfulness Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="relative">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
                What is <span className="text-teal-600">Mindfulness?</span>
              </h2>
              <div className="prose prose-lg text-gray-500">
                <p className="mb-6">
                  Mindfulness is the practice of purposely focusing your attention on the present moment—and accepting it without judgment. It's about being fully engaged with whatever you're doing at the moment, free from distraction or judgment, and aware of your thoughts and feelings without getting caught up in them.
                </p>
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-teal-500">
                  <p className="italic text-gray-600">
                    "The present moment is the only time over which we have dominion."
                  </p>
                  <p className="text-sm text-gray-500 mt-2">- Thích Nhất Hạnh</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <img
              className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1820&q=80"
              alt="Peaceful meditation"
            />
          </div>
        </div>
      </div>

      {/* Gurus Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-16">
            <span className="text-teal-600">Guru's</span> and The Science Behind
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* Andrew Huberman */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="relative">
                <img
                  className="h-48 w-full object-cover"
                  src="src\imaage\How Andrew Huberman Got America to Care About Science.jpeg"
                  alt="Andrew Huberman"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Andrew Huberman</h3>
                <p className="text-gray-600 leading-relaxed">
                  Neuroscientist exploring the intersection of mindfulness and brain function, bringing scientific rigor to ancient practices.
                </p>
              </div>
            </div>

            {/* Osho */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="relative">
                <img
                  className="h-48 w-full object-cover"
                  src="https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  alt="Osho"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Osho</h3>
                <p className="text-gray-600 leading-relaxed">
                  A revolutionary spiritual teacher who brought dynamic meditation techniques to the modern world.
                </p>
              </div>
            </div>

            {/* Sadhguru */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="relative">
                <img
                  className="h-48 w-full object-cover"
                  src="https://images.unsplash.com/photo-1514845505178-849cebf1a91d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  alt="Sadhguru"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Sadhguru</h3>
                <p className="text-gray-600 leading-relaxed">
                  Blending ancient yogic wisdom with contemporary understanding to offer practical solutions for modern life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-16">
            Frequently Asked <span className="text-teal-600">Questions</span>
          </h2>
          <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index} className="py-6">
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full text-left group"
                >
                  <span className="text-lg font-medium text-gray-900 group-hover:text-teal-600 transition-colors duration-200">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-teal-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 group-hover:text-teal-500 transition-colors duration-200" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="mt-4 pr-12">
                    <p className="text-base text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

