import { Tag, TagSummary } from "../Types";

import { backendApi } from "./BackendApi";

export const tagKeys = {
  all: ["tags"] as const,
  lists: () => [...tagKeys.all, "list"] as const,
  list: (filters: string) => [...tagKeys.lists(), { filters }] as const,
  details: () => [...tagKeys.all, "detail"] as const,
  detail: (id: number) => [...tagKeys.details(), id] as const,
};

// methods are CRRUD or Create, Read all, Read by id, update, delete, followed by specialized apis
export const createTag = async (tag: Tag): Promise<Tag> => {
  console.log("Creating tag");
  const response = await backendApi.post<Tag>("/tags", tag);
  return response.data;
};

export const readAllTags = async (): Promise<TagSummary[]> => {
  console.log("Reading all tags");
  const response = await backendApi.get<TagSummary[]>("/tags");
  return response.data;
};

export const readTagById = async (id: number): Promise<Tag> => {
  console.log("Reading tag with id", id);
  const response = await backendApi.get<Tag>(`/tags/${id}`);
  return response.data;
};

export const updateTag = async (tag: Tag): Promise<Tag> => {
  console.log(`Updating tag with id: ${tag.id}`);
  const response = await backendApi.put<Tag>(`/tags/${tag.id}`, tag);
  return response.data;
};

export const deleteTagById = async (id: number): Promise<boolean> => {
  console.log(`Deleting tag with id: ${id}`);
  const response = await backendApi.delete<boolean>(`/tags/${id}`);
  return response.data;
};
