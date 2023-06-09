import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ApplicationSummary } from "../../Types";
import {
  applicationKeys,
  readApplicationById,
} from "../../services/ApplicationServices";
import { BiGitRepoForked } from "react-icons/bi";

interface ApplicationSummaryCardProps {
  applicationSummary: ApplicationSummary;
}

const ApplicationSummaryCard = ({
  applicationSummary,
}: ApplicationSummaryCardProps) => {
  const queryClient = useQueryClient();

  const prefetch = async (id: number) => {
    await queryClient.prefetchQuery({
      queryKey: applicationKeys.detail(id),
      queryFn: () => readApplicationById(id),
      staleTime: 10 * 1000, // only prefetch if older than 10 seconds
    });
  };

  return (
    <Link
      to={`/applications/${applicationSummary.id}`}
      className="card h-56 w-full bg-slate-50 transition duration-200 hover:shadow-md hover:shadow-sky-400"
      onMouseEnter={() => prefetch(applicationSummary.id)}>
      <div className="app-card flex h-full flex-col">
        <h3 className="app-card-title">{applicationSummary.name}</h3>
        <p className="app-card-body line-clamp-4 flex-grow pt-2 font-light">
          {applicationSummary.description}
        </p>
        <div>
          {applicationSummary.repositoryUrl && (
            <div className="flex items-center gap-2">
              <BiGitRepoForked className="text-3xl" />
              <span
                className="text-xl text-sky-500 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(applicationSummary.repositoryUrl);
                }}>
                {applicationSummary.repositoryUrl}
              </span>
            </div>
          )}
        </div>
        {/* <div className="app-card-actions flex justify-end py-2">
          <button className="rounded bg-sky-600 px-4 py-2 text-2xl text-white transition-colors duration-300 hover:bg-sky-500">
            Something...
          </button>
        </div> */}
      </div>
    </Link>
  );
};

export default ApplicationSummaryCard;
