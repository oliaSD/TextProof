import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Table, 
  Typography, 
  Spin, 
  Alert, 
  Button, 
  ConfigProvider 
} from 'antd';
import { 
  PieChartOutlined, 
  BarChartOutlined, 
  LineChartOutlined,
  FileTextOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import { Pie, Bar, Line } from '@ant-design/charts';
import { fetchUserStats, StatsData } from '../../../redux/api/statApi';
import { PieChartComponent } from '../report/Chart';
import { useNavigate } from 'react-router-dom';
import './analyticPage.css';

const { Title, Text } = Typography;

interface StatsPageProps {
  userId: string;
}

const StatsPage: React.FC<StatsPageProps> = ({ userId }) => {
  const [statsData, setStatsData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchUserStats(userId);
        setStatsData(data);
        setError(null);
      } catch (err) {
        setError('Не удалось загрузить данные статистики');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
        <Spin size="large" tip="Загрузка данных..." />
      </div>
    );
  }

  if (error) {
    return <Alert message={error} type="error" showIcon style={{ margin: '20px' }} />;
  }

  if (!statsData) {
    return <Alert message="Нет данных для отображения" type="warning" showIcon style={{ margin: '20px' }} />;
  }

  // Данные для круговой диаграммы (оригинальность, заимствования, цитирования)
  const qualityDistributionData = [
    { type: 'Оригинальность', value: statsData.avg_originality },
    { type: 'Заимствования', value: statsData.avg_borrowing },
    { type: 'Цитирования', value: statsData.avg_citation },
  ];

  // Подготовка данных для линейного графика
  const prepareLineData = () => {
    console.log(statsData)
    if (!statsData.wordsCount) return [];
    
    return statsData.wordsCount.map((value, index) => ({
      index: index + 1,
      value: value.total_words,
      type: value.paper_name
    }));
  };

  const lineData = prepareLineData();
        

  const lineConfig = {
    data: lineData,
    xField: 'type',
    yField: 'value',
    label: {
      style: {
        fill: '#fff',
      },
    },
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: '#D189C9',
        stroke: '#D189C9',
      },
    },
    lineStyle: {
      stroke: '#D189C9',
    },
    xAxis: {
      label: {
        style: {
          fill: '#fff',
        },
      },
    },
    yAxis: {
      label: {
        style: {
          fill: '#fff',
        },
      },
      title: {
        text: 'Количество слов',
        style: {
          fill: '#fff',
        },
      },
    },
    tooltip: {
      showMarkers: true,
      formatter: (datum: any) => {
        return { name: 'Количество слов', value: datum.value };
      },
    },
    interactions: [{ type: 'marker-active' }],
  };

  // Колонки для таблицы
  const summaryColumns = [
    {
      title: 'Показатель',
      dataIndex: 'metric',
      key: 'metric',
      render: (text: string) => (
        <span style={{ color: 'white', fontWeight: 'bold' }}>{text}</span>
      )
    },
    {
      title: 'Значение',
      dataIndex: 'value',
      key: 'value',
      render: (text: string) => (
        <span style={{ color: 'white' }}>{text}</span>
      )
    },
  ];

  const summaryData = [
    { key: '1', metric: 'Всего статей', value: statsData.completeStats.total_papers },
    { key: '2', metric: 'Всего слов', value: statsData.totalWords },
    { key: '3', metric: 'Средняя оригинальность', value: `${(statsData.avg_originality).toFixed(1)}%` },
    { key: '4', metric: 'Средние заимствования', value: `${(statsData.avg_borrowing).toFixed(1)}%` },
    { key: '5', metric: 'Средние цитирования', value: `${(statsData.avg_citation).toFixed(1)}%` },
    { key: '6', metric: 'Среднее слов на статью', value: statsData.completeStats.avg_words_per_paper.toFixed(0) },
    { key: '7', metric: 'Среднее символов на статью', value: statsData.completeStats.avg_chars_per_paper.toFixed(0) },
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
          },
          Typography: {
            colorText: 'white'
          }
        },
      }}
    >
      <div className="analytic-page-container">
        <Card
          title={
            <span style={{ color: 'white' }}>
              <FileTextOutlined style={{ marginRight: '8px', color: '#D189C9' }} />
              Статистика статей пользователя {userId}
            </span>
          }
          bordered={false}
          className="analytic-card"
        >
          {/* Основные метрики */}
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={6}>
              <Card bordered={false} style={{ background: '#1a1a1a' }}>
                <Text strong style={{ color: '#D189C9' }}>Всего статей</Text>
                <Title level={3} style={{ color: 'white', margin: 0 }}>{statsData.completeStats.total_papers}</Title>
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false} style={{ background: '#1a1a1a' }}>
                <Text strong style={{ color: '#D189C9' }}>Всего слов</Text>
                <Title level={3} style={{ color: 'white', margin: 0 }}>{statsData.totalWords}</Title>
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false} style={{ background: '#1a1a1a' }}>
                <Text strong style={{ color: '#D189C9' }}>Средняя оригинальность</Text>
                <Title level={3} style={{ color: 'white', margin: 0 }}>{(statsData.avg_originality).toFixed(1)}%</Title>
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false} style={{ background: '#1a1a1a' }}>
                <Text strong style={{ color: '#D189C9' }}>Средний размер</Text>
                <Title level={3} style={{ color: 'white', margin: 0 }}>{statsData.averageWordCount.toFixed(0)} слов</Title>
              </Card>
            </Col>
          </Row>

          {/* Графики и таблицы */}
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={12}>
              <Card 
                bordered={false} 
                style={{ background: '#1a1a1a' }}
                title={
                  <span style={{ color: 'white' }}>
                    <PieChartOutlined style={{ marginRight: '8px', color: '#D189C9' }} />
                    Распределение по качеству контента
                  </span>
                }
              >
                <PieChartComponent data={qualityDistributionData} darkMode />
              </Card>
            </Col>
            <Col span={12}>
              <Card 
                bordered={false} 
                style={{ background: '#1a1a1a' }}
                title={
                  <span style={{ color: 'white' }}>
                    <LineChartOutlined style={{ marginRight: '8px', color: '#D189C9' }} />
                    Количество слов по статьям
                  </span>
                }
              >
                {lineData.length > 0 ? (
                  <Line {...lineConfig} />
                ) : (
                  <Alert message="Нет данных для отображения" type="warning" showIcon />
                )}
              </Card>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Card 
                bordered={false} 
                style={{ background: '#1a1a1a' }}
                title={
                  <span style={{ color: 'white' }}>
                    Сводная статистика
                  </span>
                }
              >
                <Table 
                  columns={summaryColumns} 
                  dataSource={summaryData} 
                  pagination={false}
                  bordered={false}
                  style={{ background: 'transparent' }}
                />
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default StatsPage;