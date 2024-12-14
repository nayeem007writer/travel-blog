import axiosInstant from "./axios.constant";

const uploadImage = async (image_file) => {
    const formData = new FormData();
    formData.append('image', image_file);

    try{
        const response = await axiosInstant.post("/image-up", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });

        return response.data;

    }
    catch(err) {
        console.log(err);
        throw err;
    }
    
}

export default uploadImage;