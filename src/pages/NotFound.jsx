import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <main className="w-full h-[70vh] flex flex-col items-center justify-center bg-white text-gray-800 px-4">
      <Helmet>
        <title>Page Not Found | GoDynamicHolidays</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <h1 className="text-6xl font-bold text-orange-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Oops! You've drifted off the map.</h2>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved to a new destination.
      </p>
      <Link to="/" className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
        Return to Home
      </Link>
    </main>
  );
}