export const _url_ = (url: string): string => {
  return `url(${url})`;
};

export const _atr_ = (
  condition: boolean,
  classTrue: string,
  classFalse = ""
): string => {
  return condition ? classTrue : classFalse;
};
