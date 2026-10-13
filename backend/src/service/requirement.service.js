
import Requirement from "../model/requirement.model.js";

export const createRequirementService = async (requirementData) => {
  const requirement = await Requirement.create(requirementData);

  return requirement;
};

export const getRequirementsService = async () => {
  const requirements = await Requirement.find()
    .sort({ createdAt: -1 })
    .lean();

  return requirements;
};

export const getRequirementByIdService = async (requirementId) => {
  const requirement = await Requirement.findById(requirementId).lean();

  if (!requirement) {
    const error = new Error("Requirement not found");
    error.statusCode = 404;
    throw error;
  }

  return requirement;
};
