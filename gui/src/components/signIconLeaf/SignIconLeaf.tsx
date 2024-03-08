type MyProps = {
    // using `interface` is also ok
    class: string;
};
export default function SignIconLeaf(props: MyProps) {
    return (
        <div className={props.class}>
            <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_b_128_1509)">
                    <path
                        d="M64.4988 129.386C28.8771 129.171 0.173658 100.121 0.387876 64.499L64.8867 64.8868L64.4988 129.386Z"
                        fill="white" fill-opacity="0.42"/>
                    <path
                        d="M0.776556 6.34445e-05C36.3983 0.214281 65.1017 29.2651 64.8875 64.8868L0.388679 64.4989L0.776556 6.34445e-05Z"
                        fill="white" fill-opacity="0.42"/>
                    <path
                        d="M129.774 0.775815C94.1525 0.561597 65.1017 29.2651 64.8875 64.8868L129.386 65.2747L129.774 0.775815Z"
                        fill="white" fill-opacity="0.42"/>
                    <path
                        d="M129.386 65.2746C93.7638 65.0604 64.7131 93.7638 64.4988 129.386L128.998 129.773L129.386 65.2746Z"
                        fill="white" fill-opacity="0.42"/>
                </g>
                <defs>
                    <filter id="filter0_b_128_1509" x="-3.61328" y="-4" width="137.388" height="137.773"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_128_1509"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_128_1509" result="shape"/>
                    </filter>
                </defs>
            </svg>
        </div>
    )
}