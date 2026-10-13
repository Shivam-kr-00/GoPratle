
import {
  createRequirementService,
  getRequirementsService,
  getRequirementByIdService,
} from "../service/requirement.service.js";

export const createRequirement = async (req, res) => {
  const requirement = await createRequirementService(req.body);

  return res.status(201).json({
    success: true,
    message: "Requirement created successfully",
    data: requirement,
  });
};

export const getRequirements = async (req, res) => {
  const requirements = await getRequirementsService();

  return res.status(200).json({
    success: true,
    count: requirements.length,
    data: requirements,
  });
};

export const getRequirementById = async (req, res) => {
  const requirement = await getRequirementByIdService(req.params.id);

  return res.status(200).json({
    success: true,
    data: requirement,
  });
};
