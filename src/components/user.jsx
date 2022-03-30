import React from "react";
import Qualities from "./qualities";
import Bookmark from "./bookmark";

const User = (props) => {
    const {name, _id, qualities, profession, rate, completedMeetings, changePriority, getSpanColor, onDelete} = props

    const deleteButton = () => {

        return (
            <button type="button"
                    className="btn btn-danger"
                    onClick={()=> onDelete(_id)}
            >
                Удалить
            </button>
        );
    };

     return (
         <>
             <tr key={_id}>
                 <td className='align-middle'>{name}</td>
                 <td className='align-middle'>
                     {qualities.map((quality) => (
                         <Qualities
                             key={quality._id}
                             getSpanColor={getSpanColor}
                             {...quality}
                         />
                     ))}
                 </td>
                 <td className='align-middle'>{profession.name}</td>
                 <td className='align-middle'>{completedMeetings}</td>
                 <td className='align-middle'>{rate}/5</td>
                 <td className='align-middle'>
                     <Bookmark
                         changePriority={changePriority}
                     />
                 </td>
                 <td className='align-middle'>
                     {deleteButton()}
                 </td>
             </tr>
         </>
     );
};

export default User;