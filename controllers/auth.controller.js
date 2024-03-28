import catchAsync from "../utils/catchAsync.js"
import {authService} from"../services/index.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";

const signup = catchAsync(async(req,res) => {
    const {name, password, email} =req.body;
    const sampleFile = req.files.sampleFile;
    let uploadPath = __dirname + '/uploads/' + sampleFile.name
    sampleFile.mv(uploadPath, function (err) {
		if (err) {
			return res.status(500).send(err)
		}

		imgur.uploadFile(uploadPath).then((urlObject) => {
			fs.unlinkSync(uploadPath)
			
		})
	})
})

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
