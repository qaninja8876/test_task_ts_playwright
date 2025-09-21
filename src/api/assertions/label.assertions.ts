import { expect } from "@playwright/test";
import { BaseAssertions } from "./base.assertions";
import { LabelResponse } from "../../models/api.models/label.response";
import { EntityErrors } from "../../models/api.models/error.responses";

export class LabelAssertions extends BaseAssertions {

    static validateCorrectResponse(
        label: LabelResponse,
        expectedID: number
    ) {
        BaseAssertions.validateEntityId(label, expectedID)

        expect(label.name).toBeDefined();
    };

    static async validateIncorrectResponse(
        body: EntityErrors
    ) {
        BaseAssertions.validateMessageError(body.message);
    }
}