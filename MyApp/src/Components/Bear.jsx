import React, { useState, useEffect } from 'react';

export default function InteractiveBear() {
  const [bearPosition, setBearPosition] = useState({ side: 'left', top: '50%' });
  const [isVisible, setIsVisible] = useState(true);
  const [conversationStep, setConversationStep] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const sides = ['left', 'right', 'top', 'bottom'];

  const getRandomPosition = () => {
    const side = sides[Math.floor(Math.random() * sides.length)];
    const randomPercent = Math.floor(Math.random() * 60) + 20; // 20% to 80%
    return { side, top: `${randomPercent}%` };
  };

  const handleBearClick = () => {
    setIsVisible(false);
    setShowChat(false);
    
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    
    setTimeout(() => {
      setBearPosition(getRandomPosition());
      setIsVisible(true);
      
      // Start conversation after 3 clicks
      if (newClickCount >= 3) {
        setConversationStep(0);
      }
    }, 500);
  };

  useEffect(() => {
    if (isVisible && conversationStep === 0 && clickCount >= 3) {
      const timer = setTimeout(() => {
        setShowChat(true);
        setConversationStep(1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, conversationStep, clickCount]);

  const handleUserResponse = (response) => {
    if (conversationStep === 1) {
      setConversationStep(2);
      setTimeout(() => {
        setConversationStep(3);
      }, 1500);
    } else if (conversationStep === 3) {
      setConversationStep(4);
      setTimeout(() => {
        setConversationStep(5);
      }, 1500);
    } else if (conversationStep === 5) {
      if (response === 'yes') {
        setConversationStep(6); // angry path
      } else {
        setConversationStep(7); // cute path
      }
    }
  };

  const getBearStyle = () => {
    const baseStyle = {
      transition: 'all 0.5s ease-in-out',
      opacity: isVisible ? 1 : 0,
    };

    switch (bearPosition.side) {
      case 'left':
        return { ...baseStyle, left: isVisible ? '-40px' : '-200px', top: bearPosition.top };
      case 'right':
        return { ...baseStyle, right: isVisible ? '-40px' : '-200px', top: bearPosition.top };
      case 'top':
        return { ...baseStyle, top: isVisible ? '-40px' : '-200px', left: bearPosition.top };
      case 'bottom':
        return { ...baseStyle, bottom: isVisible ? '-40px' : '-200px', left: bearPosition.top };
      default:
        return baseStyle;
    }
  };

  const getRotation = () => {
    switch (bearPosition.side) {
      case 'right':
        return 'scaleX(-1)';
      case 'top':
        return 'rotate(90deg)';
      case 'bottom':
        return 'rotate(-90deg)';
      default:
        return 'none';
    }
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 overflow-hidden">
      {/* Title */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-10">
        <h1 className="text-4xl font-bold text-purple-600 mb-2">Peek-a-Boo Bear!</h1>
        <p className="text-gray-600">Click the bear to play hide and seek 🐻</p>
        {clickCount < 3 && (
          <div className="mt-2 text-lg font-semibold text-purple-500">
            Clicks: {clickCount}/3
          </div>
        )}
      </div>

      {/* Bear */}
      <div
        className="absolute cursor-pointer z-20"
        style={getBearStyle()}
        onClick={handleBearClick}
      >
        <div style={{ transform: getRotation() }}>
          <div className="text-8xl hover:scale-110 transition-transform">
            🐻
          </div>
        </div>
      </div>

      {/* Chat Bubble */}
      {showChat && isVisible && (
        <div
          className="absolute z-30 bg-white rounded-2xl shadow-2xl p-4 max-w-xs animate-bounce"
          style={{
            left: bearPosition.side === 'left' ? '100px' : bearPosition.side === 'right' ? 'auto' : bearPosition.top,
            right: bearPosition.side === 'right' ? '100px' : 'auto',
            top: bearPosition.side === 'top' ? '100px' : bearPosition.side === 'bottom' ? 'auto' : bearPosition.top,
            bottom: bearPosition.side === 'bottom' ? '100px' : 'auto',
          }}
        >
          {conversationStep === 1 && (
            <div>
              <p className="text-lg font-semibold text-gray-800 mb-3">How are you? 🤔</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleUserResponse('sad')}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Sad 😔
                </button>
                <button
                  onClick={() => handleUserResponse('verysad')}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                >
                  Very sad 😢
                </button>
              </div>
            </div>
          )}
          
          {conversationStep === 2 && (
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800">Oh no... 💔</p>
            </div>
          )}
          
          {conversationStep === 3 && (
            <div>
              <p className="text-lg font-semibold text-gray-800 mb-3">You know you are sweet and kind right? 💕</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleUserResponse('ofc')}
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Ofc I know it 😊
                </button>
                <button
                  onClick={() => handleUserResponse('yes')}
                  className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                >
                  Yes I do 🥰
                </button>
              </div>
            </div>
          )}
          
          {conversationStep === 4 && (
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800">That's right! 🌟</p>
            </div>
          )}
          
          {conversationStep === 5 && (
            <div>
              <p className="text-lg font-semibold text-gray-800 mb-3">Then why are you sad, did the dumb guy who made this web page made you angry? 😤</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleUserResponse('yes')}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Yesss he did 😠
                </button>
                <button
                  onClick={() => handleUserResponse('no')}
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Nahh he's cute 🥰
                </button>
              </div>
            </div>
          )}
          
          {conversationStep === 6 && (
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800 mb-2">Then here's his number call him and scold him as much as you want 📞</p>
              <p className="text-2xl font-bold text-purple-600">+91 XXX-XXX-XXXX</p>
            </div>
          )}
          
          {conversationStep === 7 && (
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800">Then why are you still here call him already! 📱💕</p>
            </div>
          )}
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute bottom-8 left-8 text-6xl opacity-20">🌸</div>
      <div className="absolute top-20 right-12 text-5xl opacity-20">🌺</div>
      <div className="absolute bottom-20 right-20 text-7xl opacity-20">🌼</div>
    </div>
  );
}