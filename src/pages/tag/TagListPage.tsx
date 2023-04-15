import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "../../components/navigation/LoadingScreen";
import { readAllTags, tagKeys } from "../../services/TagServices";
import { Link } from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import { DebounceInput } from "react-debounce-input";
import TagSummaryCard from "../../components/tag/TagSummaryCard";

const TagListPage = () => {
  const search = () => {
    console.log("searching");
  };

  const {
    data: tagSummaries,
    isError,
    isLoading,
    refetch,
  } = useQuery(tagKeys.lists(), () => readAllTags());

  return (
    <div className="app-list container">
      <div className="title-bar sticky top-24 bg-slate-400 p-2">
        <div className="flex items-center gap-4">
          <h2 className="text-white">Tags</h2>
          <Link
            to="/tags/new"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-600 text-4xl text-white transition-colors duration-300 hover:bg-sky-500">
            <BsPlus />
          </Link>
        </div>
        <DebounceInput
          onChange={search}
          className="my-2 w-full rounded"
          placeholder="Search for tags"
          autoFocus
        />
      </div>

      {(isLoading || isError) && (
        <LoadingScreen
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
        />
      )}

      {!isLoading && tagSummaries?.length === 0 && (
        <div className="my-24 flex items-center justify-center">
          <h4>No results found</h4>
        </div>
      )}

      {!isLoading && (
        <div id="app-container" className="grid gap-3 p-4 lg:grid-cols-2">
          <>
            {tagSummaries?.map((tagSummary) => (
              <TagSummaryCard key={tagSummary.id} tagSummary={tagSummary} />
            ))}
          </>
        </div>
      )}
    </div>
  );
};

export default TagListPage;
