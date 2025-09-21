import { APIResponse, expect } from "@playwright/test";
import { TextErrors } from "../../utils/constants/api.constants/text.errors";

export class BaseAssertions {

    static validateStatusCode(response: APIResponse, expectedStatus: number) {
        expect(response.status()).toBe(expectedStatus)
    }

    static validateEntityId<T extends { id: number }>(entity: T, expectedID: number) {
        expect(entity.id).toBe(expectedID);
        expect(typeof entity.id).toBe('number');
    }

    static validateMessageError(actualMessage: string) {
        switch(actualMessage) {
            case TextErrors.ARTIST_NOT_FOUND:
                expect(actualMessage).toBe(TextErrors.ARTIST_NOT_FOUND);
                break;
            case TextErrors.NOT_FOUND_RESOURCE:
                expect(actualMessage).toBe(TextErrors.NOT_FOUND_RESOURCE);
                break;
            case TextErrors.RELEASE_NOT_EXIST:
                expect(actualMessage).toBe(TextErrors.RELEASE_NOT_EXIST);
                break;
            case TextErrors.LABEL_NOT_FOUND:
                expect(actualMessage).toBe(TextErrors.LABEL_NOT_FOUND);
                break;
            default:
                throw new Error(`Unexpected error message: ${actualMessage}`)
        };
    };
}