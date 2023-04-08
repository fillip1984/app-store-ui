import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { Application } from "../../services/Types";
import { Link } from "react-router-dom";

const ApplicationNew = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Application>({
    defaultValues: {
      name: "",
      description: "",
      repository: "",
    },
  });

  const onSubmit: SubmitHandler<Application> = (formData) => {
    console.log(formData);
  };

  const descriptionWatch = useWatch({ control, name: "description" });

  return (
    <div className="container mx-auto">
      <h2>New Application</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label className="text-2xl">Name</label>
          <input
            type="text"
            {...register("name", {
              required: { value: true, message: "Field is required" },
              minLength: {
                value: 2,
                message: "Field must be between 2 and 100 characters",
              },
              maxLength: {
                value: 100,
                message: "Field must be between 2 and 100 characters",
              },
            })}
            className="w-full rounded"
            autoFocus
          />
          {errors.name && (
            <span className="text-red-400">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Description</label>
          <div className="relative">
            <textarea
              {...register("description", {
                required: { value: true, message: "Field is required" },
                minLength: {
                  value: 10,
                  message: "Field must be between 10 and 500 characters",
                },
                maxLength: {
                  value: 500,
                  message: "Field must be between 10 and 500 characters",
                },
              })}
              className="w-full rounded"
              rows={10}
            />
            <span
              className={`absolute bottom-2 right-2 ${
                descriptionWatch.length > 500 ? "text-red-400" : ""
              }`}>
              {descriptionWatch.length}/500
            </span>
          </div>
          {errors.description && (
            <span className="text-red-400">{errors.description.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Repository</label>
          <input
            type="text"
            {...register("repository", {
              required: { value: true, message: "Field is required" },
              minLength: {
                value: 2,
                message: "Field must be between 2 and 100 characters",
              },
              maxLength: {
                value: 100,
                message: "Field must be between 2 and 100 characters",
              },
            })}
            className="w-full rounded"
            autoFocus
          />
          {errors.name && (
            <span className="text-red-400">{errors.name.message}</span>
          )}
        </div>

        <div className="mt-4 flex gap-3">
          <button
            type="submit"
            className="rounded bg-sky-600 px-4 py-2 text-2xl text-white">
            Save
          </button>
          <Link
            to="/applications"
            className="rounded border-2 border-sky-600 px-4 py-2 text-2xl text-sky-600">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ApplicationNew;
