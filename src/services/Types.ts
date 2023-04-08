interface Base {
  id: number;
}

export interface Application extends Base {
  name: string;
  description: string;
  repository: string;
}
