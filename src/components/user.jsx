import React, {useState} from "react";
import Qualities from "./qualities";
import Bookmark from "./bookmark";

const User = (props) => {

    const deleteButton = () => {
        return (
            <button type="button"
                    className="btn btn-danger"
                    onClick={()=> props.onDelete(props._id)}
            >
                Удалить
            </button>
        );
    };

     return (
         <>
             <tr key={props._id}>
                 <td className='align-middle'>{props.name}</td>
                 <td className='align-middle'>
                     {props.qualities.map((quality) => (
                         <Qualities
                             key={quality._id}
                             getSpanColor={props.getSpanColor}
                             {...quality}
                         />
                     ))}
                 </td>
                 <td className='align-middle'>{props.profession.name}</td>
                 <td className='align-middle'>{props.completedMeetings}</td>
                 <td className='align-middle'>{props.rate}/5</td>
                 <td className='align-middle'>
                     <Bookmark
                         changePriority={props.changePriority}
                     />
                 </td>
                 <td className='align-middle'>
                     {deleteButton()}
                 </td>
             </tr>
         </>
     )

}

export default User;