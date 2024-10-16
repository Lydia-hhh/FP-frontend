
import {Button, Space, Table, Tag, Modal, InputNumber, InputNumberProps, Select} from 'antd';
import type { TableProps } from 'antd';
import React, { useState } from 'react';
import type { FormProps } from 'antd';
import {  Checkbox, Form, Input } from 'antd';


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

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);

};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
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

export function Employs(){
    const [open, setOpen] = useState(false);
    const [addopen,setAddopen]=useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const showModal = () => {
        setOpen(true);
    };
    const showAddModal = () => {
        setAddopen(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 500);
    };

    const handleAddOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setAddopen(false);
            setConfirmLoading(false);
        }, 500);
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
                    <Button onClick={showModal}>set quota</Button>
                </Space>
            ),
        },
    ];
    const onChange: InputNumberProps['onChange'] = (value) => {
        console.log('changed', value);
    };
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
        form.setFieldsValue({ dept: value });
    };


    return(
        <div style={{width:'100%',height:'calc(100vh - 180px)'}}>
            <div style={{float:'right',marginTop:'20px',marginBottom:'20px'}}>
                <Button type='primary' style={{width:'300px'}} onClick={showAddModal}>Add User</Button>
            </div>

            <Table<DataType> columns={columns} dataSource={data} />
            <Modal
                title="set quota"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <div style={{marginLeft:'10%'}}>
                    <InputNumber style={{width:'80%'}} defaultValue={3} onChange={onChange} />
                </div>

            </Modal>

            <Modal
                title="set quota"
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
                              defaultValue="C9899"
                              onChange={handleChange}
                              options={[
                                  { value: 'C9899', label: 'C9899' },
                                  { value: 'E4537', label: 'E4537' },
                                  { value: 'A0001', label: 'A0001' },
                              ]}
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