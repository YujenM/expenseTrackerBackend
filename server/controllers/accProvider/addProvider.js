const addProviderService = require("../../service/provider");

module.exports = async (req, res, next) => {
  try {
    console.log("here----", req.decoded.id);
    const { name, type } = req.body;
    const logo_url = req.file ? req.file.path : null;
    const response = await addProviderService.addProvider({
      name,
      type,
      logo_url,
    });

    res.status(201).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
