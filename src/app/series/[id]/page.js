'use client'

import Pagina from "@/app/components/Pagina";
import apiMovie from "@/app/services/apiMovie";
import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";

export default function Page({ params }) {

    const [details, setDetails] = useState({})
    const [cast, setCast] = useState([])

    useEffect(() => {
        apiMovie.get(`tv/${params.id}`).then(resultado => {
            setDetails(resultado.data)
        })

        apiMovie.get(`tv/${params.id}/credits`).then(resultado => {
            setCast(resultado.data.cast)
        })

    }, [params.id])

    return (
        <Pagina titulo="Detalhes da Série">
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
                            <h1>{details.name}</h1>
                        </Col>
                        <Col className="d-flex flex-row gap-4 col-12">
                            <img src={'https://image.tmdb.org/t/p/w500' + details.poster_path} alt={details.name} />
                            <div>
                                <p><b>Titulo Original:</b> {details.original_name}</p>
                                <p><b>Popularidade:</b> {details.popularity}</p>
                                <p><b>Data de Lançamento:</b> {details.first_air_date}</p>
                                <p><b>Número de Temporadas:</b> {details.number_of_seasons}</p>
                                <p><b>Gêneros:</b> {details.genres.map(item => item.name).join(', ')}</p>
                                <p><b>Sinopse: </b> {details.overview}</p>
                                <Button variant="primary">Voltar</Button>
                            </div>
                        </Col>
                        <Col style={{ marginTop: 10 }} className="col-12">
                            <h1>Temporadas</h1>
                            <div className="d-flex flex-wrap" style={{ gap: '30px' }}>
                                {details.seasons.map(item =>
                                    item.poster_path && (
                                        <div key={item.id} className="d-flex align-items-center">
                                            <img
                                                src={'https://image.tmdb.org/t/p/w500' + item.poster_path}
                                                alt={item.name}
                                                style={{ width: '150px', height: 'auto' }}
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        </Col>
                        <Col style={{ marginTop: 20 }}>
                            <h1>Atores</h1>
                            <div className="d-flex flex-wrap" style={{ gap: '20px' }}>
                                {cast.slice(0, 10).map(actor => (
                                    actor.profile_path && (
                                        <div key={actor.id} className="d-flex flex-column align-items-center">
                                            <img
                                                src={'https://image.tmdb.org/t/p/w500' + actor.profile_path}
                                                alt={actor.name}
                                                style={{ width: '120px', height: 'auto', borderRadius: '8px' }}
                                            />
                                        </div>
                                    )
                                ))}
                            </div>
                        </Col>
                    </Row>
                </div>
            }
        </Pagina>
    )
}