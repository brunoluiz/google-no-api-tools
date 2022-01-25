# Google no-API tools

🙃 Life is too short to set-up an account on GCP

## Use-cases

### [`placeFromMapsURL`](./src/extractors/maps.ts)

Gets data from a Google Maps URL preview, such as the picture below, using the HTTP `meta` tags

![](./static/placeFromMapsURL-example.jpg)

```js
const { placeFromMapsURL } = require("@brunoluiz/google-no-api-tools");

(async () => {
  // other compatible URLs:
  // https://goo.gl/maps/ozMj6VujKX2KYcaS9
  // https://g.page/oriolebar-cocktails-live-music?share
  const res = await placeFromMapsURL("https://www.google.com/maps/place/?q=place_id:ChIJtczIQ68cdkgR0m45hoeIN8Y");
  console.log(res);
})();

/*
Response:
{
  slug: 'ozone-coffee-roasters-shoreditch',
  name: 'Ozone Coffee Roasters, Shoreditch',
  type: 'Coffee shop',
  address: '11 Leonard St, London EC2A 4AQ',
  rating: 5,
  url: 'https://www.google.com/maps/place/?q=place_id:ChIJtczIQ68cdkgR0m45hoeIN8Y',
  photo: 'https://lh5.googleusercontent.com/p/AF1QipMvEB-44Gi4KMq8BZzH24pOlC7oGQ6uP8uSfXag=w512-h512-k-no-p'
}
*/
```

### [`jsonFromSheetURL`](./src/extractors/sheets.ts)

Convert a public Google Sheets into a JSON Payload

```js
const { jsonFromSheetURL } = require("@brunoluiz/google-no-api-tools");

(async () => {
  const res = await jsonFromSheetURL("some-public-sheet-id");
  console.log(res);
})();
```

### [`csvFromSheetURL`](./src/extractors/sheets.ts)

Convert a public Google Sheets into a CSV Payload

```js
const { csvFromSheetURL } = require("@brunoluiz/google-no-api-tools");

(async () => {
  const res = await csvFromSheetURL("some-public-sheet-id");
  console.log(res);
})();
```
