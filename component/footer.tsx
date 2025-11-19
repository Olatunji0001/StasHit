export default function Footer() {
    return (
        <section className="bg-[#1F2937] py-6 sm:py-8 lg:py-10">
            <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center">
                    <p className="text-white text-sm sm:text-base lg:text-lg">
                        © 2025 StasHit. All rights reserved. |{" "}
                        <a href="#" className="hover:text-amber-300 transition-colors duration-200">
                            Privacy Policy
                        </a>{" "}
                        |{" "}
                        <a href="#" className="hover:text-amber-300 transition-colors duration-200">
                            Terms of Service
                        </a>
                    </p>
                </div>
            </div>
        </section>
    )
}