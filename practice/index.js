const request = require("request-promise");
const cheerio = require("cheerio");

const userReview = [];
const URL =
  "https://www.imdb.com/title/tt6791350/?ref_=hm_fanfav_tt_t_1_pd_fp1";

(async () => {
  const response = await request(URL);

  let $ = cheerio.load(response);

  let title = $("h1> span").text();
  let Likes = $(
    'span[class="ipc-voting__label"]>span[class="ipc-voting__label__count ipc-voting__label__count--up"]'
  ).text();
  let Dislikes = $(
    'span[class="ipc-voting__label"]>span[class="ipc-voting__label__count ipc-voting__label__count--down"]'
  ).text();

  userReview.push({
    Likes: Likes,
    Dislikes: Dislikes,
  });

  console.log("Title : ", title);
  console.log("userReviews : ", userReview);
})();
