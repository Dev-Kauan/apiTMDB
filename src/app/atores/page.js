'use client'

import Pagina from "@/app/components/Pagina";
import { useEffect, useState } from "react";
import apiMovie from "@/app/services/apiMovie";
import { Card, Col, Row } from "react-bootstrap";
import Link from "next/link";

export default function Page() {
    const [atores, setAtores] = useState([]);

    useEffect(() => {
        apiMovie.get('person/popular').then(resultado => {
            setAtores(resultado.data.results);
        });
    }, []);

    return (
        <Pagina titulo="Atores Populares">
            <Row md={3}>
                {atores.map(ator => (
                    <Col key={ator.id} className="my-2">
                        <Card style={{ width: '100%' }}>
                            <Card.Img
                                variant="top"
                                src={'https://image.tmdb.org/t/p/w500' + ator.profile_path}
                                height={200}
                                alt={ator.name}
                            />
                            <Card.Body>
                                <Card.Title>{ator.name}</Card.Title>
                                <Card.Text>
                                    Popularidade: {ator.popularity}
                                </Card.Text>
                                <Link href={`/atores/${ator.id}`} className="btn btn-danger">Ver detalhes</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Pagina>
    );
}