import Joi from 'joi';
import English from '../models/english.models.js';
const schema = Joi.object({
  question: Joi.string().required().trim(),
  options: Joi.array().items(Joi.string().required()).length(4).required(),
  rightAns: Joi.string().valid(Joi.ref('options')).required(), // Ensure the right answer is in options
  chapterName: Joi.string().required().trim(),
  level: Joi.string().valid('easy', 'medium', 'hard').required().trim(),
  set: Joi.number().min(1).required(),
});

const addEnglishQuestion = async (req, res) => {
 
  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      error: "The input value should be valid. " + error.details[0].message,
    });
  }

  try {
    const { question, options, rightAns, chapterName, level, set } = req.body;

    const newQuestion = new English({
      question,
      options,
      rightAns,
      chapterName,
      level,
      set,
    });

    await newQuestion.save();

 
    res.status(201).json({
      message: "Math question added successfully!",
      data: newQuestion,
    });
    
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export default addEnglishQuestion;
