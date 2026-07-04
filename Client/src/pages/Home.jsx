import React from "react";
const Home = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const IntersectionDot = ({ className = '' }) => (
        <span className={`absolute size-1 -translate-x-1/2 -translate-y-1/2 rounded-xs border border-neutral-800 bg-white z-30 ${className}`} />
    );


    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
                    @import url('https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');
                    *{font-family: "Geist", sans-serif; }
                    h1{font-family: "Urbanist", sans-serif; }
                    .marquee-inner {
                        animation: marqueeScroll 35s linear infinite;
                    }
                    @keyframes marqueeScroll {
                        0% {
                            transform: translateX(0%);
                        }

                        100% {
                            transform: translateX(-50%);
                        }
                    }
                `}
            </style>




        <div className="flex flex-wrap items-center justify-center w-full py-2 font-medium text-sm text-white text-center bg-gradient-to-b from-orange-500 to-orange-600">
            Order 10 Coffee to get free extra coffee!
            
        </div>

            <main className="w-full flex-1 bg-hero bg-no-repeat bg-cover bg-center relative">
                <div className="absolute inset-0 bg-black/60 z-0"></div>
                <div className="w-full px-4 md:px-24 lg:px-32 xl:px-40 mx-auto h-full relative z-10">
                    <div className="w-full h-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center border-x border-dashed border-neutral-800 relative">

                        <div className="flex flex-wrap items-center justify-center gap-2 pl-2.5 pr-4 py-2 rounded-lg border border-neutral-800">
                            <div className="relative flex size-3.5 items-center justify-center">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-orange-300 opacity-75 animate-ping duration-300"></span>
                                <span className="relative inline-flex size-2 rounded-full bg-orange-600"></span>
                            </div>
                            <p className="text-sm text-white">Good food makes mood good</p>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl/19 text-center font-medium text-white max-w-[770px] mt-3 mx-auto max-sm:px-4">
                            Stay, Dine, and Enjoy at Brothers Kitchen
                        </h1>
                        <p className="text-m text-center max-w-[510px] mt-2.5 mx-auto max-sm:px-4 text-neutral-200">
                            Brothers Kitchen offers fresh, flavorful meals and friendly service, creating a welcoming dining experience for families, friends, and travelers alike.
                        </p>

                        <div className='flex gap-5 mt-11'>
                            <button className="flex items-center gap-1 bg-black hover:bg-neutral-700 px-5 text-sm py-2.5 text-white rounded-lg cursor-pointer">
                                Order your meal
                            </button>
                        </div>
                        
                        <div className='flex items-center gap-2.5 px-6 mt-9'>
                            
                            <div className="flex ">
                                {Array(5).fill(0).map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star text-transparent fill-[#FF8F20]" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                                ))}
                            </div>
                            <div className='w-px h-5 bg-white'></div>
                            <p className='text-sm text-white'>To bring people together through great food, exceptional service, and genuine hospitality.</p>
                        </div>

                        <div className='relative border-t border-dashed border-neutral-800 w-full mt-9'>
                            <IntersectionDot className="left-0 top-0" />
                            <IntersectionDot className="left-full top-0" />
                        </div>
                    </div>
                </div>
            </main>



{/* Dining space  */}
           <section className="py-16 bg-white">
    <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-semibold text-neutral-900 text-center mb-3">Our Dining Spaces</h2>
        <p className="text-neutral-500 text-center mb-10">Experience luxury dining in beautifully designed spaces</p>

        <div className="flex flex-col md:flex-row gap-6">

            <div className="flex-1 flex flex-col">
                <div className="relative overflow-hidden rounded-xl">
                    <img
                        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800"
                        alt="Main Dining Hall"
                        className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                        <span className="bg-white/20 backdrop-blur text-white text-xs font-medium px-3 py-1 rounded-full">Fine Dining</span>
                    </div>
                </div>
                <h3 className="text-neutral-900 font-semibold text-lg mt-4">Main Dining Hall</h3>
                <p className="text-neutral-500 text-sm mt-1">Elegant indoor dining with ambient lighting and comfortable seating</p>
            </div>

            <div className="flex-1 flex flex-col">
                <div className="relative overflow-hidden rounded-xl">
                    <img
                        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"
                        alt="Outdoor Terrace"
                        className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                        <span className="bg-white/20 backdrop-blur text-white text-xs font-medium px-3 py-1 rounded-full">Al Fresco</span>
                    </div>
                </div>
                <h3 className="text-neutral-900 font-semibold text-lg mt-4">Garden Terrace</h3>
                <p className="text-neutral-500 text-sm mt-1">Beautiful outdoor seating surrounded by lush greenery</p>
            </div>

            <div className="flex-1 flex flex-col">
                <div className="relative overflow-hidden rounded-xl">
                    <img
                        src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800"
                        alt="Private Room"
                        className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                        <span className="bg-white/20 backdrop-blur text-white text-xs font-medium px-3 py-1 rounded-full">Private</span>
                    </div>
                </div>
                <h3 className="text-neutral-900 font-semibold text-lg mt-4">Private Rooms</h3>
                <p className="text-neutral-500 text-sm mt-1">Intimate spaces for special occasions and business meetings</p>
            </div>

        </div>
    </div>
</section>



        {/* Banquet */}
        <section id="banquet" className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <h2 className="text-3xl font-semibold text-neutral-900 text-center mb-3">Grand Banquet Hall</h2>
                <p className="text-neutral-500 text-center mb-10">Perfect venue for weddings, parties, and corporate events</p>

                <div className="flex flex-col lg:flex-row gap-6">

                    {/* Big featured image — left */}
                    <div className="lg:w-1/2 relative overflow-hidden rounded-2xl group min-h-[400px]">
                        <img
                            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200"
                            alt="Grand Banquet Hall"
                            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <h3 className="text-white text-2xl font-semibold">Royal Banquet Hall</h3>
                            <p className="text-white/80 text-sm mt-1 mb-4">Capacity up to 500 guests | State-of-the-art facilities</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-white/20 backdrop-blur text-white text-xs px-3 py-1 rounded-full"> Premium Sound</span>
                                <span className="bg-white/20 backdrop-blur text-white text-xs px-3 py-1 rounded-full"> LED Lighting</span>
                                <span className="bg-white/20 backdrop-blur text-white text-xs px-3 py-1 rounded-full"> Projector Screens</span>
                                <span className="bg-white/20 backdrop-blur text-white text-xs px-3 py-1 rounded-full"> Custom Catering</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2 grid grid-cols-2 grid-rows-2 gap-4 min-h-[400px]">

                        <div className="relative overflow-hidden rounded-xl group">
                            <img
                                src="https://images.squarespace-cdn.com/content/v1/611cbe4f49881e4816761031/1748913166263-7HBUPVICYKA8ORMZMNTQ/TCBWeddingsCapturedByPeta-82.jpg"
                                alt="Wedding Setup"
                                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <p className="absolute bottom-3 left-3 text-white text-sm font-medium">Wedding Receptions</p>
                        </div>

                        <div className="relative overflow-hidden rounded-xl group">
                            <img
                                src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600"
                                alt="Corporate Event"
                                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <p className="absolute bottom-3 left-3 text-white text-sm font-medium">Corporate Events</p>
                        </div>

                        <div className="relative overflow-hidden rounded-xl group">
                            <img
                                src="https://www.sn2r.com/wp-content/uploads/2022/08/PRIVATE-EVENTS-21ST-BIRTHDAY-86.jpg"
                                alt="Birthday Party"
                                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <p className="absolute bottom-3 left-3 text-white text-sm font-medium">Private Celebrations</p>
                        </div>

                        <div className="relative overflow-hidden rounded-xl group">
                            <img
                                src="https://www.thelittlevegaschapel.com/wp-content/uploads/marriage-proposal-ideas.jpg"
                                alt="Surprise Proposal"
                                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <p className="absolute bottom-3 left-3 text-white text-sm font-medium">Special Surprise Proposal</p>
                        </div>

                    </div>
                </div>
            </div>
        </section>

        </>
    )
}

export default Home