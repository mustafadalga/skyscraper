import styles from "./loader.module.css";

// resource of loader: https://codepen.io/josetxu/pen/GRBYExw
const Loader = () => {
    const cuboid = Array.from({ length: 16 }, (_, i) => i); // 16 cuboids
    const side = Array.from({ length: 6 }, (_, i) => i); // 6 side
    return (
        <section
            className={`${styles.loader} w-screen h-screen fixed inset-0 flex items-center justify-center h-screen w-screen bg-black/75`}>
            <div className={styles.content}>
                {cuboid.map((_, index) => (
                    <div key={index} className={styles.cuboid}>
                        <>
                            {side.map((_, index) => (
                                <div key={index} className={styles.side}></div>
                            ))}
                        </>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Loader;
