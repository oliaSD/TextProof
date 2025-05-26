import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Space, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;

export const GroupDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(false);

  const api = axios.create({
    baseURL: "http://localhost:8082",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  useEffect(() => {
    const fetchGroup = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/groups/${id}`);
        setGroup(response.data);
      } catch (error) {
        console.error('Ошибка загрузки группы', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGroup();
  }, [id]);

  return (
    <div style={{ padding: '20px' }}>
      <Space style={{ marginBottom: '20px' }}>
        <Button 
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/account/groups')}
        >
          Назад к списку
        </Button>
        {/* <Title level={2}>Группа: {group?.name || 'Загрузка...'}</Title> */}
      </Space>
      
      {/* Детали группы */}
      {group && (
        <div>
          {/* <p>Описание: {group.description}</p>
          <p>Статус: {group.isPublic ? 'Публичная' : 'Приватная'}</p> */}
          {/* Другая информация о группе */}
        </div>
      )}
    </div>
  );
};