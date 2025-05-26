import React, { useState, useEffect } from 'react';
import { Table, Button, message, Switch, Space, ConfigProvider, Input } from 'antd';
import axios from 'axios';
import { ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons';
import { getUser } from "../../../redux/utils/auth";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const api = axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/users');
      // Сортируем пользователей по имени при загрузке
      const sortedUsers = response.data.sort((a: any, b: any) => 
        a.username.localeCompare(b.username)
      );
      setUsers(sortedUsers);
      setFilteredUsers(sortedUsers);
      setPagination({
        ...pagination,
        total: sortedUsers.length,
      });
    } catch (error) {
      message.error('Ошибка при загрузке пользователей');
    } finally {
      setLoading(false);
    }
  };

  const isCurrentUser = (record: any) => {
    return getUser().username === record.username;
  }

  const toggleBlockStatus = async (userName: string, currentStatus: boolean) => {
    try {
      await api.post(`/admin/block/${userName}`, { 
        blocked: !currentStatus
      });
      message.success('Статус пользователя обновлен');
      fetchUsers(); 
    } catch (error) {
      message.error('Ошибка при обновлении статуса');
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    if (value === '') {
      setFilteredUsers(users);
      setPagination({
        ...pagination,
        current: 1,
        total: users.length,
      });
      return;
    }

    const filtered = users.filter((user: any) => 
      user.username.toLowerCase().includes(value.toLowerCase()) ||
      user.email.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredUsers(filtered);
    setPagination({
      ...pagination,
      current: 1,
      total: filtered.length,
    });
  };

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: 'Имя пользователя',
      dataIndex: 'username',
      key: 'username',
      //sorter: (a: any, b: any) => a.username.localeCompare(b.username),
      //sortDirections: ['ascend', 'descend'],
      render: (text: string) => (
        <span style={{ color: 'white' }}>{text}</span>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text: string) => (
        <span style={{ color: 'white' }}>{text}</span>
      )
    },
    {
      title: 'Тип',
      dataIndex: 'userRole',
      key: 'type',
      render: (type: string) => {
        const typeNames = {
          'USER': 'Пользователь',
          'ADMIN': 'Администратор'
        };
        return (
          <span style={{ color: 'white' }}>
            {typeNames[type as keyof typeof typeNames] || type}
          </span>
        );
      }
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span style={{ 
          color: status === 'ACTIVE' ? '#D189C9' : '#f01ec6c9',
          fontWeight: 'bold'
        }}>
          {status === 'ACTIVE' ? 'Активен' : 'Заблокирован'}
        </span>
      )
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Switch 
            disabled={isCurrentUser(record)}
            checked={record.status === 'ACTIVE'}
            onChange={() => toggleBlockStatus(record.username, record.status !== 'ACTIVE')}
            style={{
              backgroundColor: record.status === 'ACTIVE' ? '#D189C9' : '#f01ec6c9'
            }}
          />
        </Space>
      )
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
          Pagination: {
            colorPrimary: '#D189C9',
            colorPrimaryHover: '#f01ec6c9',
            colorBgContainer: 'black',
            colorText: 'white',
            colorTextDisabled: '#666',
            colorBgTextHover: 'rgba(209, 137, 201, 0.1)',
            colorBgTextActive: 'rgba(209, 137, 201, 0.2)',
          }
        },
      }}
    >
      <div style={{
        background: 'black',
        padding: '20px',
        minHeight: 'calc(100vh - 140px)'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center', 
          marginBottom: '20px',
          color: 'white'
        }}>
          <h1 style={{ color: 'white', margin: 0 }}>Панель администратора</h1>
          <Input
            placeholder="Поиск по имени или email"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />
        </div>
        <Table 
          columns={columns} 
          dataSource={filteredUsers} 
          rowKey="id"
          loading={loading}
          bordered
          style={{ background: 'black' }}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50', '100'],
            position: ['bottomCenter'],
            style: { 
              color: 'white',
              marginTop: '20px'
            },
            itemRender: (_, type, originalElement) => {
              if (type === 'page') {
                return (
                  <span style={{ 
                    color: pagination.current === _ ? '#D189C9' : 'white',
                    fontWeight: pagination.current === _ ? 'bold' : 'normal'
                  }}>
                    {_}
                  </span>
                );
              }
              return originalElement;
            }
          }}
          onChange={handleTableChange}
        />
      </div>
    </ConfigProvider>
  );
};

export default AdminPage;