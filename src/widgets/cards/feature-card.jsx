import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import CountUp from "react-countup";

export function FeatureCard({ color, icon, title, description }) {
  return (
    <Card className="rounded-lg shadow-lg shadow-gray-500/10">
      <CardBody className="px-8 text-center flex flex-col items-center">
        <IconButton
          variant="gradient"
          size="lg"
          color={color}
          className="pointer-events-none mb-4 rounded-full"
        >
          {icon}
        </IconButton>
        <Typography variant="h4"  style={{ color: "rgb(0 72 130)" }} className="font-bold mb-1">
          <CountUp end={description} duration={2} separator="," prefix="+" />
        </Typography>
        <Typography variant="h6" className="font-medium text-black">
          {title}
        </Typography>
       
      </CardBody>
    </Card>
  );
}

FeatureCard.defaultProps = {
  color: "blue",
};

FeatureCard.propTypes = {
  color: PropTypes.oneOf([
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.number.isRequired,
};

FeatureCard.displayName = "/src/widgets/layout/feature-card.jsx";

export default FeatureCard;
