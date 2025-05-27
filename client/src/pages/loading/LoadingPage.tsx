import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Spin, Result, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';

const LoadingRedirectPage = () => {


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { activationCode } = useParams();


    useEffect(() => {
        const makeRequest = async () => {
            try {
                // Отправляем запрос на сервер
                console.log(activationCode)
                const response = await axios.get(`http://localhost:8080/activate/${activationCode}`);
                console.log(response)
                // Если успешно - перенаправляем
                if (response.status === 200) {
                    navigate('/login'); // Укажите ваш целевой путь
                } else {
                    setError('Сервер вернул ошибку');
                }
            } catch (err: any) {
                setError(err.message || 'Произошла ошибка при запросе');
            } finally {
                setLoading(false);
            }
        };

        makeRequest();
    }, [navigate]);

    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
        }}>
            {loading ? (
                <>
                    <Spin indicator={antIcon} />
                    <p style={{ marginTop: 16 }}>Ожидание ответа от сервера...</p>
                </>
            ) : error ? (
                <Result
                    status="error"
                    title="Ошибка при загрузке"
                    subTitle={error}
                    extra={[
                        <Button
                            type="primary"
                            key="retry"
                            onClick={() => window.location.reload()}
                        >
                            Попробовать снова
                        </Button>,
                    ]}
                />
            ) : null}
        </div>
    );
};

export default LoadingRedirectPage;