'use client'

import Pagina from "@/app/components/Pagina";
import apiMovie from "@/app/services/apiMovie";
import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";

export default function Page({ params }) {

    const [actor, setActor] = useState({})
    const [movies, setMovies] = useState([])

    useEffect(() => {
        // Buscando detalhes do ator
        apiMovie.get(`person/${params.id}`).then(resultado => {
            setActor(resultado.data)
        })

        // Buscando filmes em que o ator participou
        apiMovie.get(`person/${params.id}/movie_credits`).then(resultado => {
            setMovies(resultado.data.cast) // Armazenando os filmes
        })

    }, [params.id])

    return (
        <Pagina titulo="Detalhes do Ator">
            {
                !actor.id &&
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            }

            {
                actor.id &&
                <div>
                    <Row className="mt-3">
                        <Col className="col-12">
                            <h1>{actor.name}</h1>
                            {actor.profile_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                                    alt={actor.name}
                                    style={{ width: '150px', height: 'auto', borderRadius: '8px' }}
                                />
                            ) : (
                                <div style={{ width: '150px', height: '150px', backgroundColor: '#ddd', borderRadius: '8px' }}>
                                    <p style={{ textAlign: 'center', padding: '10px' }}>Imagem não disponível</p>
                                </div>
                            )}
                            <p><b>Data de Nascimento:</b> {actor.birthday}</p>
                            <p><b>Biografia:</b> {actor.biography}</p>
                        </Col>
                        <Col style={{ marginTop: 20 }} className="col-12">
                            <h1>Filmes</h1>
                            <div className="d-flex flex-wrap" style={{ gap: '20px' }}>
                                {movies.slice(0, 10).map(movie => (
                                    movie.poster_path && (
                                        <div key={movie.id} className="d-flex flex-column align-items-center">
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                alt={movie.title}
                                                style={{ width: '120px', height: 'auto', borderRadius: '8px' }}
                                            />
                                            <p>{movie.title}</p>
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