import Joi from "joi";

export default {
  create: {
    body: {
      schema: Joi.object({
        url: Joi.string().required(),
      }),
    },
    params: {
      schema: Joi.object({
        topicId: Joi.string().uuid().required(),
      }),
    },
  },
};
