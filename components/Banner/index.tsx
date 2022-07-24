import styles from "./styles.module.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from "next/image";

export const Banner = () => {
    return (
        <div className={styles.container}>
            <Swiper
                slidesPerView={1}
            >
                <SwiperSlide>
                    <Image src="/temp/banner1.png" alt="banner1" width={380} height={190} />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src="/temp/banner1.png" alt="banner2" width={380} height={190} />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}