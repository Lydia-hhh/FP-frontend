
import {Button, Space, Table, Tag, Modal, InputNumber, InputNumberProps, Select, message} from 'antd';
import type { TableProps } from 'antd';
import React, { useEffect, useState } from 'react';
import type { FormProps } from 'antd';
import {  Checkbox, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { getEmploys, getEmploysOrg, postEmploys, postQuota } from '../../store/features/FPSlice';
import { unwrapResult } from '@reduxjs/toolkit';


interface DataType {
    id: number;
    name: string;
    login: string;
    onboarded: string;
    dept: string;
}
type FieldType = {
    name?: string;
    login?:string;
    onboarded?:string;
    dept?:string;
    password?: string;
};




const data: DataType[] = [
    {
        id: 3,
        name: 'Helen Hywater',
        login: 'hywat',
        onboarded: '03/01/2021',
        dept: 'C9899',
    },
    {
        id: 4,
        name: 'Helen Hywater',
        login: 'hywat',
        onboarded: '03/01/2021',
        dept: 'C9899',
    },
    {
        id: 5,
        name: 'Helen Hywater',
        login: 'hywat',
        onboarded: '03/01/2021',
        dept: 'C9899',
    },
];
const optionData:any[]=[
    { value: 'C9899', label: 'C9899' },
    { value: 'E4537', label: 'E4537' },
    { value: 'A0001', label: 'A0001' },
]

export function Employs(){
    const dispatch=useDispatch();
    const [open, setOpen] = useState(false);
    const [addopen,setAddopen]=useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const [tableData,setTableData]=useState<any[]>(data);
    const [options,setOptions]=useState<any[]>(optionData)
    const [quota,setQuota]=useState<any>(3);
    const [name,setName]=useState<string|null>(null);
    const showModal = (login:any) => {
        setName(login);
        setOpen(true);
    };
    const showAddModal = () => {
        setAddopen(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        //set quota
        const params={
            name:name,
            quotaSize:quota
        };
        dispatch(postQuota(params) as any).then(unwrapResult).then(async (res:any)=>{
            if(res && res.code==200){
                message.success("Set quota successfully!");
            }else{
                message.error("Set quota failed.")
            }
            setConfirmLoading(false);
            setOpen(false);
        })
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    const handleAddCancel = () => {
        console.log('Clicked cancel button');
        setAddopen(false);
    };

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Login',
            dataIndex: 'login',
            key: 'login',
        },
        {
            title: 'OnBoarded',
            dataIndex: 'onboarded',
            key: 'onboarded',
        },
        {
            title: 'Dept',
            dataIndex: 'dept',
            key: 'dept',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={()=>showModal(record.login)}>set quota</Button>
                </Space>
            ),
        },
    ];
    const onChange: InputNumberProps['onChange'] = (value) => {
        console.log('changed', value);
        setQuota(value);
    };
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
        form.setFieldsValue({ dept: value });
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        setConfirmLoading(true);
        dispatch(postEmploys(values) as any).then(unwrapResult).then(async (res:any)=>{
            setConfirmLoading(false);
            setOpen(false);
            if(res && res.code==200){
                message.success("Add user successfully!");
                getEmploysList();
            }else{
                message.error("Add user failed.")
            }
        })
    };
    
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const getEmploysList=()=>{
        dispatch(getEmploys() as any).then(unwrapResult).then(async (res:any)=>{
            if(res && res.code==200){
                setTableData(res.data);
            }
        })
    }
    const getDepartments=()=>{
        dispatch(getEmploysOrg() as any).then(unwrapResult).then(async (res:any)=>{
            if(res && res.code==200){
                setOptions(res.data);
            }
        })
    }
    useEffect(()=>{
        getEmploysList();
        getDepartments();
    },[])

    const handleChangeNumber=(value:any)=>{
        console.log(value);
    }

    return(

        <div style={{width:'100%',height:'calc(100vh - 180px)'}}>

        {/* add spin */}
            <div style={{float:'right',marginTop:'20px',marginBottom:'20px'}}>
                <Button type='primary' style={{width:'300px'}} onClick={showAddModal}>Add User</Button>
            </div>

            <Table<DataType> columns={columns} dataSource={tableData} />
     {/* add spin */}


            <Modal
                title="Set Quota"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <div style={{marginLeft:'10%'}}>
                    <InputNumber addonAfter="GB" min={0} style={{width:'80%'}} defaultValue={3} onChange={onChange} />
                </div>

            </Modal>

            <Modal
                title="Add User"
                open={addopen}
                confirmLoading={confirmLoading}
                footer=''
            >
              <div>
                  <Form
                      form={form}
                      name="basic"
                      labelCol={{ span: 6 }}
                      wrapperCol={{ span: 18 }}
                      style={{ maxWidth: 400 }}
                      initialValues={{ remember: true }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                  >
                      <Form.Item<FieldType>
                          label="name"
                          name="name"
                          rules={[{ required: true, message: 'Please input your name!' }]}
                      >
                          <Input />
                      </Form.Item>

                      <Form.Item<FieldType>
                          label="login"
                          name="login"
                          rules={[{ required: true, message: 'Please input your login!' }]}
                      >
                          <Input />
                      </Form.Item>

                      <Form.Item<FieldType>
                          label="onboarded"
                          name="onboarded"
                          rules={[{ required: true, message: 'Please input your onboarded!' }]}
                      >
                          <Input />
                      </Form.Item>

                      <Form.Item<FieldType>
                          label="department"
                          name="dept"
                          rules={[{ required: true, message: 'Please input your department!' }]}
                      >
                          <Select
                              defaultValue=""
                              onChange={handleChange}
                              options={options}
                              allowClear
                          />
                      </Form.Item>

                      <Form.Item<FieldType>
                          label="Password"
                          name="password"
                          rules={[{ required: true, message: 'Please input your password!' }]}
                      >
                          <Input.Password />
                      </Form.Item>


                      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                          <div style={{float:'right'}}>
                              <Button style={{marginRight:'15px'}} type="primary" htmlType="submit">
                                  OK
                              </Button>
                              <Button onClick={handleAddCancel}>Cancel</Button>
                          </div>

                      </Form.Item>
                  </Form>
              </div>

            </Modal>



        </div>

    )
}
export  default Employs;