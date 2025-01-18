import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, MapPin, Mic, PenLine, Plus, Save, ChevronDown } from 'lucide-react';

interface JournalEntry {
  date: string;
  content: string;
  location?: string;
  audioUrl?: string;
}

function App() {
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [journalContent, setJournalContent] = useState('');
  const [location, setLocation] = useState('');
  const [showYearMenu, setShowYearMenu] = useState(false);
  const [showMonthMenu, setShowMonthMenu] = useState(false);
  const [entries, setEntries] = useState<Record<string, JournalEntry>>(() => {
    const saved = localStorage.getItem('journalEntries');
    return saved ? JSON.parse(saved) : {};
  });

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const handleYearSelect = (year: number) => {
    setSelectedDate(new Date(year, selectedDate.getMonth(), 1));
    setShowYearMenu(false);
    setShowMonthMenu(true);
  };

  const handleMonthSelect = (month: number) => {
    setSelectedDate(new Date(selectedDate.getFullYear(), month, 1));
    setShowMonthMenu(false);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const saveEntry = () => {
    const dateKey = formatDateKey(selectedDate);
    setEntries(prev => ({
      ...prev,
      [dateKey]: {
        date: dateKey,
        content: journalContent,
        location,
        audioUrl: audioUrl || undefined
      }
    }));
    setJournalContent('');
    setLocation('');
    setAudioUrl(null);
  };

  const loadEntry = (date: Date) => {
    const dateKey = formatDateKey(date);
    const entry = entries[dateKey];
    if (entry) {
      setJournalContent(entry.content);
      setLocation(entry.location || '');
      setAudioUrl(entry.audioUrl || null);
    } else {
      setJournalContent('');
      setLocation('');
      setAudioUrl(null);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedDate);
    const firstDay = getFirstDayOfMonth(selectedDate);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      const dateKey = formatDateKey(date);
      const hasEntry = entries[dateKey];
      const isCurrentDay = 
        day === currentDate.getDate() && 
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear();

      days.push(
        <div
          key={day}
          onClick={() => {
            setSelectedDate(date);
            loadEntry(date);
          }}
          className={`h-8 w-8 flex items-center justify-center rounded-full cursor-pointer relative
            ${isCurrentDay ? 'bg-teal-500 text-white' : 'hover:bg-teal-100'}
            ${hasEntry ? 'font-bold' : ''}`}
        >
          {day}
          {hasEntry && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-teal-500 rounded-full" />
          )}
        </div>
      );
    }

    return days;
  };

  const monthYear = selectedDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 2030 - 1970 + 1 }, (_, i) => 1970 + i);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Calendar Sidebar */}
      <div className="w-80 bg-white shadow-lg p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between mb-4">
          <Calendar className="w-5 h-5 text-teal-500" />
          <h2 className="text-lg font-semibold text-gray-800">Calendar</h2>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => {
              setShowYearMenu(true);
              setShowMonthMenu(false);
            }}
            className="w-full p-2 flex items-center justify-between bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <span className="font-medium text-gray-800">{monthYear}</span>
            <ChevronDown className="w-5 h-5 text-gray-600" />
          </button>

          {/* Year Selection Menu */}
          {showYearMenu && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {years.map(year => (
                <button
                  key={year}
                  onClick={() => handleYearSelect(year)}
                  className={`w-full p-2 text-left hover:bg-teal-50 ${
                    year === selectedDate.getFullYear() ? 'bg-teal-100' : ''
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          )}

          {/* Month Selection Menu */}
          {showMonthMenu && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
              {months.map((month, index) => (
                <button
                  key={month}
                  onClick={() => handleMonthSelect(index)}
                  className={`w-full p-2 text-left hover:bg-teal-50 ${
                    index === selectedDate.getMonth() ? 'bg-teal-100' : ''
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="text-sm font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {renderCalendar()}
        </div>
      </div>

      {/* Note Creation Panel */}
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
            Start journaling <PenLine className="w-6 h-6 text-teal-500 inline-block ml-2" />
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            {formatDate(selectedDate)}
          </p>
          
          <button 
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                  setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
                });
              }
            }}
            className="flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-6"
          >
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{location || 'Add location'}</span>
          </button>

          <textarea
            value={journalContent}
            onChange={(e) => setJournalContent(e.target.value)}
            className="w-full h-48 p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
            placeholder="Start writing your story... or use voice input"
          />

          <div className="flex justify-between items-center mt-4">
            {audioUrl && (
              <audio controls src={audioUrl} className="w-64" />
            )}
            <div className="flex gap-4">
              <button 
                onClick={isRecording ? stopRecording : startRecording}
                className={`p-3 ${isRecording ? 'bg-red-500' : 'bg-teal-500'} hover:bg-opacity-90 text-white rounded-full shadow-lg transform transition-transform hover:scale-105`}
              >
                <Mic className="w-5 h-5" />
              </button>
              <button 
                onClick={saveEntry}
                className="p-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full shadow-lg transform transition-transform hover:scale-105 flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;