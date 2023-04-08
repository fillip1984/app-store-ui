import { DebounceInput } from "react-debounce-input";
import ApplicationCard from "../../components/application/ApplicationCard";
import { Link } from "react-router-dom";
import { BsPlus } from "react-icons/bs";

const ApplicationList = () => {
  const search = () => {
    console.log("searching");
  };
  return (
    <div className="app-list mx-auto w-11/12 pb-24 lg:w-3/4">
      <div className="title-bar sticky top-24 bg-slate-400 p-2">
        <div className="flex items-center gap-4">
          <h2 className="text-white">Applications</h2>
          <Link
            to="/applications/new"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-600 text-4xl text-white transition-colors duration-300 hover:bg-sky-500">
            <BsPlus />
          </Link>
        </div>
        <DebounceInput
          onChange={search}
          className="my-2 w-full rounded"
          placeholder="Search for applications"
          autoFocus
        />
      </div>
      <div id="app-container" className="grid gap-3 p-4 lg:grid-cols-2">
        <ApplicationCard />
        <ApplicationCard />
        <ApplicationCard />
        <ApplicationCard />
        <ApplicationCard />
        <ApplicationCard />
        <ApplicationCard />
        <ApplicationCard />
        <ApplicationCard />
        <ApplicationCard />
      </div>
    </div>
  );
};

export default ApplicationList;
