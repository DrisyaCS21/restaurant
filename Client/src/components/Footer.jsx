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
                            Quick Links
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
                                Contact
                            </a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <h3 className='text-xs sm:text-sm font-medium text-[#f5e6d3] tracking-wider uppercase'>
                            Contact Us
                        </h3>
                        <div className='w-8 h-0.5 bg-[#d4a373] mt-2 sm:mt-3 mb-4 sm:mb-5'></div>
                        <div className="flex flex-col gap-2 sm:gap-2.5">
                            <a href="tel:+97430858437" className='text-xs sm:text-sm text-[#c4b5a5] hover:text-[#d4a373] transition-colors font-light flex items-center gap-2'>
                                <svg className="w-4 h-4 text-[#d4a373]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>+974 3085 8437</span>
                            </a>
                            <a href="mailto:hello@mokshyascafe.com" className='text-xs sm:text-sm text-[#c4b5a5] hover:text-[#d4a373] transition-colors font-light flex items-center gap-2'>
                                <svg className="w-4 h-4 text-[#d4a373]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>hello@mokshyascafe.com</span>
                            </a>
                            <p className='text-xs sm:text-sm text-[#c4b5a5] font-light flex items-center gap-2'>
                                <svg className="w-4 h-4 text-[#d4a373]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Kathmandu, Nepal</span>
                            </p>
                        </div>
                    </div>

                    {/* Social Links - Horizontal Layout */}
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <h3 className='text-xs sm:text-sm font-medium text-[#f5e6d3] tracking-wider uppercase'>
                            Follow Us
                        </h3>
                        <div className='w-8 h-0.5 bg-[#d4a373] mt-2 sm:mt-3 mb-4 sm:mb-5'></div>
                        
                        {/* Social Icons - Horizontal */}
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4">
                            {/* Instagram */}
                            <a 
                                href="https://instagram.com/mokshyascafe" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center gap-1 transition-all duration-300 hover:-translate-y-1"
                                aria-label="Follow us on Instagram"
                            >
                                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#4a3228] flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#f09433] group-hover:via-[#e6683c] group-hover:to-[#dc2743] transition-all duration-300 shadow-md group-hover:shadow-lg">
                                    <svg className="w-5 h-5 sm:w-5 sm:h-5 text-[#c4b5a5] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                    </svg>
                                </div>
                                <span className="text-[10px] text-[#8b6b4a] group-hover:text-[#d4a373] transition-colors hidden sm:block">Instagram</span>
                            </a>

                            {/* Facebook */}
                            <a 
                                href="https://facebook.com/mokshyascafe" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center gap-1 transition-all duration-300 hover:-translate-y-1"
                                aria-label="Follow us on Facebook"
                            >
                                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#4a3228] flex items-center justify-center group-hover:bg-[#1877f2] transition-all duration-300 shadow-md group-hover:shadow-lg">
                                    <svg className="w-5 h-5 sm:w-5 sm:h-5 text-[#c4b5a5] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </div>
                                <span className="text-[10px] text-[#8b6b4a] group-hover:text-[#d4a373] transition-colors hidden sm:block">Facebook</span>
                            </a>

                            {/* TikTok */}
                            <a 
                                href="https://tiktok.com/@mokshyascafe" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center gap-1 transition-all duration-300 hover:-translate-y-1"
                                aria-label="Follow us on TikTok"
                            >
                                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#4a3228] flex items-center justify-center group-hover:bg-black transition-all duration-300 shadow-md group-hover:shadow-lg">
                                    <svg className="w-5 h-5 sm:w-5 sm:h-5 text-[#c4b5a5] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.11-.59-1.62-.93-.01 2.92.01 5.84-.02 8.76-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                                    </svg>
                                </div>
                                <span className="text-[10px] text-[#8b6b4a] group-hover:text-[#d4a373] transition-colors hidden sm:block">TikTok</span>
                            </a>

                            {/* WhatsApp */}
                            <a 
                                href="https://wa.me/97430858437" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center gap-1 transition-all duration-300 hover:-translate-y-1"
                                aria-label="Chat with us on WhatsApp"
                            >
                                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#4a3228] flex items-center justify-center group-hover:bg-[#25D366] transition-all duration-300 shadow-md group-hover:shadow-lg">
                                    <svg className="w-5 h-5 sm:w-5 sm:h-5 text-[#c4b5a5] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                                        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.89.556 3.66 1.51 5.14L2 22l4.86-1.51C8.34 21.44 10.11 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.76 0-3.38-.58-4.69-1.56L4.5 19.5l1.06-2.81C4.58 15.38 4 13.76 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/>
                                    </svg>
                                </div>
                                <span className="text-[10px] text-[#8b6b4a] group-hover:text-[#d4a373] transition-colors hidden sm:block">WhatsApp</span>
                            </a>
                        </div>

                        {/* Small note under social icons */}
                        <p className="text-[8px] sm:text-[10px] cursor-pointer text-[#8b6b4a] group-hover:text-[#d4a373] mt-3 font-light tracking-wider">
                            Connect with us
                        </p>
                    </div>
                </div>

                {/* Decorative Divider */}
                <div className='relative w-full mt-10 sm:mt-12 mb-6'>
                    <div className='w-full h-px bg-gradient-to-r from-transparent via-[#d4a373]/30 to-transparent'></div>
                    {/* Decorative dot in center */}
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
                    <p className='text-[10px] text-[#8b6b4a] hover:text-[#d4a373] transition-colors font-light tracking-wider flex items-center gap-1 order-1 xs:order-3 w-full xs:w-auto justify-center'>
                        Made with <span className="text-[rgb(245,178,111)] text-xs">❤️</span> 
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