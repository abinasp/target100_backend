import {} from "dotenv/config";
import express from "express";
import TargetUser from "../services/target-user";
import TargetService from "../services/target-service";
import { isValidateToken } from "../util/token";
import path from "path";

const router = express.Router();
const user = new TargetUser();
const targetService = new TargetService();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Target100 API System."
  });
});

router.post("/login", async (req, res) => {
  try {
    let { username, password } = req.body;
    let loggedInUser = await user.OnLoginUser(username, password);
    if (!loggedInUser.status) {
      throw loggedInUser.error;
    }
    res.status(200).json({
      success: true,
      message: "Login Successful!!",
      data: loggedInUser.token
    });
  } catch (ex) {
    res.status(401).json({
      success: false,
      message: "Error in login",
      error: ex
    });
  }
});

router.put("/create-faculty", isValidateToken(), async (req, res) => {
  try {
    let { faculty } = req.body;
    let createFaculty = await targetService.OnCreateFaculty(faculty);
    if (!createFaculty.status) {
      throw createFaculty.error;
    }
    res.status(200).json({
      success: true,
      message: "Faculty has been created successfully!!",
      data: createFaculty.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Error in creating faculty",
      error: ex
    });
  }
});

router.get("/get-faculties", isValidateToken(), async (req, res) => {
  try {
    let fetchFaculties = await targetService.OnGetFaculties();
    if (!fetchFaculties.status) {
      throw fetchFaculties.error;
    }
    res.status(200).json({
      success: true,
      message: "Lists of faculties found",
      data: fetchFaculties.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Error in fetching faculties lists",
      error: ex
    });
  }
});

router.patch("/update-faculty", isValidateToken(), async (req, res) => {
  try {
    let { faculty } = req.body;
    let updateFaculty = await targetService.OnUpdateFaculty(faculty);
    if (!updateFaculty.status) {
      throw updateFaculty.error;
    }
    res.status(200).json({
      success: true,
      message: "Faculty has been updated successfully!!",
      data: updateFaculty.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Error in updating faculty",
      error: ex
    });
  }
});

router.delete("/delete-faculty", isValidateToken(), async (req, res) => {
  try {
    let { facultyId } = req.body;
    let deleteFaculty = await targetService.OnDeleteFaculty(facultyId);
    if (!deleteFaculty.status) {
      throw deleteFaculty.error;
    }
    res.status(200).json({
      success: true,
      message: "Faculty has been deleted successfully!!",
      data: deleteFaculty.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Error in deleting faculty",
      error: ex
    });
  }
});

router.put("/create-course", isValidateToken(), async (req, res) => {
  try {
    let { course } = req.body;
    let createCourse = await targetService.OnCreateCourse(course);
    if (!createCourse.status) {
      throw createCourse.error;
    }
    res.status(200).json({
      success: true,
      message: "Course has been created successfully",
      data: createCourse.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Error in creating course!!",
      error: ex
    });
  }
});

router.get("/get-courses", isValidateToken(), async (req, res) => {
  try {
    let fetchCourses = await targetService.OnGetCourses();
    if (!fetchCourses.status) {
      throw fetchCourses.error;
    }
    res.status(200).json({
      success: true,
      message: "List of courses found!!",
      data: fetchCourses.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Error in fetching courses!!",
      error: ex
    });
  }
});

router.patch("/update-course", isValidateToken(), async (req, res) => {
  try {
    let { course } = req.body;
    let updateCourse = await targetService.OnUpdateCourse(course);
    if (!updateCourse.status) {
      throw updateCourse.error;
    }
    res.status(200).json({
      success: true,
      message: "Course has been updated successfully!!",
      data: updateCourse.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Error in updating course",
      error: ex
    });
  }
});

router.delete("/delete-course", isValidateToken(), async (req, res) => {
  try {
    let { courseId } = req.body;
    let deleteCourse = await targetService.OnDeleteCourse(courseId);
    if (!deleteCourse.status) {
      throw deleteCourse.error;
    }
    res.status(200).json({
      success: true,
      message: "Course has been deleted successfully!!",
      data: deleteCourse.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Error in deleting course",
      error: ex
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    let { student } = req.body;
    let registerStudent = await user.OnRegisterStudent(student);
    if (!registerStudent.status) {
      throw registerStudent.error;
    }
    res.status(200).json({
      success: true,
      message: "Registration successful!!",
      data: registerStudent.message
    });
  } catch (ex) {
    res.status(400).json({
      success: false,
      message: "Error in student registration!!",
      error: ex
    });
  }
});

router.get("/uploaded-image", (req, res) => {
  try {
    let { category, imageName } = req.query;
    res.sendFile(
      path.join(__dirname, `../../public/${category}/images/${imageName}`)
    );
  } catch (ex) {
    res.status(400).json({
      success: false,
      messgae: "No file found.",
      error: ex
    });
  }
});

export default router;
