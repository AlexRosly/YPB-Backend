const {
  UaCatalogForHotelier,
  RuCatalogForHotelier,
  PlCatalogForHotelier,
  EnCatalogForHotelier,
} = require("../../models");
const { pageCatalog } = require("../../utils");
require("dotenv").config();

const { MAIN_DOMAIN } = process.env;

const CyrillicToTranslit = require("cyrillic-to-translit-js");
const cyrillicToTranslit = new CyrillicToTranslit();

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
    ? `${city} ${state} ${country} ${language}`
    : `${district} ${city} ${state} ${country} ${language}`;

  const translit = cyrillicToTranslit.transform(getString, "-").toLowerCase();

  switch (language) {
    case "uk":
      for (const link of pageCatalog.uk) {
        const createUrl = `${MAIN_DOMAIN}${link}-${translit}`;
        const getIndex = pageCatalog.uk.indexOf(link);
        const createDescription = pageCatalog.en[getIndex];

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
            description: createDescription,
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
            description: createDescription,
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
        const getIndex = pageCatalog.ru.indexOf(link);
        const createDescription = pageCatalog.en[getIndex];

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
            description: createDescription,
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
            description: createDescription,
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
        const getIndex = pageCatalog.pl.indexOf(link);
        const createDescription = pageCatalog.en[getIndex];

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
            description: createDescription,
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
            description: createDescription,
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
        // console.log({ link });
        // console.log("index", pageCatalog.en.indexOf(link));
        const createUrl = `${MAIN_DOMAIN}${link}-${translit}`;
        const getIndex = pageCatalog.en.indexOf(link);
        const createDescription = pageCatalog.en[getIndex];
        // console.log({ createDescription });
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
            description: createDescription,
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
            description: createDescription,
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
