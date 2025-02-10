function About() {
  return (
    <section className="relative px-5 sm:px-10">
      {/* First Section */}
      <div className="flex min-h-[80vh] flex-col-reverse items-center gap-6 bg-slate-100 shadow-sm md:flex-row md:p-6">
        {/* Text Content */}
        <p className="flex flex-1 flex-col gap-6 text-lg sm:text-xl leading-7 tracking-wide text-center md:text-left">
          <span>
            At{" "}
            <span className="font-extrabold hover:underline tracking-tighter text-accent-500">
              Hotelify
            </span>
            , we&rsquo;re committed to providing you with the best possible
            experience for planning and booking your dream getaway.
          </span>
          <span>
            Whether you&rsquo;re seeking a luxurious retreat, a budget-friendly
            stay, or an adventure-filled escape, our platform offers a wide range
            of accommodations to suit everyone&rsquo;s needs.
          </span>
        </p>

        {/* Image */}
        <div className="flex-1 overflow-hidden rounded-xl md:max-h-[95%] aspect-[4/3]">
          <img
            src="/hotel-images/img-2.jpg"
            alt="Hotel Room"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Second Section */}
      <div className="flex min-h-[80vh] flex-col items-center gap-6 border-b-4 bg-slate-100 md:flex-row md:p-6">
        {/* Text Content */}
        <p className="flex flex-1 flex-col gap-6 text-lg sm:text-xl leading-7 tracking-wide text-center md:text-left">
          <span>
            With easy navigation, secure payment options, and dedicated customer
            support, we strive to make your journey seamless and memorable.
          </span>
          <span>
            Your next unforgettable adventure awaits with{" "}
            <span className="font-bold hover:underline tracking-tighter text-accent-500">
              Hotelify
            </span>
            .
          </span>
        </p>

        {/* Image */}
        <div className="flex-1 overflow-hidden rounded-xl bg-slate-800 md:max-h-[95%] aspect-[4/3]">
          <img
            src="/hotel-images/img-3.jpg"
            alt="Hotel Lobby"
            className="h-full w-[80%] object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default About;
