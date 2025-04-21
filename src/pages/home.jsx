import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";
import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData,  contactData } from "@/data";
import  { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function Home() {
  const [teamData, setTeamData] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const [homepageData, setHomepageData] = useState({
    backgroundImage: "", 
    title: "",
    description: "",
  });
  useEffect(() => {
    const fetchHomePageData = async () => {
      try {
        const response = await axios.get(`${API_URL}homepage`); // adjust endpoint
        console.log('homepage',response.data.data[0])
        setHomepageData(response.data.data[0]); // assuming blogs come in `data.data`
      } catch (err) {
        console.error("Failed to fetch homepage:", err);
      }
    };
  
    fetchHomePageData();
  }, []);
  const handleUpdate = () => {
    fetch(`${API_URL}ceo/${ceoDetails._id}`, {
      method: "PUT",
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          setCeoDetails(result.data);
          setOpen(false);
        } else {
          alert("Update failed!");
        }
      })
      .catch(error => {
        console.log("Error updating CEO:", error);
      });
  };
useEffect(() => {
  const fetchCEOs = async () => {
    try {
      const response = await axios.get(`${API_URL}ceo`);
      console.log('vhbjnk',response.data.data)
      const ceos = response.data.data;

      const transformedData = ceos.map((ceo) => ({
        img: ceo.image || "/img/default-avatar.png",
        name: ceo.name,
        position: ceo.position || "CEO",
        socials: [
          { color: "light-blue", name: "twitter" },
          { color: "blue", name: "linkedin" },
          { color: "pink", name: "dribbble" },
        ],
      }));

      setTeamData(transformedData.slice(0, 4));

    } catch (err) {
      console.error("Failed to fetch team data:", err);
    }
  };
  fetchCEOs();
}, []);
const [features, setFeatures] = useState([]);
useEffect(() => {
  const fetchData = async () => {
    const data = await featuresData(); // async function call
    setFeatures(data);
  };

  fetchData();
}, []);
const [blogs, setBlogs] = useState([]);

useEffect(() => {
  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${API_URL}blog`); // adjust endpoint
      console.log(response.data.data)
      setBlogs(response.data.data); // assuming blogs come in `data.data`
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    }
  };

  fetchBlogs();
}, []);


const [products, setProducts] = useState([]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}product`); // adjust endpoint
      console.log('pro',response.data.data)
      setProducts(response.data.data); // assuming blogs come in `data.data`
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    }
  };

  fetchProducts();
}, []);

  return (
    <>
    <div className="w-full min-h-screen overflow-x-hidden bg-white">
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
      
      {/* <div
  className="absolute top-0 h-[85%] w-full bg-cover bg-center"
  style={{ backgroundImage: `url(${homepageData.
desktopBanner
})` }}
/> */}
<div className="absolute top-0 h-[85%] w-full bg-cover bg-center">
  {homepageData.desktopBanner && homepageData.desktopBanner.endsWith(".mp4") ? (
    // If the URL ends with .mp4, treat it as a video
    <video
      className="absolute top-0 left-0 w-full h-full object-cover"
      autoPlay
      loop
      muted
    >
      <source src={homepageData.desktopBanner} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  ) : (
    // If it's not a video (it's an image URL), use the image as the background
    <div className="absolute top-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${homepageData.desktopBanner})` }} />
  )}
</div>


{/* <div className="absolute top-0 h-[85%] w-full bg-cover bg-center">
  <iframe
    className="w-full h-full object-cover z-0"
    src="https://www.youtube.com/embed/gXFATcwrO-U?autoplay=1&loop=1&mute=1&playlist=gXFATcwrO-U&controls=0&modestbranding=1&rel=0&showinfo=0"
    frameBorder="0"
    allow="autoplay; fullscreen"
    allowFullScreen
  ></iframe>
</div> */}




        <div className="absolute top-0 h-[85%] w-full bg-cover bg-center" />
        <div className="max-w-screen-xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
            <motion.div
  initial={{ opacity: 0, x: -100 }} 
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 2, ease: "easeOut" }}
>
            <Typography variant="h1" color="white" className="mb-6 font-black">
  {homepageData.title}
</Typography>
<Typography variant="lead" color="white" className="opacity-80">
  {homepageData.description}
</Typography>
</motion.div>

            </div>
          </div>
        </div>
      </div>
      <section className="-mt-54 bg-white px-4 pt-4">

        <div className="container mx-auto ">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ">
  {features.map(({ color, title, icon, description }) => (
    <FeatureCard
      key={title}
      color={color}
      title={title}
      icon={React.createElement(icon, {
        className: "w-5 h-5 text-white ",
      })}
      description={description}
    />
  ))}
</div>

<section className="flex flex-col mt-[10vh] md:flex-row">
  {/* Text Card */}
  <motion.div
  className="w-full md:w-1/2 flex items-center justify-end px-10 py-12 bg-gray-50"
  initial={{ opacity: 0, y: 100 }} // Start from below
  whileInView={{ opacity: 1, y: 0 }} // Animate to its normal position
  transition={{ duration: 3, ease: "easeOut" }}
  viewport={{ once: true, amount: "top" }} // Trigger only once when 20% of the element is in view
>
    <div className="max-w-md">
      <h2 className="text-4xl font-bold mb-6 text-[rgb(0,72,130)]">Who We Are</h2>
      <p className="text-lg text-black leading-relaxed">
        CEO Network India is an exclusive business network that brings together CEOs, entrepreneurs, and business leaders from various industries to share knowledge, ideas, and resources. It is a part of the global CEO Clubs Worldwide, which has a presence in more than 10 countries.
      </p>
    </div>
  </motion.div>

  
  <motion.div
  className="w-full md:w-1/2 flex items-center justify-end px-10 py-12 bg-gray-50"
  initial={{ opacity: 0, y: 100 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 3, ease: "easeOut" }}
  viewport={{ once: true, amount: "top" }} 
>
    <img
      src="/img/1.jpg"
      alt="CEO Clubs"
      className="w-full h-full object-contain"
    />
  </motion.div>
</section>
        </div>
      </section>
      <section className="px-4 pt-20 ">
        <div className="container mx-auto">
          {/* <PageTitle section="Our Team" heading="Here are our heroes">
          Behind every successful movement is a team of passionate, forward-thinking leaders.
           These are the trailblazers shaping India’s business future — CEOs, founders, strategists, and mentors who believe in the power of connection,
            knowledge, and leadership excellence.


          </PageTitle>
          <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
  {teamData.map(({ img, name, position, linkedinUrl, twitterUrl, githubUrl }) => {
  
    const socials = [
      { name: "linkedin", color: "blue", url: linkedinUrl },
      { name: "twitter", color: "light-blue", url: twitterUrl },
      { name: "github", color: "gray", url: githubUrl },
    ];

    return (
      <TeamCard
        key={name}
        img={img}
        name={name}
        position={position}
        socials={
          <div className="flex items-center gap-2">
            {socials.map(({ color, name, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton color={color} variant="text">
                  <i className={`fa-brands text-xl fa-${name}`} />
                </IconButton>
              </a>
            ))}
          </div>
        }
      />
    );
  })}
</div> */}


        </div>
      </section>



      <section className=" py-24 px-2">
  <div className="w-full max-w-7xl mx-auto bg-gray-50 rounded-xl shadow-md p-8">
    <div className="flex justify-between items-center border-b pb-4">
      <h2 className="text-2xl font-semibold text-[rgb(0,72,130)]">Latest Products</h2>
      <Link to="/product" className="text-[#283850] text-sm hover:underline">View all</Link>
    </div>

    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 4)
        .map(({ _id, name, coverImage, description, salePrice }, index) => (
          <motion.div
  key={_id}
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
  viewport={{ once: true, amount: 0.2 }}
  className="bg-white rounded-xl border p-4 shadow-sm h-full flex flex-col justify-between"
>
  <Link to={`/product/${_id}`} className="h-full flex flex-col justify-between">
    <div>
      <img
        src={coverImage || "/img/default-blog.jpg"}
        alt={name}
        className="h-40 w-full object-cover rounded-lg"
      />
      <h3 className="text-md font-semibold mt-4">{name || "Untitled Product"}</h3>
      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
        {description
          ? description.replace(/<[^>]+>/g, "").slice(0, 100) + "..."
          : "No description available."}
      </p>
      <div className="mt-4">
        <span className="text-[#283850] font-bold text-lg">₹{salePrice}</span>
      </div>
    </div>

    {/* Bottom aligned button */}
    <div className="mt-4">
      <button className="border border-[#283850] text-[#283850] px-4 py-1 rounded hover:bg-[#c7d3e3] transition text-sm w-full">
        View details
      </button>
    </div>
  </Link>
</motion.div>

        ))}
    </div>
  </div>
</section>














<section className=" py-24 px-2">
  <div className="w-full max-w-7xl mx-auto bg-gray-50 rounded-xl shadow-md p-8">
    <div className="flex justify-between items-center border-b pb-4">
      <h2 className="text-2xl font-semibold text-[rgb(0,72,130)]">Latest Blogs</h2>
      <Link to="/blogs" className="text-[#283850] text-sm hover:underline">View all</Link>
    </div>
    <div className="mx-auto mt-20 grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
  {blogs
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 4)
    .map(({ _id, title, coverimage, description }, index) => (
      <motion.div
  key={_id}
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
  viewport={{ once: true, amount: 0.2 }}
>
  <Link to={`/blog/${_id}`}>
    <Card className="shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col h-full">
      <div className="p-4 pb-0">
        <img
          src={coverimage || "/img/default-blog.jpg"}
          alt={title}
          className="h-40 w-full object-cover rounded-md"
        />
      </div>

      <CardBody className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <Typography variant="h5" className="font-bold mb-2 line-clamp-2">
            {title || "Untitled Blog"}
          </Typography>
          <Typography className="text-blue-gray-500 text-sm line-clamp-3">
            {description
              ? description.replace(/<[^>]+>/g, "").slice(0, 120) + "..."
              : "No description available."}
          </Typography>
        </div>

        {/* Button aligned at bottom */}
        <div className="mt-4">
          <button className="border border-[#283850] text-[#283850] px-4 py-1 rounded hover:bg-[#c7d3e3]  transition text-sm w-full">
            View more
          </button>
        </div>
      </CardBody>
    </Card>
  </Link>
</motion.div>

    ))}
</div>




          {/* <PageTitle section="Contact Us" heading="Want to work with us?">
            Complete this form and we will get back to you in 24 hours.
          </PageTitle> */}
          {/* <form className="mx-auto w-full mt-12 lg:w-5/12">
            <div className="mb-8 flex gap-8">
              <Input variant="outlined" size="lg" label="Full Name" />
              <Input variant="outlined" size="lg" label="Email Address" />
            </div>
            <Textarea variant="outlined" size="lg" label="Message" rows={8} />
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button variant="gradient" size="lg" className="mt-8" fullWidth>
              Send Message
            </Button>
          </form> */}
        </div>
      </section>
      <div className="bg-white">
        <Footer />
      </div>
      </div>
    </>
  );
}

export default Home;
