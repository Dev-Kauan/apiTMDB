'use client'

import Pagina from "@/app/components/Pagina";
import { useEffect, useState } from "react";
import apiMovie from "@/app/services/apiMovie";
import { Button, Card, Col, Row } from "react-bootstrap";
import Link from "next/link";

export default function Page() {

    // alert("Eai? " + process.env.API_KEY);
    const [series, setseries] = useState([])

    useEffect(() => {
        apiMovie.get('tv/popular').then(resultado => {
            setseries(resultado.data.results)
        })
    }, [])

    return (
        <Pagina titulo="Séries">
            <Row md={3}>
                {series.map(item => (
                    <Col key={item.id} className="my-2" >{ }
                        <Card style={{ width: '100%' }}>
                            <Card.Img variant="top" src={'https://image.tmdb.org/t/p/w500' + item.backdrop_path} height={200} />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>{item.original_name}</Card.Text>
                                <Card.Text>Popularidade: {item.popularity}</Card.Text>
                                <Link className="btn btn-danger" href={`/series/${item.id}`}>Ver Detalhes</Link>
                            </Card.Body>
                        </Card>

                    </Col>
                ))}
            </Row>
        </Pagina>
    )
}