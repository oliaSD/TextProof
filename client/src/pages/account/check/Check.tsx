import { useAppDispatch, useAppSelector } from "../../../hooks";
import { RootState } from "../../../store";
import { Button, Table, ConfigProvider, Progress, ProgressProps } from "antd";
import { set } from '../../../redux/reducers/CkeckReducer';
import { select } from '../../../redux/reducers/ReportReducer';
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getUser } from '../../../redux/utils/auth';
import axios from "axios";
import './check.css';
import { Check } from "../../../redux/interface/Check";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ReportComponent } from "../report/Report";

const twoColors: ProgressProps['strokeColor'] = {
    '0%': '#f01ec6c9',
    '100%': 'hwb(312 58% 12%)',
};

interface CheckProps {
    uriGetCheksAction: string;
    uriGetStatusAction: string;
    uriUpdateFilesAction: string;
    uriNavigate: string,
}

export const CheckAccountComponent: React.FC<CheckProps> = ({ uriGetCheksAction, uriGetStatusAction, uriUpdateFilesAction, uriNavigate }) => {
    const checkState = useAppSelector((state: RootState) => state.check);
    const dispatch = useAppDispatch();
    const [checks, setChecks] = useState<Check[]>(checkState.checks);
    const [showReport, setShowReport] = useState(false);
    const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
    const navigate = useNavigate();


    const getChecks = () => {
        axios({
            method: 'get',
            url: uriGetCheksAction,
            withCredentials: false,
        }).then(function (response) {
            let res = response.data as Check[]
            res.forEach(e => (e.status === 'finish_check' ? e.percentage = 100 : e.percentage = 0))
            dispatch(set(res))
        }).catch(function (error) {
            if (error.response) {
                console.log("Ошибка неверный логин или пароль")
            } else if (error.request) {
                console.log('Сервер недоступен')
            }
        })
    }

    const status = (check: Check) => {
        axios({
            method: 'post',
            url: uriGetStatusAction + check.paperId,
            withCredentials: false,
        }).then(function (response) {
            const res = response.data.status as string

        }).catch(function (error) {
            if (error.response) {
                console.log("Ошибка неверный логин или пароль")
            } else if (error.request) {
                console.log('Сервер недоступен')
            }
        })
    }

    async function updateCheck() {
        axios({
            method: 'get',
            url: uriUpdateFilesAction,
            withCredentials: false,
        }).then(function (response) {
            let res = response.data as Check[]
            console.log(res)
            res.forEach(element => {
                setChecks((prevState) =>
                    prevState.map((item) => {
                        let newPercentage = item.percentage;
                        if (element.status === 'finish_check') {
                            newPercentage = 100
                        }
                        else
                            if (newPercentage < 50) {
                                newPercentage += 10;
                            } else if (newPercentage < 80) {
                                newPercentage += 5;
                            } else if (newPercentage < 95) {
                                newPercentage += 3;
                            }

                        return { ...item, percentage: newPercentage };
                    })
                );
            });
        }).catch(function (error) {
            if (error.response) {
                console.log("Ошибка неверный логин или пароль")
            } else if (error.request) {
                console.log('Сервер недоступен')
            }
        })
    }

    useEffect(() => {
        document.title = "Проверка"
        getChecks()
        const intervalId = setInterval(updateCheck, 5000)
        return () => clearInterval(intervalId);
    }, [])

    const handleShowReport = (check: Check) => {
        setSelectedReportId(check.reportId);
        setShowReport(true);
        dispatch(select(check.reportId));
    };

    const handleBackToChecks = () => {
        setShowReport(false);
        setSelectedReportId(null);
    };

    const columns = [
        {
            title: 'Название файла',
            dataIndex: 'fileName',
            key: 'fileName',
            width: '40%',
            render: (text: string) => (
                <span style={{ color: 'white' }}>{text}</span>
            )
        },
        {
            title: 'Прогресс проверки',
            key: 'progress',
            width: '30%',
            render: (_: any, record: Check) => (
                <Progress
                    percent={record.percentage}
                    strokeColor={twoColors}
                    trailColor="white"
                    showInfo={false}
                />
            )
        },
        {
            title: 'Процент проверки',
            key: 'percentage',
            width: '15%',
            render: (_: any, record: Check) => (
                <span style={{ color: 'white' }}>{record.percentage}%</span>
            )
        },
        {
            title: 'Действия',
            key: 'action',
            width: '15%',
            render: (_: any, record: Check) => (
                record.percentage === 100 ? (
                    <Button
                        type="primary"
                        onClick={() => handleShowReport(record)}
                        style={{ background: '#D189C9', borderColor: '#D189C9' }}
                    >
                        Посмотреть отчет
                    </Button>
                ) : null
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
                },
            }}
        >
            {showReport ? (
                <div className="back-ground">
                    <Button
                        type="text"
                        icon={<ArrowLeftOutlined />}
                        onClick={handleBackToChecks}
                        style={{
                            position: 'relative',
                            top: '60px',
                            left: '20px',
                            zIndex: 1000,
                            color: 'white',
                            fontSize: '16px'
                        }}
                    >
                        Назад к проверкам
                    </Button>
                    <ReportComponent />
                </div>
            ) : (
                <div style={{
                    background: 'black',
                    padding: '20px',
                    maxHeight: 'calc(100vh - 140px)',
                    height: '100%',
                }}>
                    <Table
                        columns={columns}
                        dataSource={checks}
                        rowKey="paperId"
                        pagination={false}
                        style={{ background: 'black' }}
                        bordered
                    />
                </div>
            )}
        </ConfigProvider>
    );

}