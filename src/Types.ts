import { z } from "zod";

const BaseSchema = z.object({
  // TODO: only need this for new entities
  id: z.number().default(-1),
});

export const ApplicationSummarySchema = z
  .object({
    name: z.string().min(2).max(100),
    description: z.string().min(10).max(500),
    //waiting on: https://github.com/colinhacks/zod/issues/310
    repositoryUrl: z.string().url().optional().or(z.literal("")),
  })
  .merge(BaseSchema);
export type ApplicationSummary = z.infer<typeof ApplicationSummarySchema>;

const ApplicationSchema = ApplicationSummarySchema;
export type Application = z.infer<typeof ApplicationSchema>;

export const isNew = (id: number | string | undefined) => {
  return id === "new";
};
