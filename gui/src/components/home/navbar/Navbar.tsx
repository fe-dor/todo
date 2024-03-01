import styles from './Navbar.module.scss';
import {Link} from "react-router-dom";
import {useContext} from "react";
import { HomeContext } from './../HomeContext';

export default function Navbar( ){

  const username: string = useContext(HomeContext);

  return (
    <div className={styles.container}>
      <div className={styles.helloContainer}>
          <h1 className={styles.text1}>Hello {username},</h1>
          <h2 className={styles.text2}>You have work today</h2>
      </div>
      <Link to="/profile">
        <div className={styles.profilePic}></div>
      </Link>
      <IconLeaf />
    </div>
  )
}

function IconLeaf() {
    return (
        <div className={styles.iconLeaf}>
            <svg width="86" height="85" viewBox="0 0 86 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_b_107_298)">
                    <path d="M42.2485 -0.712107C65.5817 -0.871106 84.626 17.9153 84.785 41.2486L42.5364 41.5364L42.2485 -0.712107Z"
                          fill="url(#paint0_linear_107_298)" fill-opacity="0.3" />
                    <path d="M85.0728 83.497C61.7395 83.656 42.6953 64.8696 42.5363 41.5364L84.7849 41.2485L85.0728 83.497Z"
                          fill="url(#paint1_linear_107_298)" fill-opacity="0.3" />
                    <path d="M0.575664 84.0728C23.9089 83.9138 42.6953 64.8696 42.5363 41.5364L0.287771 41.8243L0.575664 84.0728Z"
                          fill="url(#paint2_linear_107_298)" fill-opacity="0.3" />
                    <path
                        d="M0.287578 41.8243C23.6208 41.6653 42.4072 22.6211 42.2482 -0.712178L-0.000315148 -0.424285L0.287578 41.8243Z"
                        fill="url(#paint3_linear_107_298)" fill-opacity="0.3" />
                </g>
                <defs>
                    <filter id="filter0_b_107_298" x="-2.62013" y="-3.33326" width="90.3135" height="90.0261"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="1.31006" />
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_107_298" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_107_298" result="shape" />
                    </filter>
                    <linearGradient id="paint0_linear_107_298" x1="81.353" y1="-3.37408" x2="44.1399" y2="42.0069"
                                    gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FFBA08" />
                        <stop offset="1" stop-color="#C8B6FF" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_107_298" x1="45.9683" y1="86.159" x2="83.1813" y2="40.778"
                                    gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FFBA08" />
                        <stop offset="1" stop-color="#C8B6FF" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_107_298" x1="39.7128" y1="86.2016" x2="1.88475" y2="41.332"
                                    gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FFBA08" />
                        <stop offset="1" stop-color="#C8B6FF" />
                    </linearGradient>
                    <linearGradient id="paint3_linear_107_298" x1="39.4247" y1="43.9531" x2="1.59666" y2="-0.916574"
                                    gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FFBA08" />
                        <stop offset="1" stop-color="#C8B6FF" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    )
}