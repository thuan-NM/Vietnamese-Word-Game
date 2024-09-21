import { apiElement } from "./core";

const api = {
  subjects: apiElement("GET", "/subjects"),
  questions: apiElement("GET", "/subjects/:subjectId/:challengeId/qnas"),
  getPoint: apiElement("GET", "/totalpoint/:id"),
};

export default api;
