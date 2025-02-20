import axiosInstance from "../axiosInstance";

const IMAGE_ROUTE = "/image";

// save image to server
export const postImage = async (payload: FormData) => {
  try {
    const response = await axiosInstance.post(`${IMAGE_ROUTE}`, payload, {
      headers: {
        "Content-Type": "image/jpeg",
      },
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "image query failed");
  }
};
