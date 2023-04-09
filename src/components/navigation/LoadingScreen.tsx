import { FiRefreshCw } from "react-icons/fi";

//TODO: couldn't figure out how to make tanstack/query refetch function to have a generic return type
// may be able to tighten back up from any some day...
interface LoadingScreenProps {
  isLoading: boolean;
  isError: boolean;
  refetch: any;
  // <TPageData>(
  //   options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  // ) => Promise<QueryObserverResult<unknown, unknown>>;
}

const LoadingScreen = ({ isLoading, isError, refetch }: LoadingScreenProps) => {
  return (
    <div className="my-24 flex w-full items-center justify-center">
      {isLoading && <FiRefreshCw className="animate-spin text-8xl" />}

      {isError && (
        <div className="flex flex-col items-center items-center justify-center gap-y-2">
          <h3>An error occurred</h3>

          <button className="primary-btn btn-lg" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;
