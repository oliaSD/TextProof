import React, { useState, useEffect } from 'react';
import { Table, Button, message, Modal, Form, Input, Select, Space, ConfigProvider, Tag } from 'antd';
import axios from 'axios';
import { PlusOutlined, SearchOutlined, UserAddOutlined, TeamOutlined, ArrowLeftOutlined, LinkOutlined } from '@ant-design/icons';
import { getUser } from "../../../redux/utils/auth";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

interface IGroup {
    id: string,
    name: string,
    members: []
}

export const GroupsPage = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMembersModalVisible, setIsMembersModalVisible] = useState(false);
  const [currentGroup, setCurrentGroup] = useState<IGroup | null>(null);
  const [form] = Form.useForm();
  const [membersForm] = Form.useForm();

  const api = axios.create({
    baseURL: "http://localhost:8082",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/groups/${getUser().username}`);
      const sortedGroups = response.data.sort((a: any, b: any) => 
        a.name.localeCompare(b.name)
      );
      setGroups(sortedGroups);
      setFilteredGroups(sortedGroups);
      setPagination({
        ...pagination,
        total: sortedGroups.length,
      });
    } catch (error) {
      message.error('Ошибка при загрузке групп');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGroup = async (values: any) => {
    try {
      await api.post('/groups', {...values, "username" : getUser().username});
      message.success('Группа успешно создана');
      setIsModalVisible(false);
      form.resetFields();
      fetchGroups();
    } catch (error) {
      message.error('Ошибка при создании группы');
    }
  };

  const handleAddMember = async (values: any) => {
    try {
      await api.post(`/groups/notify/${currentGroup?.id}/${values.username}`, {
        username: values.username
      });
      message.success('Пользователь добавлен в группу');
      setIsMembersModalVisible(false);
      membersForm.resetFields();
      fetchGroups();
    } catch (error) {
      message.error('Ошибка при добавлении пользователя');
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    if (value === '') {
      setFilteredGroups(groups);
      setPagination({
        ...pagination,
        current: 1,
        total: groups.length,
      });
      return;
    }

    const filtered = groups.filter((group: any) => 
      group.name.toLowerCase().includes(value.toLowerCase()) ||
      group.description?.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredGroups(filtered);
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
    fetchGroups();
  }, []);

  const columns = [
    {
      title: 'Название группы',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <span style={{ color: 'white' }}>{text}</span>
      )
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => (
        <span style={{ color: 'white' }}>{text || '—'}</span>
      )
    },
    {
      title: 'Статус',
      dataIndex: 'isPublic',
      key: 'status',
      render: (isPublic: boolean) => (
        <Tag color={isPublic ? '#D189C9' : '#f01ec6c9'}>
          {isPublic ? 'Публичная' : 'Приватная'}
        </Tag>
      )
    },
    {
      title: 'Участники',
      dataIndex: 'memberCount',
      key: 'members',
      render: (_: any, record: any) => (
        <span style={{ color: 'white' }}>
          {record.members?.length || 0} чел.
        </span>
      )
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<TeamOutlined />}
            onClick={() => {
              setCurrentGroup(record);
              setIsMembersModalVisible(true);
            }}
            style={{ backgroundColor: '#D189C9' }}
          >
            Участники
          </Button>
          <Button 
            type="default" 
            icon={<LinkOutlined />}
            onClick={() => navigate(`/group/${record.id}`)}
            style={{ 
              backgroundColor: '#2a2a2a',
              color: '#D189C9',
              borderColor: '#D189C9'
            }}
          >
            Открыть
          </Button>
        </Space>
      )
    }
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: '#1a1a1a',
            headerColor: '#ffffff',  // Белый цвет для лучшей контрастности
            headerSplitColor: '#444',
            bodySortBg: '#1a1a1a',
            rowHoverBg: '#2a2a2a',  // Более светлый фон при наведении
            colorBgContainer: '#121212',  // Темный фон таблицы
            borderColor: '#444',
            colorText: '#e0e0e0',  // Светло-серый для основного текста
            colorTextHeading: '#ffffff',  // Белый для заголовков
            colorLink: '#D189C9',  // Фиолетовый для ссылок
            colorLinkHover: '#f01ec6c9',  // Более светлый фиолетовый при наведении
          },
          Pagination: {
            colorPrimary: '#D189C9',
            colorPrimaryHover: '#f01ec6c9',
            colorBgContainer: '#121212',
            colorText: '#e0e0e0',
            colorTextDisabled: '#888',
            colorBgTextHover: 'rgba(209, 137, 201, 0.2)',
            colorBgTextActive: 'rgba(209, 137, 201, 0.3)',
          },
          Modal: {
            contentBg: '#1a1a1a',
            headerBg: '#1a1a1a',
            titleColor: '#ffffff',  // Белый для заголовков модальных окон
            colorText: '#ffffff',  // Светло-серый для текста
            colorIcon: '#ffffff',  // Белый для иконок
            colorIconHover: '#D189C9',  // Фиолетовый при наведении
          },
          Input: {
            colorBgContainer: '#2a2a2a',  // Темный фон полей ввода
            colorText: '#ffffff',  // Белый текст
            colorBorder: '#555',
            hoverBorderColor: '#D189C9',
            activeBorderColor: '#D189C9',
            colorTextPlaceholder: '##ffffff',  // Серый для placeholder
          },
          Select: {
            optionSelectedBg: '#333',
            optionActiveBg: '#444',
            colorBgContainer: '#2a2a2a',
            colorText: '#ffffff',
            colorBorder: '#555',
            colorTextPlaceholder: '#999',
            colorIcon: '#ffffff',
          },
          Tag: {
            colorText: '#ffffff',  // Белый текст в тегах
          },
          Button: {
            colorText: '#ffffff',  // Белый текст кнопок
          }
        },
      }}
    >
      <div style={{
        background: '#121212',
        padding: '20px',
        minHeight: 'calc(100vh - 140px)',
        color: 'white'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center', 
          marginBottom: '20px',
        }}>
          <Space>
            <Button 
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(-1)}
              style={{ 
                marginRight: '16px',
                backgroundColor: '#2a2a2a',
                color: '#D189C9',
                borderColor: '#D189C9'
              }}
            >
              Назад
            </Button>
            <h1 style={{ 
              color: '#ffffff',
              margin: 0,
              fontSize: '24px',
              fontWeight: 600
            }}>
              Управление группами
            </h1>
          </Space>
          
          <Space>
            <Input
              placeholder="Поиск по названию или описанию"
              prefix={<SearchOutlined style={{ color: '#999' }} />}
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: 300 }}
              allowClear
            />
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => setIsModalVisible(true)}
              style={{ 
                backgroundColor: '#D189C9',
                fontWeight: 500
              }}
            >
              Создать группу
            </Button>
          </Space>
        </div>
        
        <Table 
          columns={columns} 
          dataSource={filteredGroups} 
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

        {/* Модальное окно создания группы */}
        <Modal
          title="Создать новую группу"
          visible={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            form.resetFields();
          }}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCreateGroup}
          >
            <Form.Item
              name="groupName"
              label="Название группы"
              rules={[{ required: true, message: 'Введите название группы' }]}
            >
              <Input placeholder="Введите название группы" />
            </Form.Item>
            
            <Form.Item
              name="isPublic"
              label="Тип группы"
              initialValue={false}
            >
              <Select>
                <Option value={false}>Приватная</Option>
              </Select>
            </Form.Item>
            
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit"
                style={{ backgroundColor: '#D189C9', width: '100%' }}
              >
                Создать группу
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Модальное окно управления участниками */}
        <Modal
          title={`Участники группы "${currentGroup?.name}"`}
          visible={isMembersModalVisible}
          onCancel={() => {
            setIsMembersModalVisible(false);
            membersForm.resetFields();
          }}
          footer={null}
          width={800}
        >
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ color: 'white' }}>Добавить участника</h3>
            <Form
              form={membersForm}
              layout="inline"
              onFinish={handleAddMember}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Введите имя пользователя' }]}
              >
                <Input placeholder="Имя пользователя" style={{ width: 300 }} />
              </Form.Item>
              
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  icon={<UserAddOutlined />}
                  style={{ backgroundColor: '#D189C9' }}
                >
                  Добавить
                </Button>
              </Form.Item>
            </Form>
          </div>
          
          <Table
            columns={[
              {
                title: 'Имя пользователя',
                dataIndex: 'username',
                key: 'username',
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
                title: 'Роль',
                dataIndex: 'role',
                key: 'role',
                render: (text: string) => (
                  <span style={{ color: 'white' }}>{text}</span>
                )
              }
            ]}
            dataSource={currentGroup?.members || []}
            rowKey="username"
            pagination={false}
            bordered
          />
        </Modal>
      </div>
    </ConfigProvider>
  );
};

export default GroupsPage;