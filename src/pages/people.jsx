import { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { Mail, Building2 } from "lucide-react";
import { Footer } from "@/widgets/layout";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

export function People() {
  const [ceos, setCeos] = useState([]);
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchCEOs = async () => {
      try {
        const response = await fetch(`${API_URL}ceo`);
        const result = await response.json();
        if (result.success) {
          setCeos(result.data);
        }
      } catch (error) {
        console.error("Error fetching CEOs:", error);
      }
    };

    fetchCEOs();
  }, []);

  const handleCardClick = (ceoId) => {
    // Redirect to the description page with the CEO's ID as a URL parameter
    navigate(`/description/${ceoId}`);
  };

  return (
    <>
      <section className="relative block h-[10vh]">
        <div className="absolute top-0 h-full w-full bg-[url('/img/thr.jpg')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-black/60" />
      </section>

      <section className="relative bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <Typography variant="h4" className="mb-10 text-center font-semibold text-gray-800">
            Meet Our CEOs
          </Typography>

          {ceos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {ceos.map((ceo) => (
                <div
                  key={ceo._id}
                  className="relative backdrop-blur-md bg-white/60 border border-gray-200 rounded-3xl shadow-lg transition-all hover:shadow-2xl p-6 flex flex-col items-center text-center"
                  onClick={() => handleCardClick(ceo._id)} // Add the onClick handler here
                >
                  <div className="relative">
                    <img
                      src={ceo.image || "/img/default-profile.jpg"}
                      alt={ceo.name}
                      className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white hover:scale-105 transition-all duration-300"
                    />
                  </div>

                  <h5 className="mt-4 text-lg font-semibold text-gray-800 hover:text-blue-600 transition-all duration-200 cursor-pointer">
                    {ceo.name}
                  </h5>

                  <p className="text-sm text-gray-600 mb-4">{ceo.position}</p>

                  <div className="text-sm text-gray-700 flex flex-col items-center gap-2">
                    <span className="inline-flex items-center gap-2 text-gray-700 hover:text-blue-500 transition">
                      <Mail className="w-4 h-4" /> {ceo.email}
                    </span>
                    <span className="inline-flex items-center gap-2 text-gray-700 hover:text-blue-500 transition">
                      <Building2 className="w-4 h-4" /> {ceo.companyName}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No CEOs found.</p>
          )}
        </div>
      </section>

      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default People;
