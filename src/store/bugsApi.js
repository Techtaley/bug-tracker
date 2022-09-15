import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//this api service helps us fetch data from endpoint
//base url for api axios.get() - endpoint to access bugs
export const bugsApi = createApi({
    reducerPath: 'bugsApi',
    //baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
    baseQuery: fetchBaseQuery({ baseUrl: "https://bugs-api-default-rtdb.firebaseio.com/" }),
    endpoints: (builder) => ({
        getAllBugs: builder.query({
            query: () => "bugs.json",
            //query: () => "bugs",
            //you can have multiple queries, e.g. by id
        }),
    }),  
})

//this is a hook automatically created - used to call the api server from component
export const { useGetAllBugsQuery } = bugsApi

//need to include in the store