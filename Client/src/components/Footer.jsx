import React from 'react'

const Footer = () => {
    return (
        <footer className='bg-[#2d1f14] pt-12 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8 border-t border-[#4a3228]'>
            <div className='w-full max-w-7xl mx-auto'>

                {/* Main Footer Grid - Fully Responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">

                    {/* Brand - Full width on mobile, spans 2 cols on tablet */}
                    <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col items-center sm:items-start text-center sm:text-left">
                        <a href="/">
                            <h2 className='text-xl sm:text-2xl font-light text-[#f5e6d3] hover:text-[#d4a373] transition-colors'>
                                Mokshya's <span className="text-[#d4a373]">Cafe</span>
                            </h2>
                        </a>
                        <div className='w-12 h-0.5 bg-[#d4a373] mt-3 sm:mt-4 mb-3 sm:mb-4'></div>
                        <p className='text-xs sm:text-sm text-[#c4b5a5] leading-relaxed max-w-sm font-light'>
                            Every sip, every bite — crafted with love. A cozy corner 
                            where flavors meet comfort and every visit feels like home.
                        </p>
                        {/* Decorative coffee icon - hidden on very small screens */}
                        <span className="text-2xl mt-4 opacity-30 float-animation hidden xs:block">☕</span>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <h3 className='text-xs sm:text-sm font-medium text-[#f5e6d3] tracking-wider uppercase'>
                            Explore
                        </h3>
                        <div className='w-8 h-0.5 bg-[#d4a373] mt-2 sm:mt-3 mb-4 sm:mb-5'></div>
                        <div className="flex flex-col gap-2 sm:gap-2.5">
                            <a href="/" className='text-xs sm:text-sm text-[#c4b5a5] hover:text-[#d4a373] transition-colors font-light'>
                                Home
                            </a>
                            <a href="/menu" className='text-xs sm:text-sm text-[#c4b5a5] hover:text-[#d4a373] transition-colors font-light'>
                                Menu
                            </a>
                            <a href="#" className='text-xs sm:text-sm text-[#c4b5a5] hover:text-[#d4a373] transition-colors font-light'>
                                About Us
                            </a>
                            <a href="#" className='text-xs sm:text-sm text-[#c4b5a5] hover:text-[#d4a373] transition-colors font-light'>
                                Gallery
                            </a>
                            <a href="#" className='text-xs sm:text-sm text-[#c4b5a5] hover:text-[#d4a373] transition-colors font-light'>
                                Contact
                            </a>
                        </div>
                    </div>

                    {/* Social & Contact */}
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <h3 className='text-xs sm:text-sm font-medium text-[#f5e6d3] tracking-wider uppercase'>
                            Connect
                        </h3>
                        <div className='w-8 h-0.5 bg-[#d4a373] mt-2 sm:mt-3 mb-4 sm:mb-5'></div>
                        <div className="flex flex-col gap-2 sm:gap-2.5">
                            <a href="#" className='text-xs sm:text-sm text-[#c4b5a5] hover:text-[#d4a373] transition-colors font-light flex items-center gap-2'>
                                <span className="text-sm">📸</span> 
                                <span className="hidden xs:inline">Instagram</span>
                                <span className="xs:hidden">IG</span>
                            </a>
                            <a href="#" className='text-xs sm:text-sm text-[#c4b5a5] hover:text-[#d4a373] transition-colors font-light flex items-center gap-2'>
                                <span className="text-sm">👍</span> 
                                <span className="hidden xs:inline">Facebook</span>
                                <span className="xs:hidden">FB</span>
                            </a>
                            <a href="#" className='text-xs sm:text-sm text-[#c4b5a5] hover:text-[#d4a373] transition-colors font-light flex items-center gap-2'>
                                <span className="text-sm">🐦</span> 
                                <span className="hidden xs:inline">Twitter / X</span>
                                <span className="xs:hidden">X</span>
                            </a>
                            <a href="#" className='text-xs sm:text-sm text-[#c4b5a5] hover:text-[#d4a373] transition-colors font-light flex items-center gap-2'>
                                <span className="text-sm">📱</span> 
                                <span className="hidden xs:inline">TikTok</span>
                                <span className="xs:hidden">TT</span>
                            </a>
                        </div>
                    </div>

                    {/* Visit Us */}
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <h3 className='text-xs sm:text-sm font-medium text-[#f5e6d3] tracking-wider uppercase'>
                            Visit Us
                        </h3>
                        <div className='w-8 h-0.5 bg-[#d4a373] mt-2 sm:mt-3 mb-4 sm:mb-5'></div>
                        <div className="flex flex-col gap-2 sm:gap-2.5">
                            <p className='text-xs sm:text-sm text-[#c4b5a5] font-light flex items-center gap-2'>
                                <span className="text-[#d4a373] text-sm">📍</span> 
                                <span className="text-left">Kathmandu, Nepal</span>
                            </p>
                            <a href="tel:+9779801234567" className='text-xs sm:text-sm text-[#c4b5a5] hover:text-[#d4a373] transition-colors font-light flex items-center gap-2'>
                                <span className="text-[#d4a373] text-sm">📞</span> 
                                <span className="text-left">+977 9801234567</span>
                            </a>
                            <a href="mailto:hello@Mokshyascafe.com" className='text-xs sm:text-sm text-[#c4b5a5] hover:text-[#d4a373] transition-colors font-light flex items-center gap-2'>
                                <span className="text-[#d4a373] text-sm">✉️</span> 
                                <span className="text-left text-xs sm:text-sm break-all">hello@cafe.com</span>
                            </a>
                            <p className='text-xs sm:text-sm text-[#c4b5a5] font-light flex items-center gap-2'>
                                <span className="text-[#d4a373] text-sm">🕐</span> 
                                <span className="text-left">7AM – 9PM Daily</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Decorative Divider */}
                <div className='relative w-full mt-10 sm:mt-12 mb-6'>
                    <div className='w-full h-px bg-gradient-to-r from-transparent via-[#d4a373]/30 to-transparent'></div>
                    {/* Decorative dot in center */}
                    <div className='absolute left-1/2 -translate-x-1/2 -top-1.5'>
                        <span className="text-[#d4a373] text-[10px] sm:text-xs">✦</span>
                    </div>
                </div>

                {/* Bottom Bar - Fully Responsive */}
                <div className="flex flex-col xs:flex-row flex-wrap items-center justify-center xs:justify-between gap-3 sm:gap-4 pt-1 sm:pt-2">
                    
                    {/* Copyright - Full width on very small screens */}
                    <p className='text-[10px] sm:text-xs text-[#8b6b4a] font-light tracking-wide text-center xs:text-left order-2 xs:order-1'>
                        © 2025 Mokshya's Cafe. All rights reserved.
                    </p>
                    
                    {/* Legal Links - Wrap on small screens */}
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs order-3 xs:order-2">
                        <a href='#' className='text-[#8b6b4a] hover:text-[#d4a373] transition-colors font-light tracking-wide whitespace-nowrap'>
                            Terms
                        </a>
                        <span className='w-px h-3 bg-[#4a3228]'></span>
                        <a href='#' className='text-[#8b6b4a] hover:text-[#d4a373] transition-colors font-light tracking-wide whitespace-nowrap'>
                            Privacy
                        </a>
                        <span className='w-px h-3 bg-[#4a3228]'></span>
                        <a href='#' className='text-[#8b6b4a] hover:text-[#d4a373] transition-colors font-light tracking-wide whitespace-nowrap'>
                            Cookies
                        </a>
                    </div>
                    
                    {/* Made with love - Hidden on very small screens */}
                    <p className='text-[10px] text-[#4a3228] font-light tracking-wider flex items-center gap-1 order-1 xs:order-3 w-full xs:w-auto justify-center'>
                        Made with <span className="text-[#d4a373] text-xs">❤️</span> 
                        <span className="hidden xs:inline">for coffee lovers</span>
                        <span className="xs:hidden">☕</span>
                    </p>
                </div>

                {/* Mobile bottom note - Extra small screens */}
                <div className="mt-4 pt-4 border-t border-[#4a3228] text-center xs:hidden">
                    <p className='text-[8px] text-[#4a3228] font-light tracking-wider'>
                        Crafted with passion for the perfect cup
                    </p>
                </div>
            </div>

            {/* Add extra small screen breakpoint */}
            <style>{`
                @media (min-width: 480px) {
                    .xs\\:block { display: block; }
                    .xs\\:inline { display: inline; }
                    .xs\\:hidden { display: none; }
                    .xs\\:flex-row { flex-direction: row; }
                    .xs\\:text-left { text-align: left; }
                    .xs\\:order-1 { order: 1; }
                    .xs\\:order-2 { order: 2; }
                    .xs\\:order-3 { order: 3; }
                    .xs\\:w-auto { width: auto; }
                    .xs\\:justify-between { justify-content: space-between; }
                }
                @media (max-width: 479px) {
                    .xs\\:block { display: none; }
                    .xs\\:inline { display: none; }
                    .xs\\:hidden { display: inline; }
                }
            `}</style>
        </footer>
    );
};

export default Footer;