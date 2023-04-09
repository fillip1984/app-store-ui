import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const ApplicationNew = () => {
  const newApplicationSchema = z.object({
    name: z.string().min(2).max(100),
    description: z.string().min(10).max(500),
    //waiting on: https://github.com/colinhacks/zod/issues/310
    repository: z.string().url().optional().or(z.literal("")),
  });

  type NewApplicationSchemaType = z.infer<typeof newApplicationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    // control,
  } = useForm<NewApplicationSchemaType>({
    resolver: zodResolver(newApplicationSchema),
  });

  const onSubmit: SubmitHandler<NewApplicationSchemaType> = (formData) => {
    console.log(formData);
  };

  const descriptionWatch = useWatch({ control, name: "description" });

  return (
    <div className="container">
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
          <input type="text" id="repository" {...register("repository")} />
          {errors.repository && (
            <span className="validation-text">{errors.repository.message}</span>
          )}
        </div>

        <div className="mt-4 flex gap-3">
          <button type="submit" className="primary-btn" disabled={isSubmitting}>
            Save
          </button>
          <Link to="/applications" className="secondary-btn">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ApplicationNew;
