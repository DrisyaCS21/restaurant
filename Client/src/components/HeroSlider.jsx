import React, { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    name: "Iced Coffee",
    cupImage: "/images/iced-coffee-cup.png",
    splashImage: "/images/coffee-splash.png",
    bgColor: "from-amber-100/20 to-orange-50/20",
    description: "Rich & Smooth • Perfectly Chilled",
    glowClass: "glow-coffee",
    particleType: "coffee",
  },
  {
    id: 2,
    name: "Matcha",
    cupImage: "/images/matcha-cup.png",
    splashImage: "/images/matcha-splash.png",
    bgColor: "from-emerald-100/20 to-green-50/20",
    description: "Vibrant & Earthy • Pure Matcha",
    glowClass: "glow-matcha",
    particleType: "leaf",
  },
  {
    id: 3,
    name: "Iced Tea",
    cupImage: "/images/iced-tea-cup.png",
    splashImage: "/images/tea-splash.png",
    bgColor: "from-rose-100/20 to-amber-50/20",
    description: "Refreshing & Crisp • Lightly Sweet",
    glowClass: "glow-tea",
    particleType: "bubble",
  },
];

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Get visible slides with 3D transforms
  const getSlideStyle = (index) => {
    const diff = (index - activeIndex + slides.length) % slides.length;
    let translateX = 0;
    let rotateY = 0;
    let translateZ = 0;
    let scale = 1;
    let opacity = 0.5;

    if (diff === 0) {
      // Active - center
      translateX = 0;
      rotateY = 0;
      translateZ = 80;
      scale = 1.1;
      opacity = 1;
    } else if (diff === 1) {
      // Right
      translateX = 120;
      rotateY = -12;
      translateZ = 0;
      scale = 0.85;
      opacity = 0.4;
    } else if (diff === 2) {
      // Left
      translateX = -120;
      rotateY = 12;
      translateZ = 0;
      scale = 0.85;
      opacity = 0.4;
    }

    return {
      transform: `translateX(${translateX}px) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
      opacity,
      zIndex: diff === 0 ? 10 : diff === 1 ? 5 : 5,
      transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-orange-50/40 flex items-center justify-center p-6 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
              Drink
            </span>
            <span className="bg-gradient-to-r from-stone-700 to-stone-500 bg-clip-text text-transparent">
              &nbsp;Collection
            </span>
          </h1>
          <p className="text-stone-500 mt-3 text-sm md:text-base font-medium">
            ✦ 3D Interactive Slider ✦
          </p>
        </div>

        {/* 3D Slider */}
        <div className="relative perspective-1500 h-[500px] md:h-[600px] flex items-center justify-center">
          {slides.map((slide, index) => {
            const style = getSlideStyle(index);
            const isActive = index === activeIndex;

            return (
              <div
                key={slide.id}
                className="absolute w-[300px] md:w-[380px] rounded-3xl p-6 md:p-8 backdrop-blur-xl border border-white/40"
                style={{
                  ...style,
                  background: `linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.3))`,
                  boxShadow: isActive
                    ? "0 40px 80px -20px rgba(0,0,0,0.3), 0 0 60px rgba(251, 191, 36, 0.1)"
                    : "0 20px 40px -20px rgba(0,0,0,0.15)",
                  transform: style.transform,
                  opacity: style.opacity,
                  zIndex: style.zIndex,
                  transition: style.transition,
                }}
              >
                {/* Background Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${slide.bgColor} opacity-50 blur-2xl`}
                  style={{
                    transform: "scale(0.9)",
                    filter: "blur(40px)",
                  }}
                />

                {/* Splash Image (behind cup) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <img
                    src={slide.splashImage}
                    alt=""
                    className="w-64 h-64 object-contain blur-sm"
                    style={{
                      transform: isActive ? "scale(1.1)" : "scale(0.8)",
                      transition: "transform 0.8s ease",
                    }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* Cup Image */}
                  <div className="w-48 h-48 md:w-56 md:h-56 mb-4 relative">
                    <img
                      src={slide.cupImage}
                      alt={slide.name}
                      className="w-full h-full object-contain drop-shadow-2xl"
                      style={{
                        transform: isActive
                          ? "rotate(-2deg) scale(1.05)"
                          : "rotate(0deg) scale(0.9)",
                        transition: "transform 0.8s ease",
                        filter: isActive
                          ? "drop-shadow(0 20px 30px rgba(0,0,0,0.2))"
                          : "drop-shadow(0 10px 15px rgba(0,0,0,0.1))",
                      }}
                    />
                  </div>

                  {/* Name */}
                  <h2
                    className="text-3xl md:text-4xl font-bold text-stone-800 mb-2"
                    style={{
                      transform: isActive ? "scale(1)" : "scale(0.9)",
                      transition: "transform 0.6s ease",
                    }}
                  >
                    {slide.name}
                  </h2>

                  {/* Description */}
                  <p
                    className="text-stone-600 text-sm md:text-base font-medium text-center px-4"
                    style={{
                      opacity: isActive ? 1 : 0.6,
                      transition: "opacity 0.6s ease",
                    }}
                  >
                    {slide.description}
                  </p>

                  {/* Decorative badge */}
                  <div className="mt-4 flex gap-2">
                    <span className="bg-white/40 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-semibold text-stone-600 border border-white/60">
                      {slide.particleType === "coffee" && "☕"}
                      {slide.particleType === "leaf" && "🍵"}
                      {slide.particleType === "bubble" && "🫧"}
                      &nbsp; {slide.particleType}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mt-8 relative z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-amber-600 w-8"
                  : "bg-stone-300 w-2 hover:bg-stone-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div className="text-center mt-4 text-stone-400 text-sm font-medium">
          {activeIndex + 1} / {slides.length}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;