
import { useAppSelector } from "../../../hooks";
import { RootState } from "../../../store";
import { PlusOutlined } from '@ant-design/icons';
import { Button, Carousel, Col, Flex, Row, Image, FloatButton, UploadProps, Upload, Table, TableProps, ConfigProvider } from "antd";

import { useNavigate, useParams } from "react-router";
import { ReactNode, useEffect, useState } from "react";
import { getUser } from '../../../redux/utils/auth'
import axios from "axios";
import './report.css'
import { useAppDispatch } from '../../../hooks';
import { Check } from "../../../redux/interface/Check";
import 'dayjs'
import dayjs from "dayjs";
import { PieChart } from "@opd/g2plot-react";

const styleButton: React.CSSProperties = {
    backgroundColor: 'rgba(80, 80, 80, 1)',
    boxShadow: "none",
    border: 'none',
    padding: '12px 48px',
    transition: 'all 0.5s ease',
    fontSize: '10pt',
    fontWeight: 'bold',
    width: '15em',
    height: '5em',
}


const styleButtonCheck: React.CSSProperties = {
    backgroundImage: 'linear-gradient(240deg, #f01ec6c9, hwb(312 58% 12%))',
    boxShadow: "none",
    border: 'none',
    padding: '12px 48px',
    transition: 'all 0.5s ease',
    fontSize: '10pt',
    fontWeight: 'bold',
    width: '10em',
    height: '3em',
}


const mainText: React.CSSProperties = {
    fontSize: 30,
    color: 'white',
    margin: 0,
    alignContent: 'center',
    textAlign: 'center',
    width: '100%',
    padding: '2em 1em 0em 1em'
}

const innerText: React.CSSProperties = {
    fontSize: 15,
    color: 'white',
    marginLeft: '3em',
    width: '100%',
    padding: '1em 1em 0em 1em'
}


const colorText: React.CSSProperties = {
    ...mainText,
    color: "#AE009A"
}

const baseColumn: React.CSSProperties = {
    background: 'black',
    margin: '16px 16px',
    padding: '16px 16px',
    minWidth: 100,
    display: 'flex',
}

const column: React.CSSProperties = {
    ...baseColumn,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignContent: 'space-between',
    justifyContent: 'top',
    alignItems: 'flex-start',
}

const columnFileIconStyle: React.CSSProperties = {
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignContent: 'stretch',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
}



const baseRow: React.CSSProperties = {
    background: 'black',
    padding: '16px 16px',
    minWidth: 100,
    display: 'flex',
}

const row: React.CSSProperties = {
    ...baseRow,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'stretch',
    justifyContent: 'space-evenly',
    alignItems: 'flex-center',
}

const rowFileIconStyle: React.CSSProperties = {
    ...baseRow,
    width: '100%',
    height: 400,
    overflow: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'stretch',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
}


const columnStyle: React.CSSProperties = {
    backgroundColor: "rgba(67, 67, 67, 1)",
}



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

export const ReportComponent: React.FC = () => {

    const reportId = useAppSelector((state: RootState) => state.report)

    const [data, setData] = useState<Report>()

    const getData = () => {
        if (data === undefined) {
            return []
        }
        return [
            { type: 'Оригинальность', value: data?.reportParams.originalPercentage },
            { type: 'Цитирование', value: data?.reportParams.citationPercentage },
            { type: 'Заимствование', value: data?.reportParams.borrowingPercentage }
        ]
    }

    const config = {
        appendPadding: 10,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        startAgile: 0,
        color: ['rgba(209, 137, 201, 1)', 'rgba(217, 217, 217, 1)', 'rgba(174, 0, 154, 1)'],
        label: {
            type: 'inner',
            offset: '-8%',
            content: '{percentage}',
            style: { fontSize: 10 },
            labelEmit: false
        },
        pieStyle: {
            lineWidth: 0
        },

        interactions: [{ type: 'element-active' }],
    };

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



    useEffect(() => {
        document.title = "Отчеты"
        console.log(reportId)
        getReport()
    }, [])

    return (
        <div className="back-ground">
            <ConfigProvider
                theme={{
                    components: {
                        Table: {
                            bodySortBg: "rgba(67, 67, 67, 1)"
                        }
                    },
                }}
            ></ConfigProvider>
            <Row style={row}>
                <p style={mainText}>Проверка файла {data?.fileMetadata.fileName} выполнена!</p>
                <Col style={column} span={12}>
                    <p style={innerText}>Оригинальность - {data?.reportParams.originalPercentage.toFixed(2)} %</p>
                    <p style={innerText}>Заимствования - {data?.reportParams.borrowingPercentage.toFixed(2)} %</p>
                    <p style={innerText}>Цитирование - {data?.reportParams.citationPercentage.toFixed(2)} %</p>
                    <p style={innerText}>Дата создания - { dayjs(data?.fileMetadata.createdDate).format('YYYY-MM-DD HH:mm:ss')}</p>
                    <p style={innerText}>Количество страниц - { }</p>
                    <p style={innerText}>Символов в тексте - {data?.fileMetadata.size}</p>
                    <p style={innerText}>Слов в тексте - {data?.fileMetadata.wordCount}</p>
                    <p style={innerText}>Число предложений - { }</p>
                    <p style={innerText}>Автор - {getUser().username}</p>
                    <p style={innerText}>Название документа - {data?.fileMetadata.fileName}</p>
                </Col>
                <Col style={column} span={10}>
                    <PieChart {...config}
                        data={getData()}
                        statistic={{
                            title: false,
                            content: false
                        }
                        }
                        width={600} />
                </Col>

            </Row >

        </div >
    );

}