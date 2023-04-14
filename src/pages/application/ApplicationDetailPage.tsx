import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Application,
  ApplicationSummarySchema,
  CategoryOptions,
  StatusOptions,
  isNew,
} from "../../Types";
import {
  applicationKeys,
  createApplication,
  deleteApplicationById,
  readApplicationById,
  updateApplication,
} from "../../services/ApplicationServices";
import LoadingScreen from "../../components/navigation/LoadingScreen";
import { useEffect } from "react";

///
// schema
// const newApplicationSchema = z.object({
//   name: z.string().min(2).max(100),
//   description: z.string().min(10).max(500),
//   //waiting on: https://github.com/colinhacks/zod/issues/310
//   repositoryUrl: z.string().url().optional().or(z.literal("")),
// });

// export type NewApplicationSchemaType = z.infer<typeof newApplicationSchema>;

const ApplicationDetailPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { id } = useParams();
  const applicationId = Number(id);

  // retrieves existing entity or builds out one. The result is then reset into react hook form
  const {
    data: application,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: applicationKeys.detail(applicationId),
    queryFn: () => {
      if (isNew(id)) {
        return {
          name: "",
          description: "",
          status: StatusOptions.Enum.Backlog,
          category: CategoryOptions.Enum.Uncategorized,
        } as Application;
      } else {
        return readApplicationById(applicationId);
      }
    },
    enabled: !!id, //wait until react router dom finishes retrieving id (will either be 'new' or a number)
    refetchOnWindowFocus: false, // if a user clicks off of the form and returns the data will be refetched and updates reset unless we disable this
  });

  // forces react hook form to reset once we have existing form data
  useEffect(() => {
    if (!isFetching) {
      reset(application);
    }
  }, [isFetching]);

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

  ///
  // react hook form wired up
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<Application>({
    resolver: zodResolver(ApplicationSummarySchema),
  });

  ///
  // mutation via tanstack query
  const { mutate: createApplicationMutator } = useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      queryClient.invalidateQueries(applicationKeys.lists());
      navigate(-1);
    },
    onError: () => {
      // TODO: finish validation
      alert("error!");
    },
  });

  const { mutate: updateApplicationMutator } = useMutation({
    mutationFn: updateApplication,
    onSuccess: () => {
      queryClient.invalidateQueries(applicationKeys.lists());
      queryClient.invalidateQueries(applicationKeys.detail(Number(id)));
      navigate(-1);
    },
    onError: () => {
      // TODO: finish validation
      alert("error!");
    },
  });

  const onSubmit: SubmitHandler<Application> = (formData) => {
    if (isNew(id)) {
      createApplicationMutator(formData);
    } else {
      updateApplicationMutator(formData);
    }
  };

  const descriptionWatch = useWatch({ control, name: "description" });

  return (
    <div className="container">
      {(isLoading || isError) && (
        <LoadingScreen
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
        />
      )}

      <h2 className="my-2">New Application</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" {...register("name")} autoFocus />
          {errors.name && (
            <span className="validation-text">{errors.name.message}</span>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="description">Description</label>
          <div className="relative">
            <textarea id="description" {...register("description")} rows={10} />
            {/* counter to show how many characters have been typed and how many remain before being invalid */}
            {/* TODO: figure out how to retrieve the description.max() value so we don't have to hard code 500 here */}
            {descriptionWatch && (
              <span
                className={`absolute bottom-2 right-2 ${
                  descriptionWatch.length > 500 ? "text-red-400" : ""
                }`}>
                {descriptionWatch.length}/500
              </span>
            )}
          </div>
          {errors.description && (
            <span className="validation-text">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="repository">
            Repository <small>(optional)</small>
          </label>
          <input type="text" id="repository" {...register("repositoryUrl")} />
          {errors.repositoryUrl && (
            <span className="validation-text">
              {errors.repositoryUrl.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-x-2 md:flex-row">
          <div className="input-group flex-1">
            <label htmlFor="status">Status</label>
            <select id="status" {...register("status")}>
              {StatusOptions.options.map((statusOption) => (
                <option key={statusOption} value={statusOption}>
                  {statusOption}
                </option>
              ))}
            </select>
            {errors.status && (
              <span className="validation-text">{errors.status.message}</span>
            )}
          </div>

          <div className="input-group flex-1">
            <label htmlFor="category">Category</label>
            <select id="category" {...register("category")}>
              {CategoryOptions.options.map((categoryOption) => (
                <option key={categoryOption} value={categoryOption}>
                  {categoryOption}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="validation-text">{errors.category.message}</span>
            )}
          </div>
        </div>

        {/* <div className="flex flex-col gap-x-2 md:flex-row">
          <div className="input-group flex-1">
            <label>Platform</label>
            <select>
              <option value="">&lt;None Selected&gt;</option>
              <option>Frontend - Vite</option>
              <option>Backend - Spring Boot</option>
            </select>
          </div>

          <div className="input-group flex-1">
            <label>Category</label>
            <select>
              <option value="">&lt;None Selected&gt;</option>
            </select>
          </div>
        </div> */}

        <div className="mt-4 flex gap-3">
          <button type="submit" className="primary-btn" disabled={isSubmitting}>
            Save
          </button>
          <Link to="/applications" className="secondary-btn">
            Cancel
          </Link>
          {!isNew(id) && (
            <button
              type="button"
              className="secondary-btn-danger secondary-btn"
              onClick={() => deleteApplicationByIdMutator(applicationId)}>
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ApplicationDetailPage;
