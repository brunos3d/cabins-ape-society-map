import fetch from 'node-fetch';
import fs from 'fs';

(async () => {
  const map: Record<string, any> = {};

  for (let x = 1; x < 101; x++) {
    console.log(`fetching: ${x}`);

    const response = await getAssetsByCoordinates(x);

    if (!response.ok) continue;

    const { assets } = await response.json();

    if (assets.length === 0) continue;

    for (const asset of assets) {
      const y = asset.traits['y coordinate'];
      map[`${x},${y}`] = asset;
      console.log(`${x},${y}`, asset);
    }

    fs.writeFileSync('./assets.json', JSON.stringify(map, null, 2));

    sleep(500);
  }

  fs.writeFileSync('./assets.json', JSON.stringify(map, null, 2));
})();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getAssetsByCoordinates(x: number) {
  return fetch(
    `https://api.cnftpredator.tools/tools/collections/51824?page=1&perPage=101&sort=assetNumber&sortDirection=asc&traitFilterLogic=intersection&traits=%7B%22x+coordinate%22:[%22${x}%22]%7D`,
    {
      headers: {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9,pt;q=0.8',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'x-api-key': 'P8u33WTGgeUMLEUMtqCg8NWn3D0t2JYK',
        Referer: 'https://www.cnftjungle.io/',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      method: 'GET',
    }
  );
}
