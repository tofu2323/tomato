const pad = (val: number) => {
  const valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
};

const secToText = (_sec: number) => {
  const min = parseInt(String(_sec / 60));
  const sec = _sec % 60;
  return `${min}:${pad(sec)}`;
};

export const Utils = { secToText };
