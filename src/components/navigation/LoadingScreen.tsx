import { MdOutlineChangeCircle } from "react-icons/md";

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
    <div className="flex items-center justify-center">
      {isLoading && <MdOutlineChangeCircle />}

      {isError && (
        <div className="flex flex-col items-center justify-center">
          <h3>An error occurred</h3>

          <button className="primary-btn" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;
