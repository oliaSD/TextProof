
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";

import { Button, Carousel, Col, Flex, Row, Image, FloatButton } from "antd";

import './home.css'
import { useNavigate } from "react-router";
import { useEffect } from "react";



const styleButton: React.CSSProperties = {
    backgroundImage: 'linear-gradient(240deg, #f01ec6c9, hwb(312 58% 12%))',
    borderRadius: '1em',
    padding: '12px 48px',
    transition: 'all 0.5s ease',
    fontSize: '10pt',
    fontWeight: 'bold',
    width: '15em',
    height: '5em',
    marginLeft: '15em',
    marginTop: '3.2em',
    marginBottom: '2em'
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

const column: React.CSSProperties = {
    background: 'black',
    margin: '16px 16px',
    padding: '16px 16px',
    minWidth: 100,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignContent: 'space-between',
    justifyContent: 'top',
    alignItems: 'center',
}

const row: React.CSSProperties = {
    background: 'black',
    margin: '16px 16px',
    padding: '16px 16px',
    minWidth: 100,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'stretch',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
}


const textInner: React.CSSProperties = {
    fontSize: 20,
    color: 'white',
    alignContent: 'center',
    textAlign: 'justify',
}


const imageStyle: React.CSSProperties = {
    width: 450, height: 350
}

const imageStyleBottom: React.CSSProperties = {
    width: 200, height: 200
}

export const AnalyticComponent: React.FC = () => {

    const user = useAppSelector((state: RootState) => state.user)

    const navigate = useNavigate()
    function handleClick() {
        navigate('/check')
    }

    useEffect(() => {
        document.title = "Главная страница"
    }, [])

    return (
        <div className="back-ground">
            <p style={colorText}>
                БОЛЬШЕ, ЧЕМ СРЕДСТВО ПРОВЕРКИ ГРАММАТИКИ И ПУНКТУАЦИИ
            </p>
            <Row style={row}>
                <Col span={6} style={column}>
                    <img style={imageStyle} src="image/analyticImage.png" />
                </Col>
                <Col span={14} offset={2}>
                    <Row>
                        <Col xs={2} sm={4} md={10} lg={8} xl={20} style={column}>
                            <p style={textInner} >
                                В дополнение к проверке конкретных текстов, мы предоставляем возможность отслеживать и анализировать статистику по плагиату в масштабах группы или собственной библиотеки текстов.
                            </p>
                            <p style={textInner} >
                                Этот инструмент будет полезен для исследователей, преподавателей, научных сотрудников, редакторов и студентов, которые хотят анализировать динамику и характер заимствований в своих работах.
                            </p>
                        </Col>
                        <Col span={10} offset={4} >
                            <Button onClick={handleClick} style={styleButton}>Проверить</Button>
                        </Col>
                    </Row>ß
                </Col>
                <Col span={16} style={column}>
                    <p style={colorText} >
                        АНАЛИЗИРУЙТЕ СТАТИСТИКУ ПО АНТИПЛАГИАТУ ВМЕСТЕ С НАМИ!
                    </p>
                </Col>
                <Col span={6} style={column}>
                    <img src = "image/analyticImageBottom.png" style={imageStyleBottom}/>
                </Col>
            </Row >

        </div >
    );

}
