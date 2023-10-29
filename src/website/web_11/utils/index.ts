export const _url_ = (url: string) => {
  return `url(${url})`;
};

export const _atr_ = (
  condition: boolean,
  classTrue: string,
  classFalse = ""
) => {
  return condition ? classTrue : classFalse;
};
