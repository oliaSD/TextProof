
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { RootState } from "../../../store";
import { PlusOutlined } from '@ant-design/icons';
import ReactEcharts from "echarts-for-react";


import { PieChart } from '@opd/g2plot-react'

import { Button, Carousel, Col, Flex, Row, Image, FloatButton, UploadProps, Upload, Table, TableProps, ConfigProvider, Progress, ProgressProps } from "antd";
import { update, add, set, updatePercentage } from '../../../redux/reducers/CkeckReducer';
import { select } from '../../../redux/reducers/ReportReducer';
import { useNavigate } from "react-router";
import { ReactNode, useEffect, useRef, useState } from "react";
import { getUser } from '../../../redux/utils/auth'
import axios from "axios";
import './check.css'
import { Check } from "../../../redux/interface/Check";
import { calc } from "antd/es/theme/internal";



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


const mainText: React.CSSProperties = {
    fontSize: 30,
    color: 'white',
    margin: 0,
    alignContent: 'center',
    textAlign: 'center',
    width: '100%',
    padding: '2em 1em 0em 1em'
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
    alignItems: 'center',
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
    height: 'calc(100vh - 200px )',
    overflow: 'auto',
}

const imageFileIconStyle: React.CSSProperties = {
    width: 100, height: 100
}

const selectedFileIconStyle: React.CSSProperties = {
    ...imageFileIconStyle,
    backgroundColor: 'silver',
    borderRadius: '30px'
}

const imageFileTextStyle: React.CSSProperties = {
    color: 'white',
    width: 100
}

const tableStyle: React.CSSProperties = {
    width: '90%',
    backgroundColor: "rgba(67, 67, 67, 1)",
    margin: '2em'

}

const columnStyle: React.CSSProperties = {
    backgroundColor: "rgba(67, 67, 67, 1)",
}

interface FileMetadata {
    paperId: number,
    fileName: string,
    fileExtension: string,
    size: number,
    wordCount: number,
    createdDate: Date
}


export const CheckAccountComponent: React.FC = () => {

    const checkState = useAppSelector((state: RootState) => state.check)
    const dispatch = useAppDispatch()

    const navigate = useNavigate()
    function handleClick() {
        navigate('/check')
    }

    const getChecks = () => {
        axios({
            method: 'get',
            url: `http://localhost:8081/papers/checks/${getUser().username}`,
            withCredentials: false,
        }).then(function (response) {
            let res = response.data as Check[]
            res.forEach(e => e.percentage = 0)
            console.log(res)
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
            url: `http://localhost:8081/papers/status/${getUser().username}/${check.paperId}`,
            withCredentials: false,
        }).then(function (response) {
            const res = response.data.status as string
            if (res === 'finish_check') {

            }
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
            url: `http://localhost:8081/papers/checks/${getUser().username}`,
            withCredentials: false,
        }).then(function (response) {
            let res = response.data as Check[]
            res.forEach(element => {
                if (element.status === 'finish_check') {
                    element.percentage = 100
                }
                else {
                    if (element.percentage < 50) {
                        element.percentage += 10
                    } else if (element.percentage < 80) {
                        element.percentage += 5
                    } else if (element.percentage < 99) {
                        element.percentage += 3
                    }
                }
            });
            dispatch(updatePercentage(res))
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
        const intervalId = setInterval(updateCheck, 1000)
        return () => clearInterval(intervalId);
    }, [])

    const twoColors: ProgressProps['strokeColor'] = {
        '0%': '#f01ec6c9',
        '100%': 'hwb(312 58% 12%)',
    };

    const showReport =(check : Check) =>{
        dispatch(select(check.reportId))
        navigate(`/account/report`)
    }



    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        Progress: {

                        },
                    },
                }}
            >
            </ConfigProvider>
            <Row style={rowFileIconStyle}>
                <Flex style={column} vertical gap="middle">
                    {
                        checkState.checks === undefined ? <></> :
                            checkState.checks.map(check => {
                                return <>
                                    <p style={mainText}> {check.fileName}</p>
                                    <Progress
                                        percent={check.percentage}
                                        type='line'
                                        percentPosition={{ align: 'center', type: 'inner' }}
                                        strokeColor={twoColors}
                                        trailColor='white'
                                        size={["60em", 20]} />
                                        {
                                            check.percentage === 100 ? <Button style={styleButton} onClick = {()=>showReport(check)}>Посмотреть отчет</Button>  : <></>
                                        }
                                      
                                </>
                            })
                    }
                </Flex>
            </Row>
        </>

    );

}
