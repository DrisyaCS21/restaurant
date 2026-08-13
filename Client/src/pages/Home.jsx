import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Home = () => {
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const [isHovering, setIsHovering] = React.useState(false)
    const [direction, setDirection] = React.useState(1)
    const [activeDessert, setActiveDessert] = React.useState('pumpkin')
    const [hoveredCard, setHoveredCard] = React.useState(null)

    const slides = [
        {
            id: 1,
            name: "Iced Coffee",
            cupImage: "/images/iced-coffee-cup.png",
            splashImage: "/images/coffee-splash.png",
            bgColor: "from-amber-100/20 to-orange-50/20",
            description: "Rich & Smooth • Perfectly Chilled",
            glowClass: "glow-coffee",
            particleType: "coffee"
        },
        {
            id: 2,
            name: "Matcha",
            cupImage: "/images/matcha-cup.png",
            splashImage: "/images/matcha-splash.png",
            bgColor: "from-emerald-100/20 to-green-50/20",
            description: "Vibrant & Earthy • Pure Matcha",
            glowClass: "glow-matcha",
            particleType: "leaf"
        },
        {
            id: 3,
            name: "Iced Tea",
            cupImage: "/images/iced-tea-cup.png",
            splashImage: "/images/tea-splash.png",
            bgColor: "from-rose-100/20 to-amber-50/20",
            description: "Refreshing & Crisp • Lightly Sweet",
            glowClass: "glow-tea",
            particleType: "bubble"
        }
    ]

    const desserts = {
        pumpkin: {
            name: "Pumpkin Spice",
            emoji: "🎃",
            image: "https://i.pinimg.com/736x/87/df/2b/87df2b2243f7df580ce80af2632c05b8.jpg",
            description: "A cozy autumn classic made with velvety pumpkin puree, warm cinnamon, nutmeg, and a hint of clove all baked to perfection in a buttery, flaky crust. Each slice delivers that comforting, nostalgic taste of fall",
            price: "₹180 / slice"
        },
        lemon: {
            name: "Lemon Tart",
            emoji: "🍋",
            image: "https://i.pinimg.com/1200x/75/fd/ba/75fdbae566e32a6dcc560df8481fb087.jpg",
            description: "A bright and zesty dessert featuring a buttery shortbread crust filled with silky smooth lemon curd, perfectly balanced between sweet and tangy. Topped with a light dusting of powdered sugar and fresh berries.",
            price: "₹160 / slice"
        },
        truffle: {
            name: "Truffle Cake",
            emoji: "🍫",
            image: "https://i.pinimg.com/736x/b5/83/b5/b583b5617a9273163acf032f590095a3.jpg",
            description: "Decadent chocolate truffle cake with rich ganache layers, smooth buttercream, and delicate chocolate shavings. A heavenly treat for true chocolate lovers.",
            price: "₹220 / slice"
        },
        caramel: {
            name: "Creme Caramel",
            emoji: "🍮",
            image: "https://i.pinimg.com/736x/39/3b/eb/393beb2737427e082f4d0f76bbbdec3d.jpg",
            description: "Classic French creme caramel with a silky smooth custard base and a rich, golden caramel topping. Delicately flavored with vanilla bean for an elegant finish.",
            price: "₹150 / slice"
        }
    }

    const newItems = [
        {
            name: "Iced Boba Latte",
            emoji: "🧋",
            image: "https://i.pinimg.com/736x/3a/63/5d/3a635dddb9269b9620e05952595e29df.jpg",
            description: "Smooth and refreshing drink made with chilled coffee, milk, and chewy tapioca pearls, creating a perfect balance of creamy, sweet, and bold flavors.",
            price: "₹180"
        },
        {
            name: "Cream Shortcake",
            emoji: "🍓",
            image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600",
            description: "Strawberry shortcake is a sweet dessert made with layers of soft sponge cake, fresh strawberries, and fluffy whipped cream, creating a light and fruity treat.",
            price: "₹250"
        },
        {
            name: "Matcha Tiramisu",
            emoji: "🍵",
            image: "https://i.pinimg.com/1200x/e2/f1/62/e2f1623f3ea6a0b7a6f287d3071fe7fb.jpg",
            description: "Delightful fusion dessert made with layers of matcha-soaked sponge, creamy mascarpone, and fresh strawberries, blending earthy green tea flavor with sweet fruity notes.",
            price: "₹200"
        }
    ]

    React.useEffect(() => {
        if (!isHovering) {
            const timer = setInterval(() => {
                setDirection(1)
                setCurrentSlide((prev) => (prev + 1) % slides.length)
            }, 4500)
            return () => clearInterval(timer)
        }
    }, [isHovering, slides.length])

    const nextSlide = () => {
        setDirection(1)
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setDirection(-1)
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

    const goToSlide = (index) => {
        setDirection(index > currentSlide ? 1 : -1)
        setCurrentSlide(index)
    }

    const dessertKeys = ['pumpkin', 'lemon', 'truffle', 'caramel']
    const currentIndex = dessertKeys.indexOf(activeDessert)
    const nextDessert = dessertKeys[(currentIndex + 1) % dessertKeys.length]

    // Render particles based on drink type
    const renderParticles = (type) => {
        const particles = []
        const count = type === 'coffee' ? 8 : type === 'leaf' ? 6 : 10
        
        for (let i = 0; i < count; i++) {
            const delay = Math.random() * 3
            const duration = 3 + Math.random() * 2
            const size = 8 + Math.random() * 12
            const x = -40 + Math.random() * 80
            const y = -30 + Math.random() * 60
            const animation = i % 3 === 0 ? 'particleFloat1' : i % 3 === 1 ? 'particleFloat2' : 'particleFloat3'
            
            let className = 'particle '
            if (type === 'coffee') {
                className += 'particle-coffee'
            } else if (type === 'leaf') {
                className += 'particle-leaf'
            } else {
                className += 'particle-bubble'
            }
            
            particles.push(
                <div
                    key={i}
                    className={className}
                    style={{
                        left: `${50 + x}%`,
                        top: `${50 + y}%`,
                        width: size,
                        height: size,
                        animation: `${animation} ${duration}s ease-in-out ${delay}s infinite`,
                        position: 'absolute',
                        pointerEvents: 'none',
                        willChange: 'transform, opacity'
                    }}
                />
            )
        }
        
        // Add sparkles
        for (let i = 0; i < 4; i++) {
            const delay = Math.random() * 4
            const size = 3 + Math.random() * 4
            const x = -30 + Math.random() * 60
            const y = -20 + Math.random() * 40
            
            particles.push(
                <div
                    key={`sparkle-${i}`}
                    className="particle particle-sparkle"
                    style={{
                        left: `${50 + x}%`,
                        top: `${50 + y}%`,
                        width: size,
                        height: size,
                        animation: `sparkle ${2 + Math.random()}s ease-in-out ${delay}s infinite`,
                        position: 'absolute',
                        pointerEvents: 'none',
                        willChange: 'transform, opacity'
                    }}
                />
            )
        }
        
        return particles
    }

    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
                    @import url('https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');
                    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
                    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap');
                    
                    *{ font-family: "Geist", sans-serif; }
                    h1{ font-family: "Urbanist", sans-serif; }
                    .script-font { font-family: "Dancing Script", cursive; }
                    .handwritten { font-family: "Caveat", cursive; }
                    
                    .sticky-note {
                        transform: rotate(-1.5deg);
                        box-shadow: 0 8px 24px rgba(0,0,0,0.06);
                        border: 1px solid rgba(255,255,255,0.8);
                    }
                    
                    .sticky-note::before {
                        content: '📌';
                        position: absolute;
                        top: -12px;
                        left: 30px;
                        font-size: 20px;
                    }
                    
                    .craving-text {
                        font-family: "Dancing Script", cursive;
                        background: linear-gradient(135deg, #d4a373, #cc8e5a);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        text-shadow: none;
                    }
                    
                    .card-hover {
                        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    }
                    
                    .card-hover:hover {
                        transform: translateY(-6px) scale(1.01);
                        box-shadow: 0 20px 40px rgba(0,0,0,0.08);
                    }
                    
                    .dessert-tab {
                        transition: all 0.3s ease;
                        border: 1px solid transparent;
                    }
                    
                    .dessert-tab:hover {
                        border-color: rgba(212, 163, 115, 0.3);
                        background: rgba(212, 163, 115, 0.05);
                    }
                    
                    .dessert-tab.active {
                        background: rgba(212, 163, 115, 0.12);
                        border-color: #d4a373;
                        color: #8b6b4a;
                    }
                    
                    .new-card {
                        transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    }
                    
                    .new-card:hover {
                        transform: translateY(-8px);
                        box-shadow: 0 20px 40px rgba(0,0,0,0.08);
                    }
                    
                    .new-card .card-image {
                        transition: all 0.6s ease;
                    }
                    
                    .new-card:hover .card-image {
                        transform: scale(1.05);
                    }
                    
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-6px); }
                    }
                    
                    .float-animation {
                        animation: float 3s ease-in-out infinite;
                    }
                    
                    /* Offer Banner Animations */
                    @keyframes marquee {
                        0% { transform: translateX(0%); }
                        100% { transform: translateX(-50%); }
                    }
                    
                    @keyframes pulseGlow {
                        0%, 100% { opacity: 0.6; }
                        50% { opacity: 1; }
                    }
                    
                    .marquee-track {
                        animation: marquee 25s linear infinite;
                    }
                    
                    .marquee-track:hover {
                        animation-play-state: paused;
                    }
                    
                    .offer-banner {
                        background: linear-gradient(135deg, #2d1f14 0%, #4a3228 100%);
                        box-shadow: 0 4px 20px rgba(45, 31, 20, 0.2);
                    }
                    
                    .offer-text {
                        font-family: "Caveat", cursive;
                        letter-spacing: 0.5px;
                    }
                    
                    .offer-highlight {
                        position: relative;
                        display: inline-block;
                    }
                    
                    .offer-highlight::after {
                        content: '';
                        position: absolute;
                        bottom: 2px;
                        left: 0;
                        width: 100%;
                        height: 3px;
                        background: linear-gradient(90deg, #d4a373, #f5d6b3);
                        border-radius: 2px;
                        opacity: 0.6;
                    }
                    
                    @keyframes shimmer {
                        0% { background-position: -200% center; }
                        100% { background-position: 200% center; }
                    }
                    
                    .shimmer-text {
                        background: linear-gradient(90deg, #d4a373, #f5d6b3, #d4a373);
                        background-size: 200% auto;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        animation: shimmer 4s linear infinite;
                    }

                    /* Premium 3D Product Styles */
                    .perspective-container {
                        perspective: 1200px;
                        perspective-origin: 50% 45%;
                    }

                    .product-3d-wrapper {
                        transform-style: preserve-3d;
                        will-change: transform;
                    }

                    /* Glow colors per drink */
                    .glow-coffee {
                        background: radial-gradient(ellipse at center, rgba(212, 163, 115, 0.4) 0%, rgba(212, 163, 115, 0.1) 40%, transparent 70%);
                    }

                    .glow-matcha {
                        background: radial-gradient(ellipse at center, rgba(52, 211, 153, 0.35) 0%, rgba(52, 211, 153, 0.08) 40%, transparent 70%);
                    }

                    .glow-tea {
                        background: radial-gradient(ellipse at center, rgba(251, 146, 60, 0.3) 0%, rgba(251, 146, 60, 0.08) 40%, transparent 70%);
                    }

                    /* Light rays */
                    .light-rays {
                        position: absolute;
                        inset: -50%;
                        background: conic-gradient(from 0deg at 50% 50%, 
                            transparent 0deg, 
                            rgba(255, 255, 255, 0.05) 10deg, 
                            transparent 20deg,
                            rgba(255, 255, 255, 0.03) 30deg,
                            transparent 40deg,
                            rgba(255, 255, 255, 0.06) 50deg,
                            transparent 60deg,
                            rgba(255, 255, 255, 0.04) 70deg,
                            transparent 80deg,
                            rgba(255, 255, 255, 0.05) 90deg,
                            transparent 100deg,
                            rgba(255, 255, 255, 0.03) 110deg,
                            transparent 120deg,
                            rgba(255, 255, 255, 0.04) 130deg,
                            transparent 140deg,
                            rgba(255, 255, 255, 0.05) 150deg,
                            transparent 160deg,
                            rgba(255, 255, 255, 0.03) 170deg,
                            transparent 180deg,
                            rgba(255, 255, 255, 0.04) 190deg,
                            transparent 200deg,
                            rgba(255, 255, 255, 0.05) 210deg,
                            transparent 220deg,
                            rgba(255, 255, 255, 0.03) 230deg,
                            transparent 240deg,
                            rgba(255, 255, 255, 0.04) 250deg,
                            transparent 260deg,
                            rgba(255, 255, 255, 0.05) 270deg,
                            transparent 280deg,
                            rgba(255, 255, 255, 0.03) 290deg,
                            transparent 300deg,
                            rgba(255, 255, 255, 0.04) 310deg,
                            transparent 320deg,
                            rgba(255, 255, 255, 0.05) 330deg,
                            transparent 340deg,
                            rgba(255, 255, 255, 0.03) 350deg,
                            transparent 360deg
                        );
                        animation: rotateRays 20s linear infinite;
                        opacity: 0.5;
                        pointer-events: none;
                    }

                    @keyframes rotateRays {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }

                    /* Floating animation */
                    @keyframes float3D {
                        0%, 100% { 
                            transform: translateY(0px) rotateX(0deg) rotateY(0deg);
                        }
                        25% { 
                            transform: translateY(-12px) rotateX(1deg) rotateY(2deg);
                        }
                        50% { 
                            transform: translateY(-18px) rotateX(-1deg) rotateY(1deg);
                        }
                        75% { 
                            transform: translateY(-8px) rotateX(1.5deg) rotateY(-1deg);
                        }
                    }

                    @keyframes floatShadow {
                        0%, 100% { 
                            transform: scale(1) translateY(0px);
                            opacity: 0.6;
                        }
                        50% { 
                            transform: scale(0.85) translateY(15px);
                            opacity: 0.25;
                        }
                    }

                    @keyframes particleFloat1 {
                        0%, 100% { transform: translateY(0) translateX(0) rotate(0deg) scale(1); opacity: 0.6; }
                        50% { transform: translateY(-40px) translateX(20px) rotate(180deg) scale(1.3); opacity: 1; }
                    }

                    @keyframes particleFloat2 {
                        0%, 100% { transform: translateY(0) translateX(0) rotate(0deg) scale(1); opacity: 0.4; }
                        50% { transform: translateY(-30px) translateX(-25px) rotate(-120deg) scale(1.2); opacity: 0.9; }
                    }

                    @keyframes particleFloat3 {
                        0%, 100% { transform: translateY(0) translateX(0) rotate(0deg) scale(1); opacity: 0.5; }
                        50% { transform: translateY(-50px) translateX(15px) rotate(240deg) scale(1.4); opacity: 0.8; }
                    }

                    @keyframes sparkle {
                        0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
                        50% { opacity: 1; transform: scale(1) rotate(180deg); }
                    }

                    /* Premium shadow layers */
                    .shadow-premium {
                        filter: drop-shadow(0 30px 40px rgba(0,0,0,0.08)) 
                                drop-shadow(0 15px 25px rgba(0,0,0,0.05))
                                drop-shadow(0 5px 10px rgba(0,0,0,0.03));
                    }

                    /* Glass reflection */
                    .glass-reflection {
                        position: absolute;
                        inset: 0;
                        background: linear-gradient(135deg, 
                            rgba(255,255,255,0.4) 0%, 
                            rgba(255,255,255,0) 30%,
                            rgba(255,255,255,0) 70%,
                            rgba(255,255,255,0.1) 100%
                        );
                        pointer-events: none;
                        border-radius: inherit;
                        mix-blend-mode: overlay;
                    }

                    .glass-reflection::after {
                        content: '';
                        position: absolute;
                        top: 10%;
                        left: 15%;
                        width: 30%;
                        height: 20%;
                        background: linear-gradient(135deg, 
                            rgba(255,255,255,0.6) 0%, 
                            rgba(255,255,255,0) 100%
                        );
                        border-radius: 50%;
                        filter: blur(1px);
                        transform: rotate(-15deg);
                    }

                    /* Cinema shadow under product */
                    .shadow-3d {
                        position: absolute;
                        bottom: -30px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 70%;
                        height: 30px;
                        border-radius: 50%;
                        background: radial-gradient(ellipse at center, 
                            rgba(0,0,0,0.25) 0%, 
                            rgba(0,0,0,0.1) 40%, 
                            transparent 70%
                        );
                        filter: blur(8px);
                        animation: floatShadow 4s ease-in-out infinite;
                        pointer-events: none;
                    }

                    .shadow-3d::after {
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 120%;
                        height: 200%;
                        background: radial-gradient(ellipse at center, 
                            rgba(0,0,0,0.1) 0%, 
                            transparent 70%
                        );
                        filter: blur(15px);
                    }

                    /* Particle styles */
                    .particle {
                        position: absolute;
                        pointer-events: none;
                        will-change: transform, opacity;
                    }

                    .particle-coffee {
                        width: 12px;
                        height: 16px;
                        background: radial-gradient(ellipse at 40% 40%, #5a3a2a, #2d1a0e);
                        border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    }

                    .particle-leaf {
                        width: 14px;
                        height: 20px;
                        background: linear-gradient(135deg, #4a9e6b, #2d7a4e);
                        border-radius: 0% 100% 50% 50% / 100% 50% 50% 0%;
                        transform: rotate(20deg);
                        box-shadow: 0 2px 6px rgba(45, 122, 78, 0.3);
                    }

                    .particle-bubble {
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.1));
                        border: 1px solid rgba(255,255,255,0.3);
                        box-shadow: inset 0 -2px 4px rgba(0,0,0,0.05);
                    }

                    .particle-sparkle {
                        width: 4px;
                        height: 4px;
                        background: white;
                        border-radius: 50%;
                        box-shadow: 0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4);
                        animation: sparkle 2s ease-in-out infinite;
                    }

                    /* Hover state for product */
                    .product-hover-scale {
                        transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
                    }

                    .product-hover-scale:hover {
                        transform: scale(1.08) translateY(-8px) rotateX(2deg) rotateY(4deg);
                    }

                    .product-hover-scale:hover .shadow-3d {
                        transform: translateX(-50%) scale(0.7);
                        opacity: 0.3;
                        transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
                    }
                `}
            </style>

            {/* Hero Section */}
           {/* Hero Section - Updated with proper background */}
<main 
    className="w-full h-screen bg-gradient-to-b from-[#faf6f0] to-white overflow-hidden relative perspective-container"
    onMouseEnter={() => setIsHovering(true)}
    onMouseLeave={() => setIsHovering(false)}
>
    <div className="absolute inset-0">
        <AnimatePresence mode="wait" custom={direction}>
            <motion.div
                key={currentSlide}
                custom={direction}
                initial={{ 
                    opacity: 0, 
                    scale: 0.92,
                    rotateY: direction > 0 ? 12 : -12,
                    z: -80
                }}
                animate={{ 
                    opacity: 1, 
                    scale: 1,
                    rotateY: 0,
                    z: 0,
                    transition: {
                        duration: 1.4,
                        ease: [0.34, 1.56, 0.64, 1],
                        opacity: { duration: 0.8 }
                    }
                }}
                exit={{ 
                    opacity: 0, 
                    scale: 0.88,
                    rotateY: direction > 0 ? -12 : 12,
                    z: -60,
                    transition: {
                        duration: 0.8,
                        ease: [0.36, 0.07, 0.19, 0.97]
                    }
                }}
                className="absolute inset-0 flex items-center justify-center product-3d-wrapper"
            >
                {/* Background with gradient */}
                <div className={`absolute inset-0 bg-gradient-to-b ${slides[currentSlide].bgColor}`} />
                
                <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 flex flex-col items-center justify-center min-h-screen">
                    <motion.h1
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ 
                            delay: 0.3, 
                            duration: 0.9,
                            ease: [0.34, 1.56, 0.64, 1]
                        }}
                        className="text-5xl md:text-7xl lg:text-8xl font-light text-[#2d1f14] tracking-wide mb-8 md:mb-12 text-center"
                    >
                        {slides[currentSlide].name}
                    </motion.h1>

                    <motion.div
                        initial={{ 
                            scale: 0.7, 
                            opacity: 0,
                            rotateY: 30,
                            z: -50
                        }}
                        animate={{ 
                            scale: 1, 
                            opacity: 1,
                            rotateY: 0,
                            z: 0,
                            transition: {
                                duration: 1.4,
                                ease: [0.34, 1.56, 0.64, 1],
                                opacity: { duration: 0.8 }
                            }
                        }}
                        whileHover={{
                            scale: 1.05,
                            rotateY: 5,
                            rotateX: 3,
                            z: 30,
                            transition: {
                                duration: 0.4,
                                ease: [0.34, 1.56, 0.64, 1]
                            }
                        }}
                        className="relative flex items-center justify-center w-full max-w-2xl cursor-pointer product-hover-scale"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* Light Rays Background */}
                        <div className="absolute inset-0 light-rays" />
                        
                        {/* Colored Glow - Increased opacity and size */}
                        <div className={`absolute inset-0 ${slides[currentSlide].glowClass} rounded-full scale-150 blur-3xl opacity-70`} />
                        
                        {/* Shadow layer for 3D effect */}
                        <div 
                            className="absolute inset-0 flex items-center justify-center blur-2xl opacity-30"
                            style={{ 
                                transform: 'translateZ(-50px) translateY(20px)',
                                background: 'radial-gradient(circle, rgba(45,31,20,0.3) 0%, transparent 70%)'
                            }}
                        />
                        
                        {/* Floating Particles */}
                        <div className="absolute inset-0 pointer-events-none">
                            {renderParticles(slides[currentSlide].particleType)}
                        </div>
                        
                        {/* Splash Image - Increased opacity and added blend mode */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <img
                                src={slides[currentSlide].splashImage}
                                alt={`${slides[currentSlide].name} splash`}
                                className="w-[300px] md:w-[400px] lg:w-[500px] object-contain opacity-70"
                                style={{ 
                                    transform: 'translateZ(-20px)',
                                    filter: 'blur(1px)',
                                    mixBlendMode: 'screen'
                                }}
                            />
                        </div>
                        
                        {/* Cup Image */}
                        <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
                            <motion.img
                                src={slides[currentSlide].cupImage}
                                alt={slides[currentSlide].name}
                                className="w-[200px] md:w-[280px] lg:w-[350px] object-contain"
                                style={{ 
                                    mixBlendMode: 'multiply',
                                    filter: 'drop-shadow(0 20px 30px rgba(45,31,20,0.2)) drop-shadow(0 8px 15px rgba(45,31,20,0.1))'
                                }}
                                whileHover={{
                                    scale: 1.08,
                                    rotate: 2,
                                    transition: {
                                        duration: 0.4,
                                        ease: [0.34, 1.56, 0.64, 1]
                                    }
                                }}
                            />
                            
                            {/* Glass Reflection Overlay */}
                            <div className="glass-reflection" />
                        </div>
                        
                        {/* Cinema Shadow */}
                        <div className="shadow-3d" />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ 
                            delay: 0.6, 
                            duration: 0.8,
                            ease: [0.34, 1.56, 0.64, 1]
                        }}
                        className="text-[#8b7355] text-sm md:text-base font-light mt-8 md:mt-12 tracking-wider"
                    >
                        {slides[currentSlide].description}
                    </motion.p>
                </div>
            </motion.div>
        </AnimatePresence>
    </div>

    {/* Navigation Arrows */}
    <div className={`absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 md:px-8 z-40 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
        <motion.button 
            onClick={prevSlide} 
            className="p-3 md:p-4 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-md hover:shadow-xl transition-all duration-300"
            whileHover={{ 
                scale: 1.15,
                x: -5,
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
            }}
            whileTap={{ scale: 0.9 }}
        >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-[#2d1f14]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
        </motion.button>
        <motion.button 
            onClick={nextSlide} 
            className="p-3 md:p-4 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-md hover:shadow-xl transition-all duration-300"
            whileHover={{ 
                scale: 1.15,
                x: 5,
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
            }}
            whileTap={{ scale: 0.9 }}
        >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-[#2d1f14]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
        </motion.button>
    </div>

    {/* Slide Indicators */}
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, index) => (
            <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-500 rounded-full ${
                    currentSlide === index 
                        ? 'w-8 h-1.5 bg-[#2d1f14] shadow-lg' 
                        : 'w-1.5 h-1.5 bg-[#2d1f14]/30 hover:bg-[#2d1f14]/50'
                }`}
                whileHover={{ 
                    scale: currentSlide === index ? 1 : 1.5,
                    transition: { duration: 0.2 }
                }}
            />
        ))}
    </div>
</main>

            {/* ===== OFFER BANNER - NEW SECTION ===== */}
            <section className="offer-banner py-4 md:py-5 overflow-hidden relative">
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-[#d4a373] rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#f5d6b3] rounded-full blur-3xl" />
                </div>
                
                {/* Left decorative coffee icon */}
                <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-2xl md:text-3xl opacity-30 float-animation">
                    ☕
                </div>
                
                {/* Right decorative coffee icon */}
                <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-2xl md:text-3xl opacity-30 float-animation" style={{ animationDelay: '1.5s' }}>
                    ☕
                </div>
                

                {/* Marquee Container */}
                <div className="relative overflow-hidden">
                    <div className="marquee-track flex whitespace-nowrap">
                        {/* First set */}
                        <div className="flex items-center gap-8 md:gap-12 px-4">
                            <span className="text-white/20 text-2xl">✨</span>
                            <span className="offer-text text-white/90 text-base md:text-lg lg:text-xl font-light tracking-wide">
                                <span className="offer-highlight shimmer-text font-medium">Buy 10 Coffees</span>
                                <span className="text-white/70 mx-2">•</span>
                                <span className="text-white/90">Get</span>
                                <span className="offer-highlight shimmer-text font-medium ml-1">1 FREE</span>
                                <span className="text-white/50 ml-2 text-sm">☕</span>
                            </span>
                            <span className="text-white/20 text-2xl">✨</span>
                            <span className="offer-text text-white/70 text-sm md:text-base font-light">
                                <span className="text-[#d4a373]">❤️</span>
                                Our way of saying thank you 
                                <span className="text-[#d4a373] ml-1">❤️</span>
                            </span>
                            <span className="text-white/20 text-2xl">✨</span>
                            <span className="offer-text text-white/90 text-base md:text-lg lg:text-xl font-light tracking-wide">
                                <span className="offer-highlight shimmer-text font-medium">Buy 10 Coffees</span>
                                <span className="text-white/70 mx-2">•</span>
                                <span className="text-white/90">Get</span>
                                <span className="offer-highlight shimmer-text font-medium ml-1">1 FREE</span>
                                <span className="text-white/50 ml-2 text-sm">☕</span>
                            </span>
                            <span className="text-white/20 text-2xl">✨</span>
                            <span className="offer-text text-white/70 text-sm md:text-base font-light">
                                <span className="text-[#d4a373]">❤️</span>
                                Our way of saying thank you 
                                <span className="text-[#d4a373] ml-1">❤️</span>
                            </span>
                            <span className="text-white/20 text-2xl">✨</span>
                        </div>
                        {/* Duplicate for seamless loop */}
                        <div className="flex items-center gap-8 md:gap-12 px-4">
                            <span className="text-white/20 text-2xl">✨</span>
                            <span className="offer-text text-white/90 text-base md:text-lg lg:text-xl font-light tracking-wide">
                                <span className="offer-highlight shimmer-text font-medium">Buy 10 Coffees</span>
                                <span className="text-white/70 mx-2">•</span>
                                <span className="text-white/90">Get</span>
                                <span className="offer-highlight shimmer-text font-medium ml-1">1 FREE</span>
                                <span className="text-white/50 ml-2 text-sm">☕</span>
                            </span>
                            <span className="text-white/20 text-2xl">✨</span>
                            <span className="offer-text text-white/70 text-sm md:text-base font-light">
                                <span className="text-[#d4a373]">❤️</span>
                                Our way of saying thank you 
                                <span className="text-[#d4a373] ml-1">❤️</span>
                            </span>
                            <span className="text-white/20 text-2xl">✨</span>
                        </div>
                    </div>
                </div>

                {/* Small decorative elements */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
                    <span className="w-1 h-1 rounded-full bg-[#d4a373]/30"></span>
                    <span className="w-1 h-1 rounded-full bg-[#d4a373]/20"></span>
                    <span className="w-1 h-1 rounded-full bg-[#d4a373]/30"></span>
                </div>
            </section>

            {/* What Are You Craving For Section */}
            <section className="py-20 bg-gradient-to-br from-[#faf0e6] to-[#f5e6d3]">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl lg:text-7xl craving-text mb-2">
                            What Are You Craving For ???
                        </h2>
                        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#d4a373] to-transparent mx-auto mt-4"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                        {/* Left Column - Cozy Tale */}
                        <div className="relative">
                            <div className="relative bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-2xl sticky-note">
                                <div className="absolute -top-3 -right-3 text-3xl float-animation">☕</div>
                                <h3 className="text-3xl md:text-4xl font-light text-[#2d1f14] mb-4 handwritten">
                                    The Cozy Tale
                                </h3>
                                <p className="text-[#5c4a3a] leading-relaxed text-sm md:text-base font-light">
                                    At our café, we believe every sip and bite should feel like a warm hug. 
                                    From rich, aromatic coffees to freshly baked desserts made with love, 
                                    we create a cozy space where flavor meets comfort. Whether you're here 
                                    to unwind, connect, or simply indulge, our goal is to make every visit 
                                    a little sweeter.
                                </p>
                                <div className="mt-4 flex items-center gap-2 text-[#d4a373] text-sm">
                                    <span>— with love, from our kitchen to yours</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Click Cards */}
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={() => document.getElementById('newly-launched').scrollIntoView({ behavior: 'smooth' })}
                                className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 card-hover border border-white/50"
                            >
                                <div className="text-center">
                                    <div className="text-5xl mb-3 float-animation">🍰</div>
                                    <p className="text-sm text-[#5c4a3a] font-light">Click For</p>
                                    <p className="text-xl font-medium text-[#8b6b4a]">Desserts</p>
                                    <div className="mt-3 flex items-center justify-center gap-1 text-[#d4a373] group-hover:gap-3 transition-all duration-300">
                                        <span className="text-xl">→</span>
                                        <span className="text-xl">→</span>
                                    </div>
                                </div>
                            </button>

                            <button 
                                onClick={() => document.getElementById('hero').scrollIntoView({ behavior: 'smooth' })}
                                className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 card-hover border border-white/50"
                            >
                                <div className="text-center">
                                    <div className="text-5xl mb-3 float-animation">☕</div>
                                    <p className="text-sm text-[#5c4a3a] font-light">Click For</p>
                                    <p className="text-xl font-medium text-[#8b6b4a]">Coffee</p>
                                    <div className="mt-3 flex items-center justify-center gap-1 text-[#d4a373] group-hover:gap-3 transition-all duration-300">
                                        <span className="text-xl">→</span>
                                        <span className="text-xl">→</span>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newly Launched Section */}
            <section id="newly-launched" className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="flex items-center justify-center gap-3 mb-12">
                        <span className="text-3xl">✨</span>
                        <h2 className="text-3xl md:text-4xl font-light text-[#2d1f14] text-center handwritten">
                            Newly Launched
                        </h2>
                        <span className="text-3xl">✨</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {newItems.map((item, index) => (
                            <div 
                                key={index} 
                                className="new-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-[#f0e6d8] group"
                                onMouseEnter={() => setHoveredCard(index)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <div className="relative h-52 overflow-hidden">
                                    <img 
                                        src={item.image} 
                                        alt={item.name}
                                        className="card-image w-full h-full object-cover"
                                    />
                                    <div className="absolute top-3 right-3 text-2xl bg-white/80 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center shadow-sm">
                                        {item.emoji}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-medium text-[#2d1f14] mb-2">{item.name}</h3>
                                    <p className="text-sm text-[#5c4a3a] leading-relaxed mb-3 line-clamp-2 font-light">
                                        {item.description}
                                    </p>
                                    <p className="text-sm font-medium text-[#8b6b4a]">Price: {item.price}</p>
                                    <div className="mt-3 pt-3 border-t border-[#f0e6d8] flex items-center justify-between">
                                        <span className="text-xs text-[#d4a373]">✨ new</span>
                                        <button className="text-xs text-[#8b6b4a] hover:text-[#d4a373] transition flex items-center gap-1">
                                            Order now →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pumpkin Spice / Desserts Section */}
            <section className="py-20 bg-[#faf0e6]">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
                        {dessertKeys.map((key) => (
                            <button
                                key={key}
                                onClick={() => setActiveDessert(key)}
                                className={`dessert-tab px-5 md:px-7 py-2.5 rounded-full text-sm font-light transition-all duration-300 ${
                                    activeDessert === key
                                        ? 'active text-[#8b6b4a] shadow-sm'
                                        : 'text-[#5c4a3a] hover:text-[#2d1f14]'
                                }`}
                            >
                                <span className="mr-2">{desserts[key].emoji}</span>
                                {desserts[key].name}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeDessert}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                            className="bg-white rounded-3xl overflow-hidden shadow-xl warm-shadow"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                                <div className="relative h-80 md:h-full overflow-hidden">
                                    <img 
                                        src={desserts[activeDessert].image}
                                        alt={desserts[activeDessert].name}
                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    <div className="absolute bottom-4 left-4 text-white/80 text-sm font-light">
                                        {desserts[activeDessert].emoji} 
                                    </div>
                                </div>

                                <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-[#fdf8f3] to-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-3xl">{desserts[activeDessert].emoji}</span>
                                        <h3 className="text-2xl md:text-3xl font-light text-[#2d1f14]">
                                            {desserts[activeDessert].name}
                                        </h3>
                                    </div>
                                    <div className="w-12 h-0.5 bg-[#d4a373] mb-4"></div>
                                    <p className="text-[#5c4a3a] leading-relaxed text-sm md:text-base font-light mb-4">
                                        {desserts[activeDessert].description}
                                    </p>
                                    <p className="text-lg font-medium text-[#8b6b4a]">
                                        {desserts[activeDessert].price}
                                    </p>
                                    
                                    <div className="mt-6 flex items-center gap-4 pt-4 border-t border-[#f0e6d8]">
                                        <button 
                                            onClick={() => setActiveDessert(nextDessert)}
                                            className="group flex items-center gap-2 text-sm text-[#8b6b4a] hover:text-[#d4a373] transition"
                                        >
                                            <span>Click for</span>
                                            <span className="font-medium">
                                                {desserts[nextDessert].name}
                                            </span>
                                            <span className="group-hover:translate-x-1 transition-transform text-lg">→</span>
                                        </button>
                                        <span className="text-[#d4a373] text-xs">✨</span>
                                        <button 
                                            onClick={() => {
                                                const prev = dessertKeys[(currentIndex - 1 + dessertKeys.length) % dessertKeys.length]
                                                setActiveDessert(prev)
                                            }}
                                            className="group flex items-center gap-2 text-sm text-[#8b6b4a] hover:text-[#d4a373] transition"
                                        >
                                            <span className="group-hover:-translate-x-1 transition-transform text-lg">←</span>
                                            <span className="font-medium">
                                                {desserts[dessertKeys[(currentIndex - 1 + dessertKeys.length) % dessertKeys.length]].name}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>
        </>
    )
}

export default Home