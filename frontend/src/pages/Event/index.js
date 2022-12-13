import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind';
import styles from '../LandingPage/components/DonationEvents/DonationEvents.module.scss';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import DonationEvents from '../LandingPage/components/DonationEvents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { DOMAIN_FRONTEND } from '../../config/settingSystem';
export default function Event() {
  const listEvents = useSelector((state) => state.hospital.listEvents);
  const cx = classNames.bind(styles);
  const location = useLocation();
  const string = location.pathname
  let id = string.slice(7)
  const resultFind = listEvents.find(event => event.id = parseInt(id));
  console.log("resultFind", resultFind)
  return (
    <>
      <div>Event pages</div>
      <div className={cx('events')}>
        <motion.div
          className={cx('item')}
          whileHover={{
            translateY: '-6px',
            transition: { duration: 0.1 },
          }}
        >
          <div className={cx('image')}>
            <img
              src="https://static.giotmauvang.org.vn/ihpstatic/BTH/2.png"
              alt="hospitalImage"
            />
          </div>
          <div className={cx('content')}>
            <h2>{resultFind.nameEvent}</h2>
            <p>{resultFind.description}</p>
            <div className={cx('location')}>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{resultFind.location}</span>
            </div>
            <div>
              <div id="fb-root"></div>
              <div class="fb-like" data-href={`${DOMAIN_FRONTEND}/event/${resultFind.id}`} data-width="" data-layout="button_count" data-action="like" data-size="small" data-share="true"></div>
              {/* <div class="fb-like" data-href="https://www.youtube.com/results?search_query=tich+hop+like+and+share+fb" data-width="" data-layout="button_count" data-action="like" data-size="small" data-share="true"></div> */}
              {/* <div class="fb-comments" data-href="https://developers.facebook.com/docs/plugins/comments#configurator" data-width="" data-numposts="5"></div> */}
            </div>
          </div>
          <div className={cx('date')}>{resultFind.date}</div>
        </motion.div>
      </div>
      <div>
        <Helmet>
          <script async defer crossorigin="anonymous" src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v15.0&appId=676496990632073&autoLogAppEvents=1" nonce="VSddtRUx"></script>
        </Helmet>
      </div>
    </>
  )
}
