import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import service from "../../service";

const initialState = {}


export const getEmploys = createAsyncThunk("FP/getEmploys", async () => {
    try {
        const res = await service.FPService.Employs_Get();
        return res;
    } catch (err: any) {
        console.log(err)
    }
})

export const postEmploys = createAsyncThunk("FP/postEmploys", async (params: any) => {
    try {
        const res = await service.FPService.Employs_Post(params);
        return res;
    } catch (err: any) {
        console.log(err)
    }
})
export const getEmploysOrg = createAsyncThunk("FP/getEmploysOrg", async () => {
    try {
        const res = await service.FPService.Employs_Org();
        return res;
    } catch (err: any) {
        console.log(err)
    }
})
export const postQuota=createAsyncThunk("FP/postQuota",async({name,quotaSize}:any)=>{
    try{
        const res=await service.FPService.Quota_Post({name,quotaSize});
        return res;
    }catch(err:any){
        console.log(err);
    }
})
const FPSlice = createSlice({
    name: 'FPSlice', initialState,
    reducers: {

    }
})


export default FPSlice.reducer;