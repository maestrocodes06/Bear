                import React, { useState } from 'react';
                import { Heart } from 'lucide-react';

                export default function LoveLetter() {
                const [isOpen, setIsOpen] = useState(false);
                const [isAnimating, setIsAnimating] = useState(false);

                const handleOpen = () => {
                    setIsAnimating(true);
                    setTimeout(() => {
                    setIsOpen(true);
                    setIsAnimating(false);
                    }, 1200);
                };

                const handleClose = () => {
                    setIsOpen(false);
                };

                return (
                    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-4">
                    {/* Floating hearts background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(15)].map((_, i) => (
                        <Heart
                            key={i}
                            className="absolute text-pink-300 opacity-20 animate-pulse"
                            style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            fontSize: `${Math.random() * 20 + 10}px`
                            }}
                        />
                        ))}
                    </div>

                    <div className="relative z-10">
                        {!isOpen ? (
                        /* Closed Envelope */
                        <div 
                            onClick={!isAnimating ? handleOpen : undefined}
                            className={`${!isAnimating ? 'cursor-pointer hover:scale-105' : ''} transform transition-all duration-500`}
                        >
                            <div className="relative w-80 h-56">
                            {/* Envelope body */}
                            <div className="absolute bottom-0 w-full h-40 bg-gradient-to-br from-pink-200 to-pink-300 rounded-lg shadow-2xl border-4 border-pink-400"></div>
                            
                            {/* Envelope flap with opening animation */}
                            <div 
                                className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-pink-300 to-pink-400 origin-top shadow-lg"
                                style={{
                                clipPath: 'polygon(0 0, 50% 60%, 100% 0)',
                                borderTop: '4px solid #f472b6',
                                borderLeft: '4px solid #f472b6',
                                borderRight: '4px solid #f472b6',
                                transform: isAnimating ? 'rotateX(-180deg)' : 'rotateX(0deg)',
                                transition: 'transform 1s ease-in-out',
                                transformStyle: 'preserve-3d'
                                }}
                            >
                            </div>

                            {/* Letter peeking out */}
                            <div 
                                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-64 h-32 bg-white rounded-t-lg shadow-lg border-2 border-pink-200 transition-all duration-1000"
                                style={{
                                transform: isAnimating 
                                    ? 'translateX(-50%) translateY(-100px) scale(1.1)' 
                                    : 'translateX(-50%) translateY(0)',
                                opacity: isAnimating ? 1 : 0.3
                                }}
                            >
                                <div className="p-4 text-center">
                                <Heart className="inline-block text-red-400 fill-red-400 animate-pulse" size={24} />
                                <p className="text-xs text-gray-500 mt-2 font-serif">For you...</p>
                                </div>
                            </div>

                            {/* Wax seal with break animation */}
                            <div 
                                className="absolute top-16 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-red-500 rounded-full shadow-lg flex items-center justify-center border-4 border-red-600 transition-all duration-700"
                                style={{
                                opacity: isAnimating ? 0 : 1,
                                transform: isAnimating 
                                    ? 'translate(-50%, 0) scale(0.5) rotate(45deg)' 
                                    : 'translate(-50%, 0) scale(1) rotate(0deg)'
                                }}
                            >
                                <Heart className="text-white fill-white" size={28} />
                            </div>

                            {/* Click instruction */}
                            {!isAnimating && (
                                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-pink-600 font-medium animate-bounce">
                                Click to open ✨
                                </div>
                            )}
                            </div>
                        </div>
                        ) : (
                        /* Open Letter with entrance animation */
                        <div 
                            className="transition-all duration-700"
                            style={{
                            animation: 'fadeInScale 0.8s ease-out forwards'
                            }}
                        >
                            <style>{`
                            @keyframes fadeInScale {
                                0% {
                                opacity: 0;
                                transform: scale(0.8) translateY(20px);
                                }
                                100% {
                                opacity: 1;
                                transform: scale(1) translateY(0);
                                }
                            }
                            `}</style>
                            
                            <div className="bg-gradient-to-br from-white to-pink-50 w-96 min-h-96 rounded-lg shadow-2xl border-8 border-pink-200 p-8 relative overflow-hidden">
                            {/* Decorative corners */}
                            <div className="absolute top-2 left-2 text-pink-300 text-2xl">✿</div>
                            <div className="absolute top-2 right-2 text-pink-300 text-2xl">✿</div>
                            <div className="absolute bottom-2 left-2 text-pink-300 text-2xl">✿</div>
                            <div className="absolute bottom-2 right-2 text-pink-300 text-2xl">✿</div>

                            {/* Letter content */}
                            <div className="relative z-10">
                                <div className="text-center mb-6">
                                <Heart className="inline-block text-red-500 fill-red-500 animate-pulse" size={40} />
                                </div>

                                <h1 className="text-3xl font-bold text-center text-pink-600 mb-6" style={{ fontFamily: 'cursive' }}>
                                To My Dearest Love
                                </h1>

                                <div className="text-gray-700 space-y-4 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                                <p>
                                    Every moment with you feels like a beautiful dream I never want to wake up from. Your smile lights up my darkest days, and your laughter is my favorite melody.
                                </p>
                                
                                <p>
                                    You make my heart skip a beat with just a glance, and every day I fall more deeply in love with you. Thank you for being the most amazing person in my world.
                                </p>
                                
                                <p className="text-center font-semibold text-pink-600 text-xl mt-8">
                                    I love you more than words can say ❤️
                                </p>

                                <p className="text-right mt-8 italic">
                                    Forever yours,<br />
                                    <span className="font-semibold">Your Love</span>
                                </p>
                                </div>
                            </div>

                            {/* Floating hearts inside letter */}
                            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                {[...Array(8)].map((_, i) => (
                                <Heart
                                    key={i}
                                    className="absolute text-pink-200 opacity-30"
                                    size={20}
                                    style={{
                                    left: `${Math.random() * 90}%`,
                                    top: `${Math.random() * 90}%`,
                                    animation: `pulse ${2 + Math.random()}s infinite`
                                    }}
                                />
                                ))}
                            </div>
                            </div>

                            {/* Close button */}
                            <button
                            onClick={handleClose}
                            className="mt-6 mx-auto block px-6 py-2 bg-pink-400 hover:bg-pink-500 text-white rounded-full shadow-lg transition-colors duration-300"
                            >
                            Close Letter
                            </button>
                        </div>
                        )}
                    </div>
                    </div>
                );
                }