'use client'

import Pagina from "@/app/components/Pagina";
import apiMovie from "@/app/services/apiMovie";
import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";

export default function Page({ params }) {

    const [details, setDetails] = useState({})

    useEffect(() => {
        apiMovie.get(`movie/${params.id}`).then(resultado => {
            setDetails(resultado.data)
        })

        console.log(details);
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
                        <Col className="col-12">
                            <h1>{details.title}</h1>
                        </Col>
                        <Col className="d-flex flex-row gap-4 col-12">
                            <img src={'https://image.tmdb.org/t/p/w500' + details.poster_path} alt={details.title} />
                            <div>
                                <p><b>Titulo Original:</b> {details.original_title}</p>
                                <p><b>Popularidade:</b> {details.popularity}</p>
                                <p><b>Data de Lançamento:</b> {details.release_date}</p>
                                <p><b>Orçamento:</b> {details.budget}</p>
                                <p><b>Gêneros:</b> {details.genres.map(item => item.name).join(', ')}</p>
                                <p><b>Sinopse: </b> {details.overview}</p>
                                <Button variant="primary">Voltar</Button>
                            </div>
                        </Col>
                        <Col style={{ marginTop: 10 }}>
                            <h1>Produção</h1>
                            {/* Adicione um contêiner flexível para as imagens */}
                            <div className="d-flex flex-wrap" style={{ gap: '100px' }}>
                                {details.production_companies.map(item =>
                                    item.logo_path && (
                                        <div key={item.id} className="d-flex align-items-center">
                                            <img
                                                src={'https://image.tmdb.org/t/p/w500' + item.logo_path}
                                                alt={item.name}
                                                style={{ width: '100px', height: 'auto' }}
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        </Col>
                    </Row>
                </div>
            }
        </Pagina>
    )
}