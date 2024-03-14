type MyProps = {
    // using `interface` is also ok
    class: string;
};
export default function ProfileLeaf(props: MyProps) {
    return (
        <div className={props.class}>
            <svg width="95" height="99" viewBox="0 0 95 99" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_b_146_2833)">
                    <path d="M0.149414 49.1063C0.149414 22.0687 22.0677 0.150391 49.1053 0.150391V49.1063H0.149414Z"
                          fill="url(#paint0_linear_146_2833)" fillOpacity="0.3"/>
                    <path d="M98.0615 0.14979C98.0615 27.1874 76.1432 49.1057 49.1056 49.1057V0.14979H98.0615Z"
                          fill="url(#paint1_linear_146_2833)" fillOpacity="0.3"/>
                    <path d="M98.0615 98.0616C98.0615 71.024 76.1432 49.1057 49.1056 49.1057V98.0616H98.0615Z"
                          fill="url(#paint2_linear_146_2833)" fillOpacity="0.3"/>
                    <path d="M49.1055 98.0609C49.1055 71.0233 27.1872 49.105 0.149546 49.105V98.0609H49.1055Z"
                          fill="url(#paint3_linear_146_2833)" fillOpacity="0.3"/>
                </g>
                <defs>
                    <filter id="filter0_b_146_2833" x="-2.88661" y="-2.88612" width="103.984" height="103.984"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="1.51801"/>
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_146_2833"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_146_2833" result="shape"/>
                    </filter>
                    <linearGradient id="paint0_linear_146_2833" x1="-2.62627" y1="3.77467" x2="49.6631" y2="47.252"
                                    gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFBA08"/>
                        <stop offset="1" stopColor="#C8B6FF"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_146_2833" x1="100.837" y1="45.4814" x2="48.5478" y2="2.0041"
                                    gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFBA08"/>
                        <stop offset="1" stopColor="#C8B6FF"/>
                    </linearGradient>
                    <linearGradient id="paint2_linear_146_2833" x1="100.837" y1="52.73" x2="48.5478" y2="96.2073"
                                    gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFBA08"/>
                        <stop offset="1" stopColor="#C8B6FF"/>
                    </linearGradient>
                    <linearGradient id="paint3_linear_146_2833" x1="51.8812" y1="52.7293" x2="-0.408263" y2="96.2066"
                                    gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFBA08"/>
                        <stop offset="1" stopColor="#C8B6FF"/>
                    </linearGradient>
                </defs>
            </svg>
        </div>
    )
}