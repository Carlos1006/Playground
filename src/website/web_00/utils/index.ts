import dayjs, { Dayjs } from "dayjs";

export const getExactAge = (birthDate: Dayjs): number => {
  const now = dayjs();
  const birthDateObj = dayjs(birthDate.toDate());
  const age = now.diff(birthDateObj, "year");
  return age;
};
