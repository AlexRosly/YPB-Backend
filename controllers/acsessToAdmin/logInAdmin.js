const logInAdmin = async (req, res) => {
  const ADMIN_EMAIL = "rosly.a777@gmail.com";
  let code;
  console.log("acsess to admin");

  // create 4 digits code
  const firstNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const secondNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const thirdNumber = Math.floor(Math.random() * (10 - 1) + 1);
  const fouthNumber = Math.floor(Math.random() * (10 - 1) + 1);

  const secretCode = `${firstNumber}${secondNumber}${thirdNumber}${fouthNumber}`;
  const createdCode = new Date();
  const validCode = createdCode.getTime() + 180000;
};

module.exports = logInAdmin;
