import { useAppSelector } from "../../../hooks";
import { RootState } from "../../../store";
import { Col, Row, ConfigProvider, Table, Button, Card, TableProps } from "antd";
import { useEffect, useRef, useState } from "react";
import { getUser } from '../../../redux/utils/auth';
import axios from "axios";
import './report.css';
import dayjs from "dayjs";
import PdfViewer from "./FullReport";
import { EyeOutlined, FileTextOutlined, PrinterFilled } from '@ant-design/icons';
import { Pie } from '@antv/g2plot';
import { PieChartComponent } from "./Chart";

const containerStyle: React.CSSProperties = {
    background: 'black',
    padding: '20px',
    minHeight: 'calc(100vh - 180px)',
    position: 'relative'
};

const headerStyle: React.CSSProperties = {
    fontSize: 'clamp(20px, 3vw, 30px)',
    color: 'white',
    textAlign: 'center',
    width: '100%',
    padding: '1em 0',
    margin: 0
};

const cardStyle: React.CSSProperties = {
    background: 'black',
    border: '1px solid #333',
    borderRadius: '8px',
    marginBottom: '16px'
};

export interface Report {
    reportId: number
    paperId: number
    reportParams: ReportParams
    reportSources: ReportSource[]
    fileMetadata: FileMetadata
}

export interface ReportParams {
    originalPercentage: number
    borrowingPercentage: number
    citationPercentage: number
}

export interface ReportSource {
    sourceType: string
    borrowingText: string
    sourceUrl: string
}

export interface FileMetadata {
    paperId: number
    fileName: string
    fileExtension: string
    size: number
    wordCount: number
    createdDate: string
}

const columns: TableProps<{ key: string, parameter: string, value: any } | undefined>['columns'] = [
    {
        title: 'Параметр',
        dataIndex: 'parameter',
        key: 'parameter',
        width: '50%',
    },
    {
        title: 'Значение',
        dataIndex: 'value',
        key: 'value',
        width: '50%',
    },
];


const dataSource = (data: Report | undefined) => [
    {
        key: '1',
        parameter: 'Оригинальность',
        value: `${data?.reportParams.originalPercentage.toFixed(2)} %`,
    },
    {
        key: '2',
        parameter: 'Заимствования',
        value: `${data?.reportParams.borrowingPercentage.toFixed(2)} %`,
    },
    {
        key: '3',
        parameter: 'Цитирование',
        value: `${data?.reportParams.citationPercentage.toFixed(2)} %`,
    },
    {
        key: '4',
        parameter: 'Дата создания',
        value: dayjs(data?.fileMetadata.createdDate).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
        key: '5',
        parameter: 'Количество страниц',
        value: '', // Замените на актуальное значение
    },
    {
        key: '6',
        parameter: 'Символов в тексте',
        value: data?.fileMetadata.size,
    },
    {
        key: '7',
        parameter: 'Слов в тексте',
        value: data?.fileMetadata.wordCount,
    },
    {
        key: '8',
        parameter: 'Число предложений',
        value: '', // Замените на актуальное значение
    },
    {
        key: '9',
        parameter: 'Автор',
        value: getUser().username,
    },
    {
        key: '10',
        parameter: 'Название документа',
        value: data?.fileMetadata.fileName,
    },
];



export const ReportComponent: React.FC = () => {
    const reportId = useAppSelector((state: RootState) => state.report);
    const [data, setData] = useState<Report>();
    const [showPdf, setShowPdf] = useState(false);
    // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        // const handleResize = () => setWindowWidth(window.innerWidth);
        // window.addEventListener('resize', handleResize);
        document.title = "Отчеты"
        getReport()
        // return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getData = () => {
        if (data === undefined) {
            return []
        }
        return [
            { type: 'Оригинальность', value: data?.reportParams.originalPercentage || 0 },
            { type: 'Цитирование', value: data?.reportParams.citationPercentage || 0 },
            { type: 'Заимствование', value: data?.reportParams.borrowingPercentage || 0 }
        ]
    }

    const handleClick = (url: string) => {
        window.open(url, '_blank');
    };



    // const config = {
    //     appendPadding: 10,
    //     angleField: 'value',
    //     colorField: 'type',
    //     radius: 1,
    //     innerRadius: 0.6,
    //     startAgile: 0,

    //     label: {
    //         type: 'inner',
    //         offset: '-8%',
    //         content: '{percentage}',
    //         style: { fontSize: 10 },
    //         labelEmit: false
    //     },
    //     pieStyle: {
    //         lineWidth: 0
    //     },

    //     interactions: [{ type: 'element-active' }],
    // };

    const getReport = () => {
        if (reportId.reportId === -1)
            return
        axios({
            method: 'get',
            url: `http://localhost:8081/reports/get/${getUser().username}/${reportId.reportId}`,
            withCredentials: false,
        }).then(function (response) {
            console.log(response)
            const res: Report = {
                ...response.data.report
            }
            setData({ ...res })
        }).catch(function (error) {
            if (error.response) {
                console.log("Ошибка неверный логин или пароль")
            } else if (error.request) {
                console.log('Сервер недоступен')
            }
        })
    }
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
                        colorText: 'white',
                    },
                },
            }}
        >
            <div style={containerStyle}>
                <Button
                    type="primary"
                    icon={showPdf ? <FileTextOutlined /> : <EyeOutlined />}
                    onClick={() => setShowPdf(!showPdf)}
                    style={{
                        position: 'fixed',
                        top: '15vh',
                        right: '20px',
                        zIndex: 1000,
                        background: 'black',
                        borderColor: 'white'
                    }}
                >
                    {showPdf ? 'Краткий отчет' : 'Полный отчет'}
                </Button>
                <Button
                    type="primary"
                    icon={ <PrinterFilled />}
                    onClick={() => handleClick(`http://localhost:8081/full/report/get/${reportId.reportId}`)}
                    style={{
                        position: 'fixed',
                        top: '20vh',
                        right: '20px',
                        zIndex: 1000,
                        background: 'black',
                        borderColor: 'white'
                    }}
                >
                    Открыть отчет на печать
                </Button>
                {showPdf ? (
                    <PdfViewer fileUrl={`http://localhost:8081/full/report/paper/${reportId.reportId}`} />
                ) : (
                    <>
                        <h2 style={headerStyle}>
                            Проверка файла {data?.fileMetadata.fileName} выполнена!
                        </h2>

                        <Row gutter={[16, 16]} justify="center">
                            <Col xs={24} md={12} lg={10}>
                                <Card style={cardStyle}>
                                    <Table
                                        columns={columns}
                                        dataSource={dataSource(data)}
                                        pagination={false}
                                        showHeader={false}
                                        size="small"
                                        scroll={{ x: true }}
                                    />
                                </Card>
                            </Col>

                            <Col xs={24} md={12} lg={10}>
                                <Card style={cardStyle}>
                                    <PieChartComponent data={getData()} />
                                </Card>
                            </Col>
                        </Row>
                    </>
                )}
            </div>
        </ConfigProvider>
    );

}
