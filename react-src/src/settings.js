/**
 * @typedef AppSettings
 * @type {object}
 * @property {number} htmlFontSize - The calculated font size for the HTML document
 * @property {string} apiUrl - The base url for the calculator API
 * @property {string} fontFamily - Font family for the theme
 * @property {string} primaryColor - Primary color for the theme
 * @property {string} secondaryColor - Secondary color for the theme
 * @property {string} primaryHeaderText - Primary Header text for calculator
 * @property {object} defaultStatusInfo - Set of statuses and default colors
 */

/** @type {AppSettings} */
const defaultSettings = {
  apiUrl: "https://kaifzva9he.execute-api.us-east-1.amazonaws.com/prod",
  htmlFontSize: 16,
  fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
  primaryColor: "#3f51b5",
  secondaryColor: "#f50057",
  primaryHeaderText: "COVID-19 State Status",
  defaultStatusInfo: {
    none: { status: "None", color: "#2dc937" },
    "shelter-in-place-order": {
      status: "Shelter In Place Order",
      color: "#cc3232"
    },
    "state-of-emergency": { status: "State of Emergency", color: "#e7b416" }
  }
};

/** @type {AppSettings} */
const appSettings = {
  ...defaultSettings,
  ...(window.cov_data || {})
};

export { appSettings };
