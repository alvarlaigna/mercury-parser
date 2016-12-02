import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

describe('WwwAolComExtractor', () => {
  it('is selected properly', () => {
    // This test should be passing by default.
    // It sanity checks that the correct parser
    // is being selected for URLs from this domain
    const url =
      'http://www.aol.com/article/news/2016/12/01/son-of-slain-police-officer-given-teddy-bears-made-from-dads-un/21618553/';
    const extractor = getExtractor(url);
    assert.equal(extractor.domain, URL.parse(url).hostname);
  });

  it('returns the title', async () => {
    // To pass this test, fill out the title selector
    // in ./src/extractors/custom/www.aol.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.aol.com/1480618816916.html');
    const articleUrl =
      'http://www.aol.com/article/news/2016/12/01/son-of-slain-police-officer-given-teddy-bears-made-from-dads-un/21618553/';

    const { title } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(title, 'Son of slain police officer given teddy bears made from dad\'s uniform');
  });

  it('returns the author', async () => {
    // To pass this test, fill out the author selector
    // in ./src/extractors/custom/www.aol.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.aol.com/1480618816916.html');
    const articleUrl =
      'http://www.aol.com/article/news/2016/12/01/son-of-slain-police-officer-given-teddy-bears-made-from-dads-un/21618553/';

    const { author } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(author, 'AOL Staff');
  });

  it('returns the date_published', async () => {
    // To pass this test, fill out the date_published selector
    // in ./src/extractors/custom/www.aol.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.aol.com/1480618816916.html');
    const articleUrl =
      'http://www.aol.com/article/news/2016/12/01/son-of-slain-police-officer-given-teddy-bears-made-from-dads-un/21618553/';

    const { date_published } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(date_published, '2016-12-01T18:01:00.000Z');
  });

  it('returns the lead_image_url', async () => {
    // To pass this test, fill out the lead_image_url selector
    // in ./src/extractors/custom/www.aol.com/index.js.
    const html =
      fs.readFileSync('./fixtures/www.aol.com/1480618816916.html');
    const articleUrl =
      'http://www.aol.com/article/news/2016/12/01/son-of-slain-police-officer-given-teddy-bears-made-from-dads-un/21618553/';

    const { lead_image_url } =
      await Mercury.parse(articleUrl, html, { fallback: false });

    // Update these values with the expected values from
    // the article.
    assert.equal(lead_image_url, 'http://o.aolcdn.com/dims-shared/dims3/GLOB/crop/475x312+0+0/resize/1028x675!/format/jpg/quality/85/http%3A%2F%2Fo.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2Fc8242ab14e089c284b031379d025d64%2F204656928%2FScreen%2BShot%2B2016-12-01%2Bat%2B1.15.51%2BPM.png');
  });

  it('returns the content', async () => {
    // To pass this test, fill out the content selector
    // in ./src/extractors/custom/www.aol.com/index.js.
    // You may also want to make use of the clean and transform
    // options.
    const html =
      fs.readFileSync('./fixtures/www.aol.com/1480618816916.html');
    const url =
      'http://www.aol.com/article/news/2016/12/01/son-of-slain-police-officer-given-teddy-bears-made-from-dads-un/21618553/';

    const { content } =
      await Mercury.parse(url, html, { fallback: false });

    const $ = cheerio.load(content || '');

    const first13 = excerptContent($('*').first().text(), 13);

    // Update these values with the expected values from
    // the article.
    assert.equal(first13, 'ST. LOUIS, MO (KTVI) – Amid unimaginable grief, the widow of slain Saint');
  });
});