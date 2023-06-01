import express from 'express';
import { 
    getAllGenders, 
    getGenderById 
} from '../controllers/gender.controller.js';

const genderRoutes = express.Router();

// GET all genders
genderRoutes.get('/gender', getAllGenders);

// GET gender by ID
genderRoutes.get('/gender/:genderId', getGenderById);

export default genderRoutes;
