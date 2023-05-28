import { useQuery } from "react-query";
import http from "infrastructure/utilities/http";

export const useRepeatings = () => {
  return useQuery({
    queryKey: ["repeatings"],
    queryFn: () =>
      http.get(`/api/v1/repeatings`).then((response) => response.json()),
  });
};
