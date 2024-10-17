import api from '../api';
import request from "../utils/request";


export function Employs_Get() {
    return new Promise((resolve, reject) => {
        request.get(api.FPApi.EMPLOYS).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err)
        })
    })
}


export function Employs_Post(params:any) {
    return new Promise((resolve, reject) => {
        request.post(api.FPApi.EMPLOYS,  params ).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    })
}

export function Employs_Org() {
    return new Promise((resolve, reject) => {
        request.get(api.FPApi.EMPLOYS_ORG).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
    })
}

export function Quota_Post(params:any){
    return new Promise((resolve,reject)=>{
        request.post(api.FPApi.QUOTA,params).then((res)=>{
            resolve(res);
        }).catch((err)=>{
            reject(err);
        })
    })
}

export function History_Quota_Get(params:any){
    return new Promise((resolve,reject)=>{
        request.get(api.FPApi.HISTORY_QUOTA,{params:params}).then(((res)=>{
            resolve(res);
        })).catch((err)=>{
            reject(err);
        })
    })
}
