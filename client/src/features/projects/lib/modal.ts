interface PCProject {
  id: string;
  name: string;
  cpu: string;
  gpu: string;
  priceUZS: number;
  status: 'Completed' | 'In Progress';
  updatedAt: string;
}

export type { PCProject };
