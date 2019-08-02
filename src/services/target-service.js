import {mongoConnect} from '../util/db';

export default class TargetService{
    

    //Faculty CRUD.

    OnCreateFaculty = async(faculty) => {
        try{
            faculty.facultyId = Math.random().toString(36).substring(7);
            faculty.isDeleted = false;
            faculty.createdAt = new Date();
            const dbc = await mongoConnect();
            let {result} = await dbc.collection('faculties').insertOne(faculty);
            if(result.ok!==1){
                throw 'Error in creating new faculty';
            }
            return {
                status: true,
                message: 'Faculty has been created successfully'
            }
        }catch(ex){
            console.error('Error in creating faculty');
            return {
                status: false,
                error: ex
            };
        }
    }

    OnGetFaculty = async() => {
        try{
            const dbc = await mongoConnect();
            let facultyLists = await dbc.collection('faculties').find({isDeleted: false}).toArray();
            return {
                status: true,
                message: facultyLists
            };
        }catch(ex){
            console.error('Error in fetching faculty Lists');
            return {
                status: false,
                error: ex
            };
        }
    }

    OnUpdateFaculty = async(faculty) => {
        try{
            const dbc = await mongoConnect();
            let {result} = await dbc.collection('faculties').updateOne(
                {facultyId: faculty.facultyId},
                {
                    $set: {faculty}
                }
            )
            if(result.ok !=1){
                throw 'Error in updating faculty.'
            }
            return {
                status: true,
                message: 'Faculty has been updated successfully.'
            }
        }catch(ex){
            console.error('Error while updating faculty details');
            return {
                status: false,
                error: ex
            };
        }
    }

    OnDeleteFaculty = async(facultyId) =>{
        try{
            const dbc = await mongoConnect();
            let {result} = await dbc.collection('faculties').updateOne(
                {facultyId: facultyId},
                {
                    $set:{isDeleted: true}
                }
            );
            if(result.ok !==1){
                throw 'Error in deleting faculty.';
            }
            return {
                status: true,
                message: 'Faculty has been deleted successfully'
            }
        }catch(ex){
            console.error('Error in deleting faculty');
            return {
                status: false,
                error: ex
            };
        }
    }


    //Course CRUD

    OnCreateCourse = async(course) =>{
        try{
            const dbc = await mongoConnect();
            course.courseId = Math.random().toString(36).substring(7);
            course.isDeleted = false;
            course.createdAt = new Date();
            let {result} = await dbc.collection('courses').insertOne(course);
            if(result.ok !=1){
                throw 'Error in creating course';
            }
            return {
                status: true,
                message: 'Course has created successfully'
            }
        }catch(ex){
            console.error('Error in creating course');
            return {
                status: false,
                error: ex
            };
        }
    }

    OnGetCourses = async()=>{
        try{
            const dbc = await mongoConnect();
            let courseLists = await dbc.collection('courses').find({isDeleted: false}).toArray();
            return {
                status: true,
                message: courseLists
            };
        }catch(ex){
            console.error('Error in fetching courses');
            return {
                status: false,
                error: ex
            };
        }
    }
    
    OnUpdateCourse = async(course) => {
        try{
            const dbc = await mongoConnect();
            let {result} = await dbc.collection('courses').updateOne(
                {courseId: course.courseId},
                {
                    $set: {course}
                }
            );
            if(result.ok !=1){
                throw 'Error while updating course details.'
            }
            return {
                status: true,
                message: 'course has been updated successfully.'
            }
        }catch(ex){
            console.error('Error in updating course.');
            return {
                status: false,
                error: ex
            };
        }
    }

    OnDeleteCourse = async(courseId)=>{
        try{
            const dbc = await mongoConnect();
            let {result} = await dbc.collection('courses').updateOne(
                {courseId: courseId},
                {
                    $set: {isDeleted: true}
                }
            );
            return {
                status: true,
                message: 'Course has been deleted successfully'
            }
        }catch(ex){
            console.error('Error in deleting course');
            return {
                status: false,
                error: ex
            };
        }
    }

}