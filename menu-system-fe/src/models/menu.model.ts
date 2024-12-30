export type Menu = {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: number;
  updatedAt: number | null;
  children?: Menu[];
};
