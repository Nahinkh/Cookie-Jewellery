import multer from "multer";

export const uploadFiles= multer({storage: multer.diskStorage({})})