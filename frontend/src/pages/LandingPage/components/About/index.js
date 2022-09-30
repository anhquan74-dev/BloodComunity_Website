import styles from './About.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function About() {
    return (
        <section id="about">
            <div className={cx('wrapper')}>
                <div className={cx('image')}>
                    <div className={cx('image-content')}>
                        <img src={require('../../../../assets/images/aboutus.jpeg')} alt="aboutus" />
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('since')}>
                        <p>Bắt đầu từ</p>
                        <span>2022</span>
                    </div>
                    <h3 className={cx('heading')}>Về chúng tôi</h3>
                    <p className={cx('desc')}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil ipsum dolores numquam quae
                        debitis magni ab minus hic illum sint itaque, quas sit quo molestiae nisi culpa officiis
                        corporis? Quos?
                    </p>
                    <div className={cx('data-wrapper')}>
                        <div className={cx('data')}>
                            <h2>200</h2>
                            <p>Tổng số người hiến máu</p>
                        </div>
                        <div className={cx('data')}>
                            <h2>200</h2>
                            <p>Tổng số người hiến máu</p>
                        </div>
                        <div className={cx('data')}>
                            <h2>200</h2>
                            <p>Tổng số người hiến máu</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
