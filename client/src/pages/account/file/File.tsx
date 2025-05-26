import { useAppSelector } from "../../../hooks";
import { RootState } from "../../../store";
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Col, Row, UploadProps, Upload, Table, TableProps, ConfigProvider, Progress, message } from "antd";
import { useNavigate } from "react-router";
import { ReactNode, useEffect, useState } from "react";
import { getUser } from '../../../redux/utils/auth'
import axios from "axios";
import './file.css'
import { useAppDispatch } from '../../../hooks';
import { add } from '../../../redux/reducers/CkeckReducer';
import { Check } from "../../../redux/interface/Check";
import dayjs from "dayjs";
import { select } from "../../../redux/reducers/MenuReducer";

const styleButton: React.CSSProperties = {
    backgroundImage: 'linear-gradient(240deg, #f01ec6c9, hwb(312 58% 12%))',
    borderRadius: '1em',
    border: 'none',
    padding: '12px 24px',
    transition: 'all 0.5s ease',
    fontSize: '12pt',
    fontWeight: 'bold',
    height: 'auto',
    minHeight: '50px',
    width: '100%',
    maxWidth: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
}

const styleButtonCheck: React.CSSProperties = {
    backgroundImage: 'linear-gradient(240deg, #f01ec6c9, hwb(312 58% 12%))',
    borderRadius: '1em',
    border: 'none',
    padding: '8px 16px',
    transition: 'all 0.5s ease',
    fontSize: '10pt',
    fontWeight: 'bold',
    height: 'auto',
    minHeight: '40px',
    width: '100%',
    maxWidth: '200px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
}

const tableContainerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center'
}

const uploadProgressStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '300px',
    margin: '20px auto',
    color: '#f01ec6c9'
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

interface FileProps {
  uriUploadFileAction : string;
  uriGetFilesAction : string;
  uriPostFilesCheckAction : string;
  uriNavigate : string,
}

export const FileComponent: React.FC<FileProps> = ({uriUploadFileAction, uriGetFilesAction, uriPostFilesCheckAction, uriNavigate}) => {

    const [files, setFiles] = useState<FileMetadata[]>([]);
    const [selectedFile, setSelectedFile] = useState<FileMetadata | undefined>();
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Мои файлы"
        getFiles()
    }, [])

    const props: UploadProps = {
        name: 'paper',
        action: uriUploadFileAction,
        headers: {
            authorization: 'authorization-text',
        },
        showUploadList: false,
        onChange(info) {
            if (info.file.status === 'uploading') {
                setUploading(true);
            }
            if (info.file.status === 'done') {
                setUploading(false);
                setUploadProgress(0);
                const file = info.file.response.fileMetadata as FileMetadata;
                setFiles((prev) => [...prev, file]);
                messageApi.success(`${info.file.name} успешно загружен`);
            } else if (info.file.status === 'error') {
                setUploading(false);
                setUploadProgress(0);
                messageApi.error(`${info.file.name} не удалось загрузить`);
            }
        },
    };

    const columns: TableProps<FileMetadata>['columns'] = [
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
            render: (text) => text === undefined ? <></> : <p>{(text / 1024).toFixed(2)} Kb</p>
        },
        {
            title: 'Действие',
            render: (text, record, index) => record === undefined ? <></> :
                <><Button style={styleButtonCheck} onClick={() => check(record)}>Проверить</Button></>
        }
    ];


    const getFiles = () => {
        console.log(uriGetFilesAction)
        axios({
            method: 'get',
            url: uriGetFilesAction,
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
            url: `${uriPostFilesCheckAction}${file.paperId}`,
            withCredentials: false,
        }).then(function (response) {
            const res = response.status
            const newCheck: Check = {
                status: 'non_check',
                paperId: file.paperId,
                reportId: response.data.reportId,
                fileName: file.fileName,
                percentage: 0.0
            }
            dispatch(add(newCheck))
            dispatch(select('check'))
            navigate(uriNavigate)
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

   

    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        headerBg: 'rgba(0, 0, 0, 0.7)',
                        headerColor: 'white',
                        headerSplitColor: '#333',
                        bodySortBg: 'rgba(0, 0, 0, 0.5)',
                        rowHoverBg: 'rgba(240, 30, 198, 0.1)',
                        colorBgContainer: 'rgba(0, 0, 0, 0.3)',
                        borderColor: '#333',
                        colorText: 'white'
                    },
                },
            }}
        >
            {contextHolder}
            <div style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                padding: '20px',
                minHeight: 'calc(100vh - 140px)',
                color: 'white'
            }}>
                <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
                    {files.map((file) => (
                        <Col key={file.paperId} xs={12} sm={8} md={6} lg={4} xl={3}>
                            <div 
                                style={{ 
                                    cursor: 'pointer',
                                    padding: '10px',
                                    borderRadius: '10px',
                                    backgroundColor: file === selectedFile ? 'rgba(240, 30, 198, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                    transition: 'all 0.3s ease',
                                    textAlign: 'center'
                                }}
                                onClick={() => selectFile(file)}
                            >
                                <img 
                                    src="/image/fileImage.png" 
                                    style={{ 
                                        width: '80%', 
                                        height: 'auto',
                                        filter: file === selectedFile ? 'brightness(1.2)' : 'none'
                                    }} 
                                />
                                <p style={{ 
                                    color: 'white', 
                                    marginTop: '10px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    {file.fileName}
                                </p>
                            </div>
                        </Col>
                    ))}
                </Row>

                <Row justify="center" style={{ marginBottom: '30px' }}>
                    <Col>
                        <Upload {...props}>
                            <Button 
                                icon={uploading ? <LoadingOutlined /> : <PlusOutlined />} 
                                style={styleButton}
                                disabled={uploading}
                            >
                                {uploading ? 'Загрузка...' : 'Добавить файл'}
                            </Button>
                        </Upload>
                        {uploading && (
                            <Progress 
                                percent={uploadProgress} 
                                strokeColor="#f01ec6c9" 
                                style={uploadProgressStyle}
                                showInfo={false}
                            />
                        )}
                    </Col>
                </Row>

                {selectedFile && (
                    <div style={tableContainerStyle}>
                        <Table<FileMetadata>
                            columns={columns}
                            dataSource={[selectedFile]}
                            pagination={false}
                            style={{ width: '100%' }}
                            bordered
                        />
                    </div>
                )}
            </div>
        </ConfigProvider>
    );
};

export default FileComponent;

