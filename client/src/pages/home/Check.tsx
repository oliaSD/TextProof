
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
    marginLeft : '15em',
    marginTop : '3.2em',
    marginBottom : '2em'
}


const mainText: React.CSSProperties = {
    fontSize: 40,
    color: 'white',
    margin: 0,
    alignContent: 'center',
    textAlign: 'center',
    width: '100%',
    padding: '2em 1em 0em 1em'
}

const bottomText: React.CSSProperties = {
    fontSize: 40,
    color: 'white',
    margin: 0,
    alignContent: 'center',
    textAlign: 'center',
    width: '100%',
    padding: '0em 1em 0em 1em'
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

const centerColumn: React.CSSProperties = {
    ...column,
    borderLeft: '2px solid white',
    borderRight: '2px solid white',
    paddingLeft: '4em',
    paddingRight: '4em',
    borderColor: 'white'
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



export const CheckComponent: React.FC = () => {

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
            <p style={mainText}>
                На нашем сайте вы можете проверить текст на плагиат с использованием мощных алгоритмов анализа и сравнения с широким спектром источников.
            </p>
            <p style={colorText}>
                НАЙДИТЕ ПРОВЕРКУ, КОТОРАЯ ПОДХОДИТ ИМЕННО ВАМ
            </p>
            <Row style={row}>
                <Col xs={2} sm={4} md={10} lg={8} xl={6} style={column}>
                    <p style={textInner} >
                        Проверка по всем источникам
                    </p>
                    <p style={textInner} >
                        Мы анализируем ваш текст по всему интернету и нашей внутренней базе данных. Этот режим обеспечивает максимальную точность, поскольку текст проверяется по миллионам доступных ресурсов.
                    </p>
                </Col>
                <Col xs={2} sm={4} md={10} lg={8} xl={6} style={centerColumn}>
                    <p style={textInner} >
                        Проверка по выбранным источникам
                    </p>
                    <p style={textInner} >
                        У вас есть возможность выбрать конкретные источники для проверки. Этот вариант подходит для ситуаций, когда необходимо свериться с определенными публикациями.                    </p>
                </Col>
                <Col xs={2} sm={4} md={10} lg={8} xl={6} style={column}>
                    <p style={textInner} >
                        Проверка по внутренней базе данных
                    </p>
                    <p style={textInner} >
                        Этот вариант проверки подходит для текстов, которые вы хотите сравнить только с материалами, уже хранящимися в нашей внутренней базе.                     </p>
                </Col>
            </Row>
            <p style={bottomText} >
                Загрузите файл и получите результат в течение нескольких минут!
            </p>
            <Button onClick={handleClick} style={ styleButton }>Проверить</Button>
        </div>

    );

}
