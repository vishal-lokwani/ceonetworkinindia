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

export function Home() {
  const [teamData, setTeamData] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const [homepageData, setHomepageData] = useState({
    desktopBanner: "", 
    title: "",
    description: "",
  });
  useEffect(() => {
    const fetchHomePageData = async () => {
      try {
        const response = await axios.get(`${API_URL}homepage`); // adjust endpoint
        console.log('homepage',response.data.data)
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

  return (
    <>
    <div className="w-full min-h-screen overflow-x-hidden bg-white">
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
      
      <div
  className="absolute top-0 h-[85%] w-full bg-cover bg-center"
  style={{ backgroundImage: `url(${homepageData.desktopBanner})` }}
/>

        <div className="absolute top-0 h-[85%] w-full bg-black bg-cover bg-center" />
        <div className="max-w-screen-xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
            <Typography variant="h1" color="white" className="mb-6 font-black">
  {homepageData.title}
</Typography>
<Typography variant="lead" color="white" className="opacity-80">
  {homepageData.description}
</Typography>

            </div>
          </div>
        </div>
      </div>
      <section className="-mt-54 bg-white px-4 pt-4">

        <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {features.map(({ color, title, icon, description }) => (
        <FeatureCard
          key={title}
          color={color}
          title={title}
          icon={React.createElement(icon, {
            className: "w-5 h-5 text-white",
          })}
          description={description}
        />
      ))}
    </div>
          <div className="mt-32 flex flex-wrap items-center">
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg">
                <FingerPrintIcon className="h-8 w-8 text-white " />
              </div>
              <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="blue-gray"
              >
                Working with us is a pleasure
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500">
                Don't let your uses guess by attaching tooltips and popoves to
                any element. Just make sure you enable them first via
                JavaScript.
                <br />
                <br />
                The kit comes with three pre-built pages to help you get started
                faster. You can change the text and images and you're good to
                go. Just make sure you enable them first via JavaScript.
              </Typography>
              <Button variant="filled">read more</Button>
            </div>
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
              <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
                <CardHeader floated={false} className="relative h-56">
                  <img
                    alt="Card Image"
                    src="/img/teamwork.png"
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody>
                  <Typography variant="small" color="blue-gray" className="font-normal">Enterprise</Typography>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 mt-2 font-bold"
                  >
                    Top Notch Services
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                    The Arctic Ocean freezes every winter and much of the
                    sea-ice then thaws every summer, and that process will
                    continue whatever happens.
                  </Typography>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 pt-20 ">
        <div className="container mx-auto">
          <PageTitle section="Our Team" heading="Here are our heroes">
            According to the National Oceanic and Atmospheric Administration,
            Ted, Scambos, NSIDClead scentist, puts the potentially record
            maximum.
          </PageTitle>
          {/* <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
            {teamData.map(({ img, name, position, socials }) => (
              <TeamCard
                key={name}
                img={img}
                name={name}
                position={position}
                socials={
                  <div className="flex items-center gap-2">
                    {socials.map(({ color, name }) => (
                      <IconButton key={name} color={color} variant="text">
                        <i className={`fa-brands text-xl fa-${name}`} />
                      </IconButton>
                    ))}
                  </div>
                }
              />
            ))}
          </div> */}
          <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
  {teamData.map(({ img, name, position, linkedinUrl, twitterUrl, githubUrl }) => {
    // Transform URLs into an array
    const socials = [
      { name: "linkedin", color: "blue", url: linkedinUrl },
      { name: "twitter", color: "light-blue", url: twitterUrl },
      { name: "github", color: "gray", url: githubUrl },
    ]; // Only include valid ones

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
</div>


        </div>
      </section>
      <section className="relative bg-white py-24 px-2">
        <div className="container mx-auto">
          <PageTitle section="Co-Working" heading="Build something">
            Put the potentially record low maximum sea ice extent tihs year down
            to low ice. According to the National Oceanic and Atmospheric
            Administration, Ted, Scambos.
          </PageTitle>
          <div className="mx-auto mt-20 mb-36 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            {contactData.map(({ title, icon, description }) => (
              <Card
                key={title}
                color="transparent"
                shadow={false}
                className="text-center text-blue-gray-900"
              >
                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-blue-gray-900 shadow-lg shadow-gray-500/20">
                  {React.createElement(icon, {
                    className: "w-5 h-5 text-white",
                  })}
                </div>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {title}
                </Typography>
                <Typography className="font-normal text-blue-gray-500">
                  {description}
                </Typography>
              </Card>
            ))}
          </div>
          <section className="relative bg-white">
  <div className="container mx-auto">
    <PageTitle section="Our Blogs" heading="Latest Blog Articles">
      Stay updated with insightful stories and updates from our team.
    </PageTitle>

    <div className="mx-auto mt-20  grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map(({ _id, title, coverimage, description }) => (
        <Card
          key={_id}
          className="shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          {/* Image with margin, padding, and rounded corners */}
          <div className="p-4">
            <img
              src={coverimage || "/img/default-blog.jpg"}
              alt={title}
              className="h-40 w-full object-cover rounded-md"
            />
          </div>

          <CardBody className="p-4 pt-0"> {/* Top padding removed to keep image tight */}
            <Typography variant="h5" className="font-bold mb-2">
              {title || "Untitled Blog"}
            </Typography>
            <Typography className="text-blue-gray-500 text-sm">
              {description
                ? description.replace(/<[^>]+>/g, "")
                : "No description available."}
            </Typography>

            {/* Optional: Read More button */}
            {/* <Button
              variant="text"
              color="blue"
              className="mt-4"
              onClick={() => window.location.href = `/blog/${_id}`}
            >
              Read More
            </Button> */}
          </CardBody>
        </Card>
      ))}
    </div>
  </div>
</section>



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
