export default function SubscribeSection() {
  return (
    <section style={{
          backgroundImage: "radial-gradient(circle, #dbeafe 2px, transparent 2px)",
          backgroundSize: "10px 10px",
        }} className="bg-white py-20 px-6 rounded-3xl my-10">
      <div
        className="max-w-3xl mx-auto rounded-2xl p-10 text-center"
        
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Join 65,000+ Creators
        </h2>
        <p className="text-gray-600 mb-8">
          Subscribe to the Creator Science newsletter for real-life experiments,
          expert interviews, and evidence-backed advice every week.
        </p>

        {/* Input + Button */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <input
            type="email"
            placeholder="youremail@website.com"
            className="flex-1 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all w-full md:w-auto">
            Subscribe
          </button>
        </div>

        {/* Avatars + Rating */}
        <div className="flex justify-center items-center gap-3">
          <div className="flex -space-x-2">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="avatar"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="avatar"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src="https://randomuser.me/api/portraits/men/65.jpg"
              alt="avatar"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src="https://randomuser.me/api/portraits/men/71.jpg"
              alt="avatar"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt="avatar"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </div>
          <div className="flex items-center gap-1 text-yellow-500 text-sm">
            ★★★★★
            <span className="text-gray-600 ml-2">from 466 reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}
