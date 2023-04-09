import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  applicationKeys,
  deleteApplicationById,
  readApplicationById,
} from "../../services/ApplicationServices";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "../../components/navigation/LoadingScreen";

const ApplicationDetail = () => {
  const { id } = useParams();
  const applicationId = Number(id);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  const { mutate: deleteApplicationByIdMutator } = useMutation(
    deleteApplicationById,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(applicationKeys.all);
        navigate("/applications");
      },
      onError: () => {
        alert("Error");
      },
    }
  );

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
          <div className="my-2 flex gap-2">
            <button
              type="button"
              className="secondary-btn secondary-btn-danger"
              onClick={() => deleteApplicationByIdMutator(application.id)}>
              Delete
            </button>
          </div>
          <h2>{application?.name}</h2>

          <p className="mt-4">{application?.description}</p>
        </>
      )}
    </div>
  );
};

export default ApplicationDetail;
