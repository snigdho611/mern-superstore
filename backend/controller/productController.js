const getResponse = (req, res) => {
  console.log("Root directory");
  res.status(200).send({ message: "Okay" });
};

module.exports = getResponse;
