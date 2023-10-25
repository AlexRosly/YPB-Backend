const secretCodeForAdmin = () => {
  const firstNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const secondNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const thirdNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const fouthNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const fivethNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const sixthNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const seventhNumber = Math.floor(Math.random() * (10 - 1) + 1);

  const secretCode = `${firstNumber}${secondNumber}${thirdNumber}${fouthNumber}${fivethNumber}${sixthNumber}${seventhNumber}`;
  return secretCode;
};

module.exports = secretCodeForAdmin;
