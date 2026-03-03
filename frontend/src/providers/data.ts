// import { DataProvider, BaseRecord, GetListParams, GetListResponse } from "@refinedev/core";

// import { mockSubjects } from "./mock-data";

// export const dataProvider: DataProvider = {
//   getList: async <TData extends BaseRecord = BaseRecord>({ resource }: GetListParams): Promise<GetListResponse<TData>> => {
//     if (resource !== "subjects") {
//       return {
//         data: [] as TData[],
//         total: 0,
//       };
//     }

//     return {
//       data: mockSubjects as unknown as TData[],
//       total: mockSubjects.length,
//     };
//   },

//   getOne: async () => {
//     throw new Error("Method not implemented.");
//   },
//   create: async () => {
//     throw new Error("Method not implemented.");
//   },
//   update: async () => {
//     throw new Error("Method not implemented.");
//   },
//   deleteOne: async () => {
//     throw new Error("Method not implemented.");
//   },

//   getApiUrl: () => ""
// };


import {createDataProvider, CreateDataProviderOptions} from "@refinedev/rest";
import { BACKEND_BASE_URL } from "../components/constants";
import { ListResponse } from "@/type";

const buildHttpError = async ( response: Response) => {
  let message = 'Request failed';

  try{
    const payload = (await response.json()) as { message?: string};

    if(payload?.message) message = payload.message;
  }catch{
    message = 'An error occurred while processing the error response.';
  }

  return {
    message,
    status: response.status,
  }
} 

const options: CreateDataProviderOptions = {
  getList: {
    getEndpoint: ({ resource}) => resource,

    buildQueryParams: async({ resource, pagination, filters}) => {
      const page = pagination?.currentPage ?? 1;
      const pageSize = pagination?.pageSize ?? 10;
      const params: Record<string, string|number> = {page, limit: pageSize};

      filters?.forEach(filter => {
        const field = 'field' in filter ? filter.field: '';
        const value = String(filter.value);

        if(resource === 'subjects'){
          if(field ==='department') params.department = value;
          if(field === 'name' || field === 'code') params.search = value;
        }
      })

      return params;
    },

    mapResponse: async (response) => {
      if(!response.ok) throw await buildHttpError(response);
      
      const payload: ListResponse = await response.json();
      return payload.data ?? [];
    },
  
    getTotalCount: async ( response ) => {
      const payload: ListResponse = await response.json();
      return payload.pagination?.total ?? payload.data?.length ?? 0;
      }
  }

}

const {dataProvider} = createDataProvider(BACKEND_BASE_URL, options);

export {dataProvider};
