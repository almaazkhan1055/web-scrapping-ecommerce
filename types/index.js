/**
 * @typedef {Object} PriceHistoryItem
 * @property {number} price
 */

/**
 * @typedef {Object} User
 * @property {string} email
 */

/**
 * @typedef {"WELCOME" | "CHANGE_OF_STOCK" | "LOWEST_PRICE" | "THRESHOLD_MET"} NotificationType
 */

/**
 * @typedef {Object} EmailContent
 * @property {string} subject
 * @property {string} body
 */

/**
 * @typedef {Object} EmailProductInfo
 * @property {string} title
 * @property {string} url
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
 * @property {User[]} [ users ]
 */
