import Link from "next/link";

export default function Banner() {
  return (
    <section className="bg-[#FFFAE3] flex flex-col justify-center items-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl">
        <p className="text-[#78350F] font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
          Never Lose Your Contacts Again
        </p>
        <p className="text-[#78350F] text-base sm:text-lg md:text-xl mt-4">
          Securely backup your contacts and important information. Lose your phone? No problem. Your data is safe with us.
        </p>
        <Link href={"/sign-up"}>
          <button className="rounded-3xl bg-linear-to-r from-amber-500 to-amber-600 text-white py-3 px-6 sm:px-8 mt-8 text-base sm:text-lg md:text-xl font-medium cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-200 ease-in-out">
            Get Started Free
          </button>
        </Link>
      </div>
    </section>
  );
}
