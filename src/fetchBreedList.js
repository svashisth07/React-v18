const fetchBreedList = async ({ queryKey }) => {
  const animal = queryKey[1];
  const res = await fetch(
    `http://pets-v2.dev-apis.com/breeds?animal=${animal}`,
  );
  if (!res.ok) {
    throw new Error(`fetch breeds for ${animal} failed`);
  }
  return res.json();
};

export default fetchBreedList;
