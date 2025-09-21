import { APIRequestContext } from "@playwright/test";
import { Environment } from "../../env";
import { WantlistResponse } from "../../models/api.models/wantlist.response";
import { ApiHelper, ClientOptions, RequestParams } from "../../utils/api.utils/api.helper";
import { Endpoints } from "../../utils/constants/endpoints";


export class WantlistClient {

    private WanlistUrl = `${Environment.BASE_URL}${Endpoints.USERS}`
    private context: APIRequestContext;
    
    constructor(context: APIRequestContext) {
        this.context = context;
    }

    async getWantlistByUsername(
        username: string, 
        options?: ClientOptions
    ): Promise<{ responseBody: WantlistResponse,  status: number}> {
            const response = await ApiHelper.sendApiRequest(
                this.context, 
                `${this.WanlistUrl}${username}/${Endpoints.WANTS}`,
                {   
                    method: 'GET',
                    ...options
                }
        );
        return response;
    };

    async addReleaseToWantlist(
        username: string,
        id: number,
        options?: ClientOptions
    ): Promise<{ responseBody: WantlistResponse, status: number}> {
        return await ApiHelper.sendApiRequest(
            this.context,
            `${this.WanlistUrl}${username}/${Endpoints.WANTS}/${id}`,
            { 
                method: 'PUT',
                ...options
            },
        );
       
    }

    async deleteReleaseFromWantList(
        username: string,
        id: number,
        options?: ClientOptions
    ) {
        return await ApiHelper.sendApiRequest(
            this.context,
            `${this.WanlistUrl}${username}/${Endpoints.WANTS}/${id}`,
            {
                method: 'DELETE',
                expectedStatusCode: 204,
                ...options
            },
        );
    }
}