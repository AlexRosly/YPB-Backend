const { Schema, model } = require("mongoose");
// const Joi = require("joi");

const currency = Schema(
  {
    result: {
      type: String,
    },
    documentation: {
      type: String,
    },
    terms_of_use: {
      type: String,
    },
    time_last_update_unix: {
      type: Number,
    },
    time_last_update_utc: {
      type: String,
    },
    time_next_update_unix: {
      type: Number,
    },
    time_next_update_utc: {
      type: String,
    },
    base_code: {
      type: String,
    },
    conversion_rates: {
      USD: {
        type: Number,
      },
      AED: {
        type: Number,
      },
      AFN: {
        type: Number,
      },
      ALL: {
        type: Number,
      },
      AMD: {
        type: Number,
      },
      ANG: {
        type: Number,
      },
      AOA: {
        type: Number,
      },
      ARS: {
        type: Number,
      },
      AUD: {
        type: Number,
      },
      AWG: {
        type: Number,
      },
      AZN: {
        type: Number,
      },
      BAM: {
        type: Number,
      },
      BBD: {
        type: Number,
      },
      BDT: {
        type: Number,
      },
      BGN: {
        type: Number,
      },
      BHD: {
        type: Number,
      },
      BIF: {
        type: Number,
      },
      BMD: {
        type: Number,
      },
      BND: {
        type: Number,
      },
      BOB: {
        type: Number,
      },
      BRL: {
        type: Number,
      },
      BSD: {
        type: Number,
      },
      BTN: {
        type: Number,
      },
      BWP: {
        type: Number,
      },
      BYN: {
        type: Number,
      },
      BZD: {
        type: Number,
      },
      CAD: {
        type: Number,
      },
      CDF: {
        type: Number,
      },
      CHF: {
        type: Number,
      },
      CLP: {
        type: Number,
      },
      CNY: {
        type: Number,
      },
      COP: {
        type: Number,
      },
      CRC: {
        type: Number,
      },
      CUP: {
        type: Number,
      },
      CVE: {
        type: Number,
      },
      CZK: {
        type: Number,
      },
      DJF: {
        type: Number,
      },
      DKK: {
        type: Number,
      },
      DOP: {
        type: Number,
      },
      DZD: {
        type: Number,
      },
      EGP: {
        type: Number,
      },
      ERN: {
        type: Number,
      },
      ETB: {
        type: Number,
      },
      EUR: {
        type: Number,
      },
      FJD: {
        type: Number,
      },
      FKP: {
        type: Number,
      },
      FOK: {
        type: Number,
      },
      GBP: {
        type: Number,
      },
      GEL: {
        type: Number,
      },
      GGP: {
        type: Number,
      },
      GHS: {
        type: Number,
      },
      GIP: {
        type: Number,
      },
      GMD: {
        type: Number,
      },
      GNF: {
        type: Number,
      },
      GTQ: {
        type: Number,
      },
      GYD: {
        type: Number,
      },
      HKD: {
        type: Number,
      },
      HNL: {
        type: Number,
      },
      HRK: {
        type: Number,
      },
      HTG: {
        type: Number,
      },
      HUF: {
        type: Number,
      },
      IDR: {
        type: Number,
      },
      ILS: {
        type: Number,
      },
      IMP: {
        type: Number,
      },
      INR: {
        type: Number,
      },
      IQD: {
        type: Number,
      },
      IRR: {
        type: Number,
      },
      ISK: {
        type: Number,
      },
      JEP: {
        type: Number,
      },
      JMD: {
        type: Number,
      },
      JOD: {
        type: Number,
      },
      JPY: {
        type: Number,
      },
      KES: {
        type: Number,
      },
      KGS: {
        type: Number,
      },
      KHR: {
        type: Number,
      },
      KID: {
        type: Number,
      },
      KMF: {
        type: Number,
      },
      KRW: {
        type: Number,
      },
      KWD: {
        type: Number,
      },
      KYD: {
        type: Number,
      },
      KZT: {
        type: Number,
      },
      LAK: {
        type: Number,
      },
      LBP: {
        type: Number,
      },
      LKR: {
        type: Number,
      },
      LRD: {
        type: Number,
      },
      LSL: {
        type: Number,
      },
      LYD: {
        type: Number,
      },
      MAD: {
        type: Number,
      },
      MDL: {
        type: Number,
      },
      MGA: {
        type: Number,
      },
      MKD: {
        type: Number,
      },
      MMK: {
        type: Number,
      },
      MNT: {
        type: Number,
      },
      MOP: {
        type: Number,
      },
      MRU: {
        type: Number,
      },
      MUR: {
        type: Number,
      },
      MVR: {
        type: Number,
      },
      MWK: {
        type: Number,
      },
      MXN: {
        type: Number,
      },
      MYR: {
        type: Number,
      },
      MZN: {
        type: Number,
      },
      NAD: {
        type: Number,
      },
      NGN: {
        type: Number,
      },
      NIO: {
        type: Number,
      },
      NOK: {
        type: Number,
      },
      NPR: {
        type: Number,
      },
      NZD: {
        type: Number,
      },
      OMR: {
        type: Number,
      },
      PAB: {
        type: Number,
      },
      PEN: {
        type: Number,
      },
      PGK: {
        type: Number,
      },
      PHP: {
        type: Number,
      },
      PKR: {
        type: Number,
      },
      PLN: {
        type: Number,
      },
      PYG: {
        type: Number,
      },
      QAR: {
        type: Number,
      },
      RON: {
        type: Number,
      },
      RSD: {
        type: Number,
      },
      RUB: {
        type: Number,
      },
      RWF: {
        type: Number,
      },
      SAR: {
        type: Number,
      },
      SBD: {
        type: Number,
      },
      SDG: {
        type: Number,
      },
      SEK: {
        type: Number,
      },
      SGD: {
        type: Number,
      },
      SHP: {
        type: Number,
      },
      SLE: {
        type: Number,
      },
      SLL: {
        type: Number,
      },
      SOS: {
        type: Number,
      },
      SRD: {
        type: Number,
      },
      SSP: {
        type: Number,
      },
      STN: {
        type: Number,
      },
      SYP: {
        type: Number,
      },
      SZL: {
        type: Number,
      },
      THB: {
        type: Number,
      },
      TJS: {
        type: Number,
      },
      TMT: {
        type: Number,
      },
      TND: {
        type: Number,
      },
      TOP: {
        type: Number,
      },
      TRY: {
        type: Number,
      },
      TTD: {
        type: Number,
      },
      TVD: {
        type: Number,
      },
      TWD: {
        type: Number,
      },
      TZS: {
        type: Number,
      },
      UAH: {
        type: Number,
      },
      UGX: {
        type: Number,
      },
      UYU: {
        type: Number,
      },
      UZS: {
        type: Number,
      },
      VES: {
        type: Number,
      },
      VND: {
        type: Number,
      },
      VUV: {
        type: Number,
      },
      WST: {
        type: Number,
      },
      XAF: {
        type: Number,
      },
      XCD: {
        type: Number,
      },
      XDR: {
        type: Number,
      },
      XOF: {
        type: Number,
      },
      XPF: {
        type: Number,
      },
      YER: {
        type: Number,
      },
      ZAR: {
        type: Number,
      },
      ZMW: {
        type: Number,
      },
      ZWL: {
        type: Number,
      },
    },
  },
  { versionKey: false, timestamps: true }
);

// const joiSchema = Joi.object({
//   email: Joi.string().required(),
//   access: Joi.array().required(),
// });

const Currency = model("currency", currency);

module.exports = {
  Currency,
};
