import { JOBS } from "../helpers/JobIcons";
import { IJobObject } from "../types";

export default function useJobData(index: number): IJobObject {
  const job = JOBS[index];
  if (!job) {
    throw new Error(`Job with index ${index} not found`);
  }
  return job;
}
