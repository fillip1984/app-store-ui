import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  applicationKeys,
  deleteApplicationById,
  readApplicationById,
} from "../../services/ApplicationServices";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "../../components/navigation/LoadingScreen";

import { MdEdit } from "react-icons/md";

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

  const handleEditBasics = () => {
    console.log("editing basics");
  };

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
          <div className="my-2 flex justify-end gap-2 rounded bg-slate-100 p-2">
            <button
              type="button"
              className="secondary-btn secondary-btn-danger"
              onClick={() => deleteApplicationByIdMutator(application.id)}>
              Delete
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h2>{application?.name}</h2>
              <button onClick={handleEditBasics}>
                <MdEdit className="text-4xl" />
              </button>
            </div>
            <p className="mt-4">{application?.description}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ApplicationDetail;
