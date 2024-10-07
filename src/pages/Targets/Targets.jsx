import { useTarget } from "../../utils/useTarget";
import useAPI from "../../utils/useAPI";
import styles from "./Targets.module.css";
import useAuth from "../../utils/useAuth";
import { useState } from "react";

export default function Targets() {
  const { targetsState } = useTarget();
  const { targets, deleteTarget } = targetsState()
  const { deleteTargetServer , editTarget } = useAPI()
  const [ EditingTarget , setEditingTarget ] = useState(-1)

  const { userState } = useAuth();
  const { user } = userState();

  const hasLoggedIn = user.token != "";

  const TimeValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const editHandle = (index) => {

    setEditingTarget(index)
  } 

  const deleteHandle = (uuid, index) => {
    //  Delete local targets
    deleteTarget(index);

    //  Delete server targets
    if (hasLoggedIn && uuid != -1) deleteTargetServer(uuid);
  }

  const confirmHandle = (index) => {
    setEditingTarget(-1)
  }

  const TargetTemplate = ({ guid, index, ccmin , ccmax , Notf, lat, lng }) => (
    <tr>
      <td>{ lat } </td>
      <td>{ lng }</td>
      
      <td>{ index==EditingTarget ? <input value={ccmax} name={index + ".ccmax"} /> : ccmax}</td>

      <td>{ index==EditingTarget ? <input value={ccmin} name={index + ".ccmin"} /> : ccmin }</td>
      <td>{ index==EditingTarget ? <input value={Notf} name={index + ".notificationOffset"} /> : Notf }</td>
      <td>
        <a href={"examine/" + guid}>Examine</a>
        {index == EditingTarget ? <span onClick={() => confirmHandle(index)} >Confirm</span> : <span onClick={() => editHandle(index)}> Edit </span>}
        <button onClick={() => deleteHandle(guid, index)}>Delete</button>
      </td>
    </tr>
  );

  const renderedTargets = targets.map((target, index) => (
    <TargetTemplate
      guid={target.guid}
      row={target.row}
      path={target.path}
      lat={target.lat}
      lng={target.lng}
      key={index}
      index={index}
      ccmin={target.ccmin}
      ccmax={target.ccmax}
      Notf={target.notificationOffset}
    />
  ));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Selected Targets</span>
        <span>{user.email}</span>
      </div>
      <div className={styles.body}>
        <table>
          <thead>
            <tr>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>maxCloudCover</th>
              <th>minCloudCover</th>
              <th>notificationOffset</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{renderedTargets}</tbody>
        </table>
      </div>
    </div>
  );
}
