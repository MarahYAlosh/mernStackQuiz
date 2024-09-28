import mongoose from "mongoose";
const { Schema } = mongoose;

const questionModal = new Schema({
  questions: { type: Array, default: [] },
  answers: { type: Array, default: [] },
  trueComment: { type: Array, default: [] },
  falseComment: { type: Array, default: [] },
  createdAd: { type: Date, default: Date.now },
});
//const juniorQuestion= mongoose.model("juniorQuestion", questionModal);
// const middleQuestion= mongoose.model("middleQuestion", questionModal);
// const advancedQuestion= mongoose.model("advancedQuestion", questionModal);

// module.exports={
//   juniorQuestion,
//   // middleQuestion,
//   // advancedQuestion
// }
export default mongoose.model("middlequestions", questionModal);
//export default mongoose.model("Questions", questionModal);