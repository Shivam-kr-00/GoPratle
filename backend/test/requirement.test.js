
import dotenv from "dotenv";
dotenv.config();
import { jest, describe, test, expect, beforeAll, afterAll, afterEach } from "@jest/globals";
import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";
import Requirement from "../src/model/requirement.model.js";

const TEST_MONGODB_URI = process.env.TEST_MONGODB_URI;

describe("Requirements API", () => {
    beforeAll(async () => {
        if (!TEST_MONGODB_URI) {
            throw new Error(
                "TEST_MONGODB_URI is required. Use a separate test database."
            );
        }

        // Guard against accidentally connecting to your main database.
        const testDbName = new URL(TEST_MONGODB_URI).pathname.slice(1).split("?")[0];

        if (!testDbName.toLowerCase().includes("test")) {
            throw new Error(
                "Your test database name must contain 'test'. Use a separate database."
            );
        }

        await mongoose.connect(TEST_MONGODB_URI);
    });

    afterEach(async () => {
        // Clears only the requirements collection in the test database.
        await Requirement.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    const validRequirement = {
        eventName: "Annual Music Festival",
        eventType: "Music Festival",
        startDate: "2026-12-10",
        endDate: "2026-12-12",
        location: "New Delhi",
        venue: "City Convention Centre",
        category: "performer",
        details: {
            performerType: "Singer",
            genre: "Rock",
            budget: 25000,
        },
    };

    test("POST /api/requirements creates a requirement", async () => {
        const response = await request(app)
            .post("/api/requirements")
            .send(validRequirement);

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data.eventName).toBe(
            validRequirement.eventName
        );
        expect(response.body.data.category).toBe("performer");
        expect(response.body.data._id).toBeDefined();

        const savedRequirement = await Requirement.findById(
            response.body.data._id
        );

        expect(savedRequirement).not.toBeNull();
    });

    test("POST rejects a missing event name", async () => {
        const { eventName, ...invalidRequirement } = validRequirement;

        const response = await request(app)
            .post("/api/requirements")
            .send(invalidRequirement);

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Validation failed");
        expect(response.body.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: "eventName",
                }),
            ])
        );
    });

    test("POST rejects an invalid category", async () => {
        const response = await request(app)
            .post("/api/requirements")
            .send({
                ...validRequirement,
                category: "photographer",
            });

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    test("POST rejects an end date before the start date", async () => {
        const response = await request(app)
            .post("/api/requirements")
            .send({
                ...validRequirement,
                startDate: "2026-12-12",
                endDate: "2026-12-10",
            });

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    field: "endDate",
                }),
            ])
        );
    });

    test("GET /api/requirements returns saved requirements", async () => {
        await Requirement.create(validRequirement);

        const response = await request(app).get("/api/requirements");

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.count).toBe(1);
        expect(response.body.data[0].eventName).toBe(
            validRequirement.eventName
        );
    });

    test("GET /api/requirements/:id returns one requirement", async () => {
        const saved = await Requirement.create(validRequirement);

        const response = await request(app).get(
            `/api/requirements/${saved._id}`
        );

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data._id).toBe(saved._id.toString());
    });

    test("GET returns 404 when a valid ID does not exist", async () => {
        const missingId = new mongoose.Types.ObjectId();

        const response = await request(app).get(
            `/api/requirements/${missingId}`
        );

        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Requirement not found");
    });
});
