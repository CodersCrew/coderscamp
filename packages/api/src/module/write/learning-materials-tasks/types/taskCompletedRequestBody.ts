export interface TaskCompletedRequestBody {
  id: string;
  createdDate: string;
  data: {
    id: string;
    status: string;
    stopped: boolean;
    hidden: boolean;
    name: string;
  };
  type: string;
}
