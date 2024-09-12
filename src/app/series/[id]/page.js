'use client'

import Pagina from "@/app/components/Pagina";
import apiMovie from "@/app/services/apiMovie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";

export default function Page({ params }) {

    const [serie, setserie] = useState({})
    const [atores, setAtores] = useState([])

    useEffect(() => {
        apiMovie.get(`tv/${params.id}`).then(resultado => {
            setserie(resultado.data);
        })
        apiMovie.get(`tv/${params.id}/credits`).then(resultado => {
            setAtores(resultado.data.cast)
        })
    }, [])

    return (
        <Pagina titulo="Detalhes Série">
            {console.log('Detalhes da série:', serie)}
            {
                
                !serie.id &&
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            }

            {
                serie.id &&
                <div>
                    <Row className="mt-3">
                        <h1>{serie.name}</h1>
                        <Col sm={4}>
                            <img className="img-fluid" src={'https://image.tmdb.org/t/p/w500' + serie.backdrop_path} alt={serie.name} />
                        </Col>
                        <Col sm={8}>
                            <p><b>Titulo Original:</b> {serie.original_name}</p>
                            <p><b>Popularidade:</b> {serie.popularity}</p>
                            <p><b>Sinopse: </b> {serie.overview}</p>
                            <Link className="btn btn-primary" href={`/series/`}>Voltar</Link>
                        </Col>
                        <Col sm={12}>
                            <h1>Atores</h1>
                            <Row>
                                {atores.map(item => (
                                    <Col key={item.id} title={item.name} sm={2} className="mb-3">
                                        <Link href={`/atores/${item.id}`}>
                                            <img className="img-fluid" src={'https://image.tmdb.org/t/p/w500' + item.profile_path} />
                                        </Link>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </div>
            }
        </Pagina>
    )
}