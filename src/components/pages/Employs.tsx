
import {
    Button,
    Space,
    Table,
    Tag,
    Modal,
    InputNumber,
    InputNumberProps,
    Select,
    message,
    Popconfirm,
    PopconfirmProps, Drawer, DatePickerProps, DatePicker, Spin
} from 'antd';
import type { TableProps } from 'antd';
import React, { useEffect, useState } from 'react';
import type { FormProps } from 'antd';
import {  Checkbox, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import {
    deleteEmploy,
    getEmploys,
    getEmploysOrg,
    getHistoryQuota,
    postEmploys,
    postQuota
} from '../../store/features/FPSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import {EditOutlined, HistoryOutlined, LoadingOutlined} from "@ant-design/icons";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

interface DataType {
    key:number;
    id: number;
    name: string;
    login: string;
    onboarded: any;
    dept: string;
    linux_quota:number;
    windows_quota:number
}

interface HistoryDataType{
    key:number;
    date:string;
    disk_usage:number
}

type FieldType = {
    name?: string;
    login?:string;
    onboarded?:any;
    dept?:string;
    password?: string;
};


const historyData:HistoryDataType[]=[
    {
        key:1,
        date:'01/02/2024',
        disk_usage:2
    },
    {
        key:2,
        date:'01/02/2024',
        disk_usage:4
    },
    {
        key:3,
        date:'01/02/2024',
        disk_usage:3
    },
    {
        key:4,
        date:'01/02/2024',
        disk_usage:2
    },
]

const data: DataType[] = [
    {
        key:3,
        id: 3,
        name: 'Helen Hywater',
        login: 'hywat',
        onboarded: '03/01/2021',
        dept: 'Sales',
        linux_quota:3,
        windows_quota:3
    },
    {
        key:4,
        id: 4,
        name: 'Helen Hywater',
        login: 'hywat',
        onboarded: '03/01/2021',
        dept: 'Sales',
        linux_quota:3,
        windows_quota:3
    },
    {
        key:5,
        id: 5,
        name: 'Helen Hywater',
        login: 'hywat',
        onboarded: '03/01/2021',
        dept: 'Sales',
        linux_quota:3,
        windows_quota:3
    },
];
const optionData:any[]=[
    { value: 'C9899', label: 'Sales' },
    { value: 'E4537', label: 'Human Resources' },
    { value: 'A0001', label: 'Information Technology' },
]

export function Employs(){
    const [loading,setloading]=useState<boolean>(false);
    const dispatch=useDispatch();
    const [open, setOpen] = useState(false);
    const [addopen,setAddopen]=useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const [tableData,setTableData]=useState<any[]>([]);
    const [historyTableData,sethistoryTableData]=useState<any[]>(historyData)
    const [options,setOptions]=useState<any[]>(optionData)
    const [quota,setQuota]=useState<any>(3);
    const [name,setName]=useState<string|null>(null);
    const [draweropen,setDraweropen]=useState(false)
    const [os,setos]=useState("windows");
    const [login,setlogin]=useState<any>(null);
    const showDrawer = (login:string,win_flag:boolean) => {
        setos(win_flag?"windows":'linux');
        fetchHistoryQuota(login,win_flag)
        setDraweropen(true);
    };

    const onDrawerClose = () => {
        setDraweropen(false);
    };

    const showModal = (login:any,_os:any) => {
        setName(login);
        setos(_os);
        setOpen(true);
    };
    const showAddModal = () => {
        setAddopen(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        let params={};
        if(os==="linux"){
            params={
                name:name,
                linux_quota:quota,
                win_quota:0
            }
        }else {
            params={
                name:name,
                linux_quota:0,
                win_quota:quota
            }
        }
        dispatch(postQuota(params) as any).then(unwrapResult).then(async (res:any)=>{
            if(res!==null){
                getEmploysList();
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

    const deleteConfirm: PopconfirmProps['onConfirm'] = (e) => {
        console.log(e);
        console.log(login);
        setConfirmLoading(true);
        dispatch(deleteEmploy(login) as any).then(unwrapResult).then((res:any)=>{
            if(res){
                message.success("delete successfully!");
                getEmploysList();
            }else {
                message.error("delete failed.")
            }
        })
    };

    const deleteCancel: PopconfirmProps['onCancel'] = (e) => {
        console.log(e);
        message.error('Click on No');
    };

    const fetchHistoryQuota=(login:string,win_flag:boolean)=>{
        dispatch(getHistoryQuota({login:login,winflag:win_flag}) as any).then(unwrapResult).then((res:any)=>{
            if(res){
                let data:any[]=[];
                res.forEach((value:any,index:any)=>{
                    data.push({
                        key:index,
                        date:value.date,
                        disk_usage:value.usage
                    })
                })
                sethistoryTableData(data);
            }
        })
    }

    const historyColumns:TableProps<HistoryDataType>['columns']=[
        {
            title:'Date',
            dataIndex:'date',
            key:'date'
        },
        {
            title:'Disk Usage',
            dataIndex:'disk_usage',
            key:'disk_usage'
        }
    ]

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            sorter:{
                compare:(a,b)=>a.id-b.id,
                multiple:3,
            }
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
            title: 'Department',
            dataIndex: 'dept',
            key: 'dept',
        },
        {
            title:'Quota',
            children: [
                {
                    title: 'Linux Quota',
                    dataIndex: 'linux_quota',
                    key: 'linux_quota',
                    render: (text,record)=>(
                        <div>
                            <span>{text}GB</span>
                            <Button type="text" icon={<EditOutlined />} onClick={()=>showModal(record.login,"linux")}></Button>
                            <Button type="text" onClick={()=>showDrawer(record.login,false)} icon={<HistoryOutlined />}></Button>
                        </div>

                    )
                },
                {
                    title: 'Windows Quota',
                    dataIndex: 'windows_quota',
                    key: 'windows_quota',
                    render: (text,record)=>(
                        <div>
                            <span>{text}GB</span>
                            <Button type="text" icon={<EditOutlined />} onClick={()=>showModal(record.login,"windows")}></Button>
                            <Button type="text" onClick={()=>showDrawer(record.login,true)} icon={<HistoryOutlined />}></Button>
                        </div>

                    )
                },
            ]
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {/*<Button onClick={()=>showModal(record.login)}>SetQuota</Button>*/}
                    <Popconfirm
                        title="Delete"
                        description="Are you sure to delete this user?"
                        onConfirm={deleteConfirm}
                        onCancel={deleteCancel}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ loading: confirmLoading }}
                    >
                        <Button onClick={()=>{setlogin(record.login)}} danger>Delete</Button>
                    </Popconfirm>
                    {/*<Button>History</Button>*/}
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
        values.onboarded=values.onboarded.format('DD/MM/YYYY');
        setConfirmLoading(true);
        dispatch(postEmploys(values) as any).then(unwrapResult).then(async (res:any)=>{
            setConfirmLoading(false);
            setOpen(false);
            if(res && res.id){
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
        setloading(true);
        dispatch(getEmploys() as any).then(unwrapResult).then(async (res:any)=>{
            setloading(false);
            if(res){
                let data:any[]=[];
                res.forEach((value:any,index:any)=>{
                    data.push({
                        key:value.id,
                        id: value.id,
                        name: value.name,
                        login: value.login,
                        onboarded: value.onboarded,
                        dept: value.dept,
                        linux_quota:value.quotaOnLin,
                        windows_quota:value.quotaOnWin
                    })
                })
                setTableData(data);
            }
        })
    }
    const getDepartments=()=>{
        dispatch(getEmploysOrg() as any).then(unwrapResult).then(async (res:any)=>{
            if(res){
                let data:any[]=[];
                res.forEach((value:any,index:any)=>{
                    data.push({
                     value: value.dept, label: value.description
                    })
                })
                setOptions(data);
            }
        })
    }
    // @ts-ignore
    const onDateChange = (date, dateString) => {
        console.log(date, dateString);
        console.log((typeof (dateString)))
        form.setFieldsValue({ onboarded: date });
    };

    useEffect(()=>{
        getEmploysList();
        getDepartments();
    },[])
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
    return(

        <div style={{width:'100%',height:'calc(100vh - 180px)'}}>

        {/* add spin */}
            <Spin spinning={loading} indicator={<LoadingOutlined spin/>}>
                <div style={{float: 'right', marginTop: '20px', marginBottom: '20px'}}>
                    <Button type='primary' style={{width: '300px'}} onClick={showAddModal}>Add User</Button>
                </div>

                <Table<DataType> columns={columns} dataSource={tableData}/>

            </Spin>

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
                closable={false}
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
                          <DatePicker onChange={onDateChange} defaultValue={dayjs()} format="DD/MM/YYYY" />
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
            <Drawer title={`${os} Disk Usage History`} onClose={onDrawerClose} open={draweropen}>
                <Table<HistoryDataType> columns={historyColumns} dataSource={historyTableData} />
            </Drawer>
        </div>

    )
}
export  default Employs;