import Joi from "joi";

export default {
  create: {
    body: {
      schema: Joi.object({
        message: Joi.string().required(),
      }),
    },
    params: {
      schema: Joi.object({
        topicId: Joi.string().uuid().required(),
      }),
    },
  },
  
  viewMessage: {
    body: {
      schema: Joi.object({
        link: Joi.string().required(),
      }),
    }
  },
};
