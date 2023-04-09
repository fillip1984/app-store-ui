import { Application, ApplicationSummary } from "../Types";

import { backendApi } from "./BackendApi";

export const applicationKeys = {
  all: ["applications"] as const,
  lists: () => [...applicationKeys.all, "list"] as const,
  list: (filters: string) => [...applicationKeys.lists(), { filters }] as const,
  details: () => [...applicationKeys.all, "detail"] as const,
  detail: (id: string) => [...applicationKeys.details(), id] as const,
};

// methods are CRRUD or Create, Read all, Read by id, update, delete, followed by specialized apis
export const createApplication = async (
  application: Application
): Promise<Application> => {
  console.log("Creating application");
  const response = await backendApi.post<Application>(
    "/applications",
    application
  );
  return response.data;
};

export const readAllApplications = async (): Promise<ApplicationSummary[]> => {
  console.log("Reading all applications");
  const response = await backendApi.get<ApplicationSummary[]>("/applications");
  return response.data;
};

export const readApplicationById = async (id: number): Promise<Application> => {
  console.log("Reading application with id", id);
  const response = await backendApi.get<Application>(`/applications/${id}`);
  return response.data;
};

export const updateApplication = async (
  application: Application
): Promise<Application> => {
  console.log(`Updating application with id: ${application.id}`);
  const response = await backendApi.put<Application>(
    `/applications/${application.id}`,
    application
  );
  return response.data;
};

export const deleteApplicationById = async (id: number): Promise<boolean> => {
  console.log(`Deleting application with id: ${id}`);
  const response = await backendApi.delete<boolean>(`/applications/${id}`);
  return response.data;
};
