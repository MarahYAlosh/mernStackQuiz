import { Router } from "express";
import * as controller from "../controllers/controller.js";

const router = Router();

router
  .route("/juniorQuestion")
  .get(controller.getjuniorQuestion)
   .post(controller.insertjuniorQuestion)
  .delete(controller.deletejuniorQuestion)


 router
  .route("/middleQuestion")
  .get(controller.getmiddleQuestion)
   .post(controller.insertmiddleQuestion)
  .delete(controller.deletemiddleQuestion)

 router
 .route("/advancedQuestion")
 .get(controller.getadvancedQuestion)
  .post(controller.insertadvancedQuestion)
 .delete(controller.deleteadvancedQuestion)












router
  .route("/result")
  .get(controller.getResult)
  .post(controller.storeResult)
  .delete(controller.deleteResult);

export default router;
