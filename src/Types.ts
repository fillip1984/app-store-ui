import { z } from "zod";

const BaseSchema = z.object({
  id: z.number(),
});

export const ApplicationSummarySchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().min(10).max(500),
  //waiting on: https://github.com/colinhacks/zod/issues/310
  repositoryUrl: z.string().url().optional().or(z.literal("")),
});

const ApplicationSummary = ApplicationSummarySchema.merge(BaseSchema);
export type ApplicationSummary = z.infer<typeof ApplicationSummary>;

const ApplicationSchema = ApplicationSummary;
export type Application = z.infer<typeof ApplicationSchema>;
