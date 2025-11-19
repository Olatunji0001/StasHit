import Link from "next/link";
export default function Bottom() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-linear-to-t from-amber-500 to-amber-600 flex flex-col items-center justify-center text-white px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] font-bold mb-4 sm:mb-6">
          Ready to Protect Your Contacts?
        </h2>
        <p className="text-base sm:text-lg lg:text-xl xl:text-[20px] mb-6 sm:mb-8 lg:mb-10 leading-relaxed">
          Join thousands of users who never worry about losing their contacts again
        </p>
        <Link href={"/sign-up"}>
          <button className="rounded-full sm:rounded-3xl bg-white text-amber-500 px-6 py-3 sm:py-3 w-full sm:w-60 text-sm sm:text-base lg:text-[17px] font-medium hover:scale-105 transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl">
            Start Backing Up Now
          </button>
        </Link>
      </div>
    </section>
  );
}