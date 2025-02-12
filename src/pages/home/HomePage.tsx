import Hero from "./_components/Hero";
import HomePageMap from "./_components/HomePageMap";
import { HotelsSection } from "./_components/HotelsSection";
import OurServices from "./_components/OurServices";

function HomePage() {
  return (
    <section className="mx-10 gap-16">
      <div className="flex min-h-[calc(100vh-2*24px-50px)] flex-1 flex-col items-center justify-center">
        <Hero />
      </div>
      <div>
        <HotelsSection />
      </div>
      <HomePageMap />
      <OurServices />
    </section>
  );
}

export default HomePage;
