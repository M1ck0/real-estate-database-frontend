export const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const sortByName = (arr, order = "asc") => {
  return arr.sort((a, b) => {
    if (order === "asc") {
      return a.name.localeCompare(b.name); // Ascending order (A-Z)
    } else if (order === "desc") {
      return b.name.localeCompare(a.name); // Descending order (Z-A)
    } else {
      throw new Error('Order must be "asc" or "desc"');
    }
  });
};

export const compareArrays = (arr1, arr2) => {
  // Check if the arrays have the same length
  if (arr1.length !== arr2.length) return false;

  // Sort both arrays and compare them
  const sortedArr1 = arr1.slice().sort(); // Create a sorted copy of arr1
  const sortedArr2 = arr2.slice().sort(); // Create a sorted copy of arr2

  return sortedArr1.every((value, index) => value === sortedArr2[index]);
};
