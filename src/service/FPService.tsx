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

export function Quota_Post({name,quotaSize}:any){
    return new Promise((resolve,reject)=>{
        request.post(api.FPApi.QUOTA,{name,quotaSize}).then((res)=>{
            resolve(res);
        }).catch((err)=>{
            reject(err);
        })
    })
}

