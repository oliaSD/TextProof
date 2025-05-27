import React, { useState, useEffect } from 'react';
import { Card, Button, Table, ConfigProvider, Descriptions, Spin, message, Form, Input } from 'antd';
import { UserOutlined, LockOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser } from '../../../redux/utils/auth';
import './userProfile.css';

export const UserProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [changingPassword, setChangingPassword] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();

  const api = axios.create({
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/info/${getUser().username}`);
        setUser(response.data);
      } catch (error) {
        message.error('Не удалось загрузить данные пользователя');
        navigate('/admin/users');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChangePassword = async (values: { newPassword: string }) => {
    setChangingPassword(true);
    try {
      await api.post(`/update`, {
          "username": getUser().username,
          "password": values.newPassword,
          "email": getUser().username,
        }
      );
      message.success('Пароль успешно изменен');
    } catch (error) {
      message.error('Ошибка при изменении пароля');
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return <div>Пользователь не найден</div>;
  }

  const userInfoColumns = [
    {
      title: 'Параметр',
      dataIndex: 'parameter',
      key: 'parameter',
      width: '30%',
      render: (text: string) => (
        <span style={{ color: 'white', fontWeight: 'bold' }}>{text}</span>
      )
    },
    {
      title: 'Значение',
      dataIndex: 'value',
      key: 'value',
      width: '70%',
      render: (text: string, record: any) => {
        if (record.key === 'status') {
          return (
            <span style={{ 
              color: text === 'ACTIVE' ? '#D189C9' : 'red',
              fontWeight: 'bold'
            }}>
              {text === 'ACTIVE' ? 'Активен' : 'Заблокирован'}
            </span>
          );
        }
        return <span style={{ color: 'white' }}>{text}</span>;
      }
    }
  ];

  const userInfoData = [
    {
      key: 'username',
      parameter: 'Имя пользователя',
      value: user.username
    },
    {
      key: 'email',
      parameter: 'Email',
      value: user.email
    },
    {
      key: 'role',
      parameter: 'Роль',
      value: user.userRole === 'ADMIN' ? 'Администратор' : 'Пользователь'
    },
    {
      key: 'status',
      parameter: 'Статус',
      value: user.status
    }
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: 'black',
            headerColor: 'white',
            headerSplitColor: '#333',
            bodySortBg: 'black',
            rowHoverBg: '#1a1a1a',
            colorBgContainer: 'black',
            borderColor: '#333',
            colorText: 'white'
          },
          Card: {
            colorBgContainer: 'black',
            colorBorder: '#333',
            colorText: 'white'
          },
          Button: {
            colorPrimary: '#D189C9',
            colorPrimaryHover: '#c97abd',
            colorPrimaryActive: '#b86aac'
          }
        },
      }}
    >
      <div className="user-profile-container">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/admin/users')}
          style={{ color: 'white', marginBottom: '20px' }}
        >
          Назад к списку пользователей
        </Button>

        <div className="profile-content-wrapper">
          <Card
            title={
              <span style={{ color: 'white' }}>
                <UserOutlined style={{ marginRight: '8px', color: '#D189C9' }} />
                Профиль пользователя
              </span>
            }
            bordered={false}
            className="profile-card"
          >
            <Table
              columns={userInfoColumns}
              dataSource={userInfoData}
              pagination={false}
              showHeader={false}
              bordered
            />

            <div style={{ marginTop: '24px' }}>
              <h3 style={{ color: 'white' }}>Смена пароля</h3>
              <Form
                onFinish={handleChangePassword}
                layout="vertical"
                style={{ maxWidth: '400px' }}
              >
                <Form.Item
                  name="newPassword"
                  label={<span style={{ color: 'white' }}>Новый пароль</span>}
                  rules={[
                    { required: true, message: 'Введите новый пароль' },
                    { min: 6, message: 'Пароль должен содержать минимум 6 символов' }
                  ]}
                >
                  <Input.Password 
                    prefix={<LockOutlined style={{ color: '#D189C9' }} />} 
                    placeholder="Введите новый пароль"
                  />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  label={<span style={{ color: 'white' }}>Подтвердите пароль</span>}
                  dependencies={['newPassword']}
                  rules={[
                    { required: true, message: 'Подтвердите пароль' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Пароли не совпадают'));
                      },
                    }),
                  ]}
                >
                  <Input.Password 
                    prefix={<LockOutlined style={{ color: '#D189C9' }} />} 
                    placeholder="Подтвердите новый пароль"
                  />
                </Form.Item>

                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit"
                    loading={changingPassword}
                    style={{ background: '#D189C9', borderColor: '#D189C9' }}
                  >
                    Сменить пароль
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Card>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default UserProfilePage;