import catchAsync from "../utils/catchAsync.js"
import axios from 'axios';
import FormData from 'form-data';
import { IMGUR_CLIENT_ID } from '../utils/config.js';
import ApiError from '../utils/ApiError.js';
const data = new FormData();
const upload = catchAsync(async(req,res) => {
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
      
    res.status(200).json(uploadData.data);
});