import axios from "axios";
import cheerio from "cheerio";
import { toSlug } from "../tools/string";

export type Place = {
  slug: string;
  name: string;
  type: string;
  rating: number;
  address: string;
  url: string;
  photo: string;
};

export const placeInfoFromURL = async (url: string): Promise<Place> => {
  const res = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15",
    },
  });
  const $ = cheerio.load(res.data);

  const ogTitle = $('meta[property="og:title"]').attr("content");
  const ogImage = $('meta[property="og:image"]').attr("content");
  const ogDescription = $('meta[property="og:description"]').attr("content");

  if (!ogTitle || !ogImage || !ogDescription) {
    throw Error("issue on retrieving information");
  }

  const [name, address] = ogTitle.split(" · ");
  const [rate, type] = ogDescription.split(" · ");

  const slug = toSlug(name);
  const photo = ogImage.replace("w256-h256", "w512-h512");
  const rating = Array.from(rate).reduce((acc, r) => {
    return r === "★" ? acc + 1 : acc;
  }, 0);

  const place: Place = {
    slug,
    name,
    type,
    address,
    rating,
    url,
    photo,
  };

  return place;
};
