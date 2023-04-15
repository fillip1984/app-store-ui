import { z } from "zod";

const BaseSchema = z.object({
  // TODO: only need this for new entities
  id: z.number().default(-1),
});

export const StatusOptions = z.enum(["Backlog", "In progress", "Complete"]);
export const CategoryOptions = z.enum([
  "Finance",
  "Knowledge",
  "Productivity",
  "Tooling",
  "Tutorial",
  "Uncategorized",
]);

export const ApplicationSummarySchema = z
  .object({
    name: z.string().min(2).max(100),
    description: z.string().min(10).max(500),
    // TODO: waiting on: https://github.com/colinhacks/zod/issues/310
    repositoryUrl: z.string().url().optional().or(z.literal("")),
    // TODO: learn how to limit to range of options
    status: StatusOptions,
    category: CategoryOptions,
  })
  .merge(BaseSchema);
export type ApplicationSummary = z.infer<typeof ApplicationSummarySchema>;

const ApplicationSchema = ApplicationSummarySchema;
export type Application = z.infer<typeof ApplicationSchema>;

export const TagSummarySchema = z
  .object({
    name: z.string().min(2).max(100),
    description: z.string().min(10).max(500),
  })
  .merge(BaseSchema);
export type TagSummary = z.infer<typeof TagSummarySchema>;

const TagSchema = TagSummarySchema;
export type Tag = z.infer<typeof TagSchema>;

/// Utility functions
export const isNew = (id: number | string | undefined) => {
  return id === "new";
};
