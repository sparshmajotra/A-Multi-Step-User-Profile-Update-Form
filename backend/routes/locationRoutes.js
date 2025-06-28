const express = require("express");
const router = express.Router();

/**
 * Dummy static data
 * You can replace this with a MongoDB collection if needed
 */
const countries = [
  { code: "IN", name: "India" },
  { code: "US", name: "United States" }
];

const states = {
  IN: [
    { code: "KA", name: "Karnataka" },
    { code: "MH", name: "Maharashtra" }
  ],
  US: [
    { code: "CA", name: "California" },
    { code: "NY", name: "New York" }
  ]
};

const cities = {
  KA: [
    { code: "BLR", name: "Bangalore" },
    { code: "MYS", name: "Mysore" }
  ],
  MH: [
    { code: "MUM", name: "Mumbai" },
    { code: "PUN", name: "Pune" }
  ],
  CA: [
    { code: "LA", name: "Los Angeles" },
    { code: "SF", name: "San Francisco" }
  ],
  NY: [
    { code: "NYC", name: "New York City" },
    { code: "BUF", name: "Buffalo" }
  ]
};

/** GET /api/locations/countries */
router.get("/countries", (req, res) => {
  res.json(countries);
});

/** GET /api/locations/states/:countryCode */
router.get("/states/:countryCode", (req, res) => {
  const { countryCode } = req.params;
  res.json(states[countryCode] || []);
});

/** GET /api/locations/cities/:stateCode */
router.get("/cities/:stateCode", (req, res) => {
  const { stateCode } = req.params;
  res.json(cities[stateCode] || []);
});

module.exports = router;
