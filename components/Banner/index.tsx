import styles from "./styles.module.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper";
import 'swiper/css';
import Image from "next/image";

export const Banner = () => {
    return (
        <div className={styles.container}>
            <Swiper
                slidesPerView={1}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                modules={[Autoplay]}
                loop={true}
            >
                <SwiperSlide className={styles.swiperSlide}>
                    <Image src="/temp/banner1.png" alt="banner1" width={425} height={235} />
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                    <Image src="/temp/banner2.png" alt="banner2" width={425} height={235} />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}