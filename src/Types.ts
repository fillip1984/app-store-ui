interface Base {
  id: number;
}

export interface ApplicationSummary extends Base {
  name: string;
  description: string;
  repositoryUrl: string;
}

export type Application = ApplicationSummary;
