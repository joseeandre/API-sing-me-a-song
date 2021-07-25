import joi from 'joi';

const recommendationSchema = joi.object({
    name: joi.string()
    .min(3)
    .required(),
    youtubeLink: joi.string()
    .min(3)
    .uri() 
    .required(),
    genres: joi.array().required()
});

export { recommendationSchema };