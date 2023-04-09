import { useQuery } from "@tanstack/react-query";
import {
  applicationKeys,
  readApplicationById,
} from "../../services/ApplicationServices";
import { useParams } from "react-router-dom";
import LoadingScreen from "../../components/navigation/LoadingScreen";

const ApplicationDetail = () => {
  const { id } = useParams();
  const applicationId = Number(id);

  const {
    data: application,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: applicationKeys.detail(applicationId),
    queryFn: () => readApplicationById(applicationId),
    refetchOnWindowFocus: false,
  });

  return (
    <div className="container">
      {(isLoading || isError) && (
        <LoadingScreen
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
        />
      )}

      {!isLoading && !isError && (
        <>
          <h2>{application?.name}</h2>
          {application?.description}
        </>
      )}
    </div>
  );
};

export default ApplicationDetail;
