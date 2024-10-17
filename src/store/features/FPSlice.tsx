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
export const postQuota=createAsyncThunk("FP/postQuota",async(params:any)=>{
    try{
        const res=await service.FPService.Quota_Post(params);
        return res;
    }catch(err:any){
        console.log(err);
    }
})

export const getHistoryQuota=createAsyncThunk("FP/getHistoryQuota",async (params:any)=>{
    try{
        const res=await service.FPService.History_Quota_Get(params);
        return res;
    }catch(err:any){
        console.log(err);
    }
})

export const getMonitor=createAsyncThunk("FP/getMonitor",async ()=>{
    try{
        const res=await service.FPService.Monitor_Get();
        return res;
    }catch (err:any){
        console.log(err);
    }
})

export const deleteEmploy=createAsyncThunk("FP/deleteEmploy",async (login:any)=>{
    try{
        const res=await service.FPService.Employ_Delete(login);
        return res;
    }catch (err:any){
        console.log(err);
    }
})
const FPSlice = createSlice({
    name: 'FPSlice', initialState,
    reducers: {

    }
})


export default FPSlice.reducer;