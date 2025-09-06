import styles from './SuperheroesList.module.css';
import { useEffect, useState } from "react";
import axios from "axios";
import HeroCard from '../HeroCard/HeroCard';

function SuperheroesList({ updater }) {

    const [heroes, setHeroes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const heroesPerPage = 5;

    const indexOfLastHero = currentPage * heroesPerPage;
    const indexOfFirstHero = indexOfLastHero - heroesPerPage;
    const currentHeroes = heroes.slice(indexOfFirstHero, indexOfLastHero);

    const totalPages = Math.ceil(heroes.length / heroesPerPage);

    const handlePrev = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    useEffect(() => {
        const fetchHeroes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/heroes');
                setHeroes(response.data);
            } catch (err) {
                console.error(err.message);
            }
        };
        fetchHeroes();
    }, [updater]);

    return (
        <section className={styles.superheroesListSection}>
            {heroes.length > 0 &&
                <>
                    <div className={styles.heroesList}>
                        {currentHeroes.map(hero => (
                            <HeroCard key={hero.id} hero={hero}
                                onDelete={(id) => {
                                    setHeroes(prev => prev.filter(h => h.id !== id));
                                    setCurrentPage(1);
                                }}
                            />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className={styles.pagination}>
                            <button onClick={handlePrev} disabled={currentPage === 1}>
                                Prev
                            </button>
                            <span>{currentPage} / {totalPages}</span>
                            <button onClick={handleNext} disabled={currentPage === totalPages}>
                                Next
                            </button>
                        </div>
                    )}
                </>
            }
        </section>
    );
}

export default SuperheroesList;
