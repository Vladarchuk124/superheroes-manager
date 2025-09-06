import styles from "./AddHero.module.css";
import { useState, useRef } from 'react';
import axios from "axios";

function AddHero({ setUpdater }) {

    const [imageErr, setImageErr] = useState(false);

    const [formData, setFormData] = useState({
        nickname: "",
        real_name: "",
        origin_description: "",
        superpowers: "",
        catch_phrase: "",
        images: []
    });

    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            if (files.length > 0 && formData.images.length < 5) {
                setFormData((prev) => ({
                    ...prev,
                    [name]: prev[name] ? [...prev[name], ...Array.from(files)] : Array.from(files)
                }));

                setImageErr(false);
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleRemoveImage = (index) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.images.length == 0) {
            setImageErr(true);
            return;
        }
        else setImageErr(false);

        try {
            const data = new FormData();
            data.append("nickname", formData.nickname);
            data.append("real_name", formData.real_name);
            data.append("origin_description", formData.origin_description);
            data.append("superpowers", formData.superpowers);
            data.append("catch_phrase", formData.catch_phrase);
            if (formData.images) formData.images.forEach(file => { data.append("images", file) });

            await axios.post("http://localhost:5000/heroes", data, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setFormData({
                nickname: "",
                real_name: "",
                origin_description: "",
                superpowers: "",
                catch_phrase: "",
                images: []
            });

            setUpdater(prev => !prev);
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <section className={styles.addHeroSection}>
            <h1>Register your superhero!</h1>
            <form className={styles.addHeroForm} onSubmit={handleSubmit}>

                <input type="text" name="nickname" placeholder="Superhero nickname" value={formData.nickname} onChange={handleChange} required />
                <input type="text" name="real_name" placeholder="True identity of a superhero" value={formData.real_name} onChange={handleChange} />
                <input type="text" name="origin_description" placeholder="Superhero story" value={formData.origin_description} onChange={handleChange} />
                <input type="text" name="superpowers" placeholder="Superpowers" value={formData.superpowers} onChange={handleChange} />
                <input type="text" name="catch_phrase" placeholder="Catch phrase" value={formData.catch_phrase} onChange={handleChange} />

                <div className={styles.inputImg}>
                    <button type="button" className={styles.inputImgButton} onClick={handleClick}> 📂 Select some images </button>

                    {formData.images.length > 0 && (
                        <ul className={styles.fileList}>
                            {formData.images.map((file, index) => (
                                <li key={index} className={styles.fileItem}>
                                    <p>{file.name}</p>
                                    <button type="button" className={styles.removeBtn} onClick={() => handleRemoveImage(index)}>Х</button>
                                </li>
                            ))}
                        </ul>
                    )}
                    {imageErr && <p className={styles.imageErrMsg}>You have to select some photo!</p>}

                    <input type="file" name="images" accept="image/*" multiple ref={fileInputRef} onChange={handleChange} style={{ display: "none" }} />
                </div>
                <button type="submit" className={styles.submitButton}>Add Hero</button>
            </form>
        </section>
    );
}

export default AddHero;
