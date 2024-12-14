
import { useAppSelector } from "../../../hooks";
import { RootState } from "../../../store";
import { PlusOutlined } from '@ant-design/icons';

import { Button, Carousel, Col, Flex, Row, Image, FloatButton, UploadProps, Upload, Table, TableProps, ConfigProvider } from "antd";

import { useNavigate } from "react-router";
import { ReactNode, useEffect, useState } from "react";
import { getUser } from '../../../redux/utils/auth'
import axios from "axios";
import './file.css'
import { useAppDispatch } from '../../../hooks';
import { update, add } from '../../../redux/reducers/CkeckReducer';
import { Check } from "../../../redux/interface/Check";
import 'dayjs'
import dayjs from "dayjs";

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
    height: 400,
    overflow: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'stretch',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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

const splitText = (text: string | undefined) => {
    if (text === undefined)
        return ''
    const texts = text.split('/')
    return '.' + texts[texts.length - 1]
}

interface FileMetadata {
    paperId: number,
    fileName: string,
    fileExtension: string,
    size: number,
    wordCount: number,
    createdDate: Date
}


export const FileComponent: React.FC = () => {

    const checkState = useAppSelector((state: RootState) => state.check)
    const dispatch = useAppDispatch()

    const [files, setFiles] = useState<FileMetadata[]>([])
    const [selectedFile, setSelectedFile] = useState<FileMetadata | undefined>()

    const columns: TableProps<FileMetadata | undefined>['columns'] = [
        {
            title: 'Название',
            dataIndex: 'fileName',
            key: 'name',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Дата',
            dataIndex: 'createdDate',
            key: 'createdDate',
            render: (text, record, index) => {
                if (record === undefined) {
                    return <></>
                }
                const date = dayjs(record.createdDate)
                return <p>{date.format('YYYY-MM-DD HH:mm:ss')}</p>
            }

        },
        {
            title: 'Тип файла',
            dataIndex: 'fileExtension',
            key: 'fileExtension',
            render: (text, record, index) => <p>{splitText(record?.fileExtension)}</p>,
        },
        {
            title: 'Размер',
            key: 'size',
            dataIndex: 'size',
            render : (text) => text === undefined ? <></> : <p>{(text/1024).toFixed(2)} Kb</p>
        },
        {
            title: 'Действие',
            render: (text, record, index) => record === undefined ? <></> :
                <><Button style={styleButtonCheck} onClick={() => check(record)}>Проверить</Button></>
        }
    ];


    const navigate = useNavigate()
    function handleClick() {
        navigate('/check')
    }

    const getFiles = () => {
        axios({
            method: 'get',
            url: `http://localhost:8081/papers/get/${getUser().username}`,
            withCredentials: false,
        }).then(function (response) {
            const res = response.data.papers as FileMetadata[]
            setFiles(res)
        }).catch(function (error) {
            if (error.response) {
                console.log("Ошибка неверный логин или пароль")
            } else if (error.request) {
                console.log('Сервер недоступен')
            }
        })
    }

    const check = (file: FileMetadata | undefined) => {
        if (file === undefined) {
            return
        }
        axios({
            method: 'post',
            url: `http://localhost:8081/papers/check/${getUser().username}/${file.paperId}`,
            withCredentials: false,
        }).then(function (response) {
            const res = response.status
            const newCheck: Check = {
                status : 'non_check',
                paperId: file.paperId,
                reportId: response.data.reportId,
                fileName: file.fileName,
                percentage: 0.0
            }
            dispatch(add(newCheck))
            navigate('/account/check')
        }).catch(function (error) {
            if (error.response) {
                console.log("Ошибка неверный логин или пароль")
            } else if (error.request) {
                console.log('Сервер недоступен')
            }
        })
    }

    const selectFile = (file: FileMetadata) => {
        if (selectedFile === file) {
            setSelectedFile(undefined)
        }
        else {
            setSelectedFile(file)
        }
    }

    const renderFile = (): ReactNode => {
        console.log(files)
        return files.map((file) => {
            return <>
                <Col span={4} style={columnFileIconStyle}>
                    <img style={file === selectedFile ? selectedFileIconStyle : imageFileIconStyle} src="../image/fileImage.png" onClick={() => selectFile(file)} />
                    <p style={imageFileTextStyle}>{file.fileName}</p>
                </Col>
            </>
        })
    }

    const props: UploadProps = {
        name: 'paper',
        action: `http://localhost:8081/papers/upload/${getUser().username}`,
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                const file = info.file.response.fileMetadata as FileMetadata
                setFiles((pref) => [...pref, file])
                //message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                //message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    useEffect(() => {
        document.title = "Мои файлы"
        getFiles()
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
            <Row style={rowFileIconStyle}>
                {
                    renderFile()
                }
            </Row >
            <Row style={row}>
                <Col style={column} >
                    <Upload {...props}>
                        <Button icon={<PlusOutlined />} style={styleButton}>Добавить файл</Button>
                    </Upload>
                </Col>
            </Row>

            <Row style={row}>
                <Table<FileMetadata | undefined>
                    style={tableStyle}
                    columns={columns}
                    dataSource={[selectedFile]}
                    pagination={false}
                    className="column-style"
                />
                <Col style={column}>

                </Col>
            </Row >

        </div >
    );

}
