import { CiAlarmOn } from "react-icons/ci";

export default function About() {
  const about = [
    {
      id: crypto.randomUUID(),
      head: "Secure Storage",
      details: "Your contacts are encrypted and stored safely.",
    },
    {
      id: crypto.randomUUID(),
      head: "Auto Backup",
      details:
        "Set it and forget it. Your contacts are automatically backed up whenever you add or update them.",
    },
    {
      id: crypto.randomUUID(),
      head: "Easy Recovery",
      details:
        "Lost your phone? Restore all your contacts with just a few taps on your new device.",
    },
    {
      id: crypto.randomUUID(),
      head: "Access Anywhere",
      details:
        "Access your backed-up contacts from any device, anytime, anywhere in the world.",
    },
    {
      id: crypto.randomUUID(),
      head: "Lightning Fast",
      details: "Backup and restore thousands of contacts in seconds.",
    },
    {
      id: crypto.randomUUID(),
      head: "Jump Right In",
      details: "Start organizing your contacts in seconds. Free today.",
    },
  ];

  return (
    <section id="about">
      <div className="my-8 sm:my-12 lg:my-15 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-[40px] text-[#78350F] font-bold text-center mb-6 sm:mb-8 lg:mb-10">
          Why Choose StasHit?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {about.map((item) => (
            <div 
              key={item.id} 
              className="p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
            >
              <p className="text-base sm:text-lg lg:text-[20px] text-[#78350F] font-bold text-center mb-2 sm:mb-3">
                {item.head}
              </p>
              <p className="text-gray-600 text-sm sm:text-base text-center leading-relaxed">
                {item.details}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}