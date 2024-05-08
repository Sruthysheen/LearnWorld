import express from "express";
const adminRouter = express.Router();
import {addAdminCategory, blockStudent, blockTutor, deleteCategory, editCategory, getCategoryById, listAllCategory, listAllStudents, listAllTutors, loginAdmin, unblockStudent, unblockTutor} from "../../controller/adminController/adminController";


adminRouter.post('/adminlogin',loginAdmin);
adminRouter.get('/adminstudent',listAllStudents)
adminRouter.put('/blockstudent/:id', blockStudent)
adminRouter.put('/unblockstudent/:id', unblockStudent)
adminRouter.get('/admintutor',listAllTutors)
adminRouter.put('/blocktutor/:id',blockTutor)
adminRouter.put('/unblocktutor/:id',unblockTutor)
adminRouter.post('/adminaddcategory',addAdminCategory)
adminRouter.get('/admincategory',listAllCategory)
adminRouter.get('/getcategoryid/:id', getCategoryById)
adminRouter.post('/editcategory',editCategory)
adminRouter.delete('/deletecategory/:id',deleteCategory)


export {adminRouter};