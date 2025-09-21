import { APIRequestContext, expect } from "@playwright/test";
import { BaseAssertions } from "../../api/assertions/base.assertions";



export type ClientOptions = {
    expectedStatusCode: number;
}

export type RequestParams = {
    expectedStatusCode?: number;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' |'DELETE';
    body?: unknown;
    isNegative?: boolean;
}


export class ApiHelper {
    static async sendApiRequest(
        ctx: APIRequestContext, 
        url: string, 
        params: RequestParams
    ): Promise<any> {
        const {
            expectedStatusCode,
            method = 'GET',
            body,
            isNegative = false,
        } = params;

        const response = await ctx.fetch(url, {
            method,
            data: body,
        });
        
        if (expectedStatusCode !== undefined) {
            BaseAssertions.validateStatusCode(response, expectedStatusCode);
        } else if (isNegative) {
            expect(response.status()).toBeGreaterThan(400);
            expect(response.status()).toBeLessThan(500);
        } else {
            expect(response).toBeOK();
        }

        let responseBody;

        try {
            responseBody = await response.json();
        } catch(SyntaxError) {
            console.log('Empty response body');
        }
        return { responseBody, status: response.status() };
    }
}