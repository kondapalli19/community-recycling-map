"use client";

export default function Home() {
  return (
<section
  className="relative h-screen w-full bg-cover bg-center flex items-center justify-end"
  style={{ backgroundImage: "url('/homeImg.jpeg')" }}
>

  <div className="relative z-10 text-left px-8 max-w-xl mr-50">
    <h1 className="text-5xl md:text-6xl font-extrabold text-green-700 mb-6">
      Community Recycling Map
    </h1>
    <p className="text-lg md:text-xl text-green-700 mb-6">
      Take action for a cleaner tomorrow — locate your nearest recycling drop-off points and be part of the change.
    </p>
    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-md transition">
      Get Started
    </button>
  </div>
</section>

  );
}
