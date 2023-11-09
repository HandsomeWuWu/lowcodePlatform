import { addData, getDataByIndex, getDataByKey, openDB } from '@/utils';
import { Button, Checkbox, Form, Input } from 'antd';
import { useCallback, useEffect } from 'react';
import s from './index.less';

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};
type dbObject = {
    transaction: Function;
    close: Function;
}
const LoginForm = () => {
    const onFinish = async (values: any) => {
        const userDB = await openDB('user') as dbObject;
        const userData = await getDataByIndex(userDB, 'userData', 'indexUsername', 'asd');
        const userData2 = await getDataByKey(userDB, 'userData', 1);
        console.log('userData============>', userData);
        console.log('userData2============>', userData2);
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const initUserData = useCallback(
        async () => {
            const userDb = await openDB('user') as dbObject;
            addData(userDb, 'userData', { username: 'asd', password: '123' });
        },
        []
    )

    useEffect(
        () => {
            initUserData();
        },
        [initUserData]
    )
    return (
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={s.loginForm}
    >
        <Form.Item<FieldType>
        label="用户名"
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
        >
        <Input />
        </Form.Item>

        <Form.Item<FieldType>
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
        >
        <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
        >
        <Checkbox>记住我</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
            登录
        </Button>
        </Form.Item>
    </Form>
    )
}

export default LoginForm;