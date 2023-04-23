const {
  UaCatalogForHotelier,
  RuCatalogForHotelier,
  PlCatalogForHotelier,
  EnCatalogForHotelier,
} = require("../../models");

const CyrillicToTranslit = require("cyrillic-to-translit-js");

const cyrillicToTranslit = new CyrillicToTranslit();

const MAIN_DOMAIN = "https://www.yourpricebooking.com/";

const pageCatalog = {
  ru: [
    "sdat-posutochno-zhile",
    "sdat-nomer-v-motele",
    "sdat-nomer-v-capsule-hotel",
    "sdat-nomer-v-guest-house",
    "sdat-komnatu-v-dome-posutochno",
    "sdat-komnatu-v-kvartire-posutochno",
    "sdat-mesto-v-hostele",
    "sdat-nomer-v-otele",
    "sdat-nomer-v-gostinitse",
    "sdat-dom-posutochno",
    "sdat-apartamenty-posutochno",
    "sdat-kvartiru-posutochno",
  ],
  uk: [
    "zdati-zhitlo-dobovo",
    "zdati-nomer-u-moteli",
    "zdati-nomer-v-capsule-hotel",
    "zdati-nomer-v-guest-house",
    "zdati-kimnatu-v-budinku-dobovo",
    "zdati-kimnatu-dobovo",
    "zdati-mistse-u-hosteli",
    "zdati-nomer-u-goteli",
    "zdati-nomer-v-goteli-vsih-tipiv",
    "zdati-budinok-dobovo",
    "zdati-apartamenti-dobovo",
    "zdati-kvartiru-dobovo",
  ],
  en: [
    "rent-out-housing-daily",
    "rent-a-motel-room",
    "rent-a-room-in-capsule-hotel",
    "rent-a-room-in-guest-house",
    "rent-a-room-in-a-house-daily",
    "rent-a-room-in-a-flat-daily",
    "rent-a-place-in-a-hostel",
    "rent-a-hotel-room-daily",
    "rent-a-hotel-room-in-hotel-of-all-types",
    "rent-a-house-daily",
    "rent-an-apartment-daily",
    "rent-a-flat-daily",
  ],
  pl: [
    "wynajmę-mieszkanie",
    "wynajmę-pokój-w-motelu",
    "wynajmę-pokój-w-hotelu-kapsułowym",
    "wynajmę-pokój-w-domu-gościnnym",
    "wynajmę-pokój-w-domu",
    "wynajmę-pokój-w-mieszkaniu",
    "wynajmę-miejsce-w-hostelu",
    "wynajmij-pokój-w-hotelu",
    "wynająć-w-hotelach-wszystkich-typów",
    "wynająć-dom",
    "wynajem-mieszkań-do-wynajęcia",
    "wynająć-mieszkanie",
  ],
};

const createNewPages = async (req, res) => {
  const { language, idLocation, district, city, state, country } = req.body;

  let isPageAdded = false;

  //   const foo = async () => {
  //     for (const link of pageCatalog.ua) {
  //       //   arrayOfLinks.push(
  //       //     `${MAIN_DOMAIN}${link}-${district}-${city}-${state}-${country}`
  //       //   );

  //       const addToUaCatalog = await UaCatalogForHotelier.create({
  //         ...req.body,
  //         nameOfpage: district,
  //         url: `${MAIN_DOMAIN}${link}-${district}-${city}-${state}-${country}`,
  //       });

  //       if (addToUaCatalog) {
  //         return  isPageAdded = true);
  //       }
  //     }
  //   };

  //   const getString = `${district} ${city} ${state} ${country}`;
  const getString = !district
    ? `${city} ${state} ${country}`
    : `${district} ${city} ${state} ${country}`;

  const translit = cyrillicToTranslit.transform(getString, "-").toLowerCase();

  switch (language) {
    case "uk":
      for (const link of pageCatalog.uk) {
        const createUrl = `${MAIN_DOMAIN}${link}-${translit}`;
        const checkLinkPlCatalog = await PlCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkUACatalog = await UaCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkRuCatalog = await RuCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkEnCatalog = await EnCatalogForHotelier.find({
          url: createUrl,
        });

        if (
          checkLinkPlCatalog.length === 0 &&
          checkLinkUACatalog.length === 0 &&
          checkLinkRuCatalog.length === 0 &&
          checkLinkEnCatalog.length === 0
        ) {
          const addToUaCatalog = await UaCatalogForHotelier.create({
            ...req.body,
            nameOfpage: district,
            url: createUrl,
          });
          if (addToUaCatalog) {
            isPageAdded = true;
          } else {
            res.status(406).json({
              status: "error",
              isAdded: false,
              message: `pages doesn't added to ${language} catalog hotelier`,
              code: 406,
            });
          }
        } else {
          const upgradeUrl = `${MAIN_DOMAIN}${link}-${translit}-${language}`;
          const addToUaCatalog = await UaCatalogForHotelier.create({
            ...req.body,
            nameOfpage: district,
            url: upgradeUrl,
          });

          if (addToUaCatalog) {
            isPageAdded = true;
          } else {
            res.status(406).json({
              status: "error",
              isAdded: false,
              message: `pages doesn't added to ${language} catalog hotelier`,
              code: 406,
            });
          }
        }
      }

      const uaPages = await UaCatalogForHotelier.find({
        idLocation,
      });
      res.status(201).json({
        status: "success",
        isAdded: true,
        message: `pages added to ${language} catalog hotelier`,
        code: 201,
        data: {
          uaPages,
        },
      });
      break;

    case "ru":
      for (const link of pageCatalog.ru) {
        const createUrl = `${MAIN_DOMAIN}${link}-${translit}`;
        const checkLinkPlCatalog = await PlCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkUACatalog = await UaCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkRuCatalog = await RuCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkEnCatalog = await EnCatalogForHotelier.find({
          url: createUrl,
        });

        if (
          checkLinkPlCatalog.length === 0 &&
          checkLinkUACatalog.length === 0 &&
          checkLinkRuCatalog.length === 0 &&
          checkLinkEnCatalog.length === 0
        ) {
          const addToRuCatalog = await RuCatalogForHotelier.create({
            ...req.body,
            nameOfpage: district,
            url: createUrl,
          });
          if (addToRuCatalog) {
            isPageAdded = true;
          } else {
            res.status(406).json({
              status: "error",
              isAdded: false,
              message: `pages doesn't added to ${language} catalog hotelier`,
              code: 406,
            });
          }
        } else {
          const upgradeUrl = `${MAIN_DOMAIN}${link}-${translit}-${language}`;

          const addToRuCatalog = await RuCatalogForHotelier.create({
            ...req.body,
            nameOfpage: district,
            url: upgradeUrl,
          });

          if (addToRuCatalog) {
            isPageAdded = true;
          } else {
            res.status(406).json({
              status: "error",
              isAdded: false,
              message: `pages doesn't added to ${language} catalog hotelier`,
              code: 406,
            });
          }
        }
      }

      const ruPages = await RuCatalogForHotelier.find({
        idLocation,
      });
      res.status(201).json({
        status: "success",
        isAdded: true,
        message: `pages added to ${language} catalog hotelier`,
        code: 201,
        data: {
          ruPages,
        },
      });
      break;

    case "pl":
      for (const link of pageCatalog.pl) {
        const createUrl = `${MAIN_DOMAIN}${link}-${translit}`;
        const checkLinkPlCatalog = await PlCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkUACatalog = await UaCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkRuCatalog = await RuCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkEnCatalog = await EnCatalogForHotelier.find({
          url: createUrl,
        });

        if (
          checkLinkPlCatalog.length === 0 &&
          checkLinkUACatalog.length === 0 &&
          checkLinkRuCatalog.length === 0 &&
          checkLinkEnCatalog.length === 0
        ) {
          const addToPlCatalog = await PlCatalogForHotelier.create({
            ...req.body,
            nameOfpage: district,
            url: createUrl,
          });
          if (addToPlCatalog) {
            isPageAdded = true;
          } else {
            res.status(406).json({
              status: "error",
              isAdded: false,
              message: `pages doesn't added to ${language} catalog hotelier`,
              code: 406,
            });
          }
        } else {
          const upgradeUrl = `${MAIN_DOMAIN}${link}-${translit}-${language}`;

          const addToPlCatalog = await PlCatalogForHotelier.create({
            ...req.body,
            nameOfpage: district,
            url: upgradeUrl,
          });

          if (addToPlCatalog) {
            isPageAdded = true;
          } else {
            res.status(406).json({
              status: "error",
              isAdded: false,
              message: `pages doesn't added to ${language} catalog hotelier`,
              code: 406,
            });
          }
        }
      }

      const plPages = await PlCatalogForHotelier.find({
        idLocation,
      });
      res.status(201).json({
        status: "success",
        isAdded: true,
        message: `pages added to ${language} catalog hotelier`,
        code: 201,
        data: {
          plPages,
        },
      });

      break;

    case "en":
      for (const link of pageCatalog.en) {
        const createUrl = `${MAIN_DOMAIN}${link}-${translit}`;
        const checkLinkPlCatalog = await PlCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkUACatalog = await UaCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkRuCatalog = await RuCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkEnCatalog = await EnCatalogForHotelier.find({
          url: createUrl,
        });

        if (
          checkLinkPlCatalog.length === 0 &&
          checkLinkUACatalog.length === 0 &&
          checkLinkRuCatalog.length === 0 &&
          checkLinkEnCatalog.length === 0
        ) {
          const addToEnCatalog = await EnCatalogForHotelier.create({
            ...req.body,
            nameOfpage: district,
            url: createUrl,
          });
          if (addToEnCatalog) {
            isPageAdded = true;
          } else {
            res.status(406).json({
              status: "error",
              isAdded: false,
              message: `pages doesn't added to ${language} catalog hotelier`,
              code: 406,
            });
          }
        } else {
          const upgradeUrl = `${MAIN_DOMAIN}${link}-${translit}-${language}`;
          const addToEnCatalog = await EnCatalogForHotelier.create({
            ...req.body,
            nameOfpage: district,
            url: upgradeUrl,
          });

          if (addToEnCatalog) {
            isPageAdded = true;
          } else {
            res.status(406).json({
              status: "error",
              isAdded: false,
              message: `pages doesn't added to ${language} catalog hotelier`,
              code: 406,
            });
          }
        }
      }

      const enPages = await EnCatalogForHotelier.find({
        idLocation,
      });
      res.status(201).json({
        status: "success",
        isAdded: true,
        message: `pages added to ${language} catalog hotelier`,
        code: 201,
        data: {
          enPages,
        },
      });
      break;

    default:
      res.status(405).json({
        status: "error",
        message: `This DB doesn't has language ${language} for create pages`,
        code: 405,
      });
      break;
  }
};

module.exports = createNewPages;
