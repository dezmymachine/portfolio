import { apiClient } from "./config";

export const apiGetAllSkills = async () => {
  return apiClient.get("/skills");
};

export const apiGetskill = async (id) => {
  return apiClient.get(`/skills/${id}`);
};
