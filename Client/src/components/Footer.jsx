import React from 'react'

const Footer = () => {
    return (
        <footer className='bg-black py-12 px-4 sm:px-6 lg:px-8'>
            <div className='w-full max-w-7xl mx-auto'>

                <div className="flex flex-wrap justify-between gap-y-12 lg:gap-x-8">

                    {/* Brand */}
                    <div className="w-full md:w-[45%] lg:w-[35%] flex flex-col items-center md:items-start text-center md:text-left">
                        <a href="/">
                            <h2 className='text-2xl text-white font-bold'>Brother's Kitchen</h2>
                        </a>
                        <div className='w-full max-w-52 h-px mt-8 bg-linear-to-r from-black via-white/25 to-black'></div>
                        <p className='text-sm text-white/60 mt-6 max-w-sm leading-relaxed'>
                            Fine dining experience in the heart of the city. Savor exquisite flavors crafted by our master chefs, in an elegant ambiance. Join us for an unforgettable culinary journey that delights your senses and creates lasting memories.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className='text-sm text-white font-medium'>Quick Links</h3>
                        <div className="flex flex-col gap-2 mt-6">
                            <a href="/" className='text-sm text-white/60 hover:text-white transition-colors'>Home</a>
                            <a href="#dining" className='text-sm text-white/60 hover:text-white transition-colors'>Dining Spaces</a>
                            <a href="#banquet" className='text-sm text-white/60 hover:text-white transition-colors'>Banquet Hall</a>
                            <a href="#menu" className='text-sm text-white/60 hover:text-white transition-colors'>Our Menu</a>
                            <a href="#order" className='text-sm text-white/60 hover:text-white transition-colors'>Order Online</a>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className='text-sm text-white font-medium'>Follow Us</h3>
                        <div className="flex flex-col gap-2 mt-6">
                            <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Instagram</a>
                            <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Facebook</a>
                            <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Twitter / X</a>
                            <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>TikTok</a>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className='text-sm text-white font-medium'>Contact</h3>
                        <div className="flex flex-col gap-2 mt-6">
                            <p className='text-sm text-white/60'> Kathmandu, City</p>
                            <a href="tel:+1234567890" className='text-sm text-white/60 hover:text-white transition-colors'> 99999999</a>
                            <a href="mailto:hello@brotherskitchen.com" className='text-sm text-white/60 hover:text-white transition-colors'>hello@brotherskitchen.com</a>
                            <p className='text-sm text-white/60'>🕐 Mon–Sun: 10am – 11pm</p>
                        </div>
                    </div>

                </div>

                <div className='w-full h-px mt-16 mb-4 bg-linear-to-r from-black via-white/25 to-black'></div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className='text-xs text-white/60'>© 2025 Brother's Kitchen. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <a href='#' className='text-xs text-white/60 hover:text-white transition-colors'>Terms & Conditions</a>
                        <div className='w-px h-4 bg-white/20'></div>
                        <a href='#' className='text-xs text-white/60 hover:text-white transition-colors'>Privacy Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
