
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";

import { Button, Carousel, Col, Flex, Row, Image, FloatButton } from "antd";

import './home.css'
import { useNavigate } from "react-router";
import { useEffect } from "react";

const mainText: React.CSSProperties = {
    fontSize: 40,
    color: 'white',
    margin: 0,
    alignContent: 'center',
    textAlign: 'center',
    width: '100%',
    padding: '2em 1em 0em 1em'
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
    marginBottom: '1em'
}


const styleButton: React.CSSProperties = {
    backgroundImage: 'linear-gradient(240deg, #f01ec6c9, hwb(312 58% 12%))',
    borderRadius: '1em',
    border: 'none',
    padding: '12px 48px',
    transition: 'all 0.5s ease',
    fontSize: '10pt',
    fontWeight: 'bold',
    width: '15em',
    height: '5em',
    marginTop: '3.2em',
    marginBottom: '2em'
}

const imageStyle: React.CSSProperties = {
    width: 600, height: 600
}


export const HomeComponent: React.FC = () => {

    const user = useAppSelector((state: RootState) => state.user)

    const navigate = useNavigate()
    function handleClick() {
        navigate('/check')
    }

    useEffect(() => {
        document.title = "Главная страница"
    }, [])

    return (
        <>
            <Row style={row}>
                <p style={mainText}>TextProof - защита оригинальности ваших научных исследований</p>
                <Col xs={2} sm={4} md={10} lg={16} xl={8} className="column">
                    <p style={textInner} >
                        Это инновационная онлайн-платформа для проверки научных статей на плагиат. Мы предлагаем комплексный анализ текстов, предоставляем подробные отчеты и рекомендации для улучшения оригинальности работы. Наша система быстро и точно выявляет заимствования, помогая вам гарантировать уникальность ваших исследований и публикаций. С TextProof вы можете быть уверены в качестве и достоверности своих научных трудов!
                    </p>
                    <Button onClick={handleClick} style={styleButton}>Проверить</Button>
                    <p style={mainText} >
                        Честность в науке - наша миссия!
                    </p>
                </Col>
                <Col xs={2} sm={4} md={10} lg={16} xl={8} className="column">
                    <>
                        <img style={imageStyle} src="/image/homeImage.png" />
                    </>
                </Col>
            </Row>
        </>

    );

}
