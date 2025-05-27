import React, { useState } from 'react';
import { Button, Card, Input, message, Typography, Layout, ConfigProvider, Progress } from 'antd';
import { CopyOutlined, SyncOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Content } from 'antd/es/layout/layout';

const { TextArea } = Input;
const { Title, Text } = Typography;

const twoColors = {
    '0%': '#f01ec6c9',
    '100%': 'hwb(312 58% 12%)',
};

const GrammarComponent = () => {
    const [originalText, setOriginalText] = useState('');
    const [correctedText, setCorrectedText] = useState('');
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [api] = message.useMessage();

    const handleCheckText = async () => {
        if (!originalText.trim()) {
            api.warning('Введите текст для проверки');
            return;
        }

        setLoading(true);
        setProgress(0);
        
        // Имитация прогресса
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 10;
            });
        }, 300);

        try {
            const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
                model: "deepseek/deepseek-chat:free",
                messages: [{
                    "role": "user", 
                    "content": `Представь, что ты великий ученный и пишешь статью 
                    в научно-публистическом стиле с сохранением всех норм и правил.
                    Вот тебе текст, тебе надо взять только его и написать его без ошибок, 
                    ничего не надо дописывать, только исправить этот текст
                    ${originalText}`
                }]
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer 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`
                }
            });

            setCorrectedText(response.data.choices[0].message.content || 'Ошибок не найдено');
            setProgress(100);
            api.success('Проверка завершена');
        } catch (error) {
            console.error('Ошибка при проверке текста:', error);
            api.error('Произошла ошибка при проверке текста');
            setCorrectedText('');
            setProgress(0);
        } finally {
            setLoading(false);
            clearInterval(progressInterval);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(correctedText)
            .then(() => api.success('Текст скопирован!'))
            .catch(() => api.error('Не удалось скопировать текст'));
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Card: {
                        colorBgContainer: '#1a1a1a',
                        colorBorderSecondary: '#333',
                        colorTextHeading: 'white',
                        colorText: 'white'
                    },
                    Input: {
                        colorBgContainer: '#333',
                        colorBorder: '#555',
                        colorText: 'white',
                        colorTextPlaceholder: '#999'
                    },
                    Button: {
                        colorPrimary: '#D189C9',
                        colorPrimaryHover: '#f01ec6c9',
                        colorPrimaryActive: '#f01ec6c9'
                    }
                },
            }}
        >
            <Layout style={{ 
                background: 'black', 
                minHeight: 'calc(100vh - 140px)',
                padding: '20px'
            }}>
                <Content style={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    overflow: 'auto'
                }}>
                    <Title level={2} style={{ 
                        marginBottom: '24px', 
                        color: 'white' 
                    }}>
                        Проверка текста
                    </Title>
                    
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        gap: '24px',
                        height: '100%',
                        overflow: 'auto'
                    }}>
                        <Card 
                            title="Исходный текст" 
                            style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                            bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                        >
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <TextArea
                                    style={{ 
                                        flex: 1, 
                                        marginBottom: '16px',
                                        backgroundColor: '#333',
                                        color: 'white'
                                    }}
                                    value={originalText}
                                    onChange={(e) => setOriginalText(e.target.value)}
                                    placeholder="Введите текст для проверки..."
                                />
                                <Button
                                    type="primary"
                                    icon={<SyncOutlined />}
                                    onClick={handleCheckText}
                                    loading={loading}
                                    disabled={!originalText.trim()}
                                    style={{ marginBottom: '16px' }}
                                >
                                    Проверить текст
                                </Button>
                                {loading && (
                                    <Progress
                                        percent={progress}
                                        strokeColor={twoColors}
                                        trailColor="white"
                                        showInfo={false}
                                    />
                                )}
                            </div>
                        </Card>

                        {correctedText && (
                            <Card 
                                title="Результат проверки"
                                style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                                bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                                extra={
                                    <Button 
                                        icon={<CopyOutlined />} 
                                        onClick={handleCopy}
                                        disabled={!correctedText}
                                        type="primary"
                                    >
                                        Копировать
                                    </Button>
                                }
                            >
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <TextArea
                                        style={{ 
                                            flex: 1, 
                                            backgroundColor: '#333',
                                            color: 'white',
                                            marginBottom: '16px'
                                        }}
                                        value={correctedText}
                                        readOnly
                                    />
                                    <div style={{ color: 'white' }}>
                                        <Text type="secondary" style={{ color: 'inherit' }}>Статус: </Text>
                                        <Text strong style={{ color: 'inherit' }}>
                                            {loading ? 'Проверка...' : 'Готово'}
                                        </Text>
                                    </div>
                                </div>
                            </Card>
                        )}
                    </div>
                </Content>
            </Layout>
        </ConfigProvider>
    );
};

export default GrammarComponent;