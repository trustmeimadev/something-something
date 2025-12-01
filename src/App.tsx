import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [currentWord, setCurrentWord] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isGiftOpen, setIsGiftOpen] = useState(false);

  const fetchRandomAdjective = async () => {
    setIsLoading(true);
    setError('');
    setIsAnimating(true);

    try {
      // Using Random Words API 
      const response = await fetch('https://random-word-api.vercel.app/api?words=1');

      if (!response.ok) {
        throw new Error('Failed to fetch word');
      }

      const data: string[] = await response.json();

      if (data && data.length > 0) {
        setCurrentWord(data[0]);
      } else {
        throw new Error('No word data received');
      }
    } catch (err) {
      setError('Failed to fetch word. Please try again.');
      console.error('Error fetching word:', err);

      // Fallback to local words if API fails
      const fallbackWords = ['practical', 'ridiculous', 'thoughtful', 'mysterious', 'cozy', 'bizarre'];

      const randomFallback = fallbackWords[Math.floor(Math.random() * fallbackWords.length)];
      setCurrentWord(randomFallback);
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handleGiftHover = (isHovering: boolean) => {
    setIsGiftOpen(isHovering);
  };

  useEffect(() => {
    fetchRandomAdjective();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Pineapples Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>🍍</div>
        <div className="absolute top-32 right-20 text-5xl opacity-15 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4s' }}>🍍</div>
        <div className="absolute bottom-20 left-20 text-7xl opacity-10 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3.5s' }}>🍍</div>
        <div className="absolute bottom-40 right-32 text-6xl opacity-20 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '4.5s' }}>🍍</div>
        <div className="absolute top-1/2 left-5 text-5xl opacity-15 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.8s' }}>🍍</div>
        <div className="absolute top-1/3 right-10 text-7xl opacity-10 animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '4.2s' }}>🍍</div>
        <div className="absolute bottom-1/4 left-1/4 text-5xl opacity-20 animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '3.3s' }}>🍍</div>
        <div className="absolute top-1/4 right-1/3 text-6xl opacity-15 animate-bounce" style={{ animationDelay: '1.8s', animationDuration: '4.8s' }}>🍍</div>
      </div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Header with Branding */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <div className="text-sm font-semibold text-gray-600 mb-1">IT - Digital Applications</div>
            <div className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
              Dole Sunshine Philippines
            </div>
          </div>

          <div
            className="relative inline-block mb-4"
            onMouseEnter={() => handleGiftHover(true)}
            onMouseLeave={() => handleGiftHover(false)}
          >
            <div className="transition-all duration-300">
              <img
                src={isGiftOpen ? "open.png" : "close.png"}
                alt="Gift"
                className="w-30 h-30 object-contain transition-transform duration-300"
              />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Something Something Generator
          </h1>
          <p className="text-gray-600">
            Get something something gift ideas
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border-2 border-yellow-200">
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
              <span className="text-4xl sm:text-5xl font-light text-gray-400">Something</span>
              <div className={`transition-all duration-500 ${isAnimating ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}>
                {isLoading ? (
                  <Loader2 className="w-12 h-12 text-yellow-600 animate-spin" />
                ) : (
                  <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                    {currentWord || '___'}
                  </span>
                )}
              </div>
            </div>

            {error && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-orange-800 text-center">
                  {error}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <button
              onClick={fetchRandomAdjective}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Generating...' : 'Generate New Word'}
            </button>

            <div className="text-center text-xs text-gray-400 pt-2">
              Powered by Random Words API
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 space-y-2">
          <p>Perfect for weekly gift exchanges, Secret Santa, or just for fun!</p>
          <p className="text-xs">
            Powered by{' '}
            <a
              href="https://random-word-api.herokuapp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-600 hover:text-yellow-700 underline"
            >
              Random Word API
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}