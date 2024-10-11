import { SKILLS } from "../helpers/SkillIcons";
import { ISkillObject } from "../types";

export default function useSkillData(index: number): ISkillObject {
  const job = SKILLS[index];
  if (!job) {
    throw new Error(`Skill with index ${index} not found`);
  }
  return job;
}
