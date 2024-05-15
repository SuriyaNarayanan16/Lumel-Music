export const generateRandomString = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let randomString = "";
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }
  return randomString;
};

export const formatDateTime = (createdAt) => {
  const year = createdAt.getFullYear();
  const month = ("0" + (createdAt.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns zero-based month
  const day = ("0" + createdAt.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};
