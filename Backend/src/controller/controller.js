const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");

const axios = require("axios");
const XLSX = require("xlsx");
const jsontoxml = require("jsontoxml");

const imageToText = async (req, res) => {
  console.log(req);
  let file = req.files;
  console.log(file[0].buffer);

  try {
    Tesseract.recognize(file[0].buffer, "eng", {
      logger: (m) => console.log(m),
    }).then(({ data: { text } }) => {
      res.send(text);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const pdfToText = async (req, res) => {
  let file = req.files[0].buffer;
  console.log(file);

  try {
    pdfParse(file).then((result) => {
      res.send({ totalPages: result.numpages, text: result.text });
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const xlToText = async (req, res) => {
  let url = req.body.url;
  const options = {
    url,
    responseType: "arraybuffer",
  };
  let axiosResponse = await axios(options);
  const workbook = XLSX.read(axiosResponse.data);

  let worksheets = workbook.SheetNames.map((sheetName) => {
    return {
      sheetName,
      data: XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]),
    };
  });

  let data = JSON.stringify(worksheets);

  console.log(data);

  return res.send(data);
};

module.exports = { imageToText, pdfToText, xlToText };
