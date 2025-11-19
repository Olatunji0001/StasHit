export default function Work() {
  return (
    <section className="bg-[#FFFBEB] py-12 sm:py-16 lg:py-20 xl:py-28" id="work">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] text-[#78350F] font-bold text-center mb-8 sm:mb-12 lg:mb-16">
          How It Works
        </h2>
        <div className="flex flex-col items-center gap-6 sm:gap-8 lg:gap-10 max-w-4xl mx-auto">
          {/* Step 1 */}
          <div className="flex gap-4 sm:gap-6 lg:gap-8 items-start w-full">
            <div className="shrink-0">
              <div className="bg-linear-to-r from-amber-500 to-amber-600 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white font-bold text-base sm:text-lg lg:text-[20px]">
                1
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:gap-3 flex-1">
              <p className="text-[#78350F] font-bold text-lg sm:text-xl lg:text-2xl">
                Create Your Account
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Sign up in seconds with your email. No complicated forms or
                verification processes.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4 sm:gap-6 lg:gap-8 items-start w-full">
            <div className="shrink-0">
              <div className="bg-linear-to-r from-amber-500 to-amber-600 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white font-bold text-base sm:text-lg lg:text-[20px]">
                2
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:gap-3 flex-1">
              <p className="text-[#78350F] font-bold text-lg sm:text-xl lg:text-2xl">
                Backup Your Contacts
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Add your contacts manually. We'll keep them safe and secure
                with enterprise-grade encryption.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4 sm:gap-6 lg:gap-8 items-start w-full">
            <div className="shrink-0">
              <div className="bg-linear-to-r from-amber-500 to-amber-600 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white font-bold text-base sm:text-lg lg:text-[20px]">
                3
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:gap-3 flex-1">
              <p className="text-[#78350F] font-bold text-lg sm:text-xl lg:text-2xl">
                Relax & Stay Protected
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Your contacts are now backed up. If anything happens, you can
                restore them instantly on your device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}