'use client'

import Pagina from "@/app/components/Pagina";
import apiMovie from "@/app/services/apiMovie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";

export default function Page({ params }) {

    const [details, setDetails] = useState({})
    const [atores, setAtores] = useState([])

    useEffect(() => {
        apiMovie.get(`movie/${params.id}`).then(resultado => {
            setDetails(resultado.data)
        })
        apiMovie.get(`movie/${params.id}/credits`).then(resultado => {
            setAtores(resultado.data.cast)
        })
    
    }, [])

    return (
        <Pagina titulo="Detalhes Filme">
            {
                !details.id &&
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            }

            {
                details.id &&
                <div>
                    <Row className="mt-3">
                        <h1>{details.title}</h1>
                        <Col sm={4}>
                            <img className="img-fluid" src={'https://image.tmdb.org/t/p/w500' + details.poster_path} alt={details.title} />
                        </Col>
                        <Col sm={8}>
                            <p><b>Titulo Original:</b> {details.original_title}</p>
                            <p><b>Popularidade:</b> {details.popularity}</p>
                            <p><b>Data de Lançamento:</b> {details.release_date}</p>
                            <p><b>Orçamento:</b> {details.budget}</p>
                            <p><b>Gêneros:</b> {details.genres.map(item => item.name).join(', ')}</p>
                            <p><b>Sinopse: </b> {details.overview}</p>
                            <Link className="btn btn-primary" href={`/filmes/`}>Voltar</Link>
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