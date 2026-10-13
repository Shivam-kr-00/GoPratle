
import { z } from "zod";

const requirementSchema = z
    .object({
        eventName: z
            .string()
            .trim()
            .min(3, "Event name must be at least 3 characters")
            .max(100, "Event name cannot exceed 100 characters"),

        eventType: z
            .string()
            .trim()
            .min(1, "Event type is required"),

        startDate: z
            .string()
            .min(1, "Event start date is required")
            .refine((value) => !Number.isNaN(Date.parse(value)), {
                message: "Event start date must be a valid date",
            }),

        endDate: z
            .string()
            .min(1, "Event end date is required")
            .refine((value) => !Number.isNaN(Date.parse(value)), {
                message: "Event end date must be a valid date",
            }),

        location: z
            .string()
            .trim()
            .min(1, "Event location is required"),

        venue: z
            .string()
            .trim()
            .optional()
            .default(""),

        category: z.enum(
            ["planner", "performer", "crew"],
            {
                message: "Category must be planner, performer, or crew",
            }
        ),

        details: z
            .record(z.string(), z.unknown())
            .refine((value) => Object.keys(value).length > 0, {
                message: "Category-specific details are required",
            }),
    })
    .refine(
        (data) => Date.parse(data.endDate) >= Date.parse(data.startDate),
        {
            message: "End date cannot be before start date",
            path: ["endDate"],
        }
    );

export const validateRequirement = (req, res, next) => {
    const result = requirementSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: result.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            })),
        });
    }

    // Replace the request body with validated data.
    req.body = result.data;

    next();
};
