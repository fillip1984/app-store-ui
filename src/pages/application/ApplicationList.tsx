import { DebounceInput } from "react-debounce-input";
import ApplicationCard from "../../components/application/ApplicationCard";

const ApplicationList = () => {
  const search = () => {
    console.log("searching");
  };
  return (
    <div className="app-list mx-auto w-full pb-24 lg:w-3/4">
      <div className="title-bar sticky left-0 right-0 top-0 z-[999] bg-slate-500 p-2">
        <h2 className="text-white">Applications</h2>
        <DebounceInput
          onChange={search}
          className="relative my-2 w-full rounded"
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
