import Joi from "joi";

export default {
  create: {
    body: {
      schema: Joi.object({
        title: Joi.string().required(),
      }),
    },
  },
};
