import catchAsync from "../utils/catchAsync.js"
import {authService} from"../services/index.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import { IMGUR_CLIENT_ID } from "../utils/config.js";
import axios from "axios";
import FormData from "form-data";
const data = new FormData();


const signup = catchAsync(async(req,res) => {
    const {name, password, email} =req.body;
   /* const sampleFile = req.files.sampleFile;
    let uploadPath = __dirname + '/uploads/' + sampleFile.name
    sampleFile.mv(uploadPath, function (err) {
		if (err) {
			return res.status(500).send(err)
		}

		imgur.uploadFile(uploadPath).then((urlObject) => {
			fs.unlinkSync(uploadPath)
			
		})
	})
})*/
   const image = req.file.buffer;
   if(!image) throw new ApiError('Image not provided');
        data.append('image',image);
        const headers = {
            headers: { 
                Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
                ...data.getHeaders()
            }
        }
        const uploadData = await axios.post('https://api.imgur.com/3/image',data,headers); 
        console.log(uploadData);   

    if(!name || !password || !email){
        throw new ApiError(httpStatus.BAD_REQUEST, "Missing name, email or password");
    }
    const response = await authService.signup(name, password, email);
    res.status(httpStatus.CREATED).json(response);
});

const signin = catchAsync(async(req,res) => {
    const { email, password } = req.body;
    if(!email || !password){
        throw new ApiError(httpStatus.BAD_REQUEST, "Missing email or password");
    }
    const response = await authService.signin( email, password);
    res.status(httpStatus.OK).json(response);
});
    
export default {signup,signin};
