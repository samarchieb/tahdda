export interface Todo {
  userId:string;
  id: string;
  title: string;
  completed: boolean;
}
export type PaginationProps = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
};

export type FormData = {
  title: string;
};