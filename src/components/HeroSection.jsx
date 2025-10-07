import Image from "next/image";
import profileImg from "../../public/profile.jpg"; // Replace with your own image
import FloatingBookingButton from "./FloatingBookingButton";

export default function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 md:py-24 bg-white">
      <div className="max-w-xl">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          I help people become <br />
          <span className="text-gray-900">professional creators.</span>
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Join 22,000+ creators who subscribe for advice, inspiration, and
          encouragement for building your creator brand.
        </p>
        {/* Input + Button */}
        <div className="flex flex-col md:flex-row items-center gap-4 my-6">
          <input
            type="email"
            placeholder="youremail@website.com"
            className="flex-1 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all w-full md:w-auto">
            Subscribe
          </button>
        </div>
      </div>

      <div className="mt-10 md:mt-0">
        <Image
          src={profileImg}
          alt="Profile"
          className="rounded-lg shadow-lg"
          width={350}
          height={350}
          priority
        />
      </div>
    </section>
  );
}
