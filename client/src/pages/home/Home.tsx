import { useState, useRef } from 'react';
import { 
  Button, 
  Col, 
  Row, 
  FloatButton,
  Affix,
  Typography 
} from 'antd';
import { 
  HomeOutlined, 
  SearchOutlined, 
  BookOutlined, 
  BarChartOutlined,
  UpOutlined
} from '@ant-design/icons';
import './home.css';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

export const HomeComponent = () => {
  const sections = {
    home: useRef<HTMLDivElement>(null),
    check: useRef<HTMLDivElement>(null),
    grammar: useRef<HTMLDivElement>(null),
    analytics: useRef<HTMLDivElement>(null),
  };

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Секция Главная */}
      <div className="section home-section">
        <Row gutter={[24, 24]} justify="center" align="middle">
          <Col xs={24} md={12} className="content-col">
            <Title level={2} className="section-title">
              TextProof - защита оригинальности ваших научных исследований
            </Title>
            <Paragraph className="section-text">
              Это инновационная онлайн-платформа для проверки научных статей на плагиат. 
              Мы предлагаем комплексный анализ текстов, предоставляем подробные отчеты 
              и рекомендации для улучшения оригинальности работы.
            </Paragraph>
            <Button 
              onClick={() => navigate('/check')}
              className="action-button"
              size="large"
            >
              Начать проверку
            </Button>
            <Title level={3} className="section-subtitle">
              Честность в науке - наша миссия!
            </Title>
          </Col>
          <Col xs={24} md={12} className="image-col">
            <img 
              src="/image/homeImage.png" 
              alt="Главное изображение"
              className="responsive-image"
            />
          </Col>
        </Row>
      </div>

      {/* Секция Проверка */}
      <section id="check"></section>
      <div ref={sections.check} className="section check-section">
        <Title level={2} className="section-title">
          На нашем сайте вы можете проверить текст на плагиат
        </Title>
        <Title level={3} className="accent-title">
          НАЙДИТЕ ПРОВЕРКУ, КОТОРАЯ ПОДХОДИТ ИМЕННО ВАМ
        </Title>
        
        <Row gutter={[24, 24]} className="features-row">
          <Col xs={24} md={8} className="feature-card">
            <Title level={4} className="feature-title">
              Проверка по всем источникам
            </Title>
            <Paragraph className="feature-text">
              Мы анализируем ваш текст по всему интернету и нашей внутренней базе данных.
            </Paragraph>
          </Col>
          
          <Col xs={24} md={8} className="feature-card middle-card">
            <Title level={4} className="feature-title">
              Проверка по выбранным источникам
            </Title>
            <Paragraph className="feature-text">
              У вас есть возможность выбрать конкретные источники для проверки.
            </Paragraph>
          </Col>
          
          <Col xs={24} md={8} className="feature-card">
            <Title level={4} className="feature-title">
              Проверка по внутренней базе
            </Title>
            <Paragraph className="feature-text">
              Сравнивайте только с материалами, уже хранящимися в нашей базе.
            </Paragraph>
          </Col>
        </Row>
        
        <Button 
          onClick={() => navigate('/check')}
          className="action-button"
          size="large"
        >
          Проверить текст
        </Button>
      </div>

      {/* Секция Грамматика */}
      <section id="grammar"></section>
      <div ref={sections.grammar} className="section grammar-section">
        <Title level={3} className="accent-title">
          БОЛЬШЕ, ЧЕМ СРЕДСТВО ПРОВЕРКИ ГРАММАТИКИ
        </Title>
        
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={8} className="image-col">
            <img 
              src="/image/grammarImage.png" 
              alt="Грамматика"
              className="responsive-image"
            />
          </Col>
          
          <Col xs={24} md={16}>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12} className="feature-card">
                <Title level={4} className="feature-title">
                  Продвинутая грамматика
                </Title>
                <Paragraph className="feature-text">
                  Исправляйте сложные грамматические ошибки.
                </Paragraph>
              </Col>
              
              <Col xs={24} md={12} className="feature-card">
                <Title level={4} className="feature-title">
                  Продвинутая орфография
                </Title>
                <Paragraph className="feature-text">
                  Улучшите текст с помощью контекстной проверки.
                </Paragraph>
              </Col>
              
              <Col xs={24} md={12} className="feature-card">
                <Title level={4} className="feature-title">
                  Структура предложения
                </Title>
                <Paragraph className="feature-text">
                  Правильно структурируйте предложения.
                </Paragraph>
              </Col>
              
              <Col xs={24} className="action-col">
                <Button 
                  onClick={() => navigate('/check')}
                  className="action-button"
                  size="large"
                >
                  Проверить грамматику
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      {/* Кнопка возврата наверх */}
      <section id="analytics"></section>
      <section id="reports"></section>
      <FloatButton 
        icon={<UpOutlined />} 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="back-to-top"
      />
    </div>
  );
};