import {
  BsFillGrid3X3GapFill,
  BsFillTagsFill,
  BsGearFill,
} from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const activeLocation = useLocation();

  const locations = [
    {
      label: "Apps",
      icon: <BsFillGrid3X3GapFill />,
      to: "/applications",
    },
    {
      label: "Tags",
      icon: <BsFillTagsFill />,
      to: "/tags",
    },
    {
      label: "Admin",
      icon: <BsGearFill />,
      to: "/admin",
    },
  ];

  const isActive = (aLocation: string) => {
    // exact match
    if (activeLocation.pathname === aLocation) {
      return true;
    }

    //starts with match
    if (activeLocation.pathname.includes(aLocation)) {
      return true;
    }

    //no match
    return false;
  };

  return (
    <nav className="sticky top-0 flex h-24 justify-center bg-slate-100">
      {locations.map((location) => (
        <Link
          key={location.label}
          to={location.to}
          className={`flex flex-col items-center p-4 text-2xl transition duration-300 hover:bg-slate-200 ${
            isActive(location.to) ? "border-b-4 border-b-sky-300" : ""
          }`}>
          {location.icon}
          <span>{location.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
