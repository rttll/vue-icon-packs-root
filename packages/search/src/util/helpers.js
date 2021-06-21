const equals = (a, b) => {
  if (Object.keys(a).length !== Object.keys(b).length) return false;
  return (
    Object.keys(a)
      .map((k) => a[k] === b[k])
      .indexOf(false) === -1
  );
};

export { equals };
