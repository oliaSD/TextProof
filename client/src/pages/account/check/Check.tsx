
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { RootState } from "../../../store";

import { Button, Flex, Row, ConfigProvider, Progress, ProgressProps } from "antd";
import { set} from '../../../redux/reducers/CkeckReducer';
import { select } from '../../../redux/reducers/ReportReducer';
import { select as selectMenu } from '../../../redux/reducers/MenuReducer';
import { useNavigate } from "react-router";
import { useEffect,  useState } from "react";
import { getUser } from '../../../redux/utils/auth'
import axios from "axios";
import './check.css'
import { Check } from "../../../redux/interface/Check";



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


const baseRow: React.CSSProperties = {
    background: 'black',
    padding: '16px 16px',
    minWidth: 100,
    display: 'flex',
}

const rowFileIconStyle: React.CSSProperties = {
    ...baseRow,
    width: '100%',
    height: 'calc(100vh - 200px )',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'stretch',
    justifyContent: 'space-evenly',
    alignItems: 'flex-center',
    overflow: 'auto',
}

export const CheckAccountComponent: React.FC = () => {

    const checkState = useAppSelector((state: RootState) => state.check)
    const dispatch = useAppDispatch()
    const [checks, setChecks] = useState<Check[]>(checkState.checks)

    const navigate = useNavigate()

    const getChecks = () => {
        axios({
            method: 'get',
            url: `http://localhost:8081/papers/checks/${getUser().username}`,
            withCredentials: false,
        }).then(function (response) {
            let res = response.data as Check[]
            res.forEach(e => (e.status === 'fihish_check' ? e.percentage = 100 : e.percentage = 0))
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

    const twoColors: ProgressProps['strokeColor'] = {
        '0%': '#f01ec6c9',
        '100%': 'hwb(312 58% 12%)',
    };

    const showReport = (check: Check) => {
        dispatch(selectMenu('report'))
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
                        checks === undefined ? <></> :
                            checks.map(check => {
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
                                        check.percentage === 100 ? <Button style={styleButton} onClick={() => showReport(check)}>Посмотреть отчет</Button> : <></>
                                    }

                                </>
                            })
                    }
                </Flex>
            </Row>
        </>

    );

}
