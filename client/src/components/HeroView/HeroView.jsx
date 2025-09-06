import styles from './HeroView.module.css'

import { useState } from 'react'
import axios from "axios";

function HeroView({ hero, onEdit, onDelete, onClose }) {

    const [imgPage, setImgPage] = useState(1);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/heroes/${hero.id}`);
            onDelete(hero.id);
            onClose();
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <>
            <div className={styles.imagesGroup}>
                <img src={typeof hero.images[imgPage - 1] === "string" ? `http://localhost:5000${hero.images[imgPage - 1]}` : hero.images[imgPage - 1].preview} alt={hero.nickname} className={styles.heroImg} />
                {hero.images.length > 1 &&
                    <div className={styles.pagination}>
                        <button onClick={() => setImgPage(imgPage - 1)} disabled={imgPage == 1}>
                            Prev
                        </button>
                        <span>{imgPage} / {hero.images.length}</span>
                        <button onClick={() => setImgPage(imgPage + 1)} disabled={imgPage == hero.images.length}>
                            Next
                        </button>
                    </div>
                }
            </div>

            <div className={styles.heroInfo}>
                <h1>{hero.nickname}</h1>
                <h2>{hero.real_name}</h2>
                {hero.origin_description && <p>{hero.origin_description}</p>}
                {hero.superpowers && <p><strong>Superpowers:</strong> {hero.superpowers}</p>}
                {hero.catch_phrase && <p><strong>Catch phrase:</strong>  {hero.catch_phrase}</p>}
                <div className={styles.buttonsGroup}>
                    <button onClick={onEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </>
    );
}

export default HeroView;
