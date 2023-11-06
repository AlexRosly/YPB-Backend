const {
  UaCatalogForHotelier,
  RuCatalogForHotelier,
  PlCatalogForHotelier,
  EnCatalogForHotelier,
} = require("../../models");
const { createPageObject } = require("../../utils");
const standardInEnglish = require("./standardInEnglish");
require("dotenv").config();

const { MAIN_DOMAIN } = process.env;

const CyrillicToTranslit = require("cyrillic-to-translit-js");
const cyrillicToTranslit = new CyrillicToTranslit();

const createNewPages = async (req, res) => {
  const { language, idLocation, district, city, state, country } = req.body;

  //create object in format pageCatalog={uk:[{link, title, description}]}
  const pageCatalog = createPageObject(city, country);

  let isPageAdded = false;

  //   const getString = `${district} ${city} ${state} ${country}`;

  //create string
  const getString = !district
    ? `${city} ${state} ${country} ${language}`
    : `${district} ${city} ${state} ${country} ${language}`;

  const translit = cyrillicToTranslit.transform(getString, "-").toLowerCase();

  switch (language) {
    case "uk":
      for (const link of pageCatalog.uk) {
        const createUrl = `${MAIN_DOMAIN}${link.link}-${translit}`;
        //get index for get type in english
        const getIndex = pageCatalog.uk.indexOf(link);
        //get type in english
        const createTypeOfPage = standardInEnglish[getIndex];
        //check new link in DB
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
        //if DB dont has some link create
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
            typeOfPage: createTypeOfPage,
            title: link.title,
            description: link.description,
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
          //if DB has create moditifity link
        } else {
          const upgradeUrl = `${MAIN_DOMAIN}${link.link}-${translit}-${language}`;
          const addToUaCatalog = await UaCatalogForHotelier.create({
            ...req.body,
            nameOfpage: district,
            url: upgradeUrl,
            typeOfPage: createTypeOfPage,
            title: link.title,
            description: link.description,
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
        const createUrl = `${MAIN_DOMAIN}${link.link}-${translit}`;
        const getIndex = pageCatalog.ru.indexOf(link);
        const createTypeOfPage = standardInEnglish[getIndex];

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
            typeOfPage: createTypeOfPage,
            title: link.title,
            description: link.description,
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
          const upgradeUrl = `${MAIN_DOMAIN}${link.link}-${translit}-${language}`;

          const addToRuCatalog = await RuCatalogForHotelier.create({
            ...req.body,
            nameOfpage: district,
            url: upgradeUrl,
            typeOfPage: createTypeOfPage,
            title: link.title,
            description: link.description,
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
        const createUrl = `${MAIN_DOMAIN}${link.link}-${translit}`;
        const getIndex = pageCatalog.pl.indexOf(link);
        const createTypeOfPage = standardInEnglish[getIndex];

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
            typeOfPage: createTypeOfPage,
            title: link.title,
            description: link.description,
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
          const upgradeUrl = `${MAIN_DOMAIN}${link.link}-${translit}-${language}`;

          const addToPlCatalog = await PlCatalogForHotelier.create({
            ...req.body,
            nameOfpage: district,
            url: upgradeUrl,
            typeOfPage: createTypeOfPage,
            title: link.title,
            description: link.description,
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
        const createUrl = `${MAIN_DOMAIN}${link.link}-${translit}`;
        const getIndex = pageCatalog.en.indexOf(link);
        const createTypeOfPage = standardInEnglish[getIndex];
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
            typeOfPage: createTypeOfPage,
            title: link.title,
            description: link.description,
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
          const upgradeUrl = `${MAIN_DOMAIN}${link.link}-${translit}-${language}`;
          const addToEnCatalog = await EnCatalogForHotelier.create({
            ...req.body,
            nameOfpage: district,
            url: upgradeUrl,
            typeOfPage: createTypeOfPage,
            title: link.title,
            description: link.description,
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
