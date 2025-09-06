import styles from './HeroCard.module.css';
import Modal from "react-modal";
import { useState } from "react";

import HeroEditForm from '../HeroEditForm/HeroEditForm';
import HeroView from '../HeroView/HeroView';

function HeroCard({ hero, onDelete }) {
    const [data, setData] = useState(hero);
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const imagePath = data.images[0];

    return (
        <>
            <div className={styles.heroCard} onClick={() => setIsOpen(true)}>
                <img src={`http://localhost:5000${imagePath}`} alt={hero.nickname} />
                <h2 className={styles.nickname} >{hero.nickname}</h2>
            </div>
            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                className={styles.modalContent}
                overlayClassName={styles.modalOverlay}
                ariaHideApp={false}
            >
                {isEditing ? (
                    <HeroEditForm
                        hero={data}
                        onClose={() => setIsEditing(false)}
                        onSaved={(updatedHero) => {
                            setIsEditing(false);
                            setData(updatedHero);
                        }}
                    />
                ) : (
                    <HeroView
                        hero={data}
                        onEdit={() => setIsEditing(true)}
                        onDelete={onDelete}
                        onClose={() => setIsOpen(false)}
                    />
                )}
            </Modal>
        </>
    );
}

export default HeroCard;