export const numberWithCommas = (x) => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export const getDateStringFromIsoTimestamp = (isoTimeStamp) => {
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
    isoTimeStamp
  );
  const mo = new Intl.DateTimeFormat("en", { month: "long" }).format(
    isoTimeStamp
  );
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
    isoTimeStamp
  );
  return `${da}-${mo}-${ye}`;
};
