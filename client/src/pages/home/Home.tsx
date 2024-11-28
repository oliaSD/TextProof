
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";

import { Button, Carousel, Col, Flex, Row, Image, FloatButton } from "antd";

import './home.css'
import { useNavigate } from "react-router";
import { useEffect } from "react";



const styleButton: React.CSSProperties = {
    backgroundColor: 'white',
    color: 'black',
    width: 200,
    height: 60,
    borderRadius: 20,
}




export const HomeComponent: React.FC = () => {

    const user = useAppSelector((state: RootState) => state.user)

    const navigate = useNavigate()
    function handleClick() {
        navigate('/login')
    }

    const handleMouseEnter = () => {

    }

    useEffect(() => {
        document.title = "Главная страница"
    }, [])

    return (
        <>
            <Row className="row">
                <Col xs={22} sm={18} md={14} lg={16} xl={14} className="column">
                    <>
                        <p style={{ fontSize: 60, color: 'white', margin: 0, alignContent: 'center' }}>TextProof - защита оригинальности ваших научных исследований</p>
                        <p style={{ fontSize: 60, color: 'white', margin: 0, fontWeight: "bold", alignContent: 'center' }}>""</p>
                        <p></p>
                        <button className="button" onClick={handleClick}>Войти</button>
                    </>
                </Col>
                <Col xs={2} sm={4} md={10} lg={16} xl={8} className="column">
                    <>
                       <>Какой-то текс</>
                    </>
                </Col>
            </Row>
        </>

    );

}
