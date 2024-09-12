'use client'

import Pagina from "@/app/components/Pagina";
import apiMovie from "@/app/services/apiMovie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";

export default function Page({ params }) {

    const [ator, setator] = useState({})
    const [filmes, setfilmes] = useState([])

    useEffect(() => {
        apiMovie.get(`person/${params.id}`).then(resultado => {
            setator(resultado.data)
        })

        apiMovie.get(`person/${params.id}/movie_credits`).then(resultado => {
            setfilmes(resultado.data.cast)
        })

    }, [])

    return (
        <Pagina titulo="Detalhes Atores">
            {
                !ator.id &&
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            }

            {
                ator.id &&
                <div>
                    <Row className="mt-3">
                        <h1>{ator.name}</h1>
                        <Col sm={4}>
                            <img className="img-fluid" src={'https://image.tmdb.org/t/p/w500' + ator.profile_path} alt={ator.name} />
                        </Col>
                        <Col sm={8}>
                            <p><b>Data Nascimento:</b> {ator.birthday}</p>
                            <p><b>Local Nascimento:</b> {ator.place_of_birth}</p>
                            <p><b>Popularidade:</b> {ator.popularity}</p>
                            <p><b>Orçamento:</b> {ator.biography}</p>
                            <Link className="btn btn-primary" href={`/atores/`}>Voltar</Link>
                        </Col>
                        <Col sm={12}>
                            <h1>Filmes</h1>
                            <Row>
                                {filmes.map(item => (
                                    <Col key={item.id} title={item.title} sm={2} className="mb-3">
                                        <Link href={`/filmes/${item.id}`}>
                                            <img className="img-fluid" src={'https://image.tmdb.org/t/p/w500' + item.poster_path} />
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