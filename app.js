function Header() {
    return (
        <header>
            <div className="container">
                <h1>ESIM YOPOUGON</h1>
                <p>Ecole Supérieure d'Industrie et de Management</p>
            </div>
        </header>
    );
}

function Navigation({ onOpenModal }) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav>
            <div className="container">
                <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                <ul className={isMenuOpen ? 'show' : ''}>
                    <li><a href="#about">À propos</a></li>
                    <li className="dropdown">
                        <a href="#filieres">Filières</a>
                        <div className="dropdown-content">
                            <a href="#" onClick={(e) => { e.preventDefault(); onOpenModal('tertiaires'); }}>Filières Tertiaires</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); onOpenModal('industrielles'); }}>Filières Industrielles</a>
                        </div>
                    </li>
                    <li><a href="#cadre-vie">Cadre de vie</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenModal('contact'); }}>Contact</a></li>
                </ul>
            </div>
        </nav>
    );
}

function About() {
    return (
        <section id="about" className="section">
            <div className="container">
                <h2>À propos de l'ESIM YOPOUGON</h2>
                <p>ESIM YOPOUGON est une grande école de formation Supérieure renommée, située à Yopougon, en Côte d'Ivoire. Notre institution se distingue par son engagement envers l'excellence académique et son dévouement à la réussite de ses étudiants.</p>
                <p>Notre mission est de former des professionnels compétents et polyvalents, prêts à relever les défis du monde professionnel moderne.</p>
                <div className="image-placeholder">Image de l'école (à remplacer)</div>
            </div>
        </section>
    );
}

function Filieres({ type }) {
    const filieresData = {
        tertiaires: [
            "TH - Tourisme et Hôtellerie",
            "FCGE - Finance Comptabilité et Gestion d'Entreprise",
            "GEC - Gestion Commerciale",
            "RHC - Ressources Humaines et Communication",
            "AD - Assistanat de Direction",
            "LOG - Logistique"
        ],
        industrielles: [
            "IDA - Informatique Développeur d'Application",
            "GBAT - Génie Civil Option Bâtiment",
            "SEI - Système Électronique et Informatique",
            "RIT - Réseau Informatique et Télécommunication"
        ]
    };

    const filieres = type === 'tertiaires' ? filieresData.tertiaires : filieresData.industrielles;
    const title = type === 'tertiaires' ? 'Filières Tertiaires' : 'Filières Industrielles';

    return (
        <div className="filiere-modal">
            <h2>{title}</h2>
            <ul>
                {filieres.map((filiere, index) => (
                    <li key={index}>{filiere}</li>
                ))}
            </ul>
        </div>
    );
}

function CadreVie() {
    return (
        <section id="cadre-vie" className="section">
            <div className="container">
                <h2>Cadre de vie et d'étude</h2>
                <p>À ESIM YOPOUGON, nous croyons fermement que l'environnement d'apprentissage joue un rôle crucial dans la réussite de nos étudiants.</p>
                <ul>
                    <li>Salles de classe modernes et bien équipées</li>
                    <li>Laboratoires informatiques à la pointe de la technologie</li>
                    <li>Bibliothèque riche en ressources</li>
                    <li>Espaces de détente et de travail collaboratif</li>
                    <li>Environnement sécurisé et accueillant</li>
                </ul>
                <div className="image-placeholder">Image du campus (à remplacer)</div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer>
            <div className="container">
                <p>&copy; 2024 ESIM YOPOUGON. Tous droits réservés.</p>
            </div>
        </footer>
    );
}

function Modal({ isOpen, onClose, content }) {
    if (!isOpen) return null;

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                {content}
            </div>
        </div>
    );
}

function ContactForm() {
    return (
        <div>
            <h2>Contactez-nous</h2>
            <form>
                <label htmlFor="name">Nom :</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="email">Email :</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="message">Message :</label>
                <textarea id="message" name="message" required></textarea>

                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
}

function App() {
    const [modalContent, setModalContent] = React.useState(null);

    const openModal = (type) => {
        switch (type) {
            case 'tertiaires':
                setModalContent(<Filieres type="tertiaires" />);
                break;
            case 'industrielles':
                setModalContent(<Filieres type="industrielles" />);
                break;
            case 'contact':
                setModalContent(<ContactForm />);
                break;
            default:
                setModalContent(null);
        }
    };

    const closeModal = () => {
        setModalContent(null);
    };

    React.useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {
                    section.classList.add('visible');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <React.Fragment>
            <Header />
            <Navigation onOpenModal={openModal} />
            <main>
                <About />
                <CadreVie />
            </main>
            <Footer />
            <Modal isOpen={modalContent !== null} onClose={closeModal} content={modalContent} />
        </React.Fragment>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));