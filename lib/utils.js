const Notification = {
  WELCOME: "WELCOME",
  CHANGE_OF_STOCK: "CHANGE_OF_STOCK",
  LOWEST_PRICE: "LOWEST_PRICE",
  THRESHOLD_MET: "THRESHOLD_MET",
};

const THRESHOLD_PERCENTAGE = 40;

/**
 * @typedef {Object} PriceHistoryItem
 * @property {number} price
 */

/**
 * @typedef {Object} Product
 * @property {string} [ _id ]
 * @property {string} url
 * @property {string} currency
 * @property {string} image
 * @property {string} title
 * @property {number} currentPrice
 * @property {number} originalPrice
 * @property {PriceHistoryItem[]} priceHistory
 * @property {number} highestPrice
 * @property {number} lowestPrice
 * @property {number} averagePrice
 * @property {number} discountRate
 * @property {string} description
 * @property {string} category
 * @property {number} reviewsCount
 * @property {number} stars
 * @property {boolean} isOutOfStock
 * @property {{ email: string }[]} [users]
 */

export function extractPrice(...elements) {
  for (const element of elements) {
    const priceText = element.text().trim();

    if (priceText) {
      const cleanPrice = priceText.replace(/[^\d.]/g, "");

      let firstPrice;

      if (cleanPrice) {
        firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0];
      }

      return firstPrice || cleanPrice;
    }
  }

  return "";
}

export function extractCurrency(element) {
  const currencyText = element.text().trim().slice(0, 1);
  return currencyText || "";
}

export function extractDescription($) {
  const selectors = [".a-unordered-list .a-list-item", ".a-expander-content p"];

  for (const selector of selectors) {
    const elements = $(selector);
    if (elements.length > 0) {
      const textContent = elements
        .map((_, element) => $(element).text().trim())
        .get()
        .join("\n");
      return textContent;
    }
  }

  return "";
}

export function getHighestPrice(priceList) {
  let highestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price > highestPrice.price) {
      highestPrice = priceList[i];
    }
  }

  return highestPrice.price;
}

export function getLowestPrice(priceList) {
  let lowestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price < lowestPrice.price) {
      lowestPrice = priceList[i];
    }
  }

  return lowestPrice.price;
}

export function getAveragePrice(priceList) {
  const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
  const averagePrice = sumOfPrices / priceList.length || 0;

  return averagePrice;
}

/**
 * @param {Product} scrapedProduct
 * @param {Product} currentProduct
 * @returns {string|null}
 */
export const getEmailNotifType = (scrapedProduct, currentProduct) => {
  const lowestPrice = getLowestPrice(currentProduct.priceHistory);

  if (scrapedProduct.currentPrice < lowestPrice) {
    return Notification.LOWEST_PRICE;
  }
  if (!scrapedProduct.isOutOfStock && currentProduct.isOutOfStock) {
    return Notification.CHANGE_OF_STOCK;
  }
  if (scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE) {
    return Notification.THRESHOLD_MET;
  }

  return null;
};

export const formatNumber = (num = 0) => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};
