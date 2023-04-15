import { DebounceInput } from "react-debounce-input";
import ApplicationSummaryCard from "../../components/application/ApplicationSummaryCard";
import { Link } from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import {
  applicationKeys,
  readAllApplications,
} from "../../services/ApplicationServices";
import LoadingScreen from "../../components/navigation/LoadingScreen";

const ApplicationList = () => {
  const search = () => {
    console.log("searching");
  };

  const {
    data: applicationSummaries,
    isError,
    isLoading,
    isFetching,
    refetch,
  } = useQuery(applicationKeys.lists(), () => readAllApplications());

  return (
    <div className="app-list container">
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

      {(isLoading || isFetching || isError) && (
        <LoadingScreen
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
        />
      )}

      {!isLoading && !isFetching && applicationSummaries?.length === 0 && (
        <div className="my-24 flex items-center justify-center">
          <h4>No results found</h4>
        </div>
      )}

      {!isLoading && !isFetching && (
        <div id="app-container" className="grid gap-3 p-4 lg:grid-cols-2">
          <>
            {applicationSummaries?.map((applicationSummary) => (
              <ApplicationSummaryCard
                key={applicationSummary.id}
                applicationSummary={applicationSummary}
              />
            ))}
          </>
        </div>
      )}
    </div>
  );
};

export default ApplicationList;
