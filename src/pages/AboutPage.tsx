function About() {
  return (
    <section className="relative px-10">
      <div className="flex min-h-[80vh] flex-col items-center gap-6 bg-slate-100 shadow-sm md:flex-row md:p-3">
        <p className="flex flex-1 flex-col gap-8 text-xl leading-7 tracking-wide md:order-1">
          <span className="">
            At{" "}
            <span className="text-xl font-extrabold hover:underline tracking-tighter text-accent-500">
              Hotelify
            </span>
            , we&rsquo;re committed to provide you with the best possible
            experience for planning and booking your dream getaway.
          </span>
          <span>
            Whether you&rsquo;re seeking a luxurious retreat, a budget-friendly
            stay, or an adventure-filled escape, our comprehensive platform
            offers a wide range of accommodations to suit every one&rsquo;s
            needs.
          </span>
        </p>
        <div className="flex-1 overflow-hidden rounded-xl md:max-h-[95%]">
          <img
            src="/hotel-images/img-2.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="flex min-h-[80vh] flex-col items-center gap-6 border-b-4 bg-slate-100 md:flex-row md:p-3">
        <p className="flex flex-1 flex-col gap-8 text-xl leading-7 tracking-wide">
          <span className="">
            With easy navigation, secure payment options, and dedicated customer
            support, we strive to make your journey seamless and memorable.
            <br /> Your next unforgettable adventure awaits with{" "}
            <span className="text-lg font-normal hover:underline tracking-tighter text-accent-500">
              Hotelify
            </span>
            .
          </span>
        </p>
        <div className="flex-1 overflow-hidden rounded-xl bg-slate-800 md:max-h-[95%]">
          <img
            src="/hotel-images/img-3.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default About;
