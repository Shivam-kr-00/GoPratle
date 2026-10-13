
import { Router } from "express";

import {
  createRequirement,
  getRequirements,
  getRequirementById,
} from "../controller/requirement.controller.js";

import { validateRequirement } from "../validator/requirement.validator.js";

const router = Router();

// Create a requirement after validating the request body.
router.post("/", validateRequirement, createRequirement);

// Get all requirements.
router.get("/", getRequirements);

// Get a single requirement by its MongoDB ID.
router.get("/:id", getRequirementById);

export default router;
