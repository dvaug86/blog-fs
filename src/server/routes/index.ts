//template

import { Router } from "express"; //template
import blogsRouter from './blog_routes';

const router = Router(); //template

router.use('/blogs', blogsRouter);  //the '/blogs' is what will show up after localhost:3000/api -> localhost:3000/api

export default router; //template