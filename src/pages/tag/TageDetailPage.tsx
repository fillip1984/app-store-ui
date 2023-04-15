import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Tag, TagSummarySchema, isNew } from "../../Types";
import LoadingScreen from "../../components/navigation/LoadingScreen";
import {
  createTag,
  deleteTagById,
  readTagById,
  tagKeys,
  updateTag,
} from "../../services/TagServices";

///
// schema
// const newTagSchema = z.object({
//   name: z.string().min(2).max(100),
//   description: z.string().min(10).max(500),
//   //waiting on: https://github.com/colinhacks/zod/issues/310
//   repositoryUrl: z.string().url().optional().or(z.literal("")),
// });

// export type NewTagSchemaType = z.infer<typeof newTagSchema>;

const TagDetailPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { id } = useParams();
  const tagId = Number(id);

  // retrieves existing entity or builds out one. The result is then reset into react hook form
  const {
    data: tag,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: tagKeys.detail(tagId),
    queryFn: () => {
      if (isNew(id)) {
        return {
          name: "",
          description: "",
        } as Tag;
      } else {
        return readTagById(tagId);
      }
    },
    enabled: !!id, //wait until react router dom finishes retrieving id (will either be 'new' or a number)
    refetchOnWindowFocus: false, // if a user clicks off of the form and returns the data will be refetched and updates reset unless we disable this
  });

  // forces react hook form to reset once we have existing form data
  useEffect(() => {
    if (!isFetching) {
      reset(tag);
    }
  }, [isFetching]);

  const { mutate: deleteTagByIdMutator } = useMutation(deleteTagById, {
    onSuccess: () => {
      queryClient.invalidateQueries(tagKeys.all);
      navigate("/tags");
    },
    onError: () => {
      alert("Error");
    },
  });

  ///
  // react hook form wired up
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<Tag>({
    resolver: zodResolver(TagSummarySchema),
  });

  ///
  // mutation via tanstack query
  const { mutate: createTagMutator } = useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      queryClient.invalidateQueries(tagKeys.lists());
      navigate(-1);
    },
    onError: () => {
      // TODO: finish validation
      alert("error!");
    },
  });

  const { mutate: updateTagMutator } = useMutation({
    mutationFn: updateTag,
    onSuccess: () => {
      queryClient.invalidateQueries(tagKeys.lists());
      queryClient.invalidateQueries(tagKeys.detail(Number(id)));
      navigate(-1);
    },
    onError: () => {
      // TODO: finish validation
      alert("error!");
    },
  });

  const onSubmit: SubmitHandler<Tag> = (formData) => {
    if (isNew(id)) {
      createTagMutator(formData);
    } else {
      updateTagMutator(formData);
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

      <h2 className="my-2">New Tag</h2>
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

        <div className="mt-4 flex gap-3">
          <button type="submit" className="primary-btn" disabled={isSubmitting}>
            Save
          </button>
          <Link to="/tags" className="secondary-btn">
            Cancel
          </Link>
          {!isNew(id) && (
            <button
              type="button"
              className="secondary-btn-danger secondary-btn"
              onClick={() => deleteTagByIdMutator(tagId)}>
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TagDetailPage;
