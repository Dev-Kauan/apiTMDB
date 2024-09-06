'use client'

import { Card, Col, Row } from "react-bootstrap";
import Pagina from "@/app/components/Pagina";
import { useEffect, useState } from "react";
import apiDisney from "@/services/apiDisney";

export default function Objetos() {

    const [personagens, setPersonagens] = useState([]);

    useEffect(() => {
        apiDisney.get('character').then(resultado => {
            setPersonagens(resultado.data.data)
        })
    }, [])

    return (
        <Pagina titulo="Disney Cards">
            <Row md={3}>
                {personagens.map(item => (
                    <Col key={item._id} className="my-2" >{}
                        <Card>
                            <Card.Img variant="top" src={item.imageUrl} height={200}/>
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Pagina>
    )
}