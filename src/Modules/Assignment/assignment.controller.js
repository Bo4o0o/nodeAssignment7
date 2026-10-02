import {Router} from "express";
import * as assignmentRouter from "./assignment.service.js";
const router = Router();

router.post("/collection/books" , assignmentRouter.createExplicitCollection);
router.post("/collection/authors" , assignmentRouter.createImplicitCollection);
router.post("/collection/logs/capped" , assignmentRouter.createCappedCollection);
router.post("/collection/books/index" , assignmentRouter.createIndex);
router.post("/collection/books/create" , assignmentRouter.insertIntoBook);
router.post("/collection/books/batch" , assignmentRouter.createBulkBooks);
router.post("/logs" , assignmentRouter.InsertNewLog);
router.patch("/books/future" , assignmentRouter.UpdateTheBook);
router.get("/books/tittle" , assignmentRouter.findBookByTittle);
router.get("/books/year" , assignmentRouter.findAllBook);
router.get("/books/genre" , assignmentRouter.findBookByGenre);
router.get("/books/skip-limit" , assignmentRouter.skipAndLimit);
router.get("/books/year-integer" , assignmentRouter.findBookByIntYear);
router.get("/books/exclude-genres" , assignmentRouter.excludeGenres);
router.delete("/books/before-year" , assignmentRouter.deleteBookBeforeYear);
router.get("/books/aggregate1", assignmentRouter.aggregateOne);
router.get("/books/aggregate2", assignmentRouter.aggregateTwo);
router.get("/books/aggregate3", assignmentRouter.aggregateThree);
router.get("/books/aggregate4", assignmentRouter.aggregateFour);



export default router;