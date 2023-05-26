const cheerio = require("cheerio");
const axios = require("axios");
const j2c = require("json2csv").Parser;
const fs = require("fs");

const mystery =
  "https://books.toscrape.com/catalogue/category/books/mystery_3/index.html";
const base = "https://books.toscrape.com/catalogue/category/books/mystery_3/";
const book_data = [];

async function getBooks(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const books = $("article");
    books.each(function () {
      title = $(this).find("h3 a").text();
      price = $(this).find(".price_color").text();
      stock = $(this).find(".availability").text().trim();

      book_data.push({ title, price, stock });
    });

    if ($(".next a").length > 0) {
      next_page = base + $(".next a").attr("href");
      getBooks(next_page);
    } else {
      const parser = new j2c();
      const csv = parser.parse(book_data);
      fs.writeFileSync("./books.csv", csv);
    }

    console.log(book_data);
  } catch (error) {
    console.log(error);
  }
}

getBooks(mystery);
