import styles from "./TargetView.jsx"

export default function TargetView( {target} ){

    const isOn = target != null


    return(
        <div className={isOn ? styles.containerOn : styles.containerOff}>
            This is the small version of examine Targets for users 
            who haven't logedIn or the just wanna look at the target really features

            by implementing this I can protecte the route of examine target and removing
            bullshit checks there

            {target}
        </div>
    )
}