import { expect } from "@playwright/test";
import { WantlistResponse } from "../../models/api.models/wantlist.response";
import { BaseAssertions } from "./base.assertions";
import { ReleaseResponse } from "../../models/api.models/release.response";


export class WantlistAssertions extends BaseAssertions {
    static validateWantlistResponse(wantlist: WantlistResponse) {
        expect(wantlist.wants).toBeDefined();
        expect(wantlist.pagination.items).toBeDefined();
        expect(wantlist.pagination.items).toBeGreaterThan(0);
    };

    static validateReleaseIsDeleted(wantlist: WantlistResponse, deletedID: number) {
        const found = wantlist.wants.find((w) => w.id === deletedID)
        expect(found).toBeUndefined();
    }

    static validateReleaseIsAdded(wantlist: WantlistResponse, addedID: number) {
        const found = wantlist.wants.find((w) => w.id === addedID)
        expect(found).toBeDefined();
    };

    static validateReleaseContent(wantlist: WantlistResponse, expectedRelease: ReleaseResponse) {
        const found = wantlist.wants.find((w) => w.id === expectedRelease.id);
        expect(found).toBeDefined();

        expect(found?.basic_information.title).toBe(expectedRelease.title);
        expect(found?.basic_information.year).toBe(expectedRelease.year);

    } 

}