import { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { Footer } from "@/widgets/layout";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams for getting the dynamic URL parameter
import { Tag, Layers } from "lucide-react";
import { CircularProgress } from "@mui/material"; // Import CircularProgress for the loading spinner

export function Description() {
  const [ceoDetails, setCeoDetails] = useState(null); // Store CEO details
  const [isLoading, setIsLoading] = useState(true); // State to handle the loading state
  const { ceoId } = useParams(); // Get the CEO ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true); // Set loading to true when fetching new data
        const response = await fetch(`https://ceo.apis.stageprojects.xyz/ceo/${ceoId}`); // Use the ceoId in the API URL
        const result = await response.json();
        if (result.success) {
          setCeoDetails(result.data);
        }
        setIsLoading(false); // Set loading to false once the data is fetched
      } catch (error) {
        console.error("Error fetching CEO details:", error);
        setIsLoading(false); // Set loading to false if there's an error
      }
    };

    if (ceoId) {
      fetchDetails();
    }
  }, [ceoId]); // Re-run the fetch when the ceoId changes

  const handleSearch = async (searchTerm) => {
    try {
      setIsLoading(true); // Set loading to true when performing search
      const response = await fetch(`https://ceo.apis.stageprojects.xyz/ceo/search?term=${searchTerm}`);
      const result = await response.json();
      if (result.success) {
        setCeoDetails(result.data); // Update ceoDetails with the search result
      }
      setIsLoading(false); // Set loading to false after search results are fetched
    } catch (error) {
      console.error("Error searching CEO:", error);
      setIsLoading(false); // Set loading to false if there's an error
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress size={50} />
      </div>
    ); // Display spinner while loading
  }

  if (!ceoDetails) {
    return (
      <p className="text-center text-gray-500">No CEO details found.</p> // Show message if no data is available
    );
  }

  return (
    <>
      <section className="relative block h-[10vh]">
        <div className="absolute top-0 h-full w-full bg-[url('/img/thr.jpg')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-black/60" />
      </section>

      <section className="relative bg-white py-16">
        <div className="container mx-auto px-4">
          <Typography variant="h4" className="mb-10 text-center font-semibold text-gray-800">
            CEO Profile
          </Typography>

          <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
            <div className="flex items-center space-x-6">
              <img
                src={ceoDetails.image || "/img/default-profile.jpg"}
                alt={ceoDetails.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div>
                <Typography variant="h5" className="font-semibold text-gray-800">
                  {ceoDetails.name}
                </Typography>
                <p className="text-sm text-gray-600">{ceoDetails.position}</p>
                <div className="text-sm text-gray-700 mt-2">
                  <p className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <span>Industry: {ceoDetails?.industryType?.name || "N/A"}</span>
                  </p>

                  <p className="flex items-center gap-2 mt-2">
                    <Layers className="w-4 h-4" />
                    <span>Company: {ceoDetails.companyName || "N/A"}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Typography variant="h6" className="text-gray-700 mb-2">
                Description
              </Typography>
              <p className="text-gray-600">
                {ceoDetails.description ? ceoDetails.description.replace(/<[^>]+>/g, '') : "No Description available."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Description;
