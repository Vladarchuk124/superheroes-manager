import styles from './HeroEditForm.module.css';
import { useState, useRef } from 'react';
import axios from 'axios';

function HeroEditForm({ hero, onClose, onSaved }) {

    const [imgPage, setImgPage] = useState(1);

    const [formData, setFormData] = useState({
        nickname: hero.nickname,
        real_name: hero.real_name,
        origin_description: hero.origin_description,
        superpowers: hero.superpowers,
        catch_phrase: hero.catch_phrase,
        images: [...hero.images],
    });

    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDeleteImage = (index) => {
        if (formData.images.length > 1) {
            const newImages = formData.images.filter((_, i) => i !== index);

            let newPage = imgPage;
            if (imgPage > newImages.length) {
                newPage = newImages.length;
            }

            setFormData({
                ...formData,
                images: newImages,
            });

            setImgPage(newPage);
        }
    };


    const handleAddImages = (e) => {
        const files = Array.from(e.target.files);
        if (formData.images.length < 5) {
            const newImages = files.map(file => ({
                file,
                preview: URL.createObjectURL(file),
            }));
            setFormData({
                ...formData,
                images: [...formData.images, ...newImages],
            });
        }
    };

    const handleSave = async () => {
        try {
            const data = new FormData();
            data.append("nickname", formData.nickname);
            data.append("real_name", formData.real_name);
            data.append("origin_description", formData.origin_description);
            data.append("superpowers", formData.superpowers);
            data.append("catch_phrase", formData.catch_phrase);

            formData.images.forEach((img) => {
                if (typeof img === "string") {
                    data.append("existingImages", img);
                } else if (img.file) {
                    data.append("images", img.file);
                }
            });

            const response = await axios.put(`http://localhost:5000/heroes/${hero.id}`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (onSaved) onSaved(response.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <>
            <div className={styles.imagesGroup}>
                <img src={typeof formData.images[imgPage - 1] === "string" ? `http://localhost:5000${formData.images[imgPage - 1]}` : formData.images[imgPage - 1].preview}
                    alt={formData.nickname}
                    className={styles.heroImg}
                />
                {formData.images.length > 1 && (
                    <>
                        <button
                            className={styles.deleteImgBtn}
                            type="button"
                            onClick={() => handleDeleteImage(formData.images.indexOf(formData.images[imgPage - 1]))}
                        >
                            Delete
                        </button>
                        <div className={styles.pagination}>
                            <button onClick={() => setImgPage(imgPage - 1)} disabled={imgPage == 1}>
                                Prev
                            </button>
                            <span>{imgPage} / {formData.images.length}</span>
                            <button onClick={() => setImgPage(imgPage + 1)} disabled={imgPage == formData.images.length}>
                                Next
                            </button>
                        </div>
                    </>
                )}

            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
                <div className={styles.heroNewInput}>
                    <input type="text" name="nickname" placeholder="Superhero nickname" value={formData.nickname} onChange={handleChange} required />
                    <input type="text" name="real_name" placeholder="True identity of a superhero" value={formData.real_name} onChange={handleChange} />
                    <input type="text" name="origin_description" placeholder="Superhero story" value={formData.origin_description} onChange={handleChange} />
                    <input type="text" name="superpowers" placeholder="Superpowers" value={formData.superpowers} onChange={handleChange} />
                    <input type="text" name="catch_phrase" placeholder="Catch phrase" value={formData.catch_phrase} onChange={handleChange} />
                    <div className={styles.inputImg}>
                        <button type="button" className={styles.inputImgButton} onClick={handleClick}> 📂 Select some images </button>
                        <input type="file" name="images" accept="image/*" multiple ref={fileInputRef} onChange={handleAddImages} style={{ display: "none" }} />
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button className={styles.statusBtn} onClick={handleSave}>Save</button>
                    <button className={styles.statusBtn} onClick={onClose}>Cancel</button>
                </div>
            </div>
        </>
    );
}

export default HeroEditForm;
