
import styles from './Menu.module.scss'
import classNames from "classnames/bind";
export function SlideWrapper({ index, hovering, children }) {

    const cx = classNames.bind(styles)
    // console.log(index)

    return (
        <div
            className={cx("slide")}
            style={{
                width: '100%',
                opacity: hovering === index ? '100%' : 1,
                pointerEvents: hovering !== index && 'none',
                transform: hovering === index || hovering === null ? 'none' : hovering > index ? 'translateX(-25px)' : 'translateX(25px)'
            }}
        >
            {children}
        </div >
    );
}