    // locations: {
    district: {
      type: String,
      require: [true, "district must be exist"],
    },
    city: {
      type: String,
      require: [true, "city must be exist"],
    },
    state: {
      type: String,
      require: [true, "state must be exist"],
    },
    country: {
      type: String,
      require: [true, "country must be exist"],
    },
  },
  // },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  language: Joi.string().required(),
  // name: Joi.string(),
  status: Joi.string(),
  activeLocationId: Joi.string().required(),
  type: {
    type: Joi.string().required(),
    stars: Joi.string(),
  },
  objectName: Joi.string().required(),
  address: {
    country: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    district: Joi.string().required(),
    street: Joi.string().required(),
    house: Joi.string().required(),
    apartment: Joi.string(),
    zipCode: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
  },
  description: Joi.string().max(300).required(),
  photos: [Joi.array().required()],
  time: {
    checkin: Joi.string().required(),
    checkout: Joi.string().required(),
  },
  services: [Joi.array().required()],
  payments: [Joi.array().required()],
  // locations: {
  district: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  // },