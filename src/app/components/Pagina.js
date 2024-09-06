import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

export default function Pagina(props) {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Página Inicial</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/filmes">Filmes</Nav.Link>
                        <Nav.Link href="/series">Séries</Nav.Link>
                        <Nav.Link href="/atores">Atores</Nav.Link>
                        <NavDropdown title="Filmes" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/">Populares</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/">Em Cartaz</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/">Tabela</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/">Carrosel</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>

            <div className="bg-secondary text-white text-center p-3">
                <h1>{props.titulo}</h1>
            </div>

            <Container>
                {props.children}
            </Container>
        </>
    )
}