import juniorQuestion from "../models/juniorquestionSchema.js";
import Results from "../models/resultSchema.js";

import middleQuestion from "../models/middlequestionSchema.js";
import advancedquestionSchema from "../models/advancedquestionSchema.js";

export async function getjuniorQuestion(req, res) {
  try {
    const q = await juniorQuestion.find();
    res.json({ q });
    console.log('gf');
    
  } catch (error) {
    res.json({ error });
  }
}

export async function insertjuniorQuestion(req, res) {
  try {
    juniorQuestion.insertMany({
      questions: req.body.allQuestion,
      answers: req.body.allAnswer,
    });

    res.json({ msg: "insert success" });
  } catch (error) {
    res.json({ error });
  }
}

export async function deletejuniorQuestion(req, res) {
  try {
    await juniorQuestion.deleteMany();
    res.json("delete all questions");
  } catch (error) {
    res.json({ error });
  }
}

export async function getmiddleQuestion(req, res) {
  try {
    const q = await middleQuestion.find();
    res.json({ q });
  } catch (error) {
    res.json({ error });
  }
}

export async function insertmiddleQuestion(req, res) {
  try {
    middleQuestion.insertMany({
      questions: req.body.allQuestion,
      answers: req.body.allAnswer,
    });
    res.json({ msg: "insert success" });
    ("taaa");

    // res.json({msg : questions})
  } catch (error) {
    res.json({ error });
  }
}
export async function deletemiddleQuestion(req, res) {
  try {
    await middleQuestion.deleteMany();
    res.json("delete all questions");
  } catch (error) {
    res.json({ error });
  }
}

export async function getadvancedQuestion(req, res) {
  try {
    const q = await advancedquestionSchema.find();
    res.json({ q });
  } catch (error) {
    res.json({ error });
  }
}

export async function insertadvancedQuestion(req, res) {
  try {
    advancedquestionSchema.insertMany({
      questions: questions,
      answers: answers,
      // questions: req.body.allQuestion,
      // answers: req.body.allAnswer,
    });
    res.json({ msg: "insert success" });

    // res.json({msg : questions})
  } catch (error) {
    res.json({ error });
  }
}
export async function deleteadvancedQuestion(req, res) {
  try {
    await advancedquestionSchema.deleteMany();
    res.json("delete all questions");
  } catch (error) {
    res.json({ error });
  }
}

export async function getResult(req, res) {
  try {
    const r = await Results.find();
    res.json({ r });
  } catch (error) {
    res.json({ error });
  }
}

export async function storeResult(req, res) {
  try {
    const { username, result, level, points, achived, timer } = req.body;
    if (!username && !result) throw new Error("Data Not Provided...!");
    console.log(timer);
    if (timer == undefined) {
      throw new Error("Data Not Provided...!");
    } else {
      const newResult = await Results.create({
        username,
        result,
        level,
        points,
        achived,
        timer,
      });
      res.json({ msg: "Result Saved Successfully...!", result: newResult });
    }
  } catch (error) {
    res.json({ error: error });
  }
  // ;
}

export async function deleteResult(req, res) {
  try {
    await Results.deleteMany();
    res.json("delete Result");
  } catch (error) {
    res.json({ error });
  }
}
